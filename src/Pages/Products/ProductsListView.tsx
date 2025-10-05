import PageLayout from '../../Components/Layout/PageLayout';
import { useTranslation } from 'react-i18next';

export default function ProductsListView() {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';
  
  return (
    <PageLayout
      title={`${t('sidebar.listView')} - JinStore`}
      description="Browse products in list view. Easy to compare and find what you need."
      dir={isRTL ? 'rtl' : 'ltr'}
    >
      <div className="flex-1 px-2 md:px-4 pt-8 pb-4">
        <h1 className="text-2xl font-bold mb-6">{t('sidebar.listView')}</h1>
        <p className="text-gray-600">List view will be implemented here</p>
      </div>
    </PageLayout>
  );
}
