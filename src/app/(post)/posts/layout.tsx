import Header from '@/components/common/Header';
import Notification from '@/components/common/Notification';
import ScrollTop from '@/components/common/ScrollToTop';

export default function PostLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Notification />
      <Header />
      <div>{children}</div>
      <ScrollTop />
    </>
  );
}
