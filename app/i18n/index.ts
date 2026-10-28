import { I18nManager } from "react-native"
import i18n from "i18next"
import { initReactI18next } from "react-i18next"
import "intl-pluralrules"

import en, { Translations } from "./en"

const fallbackLocale = "en-US"

const resources = { en }

export const isRTL = false
I18nManager.allowRTL(false)

export const initI18n = async () => {
  i18n.use(initReactI18next)

  await i18n.init({
    resources,
    lng: fallbackLocale,
    fallbackLng: fallbackLocale,
    interpolation: {
      escapeValue: false,
    },
  })

  return i18n
}

/**
 * Builds up valid keypaths for translations.
 */

export type TxKeyPath = RecursiveKeyOf<Translations>

// via: https://stackoverflow.com/a/65333050
type RecursiveKeyOf<TObj extends object> = {
  [TKey in keyof TObj & (string | number)]: RecursiveKeyOfHandleValue<TObj[TKey], `${TKey}`, true>
}[keyof TObj & (string | number)]

type RecursiveKeyOfInner<TObj extends object> = {
  [TKey in keyof TObj & (string | number)]: RecursiveKeyOfHandleValue<TObj[TKey], `${TKey}`, false>
}[keyof TObj & (string | number)]

type RecursiveKeyOfHandleValue<
  TValue,
  Text extends string,
  IsFirstLevel extends boolean,
> = TValue extends any[]
  ? Text
  : TValue extends object
    ? IsFirstLevel extends true
      ? Text | `${Text}:${RecursiveKeyOfInner<TValue>}`
      : Text | `${Text}.${RecursiveKeyOfInner<TValue>}`
    : Text
