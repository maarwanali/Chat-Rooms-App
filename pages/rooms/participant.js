import React, { useEffect, useState } from "react";
import { useGetparRoomsMutation } from "../../services/api/handleReqApiSlice";
import { RxLockOpen2, RxLockClosed } from "react-icons/rx";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { selectAccessToken } from "../../services/slices/tokenSlice";
import { selectUserData } from "../../services/slices/userSlice";

function Participant() {
  const [rooms, setRooms] = useState([]);
  const [getParRooms] = useGetparRoomsMutation();
  const accessToekn = useSelector(selectAccessToken);
  const userData = useSelector(selectUserData);

  const router = useRouter();

  useEffect(() => {
    const getRooms = async () => {
      const { data } = await getParRooms();

      if (data?.status == 500) {
        console.log(data.msg);
      }
      if (data?.status == 200) {
        setRooms(data.roomsArray);
      }
    };

    if (accessToekn) {
      getRooms();
    }
  }, [accessToekn]);

  console.log(rooms);

  const handleMoveToChat = (rId) => {
    console.log(userData);
    router.push(
      `/room?roomid=${rId}&userid=${userData.userId}&username=${userData.username}`
    );
  };

  return (
    <div>
      <div className="container">
        <div>
          <div>
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
                        <small>
                          <RxLockClosed size={18} />
                        </small>
                      ) : (
                        <small>
                          <RxLockOpen2 size={18} />
                        </small>
                      )}
                    </small>

                    <div className="absolute bottom-2 right-2 bg-blue-300 text-white px-1 rounded-sm hover:bg-blue-400">
                      <button onClick={() => handleMoveToChat(room.rId)}>
                        JOIN
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Participant;
