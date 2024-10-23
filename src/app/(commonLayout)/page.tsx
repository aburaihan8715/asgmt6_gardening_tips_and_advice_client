import Gallery from '@/components/ui/Gallery';
import PostOfHome from './_home-components/PostOfHome';
import TopFiveUsers from '@/components/ui/TopFiveUsers';

const Home = () => {
  return (
    <div className="flex">
      {/* Left Sidebar */}
      <div className="fixed h-full w-[25%] p-5">
        <div className="h-full">
          <TopFiveUsers />
        </div>
      </div>

      <div className="ml-[25%] mr-[25%] h-full w-[50%]">
        <ul className="space-y-10 md:p-5">
          <PostOfHome />
        </ul>
      </div>

      {/* Right Sidebar */}
      <div className="fixed right-0 h-full w-[25%]">
        <div className="fixed h-full w-[25%] p-5">
          <div className="h-full">
            <Gallery />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
