#!/usr/bin/env python3
"""Check shared guidance and vendored skills without running third-party code."""

import hashlib
import json
from pathlib import Path
import re
import subprocess
import sys


ROOT = Path(__file__).resolve().parents[1]
errors = []


def require(condition, message):
    if not condition:
        errors.append(message)


def read(relative):
    path = ROOT / relative
    require(path.is_file(), f"Missing file: {relative}")
    return path.read_text() if path.is_file() else ""


def git_visible(path):
    result = subprocess.run(
        ["git", "check-ignore", "--no-index", "-q", str(path)],
        cwd=ROOT, capture_output=True,
    )
    require(result.returncode == 1, f"Ignored or Git error: {path}")


def main():
    lock = json.loads(read("docs/ai/superpowers.lock.json"))
    skills_root = ROOT / ".agents/skills"
    actual = {str(p.relative_to(ROOT)) for p in skills_root.rglob("*") if p.is_file()}
    expected = {p for p in lock["files"] if p.startswith(".agents/skills/")}
    require(actual == expected, f"Skill file drift: {sorted(actual ^ expected)}")
    for relative, digest in lock["files"].items():
        path = ROOT / relative
        require(path.is_file() and not path.is_symlink(), f"Missing/symlink resource: {relative}")
        if path.is_file():
            require(hashlib.sha256(path.read_bytes()).hexdigest() == digest,
                    f"Resource hash mismatch: {relative}")
        git_visible(relative)

    for name in lock["skills"]:
        text = read(f".agents/skills/{name}/SKILL.md")
        require(text.startswith("---\n"), f"Missing frontmatter: {name}")
        header = text.split("---", 2)[1] if text.startswith("---\n") else ""
        require(re.search(rf"^name: {re.escape(name)}\s*$", header, re.M),
                f"Skill name mismatch: {name}")
        require(re.search(r"^description:\s*\S", header, re.M), f"Missing description: {name}")
    discovered = {p.parent.name for p in skills_root.glob("*/SKILL.md")}
    require(discovered == set(lock["skills"]), "Skill catalog differs from lock manifest")

    docs = [ROOT / "AGENTS.md", ROOT / "CLAUDE.md"]
    docs += list((ROOT / "docs/ai").glob("*.md"))
    docs += list((ROOT / "docs/ai/rules").glob("*.md"))
    docs += list((ROOT / ".claude/rules").glob("*.md"))
    docs += [ROOT / "docs/product/current-phase.md"]
    docs += list((ROOT / "docs/product/phases").glob("*.md"))
    docs += [ROOT / "docs/superpowers/specs/2026-11-17-codex-claude-workflow-design.md",
             ROOT / "docs/superpowers/plans/2026-11-17-codex-claude-workflow.md"]
    # Historical review reports are not active guidance and may cite removed paths.
    docs = [p for p in docs if p.name != "review.md"]
    for path in docs:
        git_visible(path.relative_to(ROOT))
        for link in re.findall(r"\[[^\]]+\]\(([^)]+)\)", path.read_text()):
            if re.match(r"[a-z]+://|#", link):
                continue
            target = (path.parent / link.split("#")[0]).resolve()
            require(target.exists(), f"Broken link in {path.relative_to(ROOT)}: {link}")

    for entry in ("AGENTS.md", "CLAUDE.md"):
        text = read(entry)
        for shared in ("docs/ai/workflow.md", "docs/product/current-phase.md", "docs/ai/skills.md"):
            require(shared in text, f"Entry point {entry} omits {shared}")
    for path in (ROOT / ".claude/rules").glob("*.md"):
        require(f"docs/ai/rules/{path.name}" in path.read_text(), f"Rule pointer missing: {path}")

    pointer = read("docs/product/current-phase.md")
    links = re.findall(r"\[[^\]]+\]\((phases/[^)]+)\)", pointer)
    require(len(links) == 1, "Current phase must point to exactly one phase")
    active = []
    for path in (ROOT / "docs/product/phases").glob("*.md"):
        if "**Status:** active" in path.read_text():
            active.append(path.resolve())
    require(len(active) == 1, "Exactly one phase must be active")
    if len(links) == 1:
        require(active == [(ROOT / "docs/product" / links[0]).resolve()], "Pointer/active phase mismatch")
    for file in (".eslintignore", ".prettierignore", "tsconfig.json"):
        require(".agents/" in read(file), f"Missing vendor exclusion: {file}")

    if errors:
        for error in errors:
            print(f"FAIL: {error}")
        return 1
    print(f"PASS: {len(lock['skills'])} skill entries, {len(lock['files'])} resource hashes, "
          f"{len(docs)} guidance files; links, Git visibility, routing and active phase.")
    print("Client catalog refresh and actual mobile UI behavior are not proven by this check.")
    return 0


if __name__ == "__main__":
    sys.exit(main())
