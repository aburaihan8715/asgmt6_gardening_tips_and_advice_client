import Header from '@/components/ui/Header';
import Notification from '@/components/ui/Notification';

export default function CommonLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <Notification />
      <Header />
      <div>{children}</div>
    </div>
  );
}
