import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

function Loader() {
    const navigate=useNavigate()

    useEffect(()=>{
        setTimeout(()=>{
            navigate('/generate-receipt')
        },5000)
    })
    return (
        <div className="fixed inset-0 flex flex-col items-center justify-center bg-[#FFF9F2]">

      <img
        src="https://static.vecteezy.com/system/resources/thumbnails/005/200/720/small_2x/induism-symbol-om-sign-icon-black-color-illustration-flat-style-simple-image-vector.jpg"
        className="mb-6 h-20 w-20 rounded-full"
        alt=""
      />

      <h1 className="font-gelasio text-3xl font-bold text-[#43200C]">
        Sri Narasimhaswami Temple
      </h1>

      <p className="mt-2 text-[#B66B18]">
        Preparing Workspace...
      </p>

      <div className="mt-8 h-2 w-64 overflow-hidden rounded-full bg-[#F3D4A6]">

        <div className="h-full w-1/3 animate-pulse rounded-full bg-[#D88718]" />

      </div>

    </div>
    );
}

export default Loader
