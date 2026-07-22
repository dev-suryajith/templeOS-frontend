import React, { useState } from "react";
import { CircleUserRound } from "lucide-react";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {

    localStorage.removeItem('token')
    localStorage.removeItem('user')
    navigate('/login')
  }

  return (
    <header className="sticky top-0 z-50 border-b-4 border-[#F3D4A6] bg-white shadow-sm">
      <div className="mx-auto flex h-18 md:h-20 max-w-[1600px] items-center justify-between px-4 sm:px-6 lg:px-8">

        {/* Left */}
        <div className="flex min-w-0 items-center gap-3 md:gap-4">

          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#E39A2D] shadow-md md:h-12 md:w-12">
            <img
              className="h-6 w-6 object-contain md:h-7 md:w-7"
              src="https://static.vecteezy.com/system/resources/thumbnails/005/200/720/small_2x/induism-symbol-om-sign-icon-black-color-illustration-flat-style-simple-image-vector.jpg"
              alt="Om"
            />
          </div>

          <div className="min-w-0">

            <h1 className="truncate font-gelasio text-lg font-semibold text-[#43200C] sm:text-xl lg:text-2xl">
              Sri Narasimhaswami Temple Trust
            </h1>

            <p className="truncate text-xs font-medium text-[#C97A1B] sm:text-sm">
              Receipt Printing System
            </p>

          </div>

        </div>

        {/* Right */}
        <div className="flex items-center gap-3 md:gap-5">

          {/* Printer Status */}
          <div className="hidden sm:flex items-center gap-3 rounded-full border border-[#F1D5AF] bg-[#FFF8EF] px-4 py-2.5 md:px-5 md:py-3">

            <div className="h-2.5 w-2.5 rounded-full bg-green-500" />

            <span className="text-sm font-medium text-[#C46E16] md:text-base">
              Printer Online
            </span>

          </div>

          {/* User */}
          <div className="relative">

            <button
              onClick={() => setShowProfileMenu((prev) => !prev)}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-[#F1D5AF] bg-[#FFF8EF] text-[#C46E16] transition hover:bg-[#FFF2DF] md:h-12 md:w-12"
            >
              <CircleUserRound
                size={20}
                className="md:h-5.5 md:w-5.5"
              />
            </button>

            {showProfileMenu && (
              <div className="absolute right-0 mt-3 w-56 overflow-hidden rounded-2xl border border-[#D8BE93] bg-[#FFFDF8] shadow-xl sm:w-64">

                <button
                  onClick={() => {
                    setShowProfileMenu(false);
                    navigate("/admin");
                  }}
                  className="w-full px-5 py-4 text-left text-[#4A2108] transition hover:bg-[#FFF3E3]"
                >
                  Admin Dashboard
                </button>

                <div className="border-t border-[#EEDBC1]" />

                <button onClick={handleLogout} className="w-full px-5 py-4 text-left text-red-600 transition hover:bg-red-50">
                  Logout
                </button>

              </div>
            )}

          </div>

        </div>

      </div>
    </header>
  );
}

export default Navbar;