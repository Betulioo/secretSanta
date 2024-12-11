import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

const SecretSanta: React.FC = () => {
    return (
        <section className='relative bg-[#7C956F] w-full h-screen'>
            {/* red line*/}
            <div className='absolute bg-[#D22C31] w-full h-[10vh]'></div>

            {/* snow svg line*/}
<div className="absolute w-full h-screen overflow-hidden bg-transparent z-10">
  <div className="absolute w-2 h-2 bg-white rounded-full opacity-80 animate-snow" style={{ left: '10%', animationDelay: '0s' }}></div>
  <div className="absolute w-3 h-3 bg-white rounded-full opacity-80 animate-snow" style={{ left: '30%', animationDelay: '2s' }}></div>
                <div className="absolute w-2 h-2 bg-white rounded-full opacity-80 animate-snow" style={{ left: '50%', animationDelay: '1s' }}></div>
                  <div className="absolute w-2 h-2 bg-white rounded-full opacity-80 animate-snow" style={{ left: '60%', animationDelay: '0s' }}></div>
  <div className="absolute w-3 h-3 bg-white rounded-full opacity-80 animate-snow" style={{ left: '80%', animationDelay: '2s' }}></div>
  <div className="absolute w-2 h-2 bg-white rounded-full opacity-80 animate-snow" style={{ left: '90%', animationDelay: '1s' }}></div>
</div>

            {/*title */}
            <div className='relative pt-6 z-10'>
        <div className='relative z-10 rounded-full w-[150px] h-[150px] mx-auto'>
                <Image
                    src="/images/home/santa.png"
                    alt="Santa"
                    width={500}
                    height={500}
                    style={{ objectFit: 'cover' }}
                    className='rounded-full' />
        </div>
            <h1 className='text-center mt-4 text-5xl text-white font-navidad'>Secret <br />
               <span className='text-6xl'> Santa</span></h1>
            </div>

            {/* mountain img*/}
            <div className='absolute bottom-[25%] bg-home-mountain w-full h-[40vh]'></div>


            {/* buttons*/}
            <div className='absolute bottom-[33%] w-full  z-10'>
                <div className='flex flex-col gap-4 justify-center'>
                    <button className='bg-[#687E57] text-white px-4 py-2 rounded-lg w-1/2 mx-auto'><Link href={"/login"}>Iniciar sesión</Link></button>
                    <button className='bg-[#D22C31] text-white px-4 py-2 rounded-lg w-1/2 mx-auto'><Link href={"/register"}>Registrarse</Link>
                    </button>
                </div>
            </div>

            {/* white line*/}
            <div className='absolute bottom-0 bg-[#E9E9E9FF] w-full h-[40vh]'></div>

            {/* star img*/}
            <div className='absolute bottom-[55%] w-full h-[15vh] flex justify-center'>
                <Image
                    width={130}
                    height={80}
                    style={{ objectFit: 'cover' }}
                    alt='Star image'
                    src='/images/home/star.png'
                    className='' />
            </div>

            {/* threes img*/}
            <div className='absolute bottom-[10%] w-full h-[20vh] flex justify-center '>
                <Image
                    width={150}
                    height={100}
                    style={{ objectFit: 'cover' }}
                    alt='Threes image'
                    src='/images/home/tree.png'
                    className='' />
                <Image
                    width={150}
                    height={100}
                    style={{ objectFit: 'cover' }}
                    alt='Threes image'
                    src='/images/home/tree2.png'
                    className='' />
                 <Image
                    width={150}
                    height={100}
                    style={{ objectFit: 'cover' }}
                    alt='Threes image'
                    src='/images/home/tree2.png'
                    className='' />
                

            </div>

            {/* snow svg line*/}
  <div className="absolute bottom-[38%] left-0 w-full rotate-180">
    <svg viewBox="0 0 1440 320" className="w-full h-24">
      <path fill="#E9E9E9FF" d="M0,256L48,234.7C96,213,192,171,288,176C384,181,480,235,576,256C672,277,768,267,864,250.7C960,235,1056,213,1152,208C1248,203,1344,213,1392,218.7L1440,224L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"></path>
    </svg>
  </div>
            {/* gift img*/}
            <div className='absolute bottom-0 w-full h-[15vh] flex justify-center'>
                <Image
                    width={150}
                    height={100}
                    style={{ objectFit: 'cover' }}
                    alt='Gift image'
                    src='/images/home/gift.png'
                    className='' />
                                <Image
                    width={150}
                    height={100}
                    style={{ objectFit: 'cover' }}
                    alt='Gift image'
                    src='/images/home/gift2.png'
                    className='' />                <Image
                    width={150}
                    height={100}
                    style={{ objectFit: 'cover' }}
                    alt='Gift image'
                    src='/images/home/gift3.png'
                    className='' />
            </div>
            </section>
       
    );
};

export default SecretSanta;