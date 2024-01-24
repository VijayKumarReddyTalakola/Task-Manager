import { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { userLogin } from "../redux/slice";
import { toast } from "react-hot-toast";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { token } = useSelector((state) => state["user"]);
  if (token) {
    return <Navigate to="/" replace:true />;
  }

  const handleLogin = async () => {
    if(!email || !password) return toast.error("Please fill all fields")
    const response = await dispatch(userLogin({ email, password }));
    if (response.meta.requestStatus === "fulfilled") {
      navigate("/", { replace: true });
    }
  };

  return (
    <div className="w-screen flex flex-col items-center justify-center min-h-screen max-h-screen overflow-x-hidden">
      <div className="flex bg-white w-full rounded-lg shadow-2xl border-t-2 border-r-2 overflow-hidden mx-auto max-w-xs sm:max-w-sm lg:max-w-md">
        <div className="w-full p-8">
          <h2 className="text-2xl font-semibold text-gray-700 text-center">
            VTrack
          </h2>
          <p className="text-xl text-gray-600 text-center">Welcome back!</p>
          <div className="mt-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Email
            </label>
            <input
              autoFocus
              onChange={(e) => setEmail(e.target.value)}
              className="bg-gray-200 text-gray-900 font-medium focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full"
              type="email"
            />
          </div>
          <div className="mt-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Password
            </label>
            <input
              onChange={(e) => setPassword(e.target.value)}
              className="bg-gray-200 text-gray-900 font-medium focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full"
              type="password"
            />
          </div>
          <div className="mt-8">
            <button
              onClick={handleLogin}
              className="bg-gray-800 text-white font-bold py-2 px-4 w-full rounded hover:bg-gray-700"
            >
              Login
            </button>
          </div>
          <div className="mt-4 gap-x-2 lg:gap-x-4 flex items-center justify-center ">
            <span className="w-fit">Don&apos;t have an account ?</span>
            <Link
              to="/register"
              className="text-lg font-semibold text-gray-500 hover:text-gray-900"
            >
              Sign up
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
