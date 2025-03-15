import React, { ReactNode } from 'react';

interface IProps {
  title?: string;
  count?: number;
  icon?: ReactNode;
  bg?: string;
}

const InfoCard = ({ title, count, icon, bg }: IProps) => {
  return (
    <div className="">
      <article
        className={`${bg ? bg : 'bg-white'} rounded-lg p-10 shadow-md`}
      >
        <div>
          <h5 className="text-center font-semibold text-gray-500">
            {title}
          </h5>
          <div className="flex items-center justify-center gap-1">
            <span className="text-4xl text-gray-400">{icon}</span>
            <span className="text-4xl font-medium text-gray-400">
              {count}
            </span>
          </div>
        </div>
      </article>
    </div>
  );
};

export default InfoCard;
