import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { userLoginAPI } from "../../services/allAPI";

function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [loginFlag, setLoginFlag] = useState("");

  const handleSubmit = async () => {
    setLoginFlag("");

    if (!formData.email || !formData.password) {
      setLoginFlag("Fill all credentials");
      return;
    }

    try {
      const result = await userLoginAPI(formData);

      if (result.status === 200) {
        localStorage.setItem("token", result.data.token);
        localStorage.setItem(
          "user",
          JSON.stringify(result.data.user)
        );

        navigate("/generate-receipt");
      }
    } catch (error) {
      console.log(error);

      if (error.response) {
        setLoginFlag(error.response.data || "Login Failed");
      } else {
        setLoginFlag("Server Error");
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8">
        {/* Logo */}
        <div className="flex flex-col items-center mb-8">
          <div className="w-20 h-20 rounded-full bg-orange-100 flex items-center justify-center shadow-md">
            <img
              className="w-14 h-14 object-contain"
              src="https://static.vecteezy.com/system/resources/thumbnails/005/200/720/small_2x/induism-symbol-om-sign-icon-black-color-illustration-flat-style-simple-image-vector.jpg"
              alt="Om"
            />
          </div>

          <h1
            style={{ fontFamily: "Gelasio" }}
            className="mt-4 text-2xl font-bold text-[#7d1f1d] text-center"
          >
            SRI NARASIMHASWAMI
          </h1>

          <p
            style={{ fontFamily: "Gelasio" }}
            className="text-[#b85e5d] text-sm mt-1"
          >
            Temple Management System
          </p>
        </div>

        <form className="space-y-5">
          {/* Email */}
          <div className="relative">
            <input
              type="email"
              id="email"
              placeholder=" "
              value={formData.email}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  email: e.target.value,
                })
              }
              className="peer w-full rounded-xl border border-gray-300 px-4 pt-6 pb-2 outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-300"
            />

            <label
              htmlFor="email"
              className="absolute left-4 top-4 bg-white px-1 text-gray-500 transition-all duration-200
              peer-placeholder-shown:top-4
              peer-placeholder-shown:text-base
              peer-placeholder-shown:text-gray-400
              peer-focus:-top-2
              peer-focus:text-xs
              peer-focus:text-orange-600
              peer-not-placeholder-shown:-top-2
              peer-not-placeholder-shown:text-xs"
            >
              Email Address
            </label>
          </div>

          {/* Password */}
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              placeholder=" "
              value={formData.password}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  password: e.target.value,
                })
              }
              className="peer w-full rounded-xl border border-gray-300 px-4 pt-6 pb-2 pr-12 outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-300"
            />

            <label
              htmlFor="password"
              className="absolute left-4 -top-2 bg-white px-1 text-xs text-orange-600 transition-all
              peer-placeholder-shown:text-base
              peer-placeholder-shown:text-gray-400
              peer-placeholder-shown:top-4
              peer-focus:-top-2
              peer-focus:text-xs
              peer-focus:text-orange-600
              peer-not-placeholder-shown:-top-2
              peer-not-placeholder-shown:text-xs"
            >
              Password
            </label>

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-orange-600 transition"
            >
              {showPassword ? <Eye size={20} /> : <EyeOff size={20} />}
            </button>
          </div>

          {/* Error */}
          {loginFlag && (
            <p
              style={{ fontFamily: "Gelasio" }}
              className="text-red-600 text-sm ml-1"
            >
              {loginFlag}
            </p>
          )}

          <button
            type="button"
            onClick={handleSubmit}
            className="w-full bg-linear-to-br from-orange-500 via-amber-500 to-orange-500 hover:from-orange-700 hover:via-amber-700 hover:to-orange-700 text-white py-3 rounded-xl font-semibold transition duration-300 shadow-lg"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;