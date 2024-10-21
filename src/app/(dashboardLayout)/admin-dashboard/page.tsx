import React from 'react';
import Card from './_components/Card';
import Chart from './_components/Chart';

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
        <h5 className="font-semibold">user Analytics</h5>
        <div>
          <Chart />
        </div>
      </div>
    </div>
  );
};

export default AdminHome;
