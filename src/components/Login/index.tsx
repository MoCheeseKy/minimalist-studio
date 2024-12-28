import { useState } from 'react';
import { Input } from '@nextui-org/react';
import axios from 'axios';

import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa';

export default function LoginComponent() {
  const [IsVisible, setIsVisible] = useState(false);
  const toggleVisibility = () => setIsVisible(!IsVisible);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<String>('');

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    setIsLoading(true);
    setError('');

    const formData = new FormData(event.target);
    const phone_num = formData.get('phone_num');
    const password = formData.get('password');

    try {
      const response = await axios.post(`/api/user/login`, {
        phone_num: `+${phone_num}`,
        password,
      });

      console.log('Login berhasil:', response.data);
      // Di sini Anda bisa menangani respons sukses, misalnya:
      // - Menyimpan token autentikasi
      // - Mengubah state aplikasi
      // - Melakukan redirect ke halaman dashboard
    } catch (error: any) {
      console.log(error);
      if (error.response) {
        // Respons diterima tapi dengan status error
        setError(error.response.data.message || 'Terjadi kesalahan saat login');
      } else if (error.request) {
        // Tidak ada respons diterima
        setError('Tidak dapat terhubung ke server. Silakan coba lagi.');
      } else {
        // Kesalahan lainnya
        setError('Terjadi kesalahan. Silakan coba lagi.');
      }
      console.error('Error login:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className='w-creen h-screen flex'>
        <div className='flex-grow bg-black'></div>
        <form
          onSubmit={handleSubmit}
          className='w-full max-w-[464px] h-full p-16 flex flex-col justify-center items-center gap-12'
        >
          <div className='bg-logo bg-cover w-[184px] aspect-[2/1.5]' />
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
            {error && <p style={{ color: 'red' }}>{error}</p>}
          </div>
          <button
            type='submit'
            className='bg-[#9a4b2c] text-white border-2 border-[#9a4b2c] py-2 px-6 text-xl rounded w-full'
          >
            {isLoading ? 'Logging in...' : 'Login'}
          </button>
        </form>
      </div>
    </>
  );
}
