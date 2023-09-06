import React from 'react'
import { Link } from 'react-router-dom';

import bgImg from '../assets/HeroMain.png'



const Hero = () => {
    return (
        <div name='home' className='w-full h-screen bg-teal-50 flex flex-col justify-between'>
            <div className='grid md:grid-cols-2 max-w-[1240px] m-auto'>
                <div className='flex flex-col justify-center md:items-start w-full px-2 py-8'>
                    <h1 className='py-3 text-5xl md:text-7xl text-teal-950 font-bold'>Welcome to VoxPeti.</h1>
                    <p className='text-2xl text-teal-950'>Sign for change, where your voice matters!</p>
                    <button className='py-3 px-6 sm:w-[60%] my-4'><Link to="/StartPetition" className='block text-center'>Start Petition</Link>
                    </button>
                </div>
                    <div>
                        <img className='w-full' src={bgImg} alt="/" />
                    </div>
            </div>
        </div>
    )
}

export default Hero