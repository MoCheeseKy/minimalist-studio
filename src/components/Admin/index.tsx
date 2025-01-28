import { useState } from 'react';

import UserComponent from './user';
import ClassCategoryComponent from './class-category';
import ClassComponent from './class';
import StudioComponent from './studio';

import { FaRegUser } from 'react-icons/fa';
import { MdOutlineDashboard } from 'react-icons/md';

export default function AdminComponent() {
  const [AdminActivePage, setAdminActivePage] = useState('user');
  return (
    <>
      <div className='flex h-screen'>
        <aside className='w-[324px] max-w-[324px] h-full flex flex-col items-center shadow-md px-6 py-12 box-border'>
          <div className='w-[104px] h-[60px] bg-logo bg-cover mb-12' />
          <div className='flex w-full flex-col gap-6'>
            <div
              onClick={() => setAdminActivePage('user')}
              className={`flex items-center gap-4 ${
                AdminActivePage === 'user' && 'text-main'
              }`}
            >
              <FaRegUser className='text-xl' />
              <p className='text-xl font-bold'>Pengguna</p>
            </div>
            <div
              onClick={() => setAdminActivePage('class-category')}
              className={`flex items-center gap-4 ${
                AdminActivePage === 'class-category' && 'text-main'
              }`}
            >
              <MdOutlineDashboard className='text-xl' />
              <p className='text-xl font-bold'>Kategori Kelas</p>
            </div>
            <div
              onClick={() => setAdminActivePage('class')}
              className={`flex items-center gap-4 ${
                AdminActivePage === 'class' && 'text-main'
              }`}
            >
              <MdOutlineDashboard className='text-xl' />
              <p className='text-xl font-bold'>Kelas</p>
            </div>
            <div
              onClick={() => setAdminActivePage('studio')}
              className={`flex items-center gap-4 ${
                AdminActivePage === 'studio' && 'text-main'
              }`}
            >
              <MdOutlineDashboard className='text-xl' />
              <p className='text-xl font-bold'>Studio</p>
            </div>
          </div>
        </aside>
        <main className='flex-grow h-1 p-12'>
          {AdminActivePage === 'user' && <UserComponent />}
          {AdminActivePage === 'class-category' && <ClassCategoryComponent />}
          {AdminActivePage === 'class' && <ClassComponent />}
          {AdminActivePage === 'studio' && <StudioComponent />}
        </main>
      </div>
    </>
  );
}
