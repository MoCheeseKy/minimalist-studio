import { useState } from 'react';
import { Input, Radio, DatePicker } from '@nextui-org/react';
import { RadioGroup } from '@nextui-org/react';
import axios from 'axios';
import dayjs from 'dayjs';

import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa';

export default function RegisterComponent() {
  const [IsVisible, setIsVisible] = useState(false);
  const toggleVisibility = () => setIsVisible(!IsVisible);

  const [SelectedGender, setSelectedGender] = useState('pria');
  const [SelectedDate, setSelectedDate] = useState(null);
  const handleDateChange = (newDate: any) => {
    setSelectedDate(newDate);
  };

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<String>('');

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    setIsLoading(true);
    setError('');

    const formData = new FormData(event.target);
    const phone_num = formData.get('phone_num');
    const fullname = formData.get('fullname');
    const password = formData.get('password');
    const repeat_password = formData.get('repeat_password');
    const email = formData.get('email');
    const instagram = formData.get('instagram');

    try {
      const response = await axios.post(`/api/user/register/`, {
        phone_num: `+${phone_num}`,
        fullname,
        birth_date: dayjs(SelectedDate)?.format('YYYY-MM-DD'),
        gender: SelectedGender,
        email,
        password,
        repeat_password,
        instagram,
      });

      console.log('Register berhasil:', response.data);
      // Di sini Anda bisa menangani respons sukses, misalnya:
      // - Menyimpan token autentikasi
      // - Mengubah state aplikasi
      // - Melakukan redirect ke halaman dashboard
    } catch (error: any) {
      if (error.response) {
        // Respons diterima tapi dengan status error
        setError(
          error.response.data.message || 'Terjadi kesalahan saat register'
        );
      } else if (error.request) {
        // Tidak ada respons diterima
        setError('Tidak dapat terhubung ke server. Silakan coba lagi.');
      } else {
        // Kesalahan lainnya
        setError('Terjadi kesalahan. Silakan coba lagi.');
      }
      console.error('Error Register:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className='w-creen h-fit md:h-screen md:min-h-screen md:max-h-screen flex'>
        <div className='flex-grow bg-black'></div>
        <form
          onSubmit={handleSubmit}
          className='w-full max-w-[464px] h-full p-16 flex flex-col justify-center items-center gap-6'
        >
          <p className='font-bold text-2xl'>Register</p>
          <div className='flex flex-col gap-2 w-full'>
            <Input
              defaultValue=''
              variant='underlined'
              name='phone_num'
              label='Nomor Telepon'
              placeholder='Masukkan nomor telepon'
              type='tel'
              isRequired
              minLength={10}
              errorMessage='Masukan nomor telefon minimal 10 nomor'
              pattern='[0-9]*'
              inputMode='numeric'
            />
            <Input
              defaultValue=''
              variant='underlined'
              name='fullname'
              label='Nama Lengkap'
              placeholder='Masukkan nama lengkap'
              isRequired
              errorMessage='Field ini wajib diisi.'
            />
            <RadioGroup
              name='gender'
              label='Jenis Kelamin'
              value={SelectedGender}
              onValueChange={setSelectedGender}
              orientation='horizontal'
            >
              <Radio value='PRIA'>Pria</Radio>
              <Radio value='WANITA'>Wanita</Radio>
            </RadioGroup>
            <DatePicker
              variant='underlined'
              label='Tanggal Lahir'
              name='birth_day'
              value={SelectedDate}
              onChange={handleDateChange}
            />
            <Input
              defaultValue=''
              variant='underlined'
              name='email'
              label='Email'
              placeholder='Masukkan email'
              isRequired
              type='email'
              errorMessage='Field ini wajib diisi.'
            />
            <Input
              defaultValue=''
              variant='underlined'
              name='instagram'
              label='Instagram'
              placeholder='Masukkan username instagram'
              isRequired
              errorMessage='Field ini wajib diisi.'
            />
            <Input
              defaultValue=''
              variant='underlined'
              name='password'
              label='Password'
              placeholder='Masukkan password'
              type={IsVisible ? 'text' : 'password'}
              isRequired
              errorMessage='Password wajib di isi'
              endContent={
                <button
                  className='focus:outline-none'
                  type='button'
                  onClick={toggleVisibility}
                  aria-label='toggle password visibility'
                >
                  {IsVisible ? (
                    <FaRegEyeSlash className='text-2xl text-default-400 pointer-events-none' />
                  ) : (
                    <FaRegEye className='text-2xl text-default-400 pointer-events-none' />
                  )}
                </button>
              }
            />
            <Input
              defaultValue=''
              variant='underlined'
              name='repeat_password'
              label='Ulangi Password'
              placeholder='Masukkan ulang password'
              type={IsVisible ? 'text' : 'password'}
              isRequired
              errorMessage='Field ini wajib diisi'
              endContent={
                <button
                  className='focus:outline-none'
                  type='button'
                  onClick={toggleVisibility}
                  aria-label='toggle password visibility'
                >
                  {IsVisible ? (
                    <FaRegEyeSlash className='text-2xl text-default-400 pointer-events-none' />
                  ) : (
                    <FaRegEye className='text-2xl text-default-400 pointer-events-none' />
                  )}
                </button>
              }
            />
            {error && <p style={{ color: 'red' }}>{error}</p>}
          </div>
          <button
            type='submit'
            className='bg-[#9a4b2c] text-white border-2 border-[#9a4b2c] py-2 px-6 text-xl rounded w-full'
          >
            {isLoading ? 'Loading....' : 'Register'}
          </button>
        </form>
      </div>
    </>
  );
}
