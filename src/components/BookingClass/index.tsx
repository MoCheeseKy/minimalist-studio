import React, { useState, useEffect } from 'react';
import axios from 'axios';
import dayjs from 'dayjs';
import { parseDate } from '@internationalized/date';

import { DatePicker, Select, SelectItem } from '@nextui-org/react';

import Header from '../_shared/Header';
import Footer from '../_shared/Footer';
import WrapperComponent from '../_shared/Wrapper';
import ClassCardComponent from './classCarrd';

import { FiSearch } from 'react-icons/fi';

export default function BookingClassComponent() {
  const [selectedDate, setSelectedDate] = useState(
    parseDate(dayjs().format('YYYY-MM-DD'))
  );
  const handleDateChange = (newDate: any) => {
    setSelectedDate(newDate);
  };
  const [SelectedOption, setSelectedOption] = useState('Semua');
  useEffect(() => {
    axios
      .get(`/api/class?date=${selectedDate}&category_id=${SelectedOption}`)
      .then((ress) => {
        console.log(ress);
      });
  }, [selectedDate, SelectedOption]);
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
                <SelectItem key='Semua' value='Semua'>
                  Semua
                </SelectItem>
                <SelectItem key='yoga-matras' value='yoga-matras'>
                  Yoga Matras
                </SelectItem>
                <SelectItem key='yoga-aerial' value='yoga-aerial'>
                  Yoga Aerial
                </SelectItem>
                <SelectItem key='trx' value='trx'>
                  TRX
                </SelectItem>
                <SelectItem key='muaythai' value='muaythai'>
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
      <Footer />
    </>
  );
}
