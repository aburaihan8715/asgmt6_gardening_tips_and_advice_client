import Header from '@/app/(main)/_components/Header';
import Notification from '@/components/common/Notification';
import ScrollTop from '@/components/common/ScrollToTop';

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <div className="hidden md:block">
        <Notification />
      </div>
      <Header />
      <div>{children}</div>
      <ScrollTop />
    </>
  );
}
