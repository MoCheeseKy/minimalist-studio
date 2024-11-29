import React, { useState } from 'react';
import dayjs from 'dayjs';
import { parseDate } from '@internationalized/date';

import { DatePicker, Select, SelectItem } from '@nextui-org/react';

import Header from '../_shared/Header';
import Footer from '../_shared/Footer';
import WrapperComponent from '../_shared/Wrapper';
import WhatsappFloat from '../_shared/WhatsappFloating';

import { FiSearch, FiUser } from 'react-icons/fi';
import {
  MdAccessTime,
  MdOutlinePlace,
  MdOutlinePeopleAlt,
} from 'react-icons/md';

export default function BookingClassComponent() {
  const [selectedDate, setSelectedDate] = useState(
    parseDate(dayjs().format('YYYY-MM-DD'))
  );
  const handleDateChange = (newDate: any) => {
    setSelectedDate(newDate);
  };
  const [SelectedOption, setSelectedOption] = useState(undefined);

  const ClassCard = () => {
    return (
      <div className='border-2 border-main w-full h-fit p-6 rounded-md flex flex-col gap-2'>
        <div className='py-1 px-4 rounded-full border-[1px] border-main w-fit text-xs'>
          Muaythai
        </div>
        <div className='flex justify-between items-center'>
          <p className='text-lg font-bold max-w-[60%]'>
            Weekend Fun Flow Danta Yoga
          </p>
          <p className='bg-main text-white text-base py-2 px-8 rounded-2xl'>
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
        <div className='flex justify-end gap-4 text-base text-main font-semibold'>
          Sisa untuk 16 orang.
        </div>
        <button className='w-full bg-main text-white border-2 border-white py-2 px-6 mt-2 text-xl rounded flex gap-4 items-center justify-center'>
          Pilih
        </button>
      </div>
    );
  };

  return (
    <>
      <Header />
      <WrapperComponent className='md:pb-24 pb-16'>
        <div id='cls' className='h-[76px]' />
        <div className='flex flex-col md:flex-row gap-12 mt-12'>
          <div className='flex flex-col gap-6 w-full md:max-w-[268px] h-fit bg-main text-white rounded-md p-6'>
            <div>
              <div className='text-base mb-2'>Pilih Tanggal :</div>
              <DatePicker
                classNames={{
                  input: 'text-2xl',
                }}
                defaultValue={selectedDate}
                value={selectedDate}
                onChange={handleDateChange}
              />
            </div>
            <div>
              <div className='text-base mb-2'>Pilih Kategori :</div>
              <Select
                defaultSelectedKeys={SelectedOption}
                onChange={(e: any) => setSelectedOption(e.target.value)}
                placeholder='Pilih opsi'
              >
                <SelectItem key='option1' value='yoga-matras'>
                  Yoga Matras
                </SelectItem>
                <SelectItem key='option2' value='yoga-aerial'>
                  Yoga Aerial
                </SelectItem>
                <SelectItem key='option3' value='trx'>
                  TRX
                </SelectItem>
                <SelectItem key='option4' value='muaythai'>
                  Muaythai
                </SelectItem>
              </Select>
            </div>
            <div>
              <button className='w-full bg-main text-white border-2 border-white py-2 px-6 mt-2 text-base rounded flex gap-2 items-center justify-center'>
                <FiSearch /> Cari Kelas
              </button>
            </div>
          </div>
          <div className='flex-grow grid md:grid-cols-2 gap-6'>
            {/*  */}
            <ClassCard />
            <ClassCard />
            <ClassCard />
            <ClassCard />
            <ClassCard />
            <ClassCard />
            {/*  */}
          </div>
        </div>
      </WrapperComponent>
      <WhatsappFloat />
      <Footer />
    </>
  );
}
