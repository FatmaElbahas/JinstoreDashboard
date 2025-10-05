import PageLayout from '../../Components/Layout/PageLayout';
import { useTranslation } from 'react-i18next';

export default function ProductDetail() {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';
  
  return (
    <PageLayout
      title={`${t('sidebar.productDetail')} - JinStore`}
      description="View detailed information about our products. High-quality images, specifications, and customer reviews."
      dir={isRTL ? 'rtl' : 'ltr'}
    >
      <div className="flex-1 px-2 md:px-4 pt-8 pb-4">
        <h1 className="text-2xl font-bold mb-6">{t('sidebar.productDetail')}</h1>
        <p className="text-gray-600">Product details will be displayed here</p>
      </div>
    </PageLayout>
  );
}
