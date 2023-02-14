import React, { useEffect, useState } from "react";
import {
  useGetRoomsMutation,
  useAddRoomMutation,
  useAddRoomMemberMutation,
} from "../services/api/handleReqApiSlice";
import { selectUserData } from "../services/slices/userSlice";
import { RxLockOpen2, RxLockClosed } from "react-icons/rx";
import { useSelector } from "react-redux";
function Main() {
  const [useGetRooms, { isLoading, isError }] = useGetRoomsMutation();
  const [useAddRoom] = useAddRoomMutation();
  const [addrooMember] = useAddRoomMemberMutation();
  const [search, setSearch] = useState("");
  const [rooms, setRooms] = useState([]);
  const userID = useSelector(selectUserData).userId;

  useEffect(() => {
    const getrooms = async () => {
      const { data } = await useGetRooms();

      if (data?.status == 500) {
        console.log(data.msg);
      }
      if (data?.status == 200) {
        const searchedRooms = data?.recordset.filter((name) =>
          name.roomname.toLowerCase().includes(search.toLowerCase())
        );
        setRooms(searchedRooms);
      }
    };
    getrooms();
  }, [search]);

  const handleAddRoom = async (rId, userId, privacy, userID) => {
    const { data } = await useAddRoom({ rId, userId, privacy });

    if (data?.status == 200) {
      const dataRoom = await addrooMember({ userID, rId });

      if (dataRoom?.data?.status == 200) {
        location.reload();
      }
    } else {
      console.log(data?.msg);
    }
  };

  return (
    <div className="container mt-14">
      <div className="flex justify-center">
        <input
          type="text"
          placeholder="search ..."
          className="bg-gray-50 w-[350px] h-[35px] shadow-sm shadow-slate-300 px-2 outline-0  "
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="mt-5">
        <div>
          {rooms?.map((room, index) => {
            return (
              <div key={index} className="border-2 border-gray-50 my-1">
                <div className="p-3 relative">
                  <p className="font-bold">{room.roomname}</p>

                  <small className="ml-3">room ID: {room.rId}</small>

                  <small className="ml-2">@{room.username}</small>

                  <div>
                    <small className="mr-3">
                      Participants : {room.participants}
                    </small>
                    <small className="text-red-500">
                      Online : {room.online}
                    </small>
                  </div>

                  <small className="absolute top-2 right-3">
                    {room.privacy ? (
                      <>
                        <small>
                          <RxLockClosed />
                        </small>
                      </>
                    ) : (
                      <>
                        <small>
                          <RxLockOpen2 size={15} />
                        </small>
                      </>
                    )}
                  </small>

                  {room.userId == userID ? (
                    <></>
                  ) : (
                    <button
                      className="absolute bottom-2 right-2 bg-blue-300 text-white px-1 rounded-sm hover:bg-blue-400"
                      onClick={() =>
                        handleAddRoom(
                          room.rId,
                          room.userId,
                          room.privacy,
                          userID
                        )
                      }
                    >
                      {room.privacy ? <>request subscribe</> : <>subscribe</>}
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Main;
