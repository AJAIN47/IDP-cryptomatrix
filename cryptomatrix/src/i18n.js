import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import translations from './translations';

i18n
  .use(initReactI18next)
  .use(LanguageDetector)
  .init({
    resources: translations,
    fallbackLng: 'en',
    detection: {
      order: ['queryString', 'cookie', 'localStorage', 'navigator', 'htmlTag', 'path', 'subdomain'],
      caches: ['localStorage', 'cookie']
    },
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
