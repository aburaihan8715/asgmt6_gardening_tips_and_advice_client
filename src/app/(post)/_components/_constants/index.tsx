import ActiveLink from '@/components/common/ActiveLink';

export const postNavbarLinks = (
  <>
    <li>
      <ActiveLink href="/posts">News Feed</ActiveLink>
    </li>
    <li>
      <ActiveLink href="/about">About Us</ActiveLink>
    </li>
    <li>
      <ActiveLink href="/contact">Contact Us</ActiveLink>
    </li>

    <li>
      <ActiveLink href={`/user/dashboard`}>Dashboard</ActiveLink>
    </li>
  </>
);
