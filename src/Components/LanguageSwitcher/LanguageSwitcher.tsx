import { useLanguage } from '../../context/LanguageContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLanguage } from '@fortawesome/free-solid-svg-icons';

export default function LanguageSwitcher() {
  const { language, toggleLanguage } = useLanguage();

  return (
    <button
      onClick={toggleLanguage}
      className="flex items-center gap-2 px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
      aria-label="Switch language"
    >
      <FontAwesomeIcon icon={faLanguage} className="text-lg" />
      <span className="font-medium">{language === 'en' ? 'AR' : 'EN'}</span>
    </button>
  );
}






