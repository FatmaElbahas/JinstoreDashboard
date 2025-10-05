import PageLayout from '../../Components/Layout/PageLayout';
import { useTranslation } from 'react-i18next';

export default function Checkout() {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';
  
  return (
    <PageLayout
      title={`${t('cart.checkout')} - JinStore`}
      description="Complete your purchase securely at JinStore. Fast and easy checkout process."
      dir={isRTL ? 'rtl' : 'ltr'}
    >
      <div className="flex-1 px-2 md:px-4 pt-8 pb-4">
        <h1 className="text-2xl font-bold mb-6">{t('cart.checkout')}</h1>
        <p className="text-gray-600">Checkout process will be implemented here</p>
      </div>
    </PageLayout>
  );
}
