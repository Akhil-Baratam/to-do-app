
"use client"
import React from 'react'
import Image from 'next/image'
import logo from "../assets/logo.jpeg"

const Header = () => {
  return (
    <div className=' flex justify-start items-start bg-white'>
        <Image
          className=" w-28 my-2 mx-4 object-cover"
          src={logo}
          alt="Header"
        />
    </div>
  )
}

export default Header