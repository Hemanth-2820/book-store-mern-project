import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { HiOutlineBars3CenterLeft } from "react-icons/hi2";
import { BsSearchHeart } from "react-icons/bs";
import { FaUser } from "react-icons/fa";
import { PiHeartStraightBold } from "react-icons/pi";
import { FaShoppingCart } from "react-icons/fa";

import avatarImg from '../assets/avatar.png'
import { useSelector } from 'react-redux';
import { legacy_createStore } from '@reduxjs/toolkit';
import { useAuth } from '../context/AuthContext';




const navigation = [
    {
        name: "Dashboard", href:"/dashboard"
    },
    {
        name: "Orders", href:"/orders"
    },
    {
        name: "Cart Page", href:"/cart"
    },
    {
        name: "Check Out", href:"/checkout"
    }
]



const Navbar = () => {
    
    const [isDropdownOpen, setIsDropdownOpen] = useState(false)
    const cartItems = useSelector(state => state.cart.cartItems)
   
    console.log(isDropdownOpen)

    const {currentUser, logout} = useAuth()

    const handleLogOut = () =>{
      logout()
    }
    
  return (
    <header className="max-w-screen-2xl mx-auto px-4 py-6">
      <nav className="flex justify-between items-center">
        {/* left side */}
        <div className="flex items-center md:gap-16 gap-4">
          <Link to="/">
            <HiOutlineBars3CenterLeft className="size-6" />
          </Link>

          {/* search input */}
          <div className="relative sm:w-72 w-40 space-x-2">
            <BsSearchHeart className="absolute inline-block left-3 inset-y-2" />
            <input
              type="text"
              placeholder="Search here"
              className="bg-[#EAEAEA] w-full py-1 md:px-8 px-6 rounded-md focus:outline-none"
            />
          </div>
        </div>

        {/* right side */}
        <div className='relative flex items-center md:space-x-3 space-x-2'>
            <div>
                {
                    currentUser ? <>
                    <button onClick={()=>setIsDropdownOpen(!isDropdownOpen)}>
                        <img src={avatarImg} alt="" className={`size-7 rounded-full ${currentUser ? 'ring-2 ring-blue-500' : ''}`}/>
                    </button>
                    {/* show dropdowns */}
                    {
                        isDropdownOpen && (
                            <div className='absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-md z-40'>
                                <ul className='py-2'>
                                    {
                                        navigation.map((item, index)=>(
                                            <li key={index} onClick={()=>setIsDropdownOpen(false)} className='text-sm font-semibold text-gray-500 hover:text-primary '>
                                                <Link to={item.href} className='block px-4 py-2 text-sm hover:bg-gray-500'>{item.name}</Link>
                                            </li>
                                        ))
                                    }
                                    <li>
                                      <button
                                      onClick={handleLogOut} className='block w-full text-left px-4 py-2 text-sm hover:bg-gray-500'>Logout</button>
                                    </li>
                                </ul>
                            </div>
                        )
                    }
                    </> : <Link to="/login"><FaUser className="size-6" /></Link> 
                }
            </div>
          
          <button className="hidden sm:block">
            <PiHeartStraightBold className="size-6" />
          </button>
          <Link to="/cart" className='bg-primary sm:px-6 px-2 flex items-center rounded-sm'>
            <FaShoppingCart className='size-6'/>
            {
              cartItems.length > 0 ? <span className='text-sm font-semibold sm:ml-1'>{cartItems.length}</span>
              : <span className='text-sm font-semibold sm:ml-1'>0</span>


            }

          </Link>
        </div>
      </nav>
    </header>
  );
}

export default Navbar
