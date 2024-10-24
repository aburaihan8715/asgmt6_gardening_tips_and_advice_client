import Header from '@/components/ui/Header';
import Notification from '@/components/ui/Notification';

export default function CommonLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <div className="hidden md:block">
        <Notification />
      </div>
      <Header />
      <div>{children}</div>
    </div>
  );
}
