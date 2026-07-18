import React from "react";
import {
  LogOutIcon,
  ShieldCheck,
} from "lucide-react";

function AdminNavbar() {
  return (
    <header className="sticky top-0 z-50 border-b-4 border-[#F3D4A6] bg-white/95 backdrop-blur-md shadow-sm">

      <div className="mx-auto flex h-16 max-w-[1600px] items-center justify-between px-3 sm:h-18 sm:px-5 lg:h-20 lg:px-8">

        {/* Left */}

        <div className="flex min-w-0 items-center gap-3">

          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#E39A2D] shadow-md sm:h-11 sm:w-11 lg:h-12 lg:w-12">

            <img
              src="https://static.vecteezy.com/system/resources/thumbnails/005/200/720/small_2x/induism-symbol-om-sign-icon-black-color-illustration-flat-style-simple-image-vector.jpg"
              alt="Om"
              className="h-6 w-6 rounded-full object-cover sm:h-7 sm:w-7"
            />

          </div>

          <div className="min-w-0">

            <h1 className="truncate font-gelasio text-base font-semibold text-[#43200C] sm:text-lg lg:text-2xl">

              Sri Narasimhaswami Temple Trust

            </h1>

            <p className="truncate text-[11px] font-medium text-[#C97A1B] sm:text-xs lg:text-sm">

              Receipt Printing System

            </p>

          </div>

        </div>

        {/* Right */}

        <div className="flex items-center gap-2 sm:gap-3 lg:gap-5">

          {/* Admin */}

          <div className="flex items-center gap-2 rounded-full border border-[#F1D5AF] bg-[#FFF8EF] px-3 py-2 sm:px-4">

            <div className="flex h-7 w-7 items-center justify-center rounded-full bg-green-100">

              <ShieldCheck
                size={15}
                className="text-green-600"
              />

            </div>

            <span className="hidden text-sm font-medium text-[#C46E16] sm:inline">

              Admin

            </span>

          </div>

          {/* Logout */}

          <button
            title="Logout"
            className="flex h-11 w-11 items-center justify-center rounded-full border border-[#F1D5AF] bg-[#FFF8EF] text-[#C46E16] transition-all duration-200 hover:bg-[#FFF2DF] hover:scale-105 active:scale-95"
          >

            <LogOutIcon size={20} />

          </button>

        </div>

      </div>

    </header>
  );
}

export default AdminNavbar;