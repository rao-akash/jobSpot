import React, { useState } from 'react'
import { Button } from './ui/button'
import { Search } from 'lucide-react'
import { useDispatch } from 'react-redux';
import { setSearchedQuery } from '@/redux/jobSlice';
import { useNavigate } from 'react-router-dom';

const HeroSection = () => {
    const [query, setQuery] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const searchJobHandler = () => {
        dispatch(setSearchedQuery(query));
        navigate(`/browse?search=${encodeURIComponent(query)}`);
    }

    return (
        <div className="relative w-full h-screen">
        <img src="one.png" alt="Hero Background" className="w-full h-full object-contain" style={{ objectPosition: 'center top' }}/>
        <div className="absolute top-0 left-0 right-0 bottom-12 bg-opacity-50 flex items-center justify-center">
        <div className='text-center'>
            <div className='flex flex-col gap-5 my-10'>
                <span className='mx-auto px-4 py-2 rounded-full bg-gray-100 text-[#F83002] font-medium'>No. 1 Job Hunt Website</span>
                <h1 className='text-5xl text-[#FFFFFF] font-bold'>Search, Apply & <br /> Get Your <span className='text-[#6A38C2]'>Dream Jobs</span></h1>
                <p className='text-[#FFFFFF]'>Where careers ignite, and your future blazes brighter than ever!</p>
                <div className='flex w-[100%] shadow-lg border border-gray-200 pl-3 rounded-full items-center gap-4 mx-auto'>
                    <input 
                        type="text"
                        placeholder='Find your dream jobs'
                        onChange={(e) => setQuery(e.target.value)}
                        className='outline-none border-none flex-grow bg-transparent text-white'

                    />
                    <Button onClick={searchJobHandler} className="rounded-r-full bg-[#6A38C2] transition-all duration-300 ease-in-out hover:bg-[#C6A9F2] hover:shadow-lg">
                        <Search className='h-5 w-5' />
                    </Button>
                </div>
            </div>
        </div>
        </div>
        </div>
    )
}

export default HeroSection