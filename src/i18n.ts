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
  });
export default i18next;
