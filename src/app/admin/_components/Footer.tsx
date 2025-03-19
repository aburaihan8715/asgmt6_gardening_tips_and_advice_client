import React from 'react';

const Footer = () => {
  return (
    <div className="flex flex-col justify-between rounded-md p-5 shadow-md md:flex-row">
      <span className="text-xl font-medium text-gray-700">GardenSage</span>
      <span className="text-base text-gray-700">
        All right reserved by GardenSage
      </span>
    </div>
  );
};

export default Footer;
