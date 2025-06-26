import React from 'react'

const Navbar = () => {
    return (
        <div className='bg-blue-600 flex flex-wrap justify-between text-white items-center h-12 w-full'>

            <div>
                <span className='px-8 hover:font-bold text-8 cursor-pointer transition-all duration-100'>iTask</span>
            </div>

            <ul className='flex flex-wrap justify-between text-white items-center '>
                <li className='px-8 hover:font-bold text-8 cursor-pointer transition-all duration-100'>Home</li>
                <li className='px-8 hover:font-bold text-8 cursor-pointer transition-all duration-100'>Your Tast</li>
            </ul>


        </div>
    ) 
}

export default Navbar
