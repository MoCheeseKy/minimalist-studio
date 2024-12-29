import { useState } from 'react';

import Header from '../_shared/Header';
import Footer from '../_shared/Footer';
import WrapperComponent from '../_shared/Wrapper';
import DetailScheduleComponent from './detailSchedule';

import { SlArrowRight } from 'react-icons/sl';
import { MdAccessTime } from 'react-icons/md';

export default function ScheduleComponent() {
  const [OpenDetailClass, setOpenDetailClass] = useState<boolean>(false);
  return (
    <>
      <Header />
      <WrapperComponent className='md:pb-24 pb-16'>
        <div id='cls' className='h-[76px]' />
        <div className='flex justify-center'>
          <div className='py-16 px-4 flex flex-col gap-6 w-full max-w-[844px]'>
            <p className='text-2xl font-bold'>Jadwal</p>
            <div className='grid md:grid-cols-2 gap-4'>
              <div
                onClick={() => setOpenDetailClass(!OpenDetailClass)}
                className='border-[2px] border-main p-4 rounded flex justify-between items-center'
              >
                <div>
                  <p className='text-xl font-bold max-w-[186px]'>
                    Weekend Fun Flow Danta Yoga
                  </p>
                  <div className='flex items-center gap-4 text-main mt-2'>
                    <MdAccessTime />
                    <p>09 September 2024, 09.00</p>
                  </div>
                </div>
                <SlArrowRight className='text-main text-2xl' />
              </div>
            </div>
            <p className='text-2xl font-bold'>Riwayat Jadwal</p>
            <div className='grid md:grid-cols-2 gap-4'>
              <div className='border-[2px] border-main p-4 rounded flex justify-between items-center'>
                <div>
                  <p className='text-xl font-bold max-w-[186px]'>
                    Weekend Fun Flow Danta Yoga
                  </p>
                  <div className='flex items-center gap-4 text-[#252525] mt-2'>
                    <MdAccessTime />
                    <p>09 September 2024, 09.00</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <DetailScheduleComponent
          isOpen={OpenDetailClass}
          setOpen={() => setOpenDetailClass(!OpenDetailClass)}
        />
      </WrapperComponent>
      <Footer />
    </>
  );
}
