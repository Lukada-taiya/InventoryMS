import React from 'react';
import DefaultLayout from '../layout/DefaultLayout';
import CardDataStats from '../components/CardDataStats';
import ChartOne from '../components/Charts/ChartOne';
import ChartTwo from '../components/Charts/ChartTwo'; 
import EyeIcon from './UiElements/EyeIcon';
import CartIcon from './UiElements/CartIcon'; 
import UsersIcon from './UiElements/UsersIcon';
import BagIcon from './UiElements/BagIcon';

const Dashboard: React.FC = () => {
  return (
    <DefaultLayout>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5">
        <CardDataStats title="Total views" total="$3.456K" rate="0.43%" levelUp>
         <EyeIcon/> 
        </CardDataStats>
        <CardDataStats title="Total Profit" total="$45,2K" rate="4.35%" levelUp>
          <CartIcon/>
        </CardDataStats>
        <CardDataStats title="Total Product" total="2.450" rate="2.59%" levelUp>
          <BagIcon/>
        </CardDataStats>
        <CardDataStats title="Total Users" total="3.456" rate="0.95%" levelDown>
          <UsersIcon/>
        </CardDataStats>
      </div>

      <div className="mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5">
        <ChartOne />
        <ChartTwo /> 
      </div>
    </DefaultLayout>
  );
};

export default Dashboard;
