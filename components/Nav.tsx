import React, { useState } from 'react'

const Nav = () => {
  const [toggleMenu, setToggleMenu] = useState(true)
  
//   const handleLogout = () => {
//     logout();
//   };


  const items = [
    {name: "Login", href: "/login"},
    {name: "Signup", href: "/signup"},
  ]

  return (
    <div className='flex justify-between px-8 py-3 border-b'>
        <a href="/"><h1 className='text-emerald-800 sm:text-3xl text-2xl font-medium fontfam'>Sadiq Pishing Website</h1></a>
        <div className='flex'>
            <button className='bg-emerald-500 hover:bg-emerald-700 mx-2 text-white px-4 py-2 rounded'><a href="/login">Login</a></button>
            <button className='border-emerald-700 text-black hover:bg-emerald-700 border-2 hover:text-white px-4 py-2 rounded'><a href="/signup">Sign Up</a></button>
        </div>
    </div>
  )
}

export default Nav