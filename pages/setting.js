import React, { useState } from "react";
import {
  useCreateRoomMutation,
  useGetVerifyNumberMutation,
  useVerifyEmailMutation,
} from "../services/api/handleReqApiSlice";
import { useSelector } from "react-redux";
import { selectUserData } from "../services/slices/userSlice";

function Setting() {
  const [roomname, setRoomname] = useState("");
  const [verifyNum, setVerifyNum] = useState("");
  const [privacy, setPrivacy] = useState(0);
  const [createRoom] = useCreateRoomMutation();
  const [sendCode] = useGetVerifyNumberMutation();
  const [verifyEmail] = useVerifyEmailMutation();
  const userData = useSelector(selectUserData);
  const userId = userData.userId;

  console.log(userData);
  const handleCreateRoom = async (e) => {
    e.preventDefault();

    const { data } = await createRoom({ roomname, userId, privacy });

    if (data.status == 500) {
      console.log(data.msg);
    }
    if (data.status == 200) {
      location.reload();
    }
  };

  const handleSendVerificatioNumber = async () => {
    const { data } = await sendCode();
    if (data?.status == 200) {
      console.log("Email Sended ,Please Check ur Email");
    }
  };

  const handleVerifyEmail = async (verifyNum) => {
    const { data } = await verifyEmail({ verifyNum });

    if (data?.status == 200) {
      console.log(data?.msg);
    }
  };
  return (
    <div>
      <div className="container flex flex-col items-center justify-center  ">
        <div className="flex justify-center items-center mt-10">
          <div className="flex flex-col items-center border-2 border-gray-200 p-5 shadow-md shadow-blue-100">
            <h3>CREATE ROOME</h3>
            <form
              action=""
              className="flex flex-col"
              onSubmit={handleCreateRoom}
            >
              <input
                type="text"
                className="input"
                name="roomname"
                onChange={(e) => setRoomname(e.target.value)}
                placeholder="Roomname"
              />
              <div
                className="flex "
                onChange={(e) => setPrivacy(e.target.value)}
              >
                <input type="radio" id="nonlocked" name="privacy" value="0" />
                <lable id="nonlocked" className="mr-5">
                  Public
                </lable>

                <input
                  type="radio"
                  id="locked"
                  className=""
                  name="privacy"
                  value="1"
                />
                <lable id="locked">Private</lable>
              </div>

              <input type="submit" className="btn-form" />
            </form>
          </div>
        </div>

        <div className="mt-10 w-fit flex flex-col justify-center items-center p-5 border-2 border-gray-200  shadow-md shadow-blue-100 ">
          <h2 className="my-3 ">Verify Email Please...</h2>
          <button
            onClick={handleSendVerificatioNumber}
            className="mb-6 bg-red-300 text-white px-2 py-1 rounded-md hover:bg-red-400"
          >
            Verify Now
          </button>
          <div>
            <input
              type="test"
              placeholder="Verifying Number ..."
              className="outline-none bg-gray-100 mr-2 w-[300px] h-[35px] pl-2"
              value={verifyNum}
              onChange={(e) => {
                setVerifyNum(e.target.value);
              }}
            />

            <button
              onClick={() => handleVerifyEmail(verifyNum)}
              className="bg-blue-300 text-white px-2 py-1 rounded-md hover:bg-blue-400"
            >
              Verify
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Setting;
