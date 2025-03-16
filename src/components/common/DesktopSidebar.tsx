import { ReactNode } from 'react';

interface IProps {
  links: ReactNode;
}
const DesktopSidebar = ({ links }: IProps) => {
  return (
    <>
      <ul className="flex flex-col gap-4 font-semibold text-gray-700">
        {links}
      </ul>
    </>
  );
};

export default DesktopSidebar;
