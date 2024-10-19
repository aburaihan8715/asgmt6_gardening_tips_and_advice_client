import BrandLogo from '@/components/ui/BrandLogo';
import Link from 'next/link';
import Sidebar from './_dashboard-components/Sidebar';

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <div className="flex">
        <div>
          <div className="sticky bottom-0 top-0 md:h-screen md:flex-1">
            <div className="h-screen bg-[#e9effd] p-1 md:p-5 md:pl-10">
              <Link className="hidden md:block" href="/">
                <BrandLogo />
              </Link>
              <div className="mt-5">
                <Sidebar />
              </div>
            </div>
          </div>
        </div>

        <div className="flex-1 overflow-auto p-5 md:flex-[4]">
          {children}
        </div>
      </div>
    </>
  );
}
