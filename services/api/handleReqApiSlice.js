import { apiSlice } from "./apiSlice";

export const reqHandler = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    login: build.mutation({
      query: (credentials) => ({
        url: "api/auth/login",
        method: "POST",
        body: credentials,
        // responseHandler: (response) => response.text(),
      }),
    }),

    register: build.mutation({
      query: (credentials) => ({
        url: "api/auth/register",
        method: "POST",
        body: credentials,
      }),
    }),

    logout: build.mutation({
      query: () => ({
        url: "api/auth/logout",
        method: "GET",
      }),
    }),

    authorized: build.mutation({
      query: () => ({
        url: "api/auth/authorization",
        method: "GET",
      }),
    }),
    refresh: build.mutation({
      query: () => ({
        url: "api/auth/refresh",
        method: "GET",
      }),
    }),
    getRooms: build.mutation({
      query: () => ({
        url: "api/rooms/getrooms",
        method: "GET",
      }),
    }),

    createRoom: build.mutation({
      query: (data) => ({
        url: "api/rooms/createroom",
        method: "POST",
        body: data,
      }),
    }),
    getMineRooms: build.mutation({
      query: () => ({
        url: "api/rooms/getminerooms",
        method: "GET",
      }),
    }),

    addRoom: build.mutation({
      query: (data) => ({
        url: "api/rooms/addroom",
        method: "POST",
        body: data,
      }),
    }),

    getparRooms: build.mutation({
      query: () => ({
        url: "api/rooms/getparrooms",
        method: "GET",
      }),
    }),
    eidtRoomPrivacy: build.mutation({
      query: (data) => ({
        url: "api/rooms/editroom",
        method: "POST",
        body: data,
      }),
    }),

    deleteRoom: build.mutation({
      query: (data) => ({
        url: "api/rooms/deleteroom",
        method: "POST",
        body: data,
      }),
    }),
    addMessage: build.mutation({
      query: (data) => ({
        url: "api/messages/addmessage",
        method: "POST",
        body: data,
      }),
    }),

    getMessages: build.mutation({
      query: (data) => ({
        url: "api/messages/getmessages",
        method: "POST",
        body: data,
      }),
    }),

    getNotification: build.mutation({
      query: () => ({
        url: "api/notifications/getnotifications",
        method: "GET",
      }),
    }),

    acceptRequst: build.mutation({
      query: (data) => ({
        url: "api/notifications/acceptuser",
        method: "POST",
        body: data,
      }),
    }),
    deleteNotification: build.mutation({
      query: () => ({
        url: "api/notifications/acceptuser",
        method: "DELETE",
      }),
    }),

    addRoomMember: build.mutation({
      query: (data) => ({
        url: "api/rooms/roommembers",
        method: "POST",
        body: data,
      }),
    }),

    getVerifyNumber: build.mutation({
      query: () => ({
        url: "api/auth/verify",
        method: "GET",
      }),
    }),

    VerifyEmail: build.mutation({
      query: (data) => ({
        url: "api/auth/verify",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const {
  useGetRoomsMutation,
  useCreateRoomMutation,
  useGetMineRoomsMutation,
  useAddRoomMutation,
  useEidtRoomPrivacyMutation,
  useGetparRoomsMutation,
  useDeleteRoomMutation,
  useLoginMutation,
  useRegisterMutation,
  useLogoutMutation,
  useAuthorizedMutation,
  useRefreshMutation,
  useAddMessageMutation,
  useGetMessagesMutation,
  useGetNotificationMutation,
  useDeleteNotificationMutation,
  useAcceptRequstMutation,
  useAddRoomMemberMutation,
  useGetVerifyNumberMutation,
  useVerifyEmailMutation,
} = reqHandler;
