import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useRegisterMutation } from "../services/api/handleReqApiSlice.js";
import { selectAccessToken } from "../services/slices/tokenSlice.js";
import { useSelector } from "react-redux";

function register() {
  const [values, setValues] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [useRegister] = useRegisterMutation();
  const router = useRouter();
  const accessToken = useSelector(selectAccessToken);

  useEffect(() => {
    if (accessToken) {
      router.push("/");
    }
  }, []);
  console.log(accessToken);
  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleVelidationDate = () => {
    const { username, email, password, confirmPassword } = values;

    if (!username || !email || !password || !confirmPassword) {
      console.log("errrrr");
      return false;
    } else if (password != confirmPassword) {
      console.log("password and confirmation should be equels");
      return false;
    } else if (username.length < 5) {
      console.log("username is too short");

      return false;
    } else if (password.length < 7 || password.length > 25) {
      console.log("password invalud");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!handleVelidationDate()) return;
    const { username, email, password } = values;
    const { data } = await useRegister({ username, email, password });

    if (data.status == 500) {
      console.log(data.error);
    }

    if (data.status == 200) {
      router.push("/login");
    }
  };

  return (
    <div>
      <div className="contianer">
        <div className="flex justify-center mt-10">
          <div className="flex flex-col items-center border-2 border-gray-200 p-5 shadow-md shadow-blue-100">
            <h4 className="font-medium mb-5 bg-blue-300 px-2 text-white">
              create acount
            </h4>
            <form onSubmit={handleSubmit} className="flex flex-col ">
              <input
                type="text"
                className="input"
                name="username"
                placeholder="username"
                onChange={(e) => handleChange(e)}
              />

              <input
                type="email"
                className="input"
                name="email"
                placeholder="email"
                onChange={(e) => handleChange(e)}
              />

              <input
                type="password"
                className="input"
                name="password"
                placeholder="password"
                onChange={(e) => handleChange(e)}
              />

              <input
                type="password"
                className="input"
                name="confirmPassword"
                placeholder="confirmPassword"
                onChange={(e) => handleChange(e)}
              />
              <input type="submit" className="btn-form" />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default register;
