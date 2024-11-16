import Header from '../_shared/Header';
import WrapperComponent from '../_shared/Wrapper';

import { FiPlus, FiCalendar } from 'react-icons/fi';
import { RiFilePaper2Line, RiHistoryFill } from 'react-icons/ri';
import { TfiHeadphoneAlt } from 'react-icons/tfi';
import { IoIosKey } from 'react-icons/io';

export default function ProfileComponent() {
  return (
    <>
      <Header />
      <WrapperComponent>
        <div id='cls' className='h-[76px]' />
        <div className='w-full flex justify-center'>
          <div className='w-full max-w-[866px] min-h-[300px] mt-6 md:mt-12 p-6 rounded-md flex flex-col md:flex-row gap-6 md:gap-16 items-center md:items-start'>
            <div className='w-[144px] h-[144px] rounded-full border-4 border-main flex justify-center items-center font-bold text-8xl'>
              R
            </div>
            <div className='flex flex-grow flex-col gap-6'>
              <div>
                <p className='text-4xl font-bold'>Hello,</p>
                <p className='text-4xl font-bold mt-2 text-main'>
                  Rifky Muhammad Prayudhi
                </p>
                <p className='text-base text-main mt-2'>+6281210714320</p>
              </div>
              <div className='border-4 border-main p-6 rounded-xl flex flex-col md:flex-row justify-between md:items-center'>
                <div>
                  <p className='text-xl text-main font-semibold'>
                    Kuota Kelas :{' '}
                  </p>
                  <p className='text-[36px] text-main font-bold'>0 Pertemuan</p>
                </div>
                <button className='w-full md:w-fit h-fit flex gap-2 text-2xl text-white font-bold items-center justify-center py-2 px-6 mt-4 md:mt-0 rounded-[16px] bg-main'>
                  <FiPlus />
                  Top Up
                </button>
              </div>
              <div className='flex flex-col'>
                <div className='flex gap-4 items-center text-xl font-medium py-4 border-t-[1px] border-gray-300'>
                  <FiCalendar /> Jadwal Saya
                </div>
                <div className='flex gap-4 items-center text-xl font-medium py-4 border-t-[1px] border-gray-300'>
                  <RiHistoryFill /> Riwayat Kelas
                </div>
                <div className='flex gap-4 items-center text-xl font-medium py-4 border-t-[1px] border-gray-300'>
                  <RiFilePaper2Line /> Syarat & ketentuan
                </div>
                <div className='flex gap-4 items-center text-xl font-medium py-4 border-t-[1px] border-gray-300'>
                  <TfiHeadphoneAlt />
                  Pusat Bantuan
                </div>
                <div className='flex gap-4 items-center text-xl font-medium py-4 border-t-[1px] border-gray-300'>
                  <IoIosKey /> Ubah Kata Sandi
                </div>
                <div className='flex justify-end gap-4 items-center text-2xl font-bold py-6 border-t-[1px] border-gray-300 text-red-600'>
                  Keluar
                </div>
              </div>
            </div>
          </div>
        </div>
      </WrapperComponent>
    </>
  );
}
