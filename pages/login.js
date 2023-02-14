import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLoginMutation } from "../services/api/handleReqApiSlice";
import { setToken, selectAccessToken } from "../services/slices/tokenSlice";
import { selectUserData } from "../services/slices/userSlice";
import { setUserData } from "../services/slices/userSlice";

function login() {
  const [values, setValues] = useState({
    username: "",
    password: "",
  });
  const [useLogin] = useLoginMutation();
  const router = useRouter();
  const dispatch = useDispatch();
  const accessToken = useSelector(selectAccessToken);
  const userData = useSelector(selectUserData);

  useEffect(() => {
    if (accessToken) {
      router.push("/");
    }
  }, []);

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleVelidationDate = () => {
    const { username, password } = values;

    if (!username || !password) {
      console.log("errrrr");
      return false;
    } else if (username.length < 5) {
      console.log("username in valid");

      return false;
    } else if (password.length < 7 || password.length > 25) {
      console.log("password invalud");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // if (!handleVelidationDate()) return;
    const { username, password } = values;
    const { data } = await useLogin({ username, password });
    if (data?.status == 500) {
      console.log(data.msg);
    }

    if (data?.status == 200) {
      const accessToken = data.accessToken;
      dispatch(setToken({ accessToken }));
      router.push("/");
    }
  };
  return (
    <div>
      <div className="contianer">
        <div className="flex justify-center mt-10">
          <div className="flex flex-col items-center border-2 border-gray-200 p-5 shadow-md shadow-blue-100">
            <h4 className="font-medium mb-5 bg-blue-300 px-2 text-white">
              Login
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
                type="password"
                className="input"
                name="password"
                placeholder="password"
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

export default login;
