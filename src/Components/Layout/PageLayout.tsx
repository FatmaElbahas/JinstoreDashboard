import { ReactNode } from 'react';
import { Helmet } from 'react-helmet-async';
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';

interface PageLayoutProps {
  children: ReactNode;
  title?: string;
  description?: string;
  onSearch?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  dir?: 'ltr' | 'rtl';
}

const LOGO = new URL('../../assets/Images/LOGO.svg', import.meta.url).href;

export default function PageLayout({ children, title = 'JinStore', description = 'JinStore - Your Premium E-commerce Platform', onSearch, dir }: PageLayoutProps) {
  return (
    <>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <link rel="icon" type="image/svg+xml" href={LOGO} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={LOGO} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={LOGO} />
      </Helmet>
      <main className="flex-1 overflow-y-auto flex flex-col bg-primary-50" dir={dir}>
        <Navbar onSearch={onSearch} />
        {children}
        <Footer />
      </main>
    </>
  );
}






