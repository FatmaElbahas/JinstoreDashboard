import { useTranslation } from 'react-i18next';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const { t } = useTranslation();
  
  return (
    <footer className="bg-primary-50 border-t border-gray-200 mt-auto opacity-100 min-h-[45px]">
      <div className="flex flex-col md:flex-row items-center justify-center md:justify-between text-sm text-gray-600 h-full gap-3 md:gap-0 py-3 md:py-0 px-4">
        <p className="text-center md:text-start align-middle font-poppins font-normal text-xs leading-[18px] tracking-normal">
          {t('footer.copyright', { year: currentYear })} <a href="#" className="hover:underline text-primary-100">{t('footer.themesLink')}</a>
        </p>
        
        <nav 
          className="flex items-center gap-3 md:gap-6 align-middle flex-wrap justify-center font-poppins font-normal text-xs leading-[18px] tracking-normal" 
          aria-label="Footer navigation"
        >
          <a href="#" className="hover:text-gray-900 transition-colors whitespace-nowrap">{t('footer.licenses')}</a>
          <a href="#" className="hover:text-gray-900 transition-colors whitespace-nowrap">{t('footer.changelog')}</a>
          <a href="#" className="hover:text-gray-900 transition-colors whitespace-nowrap">{t('footer.help')}</a>
        </nav>
      </div>
    </footer>
  );
}
