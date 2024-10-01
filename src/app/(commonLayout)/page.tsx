import Tips from '@/components/modules/home/Tips';
import SectionHeading from '@/components/ui/SectionHeading';
import React from 'react';

const Home = () => {
  return (
    <div className="mt-[80px] flex h-[calc(100vh-80px)]">
      {/* Left Sidebar */}
      <div className="fixed h-full w-[25%] bg-red-300">Left</div>

      {/* Center Content */}
      <div className="scrollbar-thumb-rounded-full scrollbar-track-rounded-full scrollbar-thumb-rounded-full scrollbar-track-rounded-full ml-[25%] mr-[25%] h-full w-[50%] overflow-y-scroll scrollbar-thin scrollbar-track-gray-200 scrollbar-thumb-gray-500">
        <div className="mt-10 flex justify-center">
          <SectionHeading heading="Tips and Advice" />
        </div>
        <ul className="space-y-10 md:p-5">
          <Tips />
          <Tips />
          <Tips />
          <Tips />
          <Tips />
          <Tips />
        </ul>
      </div>

      {/* Right Sidebar */}
      <div className="fixed right-0 h-full w-[25%] bg-red-300">Right</div>
    </div>
  );
};

export default Home;

/* 
import Feed from "@/components/modules/home/Feed";
import RightBar from "@/components/modules/home/RightBar";
import SideBar from "@/components/modules/home/SideBar";
import TopBar from "@/components/modules/home/TopBar";

export default function Home() {
  return (
    <>
      <TopBar />
      <div className="flex w-full">
        <SideBar />
        <Feed />
        <RightBar />
      </div>
    </>
  );
}
*/
