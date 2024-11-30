import React, { useState } from 'react';
import dayjs from 'dayjs';
import { parseDate } from '@internationalized/date';

import { DatePicker, Select, SelectItem } from '@nextui-org/react';

import Header from '../_shared/Header';
import Footer from '../_shared/Footer';
import WrapperComponent from '../_shared/Wrapper';
import WhatsappFloat from '../_shared/WhatsappFloating';
import ClassCardComponent from './classCarrd';

import { FiSearch } from 'react-icons/fi';

export default function BookingClassComponent() {
  const [selectedDate, setSelectedDate] = useState(
    parseDate(dayjs().format('YYYY-MM-DD'))
  );
  const handleDateChange = (newDate: any) => {
    setSelectedDate(newDate);
  };
  const [SelectedOption, setSelectedOption] = useState(undefined);

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
            <ClassCardComponent />
            <ClassCardComponent />
            <ClassCardComponent />
            <ClassCardComponent />
            <ClassCardComponent />
            <ClassCardComponent />
            {/*  */}
          </div>
        </div>
      </WrapperComponent>
      <WhatsappFloat />
      <Footer />
    </>
  );
}
