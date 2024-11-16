import WrapperComponent from '../Wrapper';
import { FaWhatsapp } from 'react-icons/fa';

export default function WhatsappFloat() {
  return (
    <WrapperComponent className='fixed z-[999] bottom-16 md:bottom-24'>
      <div className='w-full flex justify-end pr-4 md:pr-6'>
        <a target='_blank' href='https://wa.me/+6281210714320'>
          <div className='w-12 h-12 bg-[#41c25d] rounded-full flex justify-center items-center text-3xl text-white'>
            <FaWhatsapp />
          </div>
        </a>
      </div>
    </WrapperComponent>
  );
}
