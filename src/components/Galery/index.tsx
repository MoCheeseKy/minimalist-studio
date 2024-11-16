import Header from '../_shared/Header';
import Footer from '../_shared/Footer';
import WrapperComponent from '../_shared/Wrapper';
import WhatsappFloat from '../_shared/WhatsappFloating';

export default function GaleryComponent() {
  return (
    <>
      <Header />
      <WrapperComponent className='md:pb-24 pb-16'>
        <div id='cls' className='h-[76px]' />
        <div className='mt-16 flex flex-col gap-12'>
          <p className='text-4xl text-main font-bold text-center'>
            Galeri Kita
          </p>
          <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-6'>
            <div className='w-full aspect-video rounded-xl bg-black'></div>
            <div className='w-full aspect-video rounded-xl bg-black'></div>
            <div className='w-full aspect-video rounded-xl bg-black'></div>
            <div className='w-full aspect-video rounded-xl bg-black'></div>
            <div className='w-full aspect-video rounded-xl bg-black'></div>
            <div className='w-full aspect-video rounded-xl bg-black'></div>
            <div className='w-full aspect-video rounded-xl bg-black'></div>
            <div className='w-full aspect-video rounded-xl bg-black'></div>
            <div className='w-full aspect-video rounded-xl bg-black'></div>
            <div className='w-full aspect-video rounded-xl bg-black'></div>
            <div className='w-full aspect-video rounded-xl bg-black'></div>
            <div className='w-full aspect-video rounded-xl bg-black'></div>
          </div>
        </div>
      </WrapperComponent>
      <WhatsappFloat />
      <Footer />
    </>
  );
}
