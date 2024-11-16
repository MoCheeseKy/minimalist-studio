import { useState } from 'react';
import Link from 'next/link';

import WrapperComponent from '../Wrapper';

import { RiMenu3Fill, RiCloseLargeFill } from 'react-icons/ri';
import { FiPlus } from 'react-icons/fi';

export default function Header() {
  const [OpenNav, setOpenNav] = useState(false);
  const [IsLogin, setIsLogin] = useState(false);
  const LinkRoute = [
    { label: 'Tentang', href: '/about' },
    { label: 'Galeri', href: '/our-galery' },
    { label: 'Daftar Kelas', href: '/booking-class' },
    { label: 'Jadwal', href: '/schedule' },
    { label: 'Bantuan', href: '/help' },
  ];
  return (
    <WrapperComponent className='shadow-md fixed z-[999999] bg-white'>
      <header className='w-full py-2 flex justify-between items-center z-[999999] bg-white'>
        <div className='w-[200px]'>
          <Link href={'/'}>
            <div className='w-[104px] h-[60px] bg-logo bg-cover ' />
          </Link>
        </div>
        <nav className='hidden lg:flex gap-10 '>
          {LinkRoute?.map((index, keyIndex) => (
            <Link
              key={keyIndex}
              className='font-medium text-base text-[#9a4b2c]'
              href={index?.href}
            >
              {index?.label}
            </Link>
          ))}
        </nav>
        <div
          className={`w-[200px] hidden lg:flex ${
            IsLogin ? 'gap-6' : 'gap-3'
          } items-center justify-end`}
        >
          {IsLogin ? (
            <>
              <p className='text-xl text-main font-bold'>Rifky</p>
              <div className='w-12 h-12 bg-main rounded-full' />
            </>
          ) : (
            <>
              <button className='bg-white text-[#9a4b2c] border-2 border-[#9a4b2c] py-2 px-6 text-xs rounded'>
                Register
              </button>
              <button className='bg-[#9a4b2c] text-white border-2 border-[#9a4b2c] py-2 px-6 text-xs rounded'>
                Login
              </button>
            </>
          )}
        </div>
        {OpenNav ? (
          <>
            <RiCloseLargeFill
              onClick={() => setOpenNav(false)}
              className='lg:hidden text-4xl text-red-600 z-[999999]'
            />
          </>
        ) : (
          <>
            <RiMenu3Fill
              onClick={() => setOpenNav(true)}
              className='lg:hidden text-4xl text-main'
            />
          </>
        )}
      </header>
      {OpenNav && (
        <div className='flex flex-col justify-between items-center w-[100vw] h-[100vh] overflow-auto fixed top-0 left-0 z-[99] bg-white p-4 pb-12'>
          <div className='h-[76px]' />
          <div className='flex flex-col gap-8 items-center text-center'>
            <Link
              onClick={() => {
                setOpenNav(false);
              }}
              className='font-medium text-base text-[#9a4b2c] w-full'
              href={'/'}
            >
              Home
            </Link>
            {LinkRoute?.map((index, keyIndex) => (
              <Link
                onClick={() => {
                  setOpenNav(false);
                }}
                key={keyIndex}
                className='font-medium text-base text-[#9a4b2c] w-full'
                href={index?.href}
              >
                {index?.label}
              </Link>
            ))}
            <Link
              onClick={() => {
                setOpenNav(false);
              }}
              className='font-medium text-base text-[#9a4b2c] w-full'
              href={'/profile'}
            >
              Profile
            </Link>
          </div>
          {IsLogin ? (
            <>
              <div className='w-full md:w-[544px] border-4 border-main p-4 md:p-6 rounded-xl flex flex-col md:flex-row justify-between md:items-center'>
                <div>
                  <p className='text-base md:text-xl text-main font-semibold'>
                    Kuota Kelas :{' '}
                  </p>
                  <p className='text-[32px] md:text-[36px] text-main font-bold'>
                    0 Pertemuan
                  </p>
                </div>
                <button className='w-full md:w-fit h-fit flex gap-2 text-lg md:text-2xl text-white font-bold items-center justify-center py-2 px-6 mt-2 md:mt-0 rounded-[16px] bg-main'>
                  <FiPlus />
                  Top Up
                </button>
              </div>
            </>
          ) : (
            <>
              <div className='w-screen flex flex-col gap-3 '>
                <button className='bg-white text-[#9a4b2c] border-2 border-[#9a4b2c] py-2 px-6 text-xl rounded w-[calc(100%-32px)] ml-4'>
                  Register
                </button>
                <button className='bg-[#9a4b2c] text-white border-2 border-[#9a4b2c] py-2 px-6 text-xl rounded w-[calc(100%-32px)] ml-4'>
                  Login
                </button>
              </div>
            </>
          )}
        </div>
      )}
    </WrapperComponent>
  );
}
