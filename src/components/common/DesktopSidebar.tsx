import { ReactNode } from 'react';
import PremiumButton from './PremiumButton';

interface IProps {
  links: ReactNode;
  isBtn?: boolean;
}
const DesktopSidebar = ({ links, isBtn }: IProps) => {
  return (
    <>
      <ul className="flex flex-col gap-4 font-semibold text-gray-700">
        {links}
        {isBtn && <PremiumButton />}
      </ul>
    </>
  );
};

export default DesktopSidebar;
