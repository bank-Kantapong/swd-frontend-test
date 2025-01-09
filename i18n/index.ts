import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

export const loadLocales = async (lang: string) => {
  try {
    const response = await fetch(`/locales/${lang}/translation.json`);
    if (!response.ok) {
      throw new Error(`Failed to load locales for language: ${lang}`);
    }
    return await response.json();
  } catch (error) {
    console.error(error);
    return null;
  }
};

i18n.use(initReactI18next).init({
  resources: {},
  lng: "en",
  fallbackLng: "en",
  interpolation: { escapeValue: false },
  react: { useSuspense: false }, // ปิดการใช้ Suspense
});

// Function to switch language dynamically
export const changeLng = async (lang: string) => {
  const translations = await loadLocales(lang);
  if (translations) {
    i18n.addResourceBundle(lang, 'translation', translations, true, true);
    i18n.changeLanguage(lang);
  }
};

export default i18n;
