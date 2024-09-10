"use client"
import React from 'react'
import Image from 'next/image'
import logo from "../assets/logo.jpeg"

const Header = () => {
  return (
    <header className='flex justify-start items-center bg-white shadow-md p-4'>
        <Image
          className="w-28 object-cover"
          src={logo}
          alt="Task Management App Logo"
        />
        <h1 className="text-2xl font-bold ml-4">Task Management App</h1>
    </header>
  )
}

export default Header