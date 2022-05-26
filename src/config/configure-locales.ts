import { I18n } from 'i18n';
import ptBR from './locales/pt-br';

export default (): I18n => {
  const i18n = new I18n();

  i18n.configure({
    staticCatalog: {
      'pt-br': ptBR,
    },
    defaultLocale: 'pt-br',
    register: global,
    updateFiles: false,
  });

  return i18n;
};
