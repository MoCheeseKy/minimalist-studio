import { FiUser } from 'react-icons/fi';
import {
  MdAccessTime,
  MdOutlinePlace,
  MdOutlinePeopleAlt,
} from 'react-icons/md';

interface ClassPaymentConfirmationComponentProps {
  isOpen: boolean;
  setOpen: () => void;
}

const dummySK = [
  'Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem,nam.',
  'Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem,nam.',
  'Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem,nam.',
  'Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem,nam.',
  'Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem,nam.',
  'Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem,nam.',
  'Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem,nam.',
  'Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem,nam.',
  'Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem,nam.',
  'Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem,nam.',
];

export default function ClassPaymentConfirmationComponent({
  isOpen,
  setOpen,
}: ClassPaymentConfirmationComponentProps) {
  function onCancel() {
    setOpen();
  }
  function onSubmit() {
    console.log('Test');
  }
  return (
    isOpen && (
      <>
        <div className='w-screen h-fit fixed top-0 right-0 bg-white flex justify-center overflow-hidden '>
          <div className='max-w-[468px] flex flex-col gap-6 h-screen overflow-scroll pt-[calc(76px+24px)] pb-[calc(192px+24px)]'>
            <p className='text-2xl font-bold px-4'>Konfirmasi Pembayaran</p>
            <div className='flex flex-col px-4 gap-2'>
              <div className='py-1 px-4 rounded-full border-[1px] border-main w-fit text-xs'>
                Muaythai
              </div>
              <div className='flex justify-between items-center'>
                <p className='text-xl font-bold max-w-[60%]'>
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
              <p>
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Natus
                qui non mollitia officia autem id porro facere necessitatibus
                deserunt sed.
              </p>
            </div>
            <div className='flex flex-col px-4 gap-2 '>
              <p className='text-xl font-bold'>Syarat & Ketentuan</p>
              <div className='flex flex-col'>
                {dummySK?.map((text, indexText) => (
                  <div key={indexText} className='flex gap-2'>
                    <div className='min-w-[28px] max-w-[28px]'>
                      {indexText + 1}.
                    </div>
                    <div>{text}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className='w-full p-4 bg-main flex flex-col gap-2 fixed bottom-0 right-0 z-[9999999999]'>
              <div className='flex justify-between text-white'>
                <p className='text-base font-bold'>Kuota Saya</p>
                <p className='text-base'>10 Kuota</p>
              </div>
              <div className='flex justify-between text-white'>
                <p className='text-base font-bold'>Pemakaian Kuota</p>
                <p className='text-base'>1 Kuota</p>
              </div>
              <hr />
              <div className='flex justify-between text-white'>
                <p className='text-base font-bold'>Sisa Kuota</p>
                <p className='text-base'>10 Kuota</p>
              </div>
              <div className='flex gap-4 mt-2'>
                <button
                  onClick={onCancel}
                  className='w-full bg-white text-main border-2 border-white py-2 text-xl rounded flex gap-4 items-center justify-center'
                >
                  Cancel
                </button>
                <button
                  onClick={onSubmit}
                  className='w-full bg-main text-white border-2 border-white py-2 text-xl rounded flex gap-4 items-center justify-center'
                >
                  Bayar
                </button>
              </div>
            </div>
          </div>
        </div>
      </>
    )
  );
}
