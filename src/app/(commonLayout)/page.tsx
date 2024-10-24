import Gallery from '@/components/ui/Gallery';
import PostOfHome from './_home-components/PostOfHome';
import TopFiveUsers from '@/components/ui/TopFiveUsers';

const Home = () => {
  return (
    <div className="mt-[80px] flex md:mt-0">
      {/* Left Sidebar */}
      <div className="fixed hidden h-full w-[25%] p-5 md:block">
        <div className="h-full">
          <TopFiveUsers />
        </div>
      </div>

      <div className="h-full md:ml-[25%] md:mr-[25%] md:w-[50%]">
        <ul className="space-y-10 md:p-5">
          <PostOfHome />
        </ul>
      </div>

      {/* Right Sidebar */}
      <div className="fixed right-0 hidden h-full w-[25%] md:block">
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
