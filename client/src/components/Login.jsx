import { useState } from "react";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Handle sign-in logic here
    console.log({ email, password });
    try {
      const response = await axios.post(
        `${process.env.BACKEND_URL}/auth/login`,
        {
          email,
          password,
        }
      );

      const token = response.data.token;
      localStorage.setItem("token", token);
      toast.success("Logged in successfully");
      await new Promise((p) => setTimeout(() => navigate("/posts"), 1000));
    } catch (e) {
      console.error("Login Failed:", e);
      toast.error("Login failed");
    }
  };

  return (
    <>
      <Toaster />
      <div className="flex min-h-screen items-center justify-center p-4 bg-gray-50 ">
        <div className="w-full max-w-md space-y-8 rounded-lg bg-white p-6 shadow-lg  sm:p-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900">
              Sign in to your account
            </h2>
            <p className="mt-2 text-sm text-gray-600 ">
              Enter your credentials to access your account
            </p>
          </div>

          <form onSubmit={handleSubmit} className="mt-8 space-y-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 "
                >
                  Email address
                </label>
                <input
                  id="email"
                  type="email"
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                />
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-gray-700 "
                  >
                    Password
                  </label>
                </div>
                <div className="relative">
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="w-full rounded-md border border-gray-300 px-3 py-2 pr-10 text-gray-900 placeholder-gray-500 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 "
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-500 "
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOffIcon className="h-5 w-5" aria-hidden="true" />
                    ) : (
                      <EyeIcon className="h-5 w-5" aria-hidden="true" />
                    )}
                  </button>
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="w-full rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 "
            >
              Login
            </button>

            <div className="text-center text-sm">
              <span className="text-gray-600 ">Don't have an account? </span>
              <a
                href="/signup"
                className="font-medium text-indigo-600 hover:text-indigo-500 "
              >
                Sign up
              </a>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
