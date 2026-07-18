import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Loader() {
    const navigate = useNavigate();
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setProgress((prev) => {
                if (prev >= 100) {
                    clearInterval(interval);
                    navigate("/generate-receipt");
                    return 100;
                }

                return prev + 2;
            });
        }, 60);

        return () => clearInterval(interval);
    }, [navigate]);

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-gradient-to-br from-[#FFFDF8] via-[#FFF6EB] to-[#FDE8C6]">

            {/* Background Glow */}

            <div className="absolute h-96 w-96 rounded-full bg-[#F6C26A]/20 blur-3xl" />

            {/* Card */}

            <div className="relative w-[90%] max-w-md rounded-3xl border border-[#F1D5AF] bg-white/90 p-10 shadow-2xl backdrop-blur">

                {/* Logo */}

                <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-[#E39A2D] shadow-lg ring-8 ring-[#FFF4E4]">

                    <img
                        src="https://static.vecteezy.com/system/resources/thumbnails/005/200/720/small_2x/induism-symbol-om-sign-icon-black-color-illustration-flat-style-simple-image-vector.jpg"
                        alt="Temple Logo"
                        className="h-14 w-14 rounded-full object-cover"
                    />

                </div>

                {/* Title */}

                <h1 className="mt-8 text-center font-gelasio text-3xl font-bold text-[#43200C]">
                    Sri Narasimhaswami Temple
                </h1>

                <p className="mt-2 text-center text-sm text-[#B66B18]">
                    Receipt Printing & Management System
                </p>

                {/* Status */}

                <p className="mt-8 text-center text-sm font-medium text-[#6A4A2A]">
                    Preparing Workspace...
                </p>

                {/* Progress */}

                <div className="mt-4">

                    <div className="h-3 overflow-hidden rounded-full bg-[#F3D4A6]">

                        <div
                            className="h-full rounded-full bg-gradient-to-r from-[#D88718] to-[#F2B84A] transition-all duration-100 ease-linear"
                            style={{
                                width: `${progress}%`,
                            }}
                        />

                    </div>

                    <div className="mt-2 flex justify-between text-xs text-[#8D6A44]">

                        <span>Loading...</span>

                        <span>{progress}%</span>

                    </div>

                </div>

                {/* Footer */}

                <p className="mt-8 text-center text-xs text-[#B48A5B]">
                    TempleOS v1.0
                </p>

            </div>

        </div>
    );
}

export default Loader;
