'use client';
import { useState } from 'react';

import { Button } from '../ui/button';

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

import Link from 'next/link';
import Image from 'next/image';
import BrandLogo from './BrandLogo';
import { MdClose, MdMenu } from 'react-icons/md';
import ActiveLink from './ActiveLink';
import { useUser } from '@/context/user.provider';

// HEADER COMPONENT
const Header = () => {
  const [open, setOpen] = useState(true);

  const { user } = useUser();

  console.log(user);

  const menuItems = (
    <>
      <li>
        <ActiveLink href="/">Home</ActiveLink>
      </li>
      <li>
        <ActiveLink href="/tips-list">All Tips</ActiveLink>
      </li>
      <li>
        <ActiveLink href="/about">About Us</ActiveLink>
      </li>
      <li>
        <ActiveLink href="/contact">Contact Us</ActiveLink>
      </li>

      <li>
        <ActiveLink href={`/dashboard/user`}>Dashboard</ActiveLink>
      </li>
    </>
  );

  return (
    <header>
      {/* DESKTOP NAV */}
      <div className="fixed top-0 z-20 hidden h-[80px] w-full items-center justify-between bg-green-50 px-10 lg:flex">
        {/* LOGO */}
        <Link href="/">
          <BrandLogo />
        </Link>
        <nav>
          <ul className="flex gap-4 font-semibold text-gray-700">
            {menuItems}
          </ul>
        </nav>

        {/* LOGIN,PROFILE GROUP */}
        <div className="flex items-center gap-4">
          {user && (
            <div className="flex items-center">
              <ProfilePopover />
            </div>
          )}

          {!user && (
            <div>
              <Link href={`/login`}>
                <Button>Login</Button>
              </Link>
            </div>
          )}

          {user && (
            <div>
              <Button>Logout</Button>
            </div>
          )}
        </div>
      </div>

      {/* MOBILE NAV */}
      <div className="lg:hidden">
        <div className="fixed top-0 z-20 flex h-[80px] w-full items-center justify-between bg-[#e9effd] px-2">
          <div onClick={() => setOpen(!open)} className="">
            {open && (
              <button className="flex h-10 w-10 items-center justify-center border border-primary text-3xl text-primary">
                <MdMenu />
              </button>
            )}

            {!open && (
              <button className="flex h-10 w-10 items-center justify-center border border-primary text-3xl text-primary">
                <MdClose />
              </button>
            )}
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center">
              <ProfilePopover />
            </div>

            <div>
              <Link href={`/login`}>
                <Button>Login</Button>
              </Link>
            </div>

            <div>
              <Button>Logout</Button>
            </div>
          </div>
        </div>

        <nav className="">
          <ul
            className={`fixed top-[80px] z-20 flex h-full w-[180px] -translate-x-[100%] flex-col gap-2 bg-yellow-50/90 pl-8 pt-5 font-semibold text-[#212529] transition-transform duration-500 ${
              !open && 'translate-x-0'
            }`}
          >
            {menuItems}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;

// PROFILE POPOVER COMPONENT
const ProfilePopover = () => {
  return (
    <Popover>
      <PopoverTrigger>
        <Image
          className="h-10 w-10 rounded-full object-cover"
          src="https://images.pexels.com/photos/1134062/pexels-photo-1134062.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          width={40}
          height={40}
          alt=""
        />
      </PopoverTrigger>
      <PopoverContent className="mt-5">
        <h4 className="text-lg font-semibold">My account</h4>
        <hr className="my-2 border-gray-300" />

        <>
          <div className="flex flex-col gap-2">
            <Link
              href="/dashboard/admin"
              className="w-fit border-b-2 border-b-transparent hover:border-b-2 hover:border-b-primary"
            >
              Dashboard
            </Link>
            <button className="w-fit border-b-2 border-b-transparent text-left hover:border-b-2 hover:border-b-primary">
              Logout
            </button>
          </div>
        </>

        <>
          <div className="flex flex-col gap-2">
            <Link
              href="/dashboard/my-bookings"
              className="w-fit border-b-2 border-b-transparent hover:border-b-2 hover:border-b-primary"
            >
              My booking
            </Link>
            <button className="w-fit border-b-2 border-b-transparent text-left hover:border-b-2 hover:border-b-primary">
              Logout
            </button>
          </div>
        </>
      </PopoverContent>
    </Popover>
  );
};
