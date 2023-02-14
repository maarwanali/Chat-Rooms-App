import React, { useEffect, useState } from "react";
import Link from "next/link";
import profileImg from "../public/no-img.png";
import Image from "next/image";
import ClickAwayListener from "react-click-away-listener";
import { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";
import { logOut, selectAccessToken } from "../services/slices/tokenSlice";
import { selectUserData } from "../services/slices/userSlice";
import { setUserData } from "../services/slices/userSlice";
import { setToken } from "../services/slices/tokenSlice";
import {
  useRefreshMutation,
  useLogoutMutation,
  useGetNotificationMutation,
  useDeleteNotificationMutation,
  useAcceptRequstMutation,
} from "../services/api/handleReqApiSlice";

function Navbar() {
  const [useLogout] = useLogoutMutation();
  const [useRefresh] = useRefreshMutation();
  const [getNotifiaction] = useGetNotificationMutation();
  const [deleteNotification] = useDeleteNotificationMutation();
  const [acceptUser] = useAcceptRequstMutation();

  const [subMenue, setSubMenue] = useState(false);
  const [roomMenue, setRoomMenue] = useState(false);
  const [notMenue, setNotMenue] = useState(false);
  const [nots, setNots] = useState([]);

  const dispatch = useDispatch();
  const accessToken = useSelector(selectAccessToken);
  const userId = useSelector(selectUserData).userId;
  const router = useRouter();

  useEffect(() => {
    setNotMenue(false);
    setRoomMenue(false);
    setSubMenue(false);
  }, [router.query]);

  useEffect(() => {
    handleRefresh();
  }, []);

  useEffect(() => {
    const getNots = async () => {
      const { data } = await getNotifiaction(userId);
      if (data?.status == 200) {
        console.log(data?.recordset);
        setNots(data?.recordset);
      }
    };

    if (userId) {
      getNots();
    }
  }, [userId]);

  const handleRefresh = async () => {
    const { data } = await useRefresh();
    if (data?.status == 200) {
      const accessToken = data?.accessToken;
      dispatch(setToken({ accessToken }));
      const userid = data.userId;
      const username = data.username;
      const rool = data.rool;
      dispatch(setUserData({ userId: userid, username: username, rool: rool }));
    } else {
      router.push("/login");
    }
  };

  const handleAcceptUser = async (fromUser, roomId) => {
    console.log(roomId);
    const { data } = await acceptUser({ fromUser, roomId });

    if (data?.status == 200) {
      const statusData = await deleteNotification();
      if (statusData.data.status == 200) {
        location.reload();
      }
    }
  };

  const handleClickAway = () => {
    setRoomMenue(false);
    setNotMenue(false);
    setSubMenue(false);
  };

  return (
    <div>
      <div className="navbar">
        {/* // LOGO */}
        <div className="logo"> LOGO </div>
        {/* // LINKS */}
        {accessToken && (
          <div>
            <ul className="links-container">
              <Link href={"/"}>
                <li className="link">Home</li>
              </Link>

              <li
                onClick={() => {
                  setRoomMenue(true);
                  setSubMenue(false);
                }}
                className="link cursor-pointer relative"
              >
                Rooms
                {roomMenue && (
                  <ClickAwayListener onClickAway={handleClickAway}>
                    <ul className="absolute z-10 bg-gray-300 top-10 right-10 profile-links ">
                      <Link href={"/rooms/participant"}>
                        <li className="profile-link">Rooms</li>
                      </Link>

                      <Link href={"/rooms/mine"}>
                        <li className="profile-link">My rooms</li>
                      </Link>
                    </ul>
                  </ClickAwayListener>
                )}
              </li>
              <li
                onClick={() => {
                  setSubMenue(false);
                  setRoomMenue(false);
                  setNotMenue(true);
                }}
                className="link cursor-pointer relative"
              >
                Notifications
                {notMenue && (
                  <ClickAwayListener onClickAway={handleClickAway}>
                    <div className="absolute z-10 bg-gray-300 top-10 right-10 w-[350px] p-1  shadow-md shadow-gray-200">
                      {nots?.map((not, index) => {
                        return (
                          <p key={index} className="flex justify-between">
                            {not.username} want to join to{" "}
                            {not.roomname.substring(0, 10)}...
                            <small>
                              <button
                                onClick={() =>
                                  handleAcceptUser(not.fromUser, not.roomId)
                                }
                                className="mx-2 bg-blue-300 text-white px-1  hover:bg-blue-400"
                              >
                                Accept
                              </button>{" "}
                              <button className=" bg-red-300 text-white px-1  hover:bg-red-400">
                                Delete
                              </button>
                            </small>
                          </p>
                        );
                      })}
                    </div>
                  </ClickAwayListener>
                )}
              </li>
              <li
                className="profile-img cursor-pointer"
                onClick={() => {
                  setSubMenue(true);
                  setRoomMenue(false);
                }}
              >
                <Image
                  src={profileImg}
                  alt="profile image "
                  width={40}
                  height={40}
                  className="profile-image"
                />
                {/* <p className="profile link">Profile</p> */}
                {subMenue && (
                  <ClickAwayListener onClickAway={handleClickAway}>
                    <div className="profile-links z-10 ">
                      <ul>
                        <Link href={"/setting"}>
                          <li className="profile-link">setting</li>
                        </Link>
                        <li
                          className="profile-link"
                          onClick={async () => {
                            dispatch(logOut());
                            await useLogout();
                            router.push("/login");
                          }}
                        >
                          Log Out
                        </li>
                        <p className="profile-link">NOT VERIFAD </p>
                      </ul>
                    </div>
                  </ClickAwayListener>
                )}
              </li>
            </ul>
          </div>
        )}

        {!accessToken && (
          <div>
            <ul className="links-container">
              <Link href={"/login"}>
                <li className="link">Login</li>
              </Link>
              <Link href={"/register"}>
                <li className="link">Register</li>
              </Link>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

export default Navbar;
