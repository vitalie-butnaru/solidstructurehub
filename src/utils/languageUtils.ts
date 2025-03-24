
// Helper utility to handle multilingual content

type LanguageContent = {
  ro: string;
  en: string;
  ru: string;
};

/**
 * Gets localized content based on the current language
 * @param content The content which may be a string or a language object
 * @param lang The current language code ('ro', 'en', 'ru')
 * @returns The localized string
 */
export const getLocalizedContent = (
  content: string | LanguageContent | undefined, 
  lang: string = 'ro'
): string => {
  if (content === undefined || content === null) {
    return '';
  }
  
  if (typeof content === 'string') {
    return content;
  }
  
  // Ensure lang is a valid key
  const validLang = (lang in content) ? lang : 'ro';
  return content[validLang as keyof LanguageContent] || '';
};

/**
 * Converts a string to a multilingual object
 * @param value The string to convert
 * @returns A multilingual object with the string for all languages
 */
export const stringToMultilingual = (value: string): LanguageContent => {
  return {
    ro: value,
    en: value,
    ru: value
  };
};

/**
 * Ensures a value is in multilingual format
 * @param value The value which may be a string or already a language object
 * @returns A language object
 */
export const ensureMultilingual = (
  value: string | LanguageContent | undefined
): LanguageContent => {
  if (!value) {
    return { ro: '', en: '', ru: '' };
  }
  
  if (typeof value === 'string') {
    return stringToMultilingual(value);
  }
  
  return value;
};
