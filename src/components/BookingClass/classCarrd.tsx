import { useState } from 'react';
import ClassPaymentConfirmationComponent from './classPaymentConfirmation';

import { FiUser } from 'react-icons/fi';
import {
  MdAccessTime,
  MdOutlinePlace,
  MdOutlinePeopleAlt,
} from 'react-icons/md';

export default function ClassCardComponent() {
  const [ConfirmPayment, setConfirmPayment] = useState<boolean>(false);
  return (
    <>
      <div className='border-2 border-main w-full h-fit p-6 rounded-md flex flex-col gap-2'>
        <div className='py-1 px-4 rounded-full border-[1px] border-main w-fit text-xs'>
          Muaythai
        </div>
        <div className='flex justify-between items-center'>
          <p className='text-lg font-bold max-w-[60%]'>
            Weekend Fun Flow Danta Yoga
          </p>
          <p className='bg-main text-white text-base py-1 px-6 rounded-2xl'>
            09.00
          </p>
        </div>
        <div className='flex items-center gap-4 text-base text-main font-semibold'>
          <MdAccessTime /> 1 Jam 30 Menit
        </div>
        <div className='flex items-center gap-4 text-base text-main font-semibold'>
          <FiUser /> Naufal Nabillansy
        </div>
        <div className='flex items-center gap-4 text-base text-main font-semibold'>
          <MdOutlinePeopleAlt /> 16 Orang
        </div>
        <div className='flex items-center gap-4 text-base text-main font-semibold'>
          <MdOutlinePlace /> Studio A-1030
        </div>
        <div className='flex justify-end gap-4 text-xs text-main font-semibold'>
          Sisa untuk 16 orang.
        </div>
        <button
          onClick={() => setConfirmPayment(!ConfirmPayment)}
          className='w-full bg-main text-white border-2 border-white py-2 px-6 mt-2 text-xl rounded flex gap-4 items-center justify-center'
        >
          Pilih
        </button>
      </div>
      <ClassPaymentConfirmationComponent
        isOpen={ConfirmPayment}
        setOpen={() => setConfirmPayment(!ConfirmPayment)}
      />
    </>
  );
}
