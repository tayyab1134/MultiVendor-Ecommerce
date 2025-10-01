import { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import styles from "../../styles/styles.js";
import { Link, useNavigate } from "react-router-dom";
import { server } from "../../server.js";
import { toast } from "react-toastify";
import axios from "axios";

function ShopLogin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [visible, setVisible] = useState("");
  /*const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        `${server}/shop/login-seller`,
        {
          email,
          password,
        },
        { withCredentials: true }
      );
      toast.success("Login success!");

      navigate("/dashboard");
      //window.location.reload(true);
    } catch (err) {
      console.error("Login error:", err.response?.data); // 👈 log it!
      toast.error(err.response?.data?.message || "Login failed");
    }
  };
  */
   const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("login called");

    try {
      const res = await fetch(`${server}/shop/login-seller`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
        credentials: "include",
      });

      const data = await res.json();
      if (data.success == true) {
        toast.success("Login Success!");
        //dispatch(loadSeller());
        navigate("/dashboard");
      }
      if (data.success == false) {
        toast.error(data.message);
        console.log("error msg from server:  " + data.message);
      }
    } catch (e) {
      console.log("catch Error: " + e.message);
      toast.error(e.message);
    }
  };



  return (
    <div className="w-screen h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-md bg-white p-8 shadow-md rounded-md">
        <h2 className="text-2xl font-bold text-gray-900 text-center mb-6">
          Login to your shop
        </h2>

        <form className="space-y-4" onSubmit={handleSubmit}>
          {/* email section*/}

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email address
            </label>
            <input
              type="email"
              name="email"
              required
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 w-full px-3 py-2 border text-black border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>

          {/* password section*/}
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              password
            </label>
            <div className="mt-1  relative">
              <input
                type={visible ? "text" : "password"}
                name="password"
                required
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 w-full px-3 py-2 border text-black border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
              {visible ? (
                <AiOutlineEye
                  className="absolute right-2 top-2 hover:text-black cursor-pointer"
                  size={25}
                  onClick={() => setVisible(false)}
                />
              ) : (
                <AiOutlineEyeInvisible
                  className="absolute right-2 top-2 hover:text-black cursor-pointer"
                  size={25}
                  onClick={() => setVisible(true)}
                />
              )}
            </div>
          </div>

          {/* remember-me section*/}
          <div className={`${styles.noramlFlex} justify-between`}>
            <div className={`${styles.noramlFlex}`}>
              <input
                type="checkbox"
                name="remember-me"
                id="rememver-me"
                className="h-4 w-4 text-blue-100 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label
                htmlFor="remeber-me"
                className="ml-2 block text-sm text-gray-900"
              >
                Remember me
              </label>
            </div>
            <div className="text-sm">
              <a
                href=".forget-password"
                className="font-medium text-blue-600 hover:text-blue-500"
              >
                Forgot your password?
              </a>
            </div>
          </div>

          {/* submit button */}

          <div>
            <button
              type="submit"
              className="group relative w-full h-[40px] flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 "
            >
              Submit
            </button>
          </div>

          {/* do not have an account */}
          <div className={`${styles.noramlFlex} w-full`}>
            <h4 className="text-black text-sm">Do not have an account?</h4>
            <Link to="/shop-create" className="text-blue-600 pl-2">
              Sign Up
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ShopLogin;
