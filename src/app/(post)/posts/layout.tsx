import Header from '@/app/(post)/_components/Header';
import Notification from '@/components/common/Notification';
import ScrollTop from '@/components/common/ScrollToTop';

export default function PostLayout({
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
