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
        <div className="fixed inset-0 flex items-center justify-center bg-[#FFF9F2]">

            <div className="text-center">

                <div className="mx-auto flex h-28 w-28 animate-pulse items-center justify-center rounded-full bg-[#E39A2D] shadow-2xl">

                    <img
                        src="https://static.vecteezy.com/system/resources/thumbnails/005/200/720/small_2x/induism-symbol-om-sign-icon-black-color-illustration-flat-style-simple-image-vector.jpg"
                        className="h-16 w-16 rounded-full"
                        alt=""
                    />

                </div>

                <h1 className="mt-8 font-gelasio text-3xl font-bold text-[#43200C]">
                    TempleOS
                </h1>

                <p className="mt-2 text-[#C97A1B]">
                    Loading...
                </p>

            </div>

        </div>
    );
}

export default Loader
