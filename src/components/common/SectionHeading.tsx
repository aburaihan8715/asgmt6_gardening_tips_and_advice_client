type sectionHeadingProps = {
  heading: string;
};

const SectionHeading = ({ heading }: sectionHeadingProps) => {
  return (
    <div className="flex max-w-max flex-col justify-center">
      <h1 className="sm:2xl title-font mb-3 bg-gradient-to-r from-orange-600 via-green-700 to-fuchsia-700 bg-clip-text text-xl font-bold text-gray-900 text-transparent md:text-3xl">
        {heading}
      </h1>

      <div className="">
        <span className="relative flex justify-center">
          <div className="absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-transparent bg-gradient-to-r from-transparent via-purple-500 to-transparent opacity-75"></div>

          <span className="relative px-6"></span>
        </span>
      </div>
    </div>
  );
};

export default SectionHeading;
