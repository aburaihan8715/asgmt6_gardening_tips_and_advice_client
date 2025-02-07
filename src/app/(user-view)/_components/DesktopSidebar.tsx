import PremiumButton from '@/components/common/PremiumButton';
import { userSidebarLinks } from '../_constants';

const UserDesktopSidebar = () => {
  return (
    <>
      <ul className="flex flex-col gap-4 font-semibold text-gray-700">
        {userSidebarLinks}
        <PremiumButton />
      </ul>
    </>
  );
};

export default UserDesktopSidebar;
