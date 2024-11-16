import Link from 'next/link';

import Header from '../_shared/Header';
import Footer from '../_shared/Footer';
import WrapperComponent from '../_shared/Wrapper';
import WhatsappFloat from '../_shared/WhatsappFloating';

import { FaArrowRightLong } from 'react-icons/fa6';

export default function HomeComponent() {
  return (
    <>
      <Header />
      <WrapperComponent className='md:pb-24 pb-16'>
        <div id='cls' className='h-[76px]' />
        <div className='bg-black w-full aspect-[160/60] mt-6 rounded-xl' />
        <div className='py-16 text-center flex flex-col items-center'>
          <p className='text-4xl text-main font-bold mb-4'>Minimalist Studio</p>
          <p className='text-sm md:text-base max-w-[90%] font-medium '>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Natus,
            possimus nesciunt, sint explicabo minus repellendus est repudiandae
            asperiores impedit tempora numquam ad ipsa, corporis excepturi
          </p>
        </div>
        <div className='flex flex-col gap-12'>
          <div>
            <div className='flex justify-between items-center'>
              <p className='text-main text-2xl font-bold'>Fasilitas</p>
              <Link
                className='flex gap-4 items-center text-blue-500'
                href={'/our-galery'}
              >
                Lihat Selengkapnya
                <FaArrowRightLong />
              </Link>
            </div>
            <div className='grid md:grid-cols-3 gap-6 mt-6'>
              <div className='w-full aspect-[16/9] rounded-xl bg-black' />
              <div className='w-full aspect-[16/9] rounded-xl bg-black' />
              <div className='w-full aspect-[16/9] rounded-xl bg-black' />
            </div>
          </div>
          <div>
            <div className='flex justify-between items-center'>
              <p className='text-main text-2xl font-bold'>Kegiatan</p>
              <Link
                className='flex gap-4 items-center text-blue-500'
                href={'/our-galery'}
              >
                Lihat Selengkapnya
                <FaArrowRightLong />
              </Link>
            </div>
            <div className='grid md:grid-cols-3 gap-6 mt-6'>
              <div className='w-full aspect-[16/9] rounded-xl bg-black' />
              <div className='w-full aspect-[16/9] rounded-xl bg-black' />
              <div className='w-full aspect-[16/9] rounded-xl bg-black' />
            </div>
          </div>
          <div>
            <div className='flex justify-between items-center'>
              <p className='text-main text-2xl font-bold'>Trainer</p>
              <Link
                className='flex gap-4 items-center text-blue-500'
                href={'/our-galery'}
              >
                Lihat Selengkapnya
                <FaArrowRightLong />
              </Link>
            </div>
            <div className='grid md:grid-cols-3 gap-6 mt-6'>
              <div className='w-full aspect-[16/9] rounded-xl bg-black' />
              <div className='w-full aspect-[16/9] rounded-xl bg-black' />
              <div className='w-full aspect-[16/9] rounded-xl bg-black' />
            </div>
          </div>
          {/* <div className='w-full aspect-square'>
            <iframe
              src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3973.8707570647825!2d105.3190171758568!3d-5.12451775186926!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e40bf0d7bd404a3%3A0x146e2a44fc039785!2sMinimalist%20Studio%20Metro!5e0!3m2!1sid!2sid!4v1731687727321!5m2!1sid!2sid'
              width='100%'
              height='100%'
              allowfullscreen=''
              loading='lazy'
              referrerpolicy='no-referrer-when-downgrade'
            ></iframe>
          </div> */}
        </div>
      </WrapperComponent>
      <WhatsappFloat />
      <Footer />
    </>
  );
}
