'use client';

import { adminSidebarLinks } from '../_constants';

const AdminDesktopSidebar = () => {
  return (
    <>
      <ul className="flex flex-col gap-4 font-semibold text-gray-700">
        {adminSidebarLinks}
      </ul>
    </>
  );
};

export default AdminDesktopSidebar;
