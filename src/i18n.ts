import i18next from 'i18next';
import Backend from 'i18next-fs-backend';
import middleware from 'i18next-http-middleware';

i18next
  .use(Backend)
  .use(middleware.LanguageDetector)
  .init({
    backend: {
      loadPath: './src/locales/{{lng}}/translation.json',
    },
    fallbackLng: 'en',
    preload: ['en', 'sk'],
    detection: {
      order: ['header', 'querystring', 'cookie'],
      lookupHeader: 'language',
      caches: false,
    },
  })
  .then(() => {
    console.log('i18next initialized successfully.');
  })
  .catch((error) => {
    console.error('Error initializing i18next:', error);
  });

export default i18next;
