import { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import styles from "../../styles/styles.js";
import { Link, useNavigate } from "react-router-dom";
import { server } from "../../server.js";
import { toast } from "react-toastify";
import axios from "axios";
import { RxAvatar } from "react-icons/rx";

function ShopCreate() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [visible, setVisible] = useState("");
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [avatar, setAvatar] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const config = { headers: { "Content-Type": "multipart/form-data" } };

    const newForm = new FormData();

    newForm.append("file", avatar);
    newForm.append("name", name);
    newForm.append("email", email);
    newForm.append("password", password);
    newForm.append("zipCode", zipCode);
    newForm.append("address", address);
    newForm.append("phoneNumber", phoneNumber);

    axios
      .post(`${server}/shop/create-shop`, newForm, config)
      .then((res) => {
        toast.success(res.data.message);
        setName("");
        setEmail("");
        setPassword("");
        setAvatar("");
        setZipCode("");
        setAddress("");
        setPhoneNumber("");
      })
      .catch(
        (error) => {
          const errMsg =
            error?.response?.data?.message || "Something went wrong";
          toast.error(errMsg);
        },
        { withCredentials: true }
      );
  };

  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    setAvatar(file);
  };

  return (
    <div className="w-screen min-h-screen flex items-center justify-center bg-gray-50 pt-15 p-2">
      <div className="w-full max-w-sm bg-white p-5 shadow-md rounded-md">
        <h2 className="text-xl font-bold text-gray-900 text-center mb-4">
          Register as a New Seller
        </h2>

        <form className="space-y-3" onSubmit={handleSubmit}>
          {/* Shop name */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Shop Name
            </label>
            <input
              type="name"
              name="name"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 w-full px-2 py-1 border text-black border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm"
            />
          </div>

          {/* Phone number */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Phone Number
            </label>
            <input
              type="number"
              name="phone-number"
              required
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className="mt-1 w-full px-2 py-1 border text-black border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email address
            </label>
            <input
              type="email"
              name="email"
              required
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 w-full px-2 py-1 border text-black border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm"
            />
          </div>

          {/* Address */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Address
            </label>
            <input
              type="address"
              name="address"
              required
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="mt-1 w-full px-2 py-1 border text-black border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm"
            />
          </div>

          {/* Zip Code */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Zip Code
            </label>
            <input
              type="number"
              name="zipcode"
              required
              value={zipCode}
              onChange={(e) => setZipCode(e.target.value)}
              className="mt-1 w-full px-2 py-1 border text-black border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <div className="mt-1 relative">
              <input
                type={visible ? "text" : "password"}
                name="password"
                required
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-2 py-1 border text-black border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm"
              />
              {visible ? (
                <AiOutlineEye
                  className="absolute right-2 top-1.5 cursor-pointer"
                  size={20}
                  onClick={() => setVisible(false)}
                />
              ) : (
                <AiOutlineEyeInvisible
                  className="absolute right-2 top-1.5 cursor-pointer"
                  size={20}
                  onClick={() => setVisible(true)}
                />
              )}
            </div>
          </div>

          {/* Avatar */}
          <div>
            <h6 className="text-shadow-xs font-bold text-gray-900 flex mb-4">
              Profile Picture
            </h6>
            <div className="mt-1 flex items-center">
              <span className="inline-block h-6 w-6 rounded-full overflow-hidden">
                {avatar instanceof Blob ? (
                  <img
                    src={URL.createObjectURL(avatar)}
                    alt="avatar"
                    className="h-full w-full object-cover rounded-full"
                  />
                ) : (
                  <RxAvatar className="h-6 w-6 text-black" />
                )}
              </span>
              <label
                htmlFor="file-input"
                className="ml-3 flex items-center justify-center px-3 py-1 border border-gray-300 rounded-md text-xs font-medium text-gray-700 bg-white hover:bg-gray-50"
              >
                <span>Upload</span>
                <input
                  type="file"
                  name="avatar"
                  id="file-input"
                  accept=".jpg, .jpeg, .png"
                  onChange={handleFileInputChange}
                  className="sr-only"
                />
              </label>
            </div>
          </div>

          {/* Remember me */}
          <div className={`${styles.noramlFlex} justify-between`}>
            <div className={`${styles.noramlFlex}`}>
              <input
                type="checkbox"
                className="h-3 w-3 text-blue-100 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label className="ml-1 text-xs text-gray-900">Remember me</label>
            </div>
            <div className="text-xs">
              <a
                href=".forget-password"
                className="font-medium text-blue-600 hover:text-blue-500"
              >
                Forgot password?
              </a>
            </div>
          </div>

          {/* Submit button */}
          <div>
            <button
              type="submit"
              className="group relative w-full h-[35px] flex justify-center py-1 px-3 border border-transparent text-xs font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
            >
              Submit
            </button>
          </div>

          {/* Already have account */}
          <div className={`${styles.noramlFlex} w-full`}>
            <h4 className="text-black text-xs">Already have an account?</h4>
            <Link to="/shop-login" className="text-blue-600 pl-1 text-xs">
              Sign In
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ShopCreate;
