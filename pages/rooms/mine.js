import React, { useEffect, useState } from "react";
import { useGetMineRoomsMutation } from "../../services/api/handleReqApiSlice";
import { CgOptions } from "react-icons/cg";
import { RxLockOpen2, RxLockClosed } from "react-icons/rx";
import {
  useEidtRoomPrivacyMutation,
  useDeleteRoomMutation,
} from "../../services/api/handleReqApiSlice";
import { useSelector } from "react-redux";
import { selectAccessToken } from "../../services/slices/tokenSlice";
import { useRouter } from "next/router";
import { selectUserData } from "../../services/slices/userSlice";

function Mine() {
  const [rooms, setRooms] = useState([]);
  const [getMineRooms] = useGetMineRoomsMutation();
  const [editRoomPrivacy] = useEidtRoomPrivacyMutation();
  const [deleteRoom] = useDeleteRoomMutation();
  const router = useRouter();
  const accessToken = useSelector(selectAccessToken);
  const userData = useSelector(selectUserData);

  useEffect(() => {
    const getRooms = async () => {
      const { data } = await getMineRooms();

      if (data?.status == 500) {
        console.log(data.msg);
      }
      if (data?.status == 200) {
        setRooms(data.recordset);
      }
    };
    if (accessToken) {
      getRooms();
    }
  }, [accessToken]);

  const handleConvertPrivacy = async (rId, status) => {
    console.log(rId, status);
    const { data } = await editRoomPrivacy({ rId, status });

    if (data.status == 200) {
      location.reload();
    }
  };
  const handleDeleteRoom = async (userid, roomid) => {
    const { data } = await deleteRoom({ userid, roomid });

    if (data?.status == 200) {
      console.log(data?.msg);
      location.reload();
    }
  };

  return (
    <div>
      <div className="container">
        <div className="">
          {rooms?.map((room, index) => {
            return (
              <div key={index} className="border-2 border-gray-50 my-1">
                <div className="p-3 relative">
                  <p className="font-bold">{room.roomname}</p>

                  <small className="ml-3">room ID: {room.rId}</small>

                  <small className="ml-2">@YOURS</small>

                  <div>
                    <small className="mr-3">
                      Participants : {room.participants}
                    </small>
                    <small className="text-red-500">
                      Online : {room.online}
                    </small>
                  </div>

                  <small className="absolute top-2 right-3 cursor-pointer">
                    {room.privacy ? (
                      <small onClick={() => handleConvertPrivacy(room.rId, 0)}>
                        <RxLockClosed size={18} />
                      </small>
                    ) : (
                      <small onClick={() => handleConvertPrivacy(room.rId, 1)}>
                        <RxLockOpen2 size={18} />
                      </small>
                    )}
                  </small>

                  <div className="absolute bottom-2 right-2">
                    <div className="flex justify-between ">
                      <button
                        onClick={() => handleDeleteRoom(room.userId, room.rId)}
                        className=" mr-5 bg-red-300 text-white px-1 rounded-sm hover:bg-red-400"
                      >
                        Delete
                      </button>
                      <button
                        onClick={() => {
                          router.push(
                            `/room?roomid=${room.rId}&userid=${userData.userId}&username=${userData.username}`
                          );
                        }}
                        className=" bg-blue-300 text-white px-1 rounded-sm hover:bg-blue-400"
                      >
                        JOIN
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Mine;
