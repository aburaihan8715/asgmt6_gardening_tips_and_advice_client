import React from 'react';
import Card from './_components/Card';
import UserChart from './_components/UserChart';
import PostChart from './_components/PostChart';

const AdminHome = () => {
  return (
    <div className="space-y-5">
      <div className="grid grid-cols-1 gap-5 md:grid-cols-4">
        <Card />
        <Card />
        <Card />
        <Card />
      </div>

      <div className="rounded border p-5">
        <div>
          <UserChart />
        </div>
      </div>

      <div className="rounded border p-5">
        <div>
          <PostChart />
        </div>
      </div>
    </div>
  );
};

export default AdminHome;
