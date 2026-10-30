import Config from "@/config"

import { Api } from "./Api"
import { API_TIMEOUT_MS } from "./constants"

export const api = new Api({ url: Config.API_URL, timeout: API_TIMEOUT_MS })
