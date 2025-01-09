import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export enum GENDER {
  MALE = "Male",
  FEMALE = "Female",
  UNSEX = "Unsex",
}

export type UserInfo = {
  id: number;
  title: string;
  firstName: string;
  lastName: string;
  fullName: string;
  birthday: string;
  nationality: string;
  gender: GENDER;
  phone: string;
  passport: string;
  expectedSalary: string;
  phonePrefix: string;
  phoneNumber: string;
  mobilePhone: string;
  citizen1: string;
  citizen2: string;
  citizen3: string;
  citizen4: string;
  citizen5: string;
  citizen: string;
};

const initialState: { userInfo: UserInfo[]; selectedUser: UserInfo | null } = {
  userInfo: [],
  selectedUser: null,
};

const userInfoSlice = createSlice({
  name: "form",
  initialState,
  reducers: {
    initLocalUserInfo: (state, action: PayloadAction<UserInfo[]>) => {
      state.userInfo = action.payload
    },
    submitInfo: (state, action: PayloadAction<UserInfo>) => {
      state.userInfo.push(action.payload);
      localStorage.setItem("userInfo", JSON.stringify(state.userInfo));
    },
    editInfo: (state, action: PayloadAction<UserInfo>) => {
      const newInfo = state.userInfo.map((item) => {
        if (item.id === action.payload.id) {
          return { ...action.payload };
        }
        return item;
      });
      localStorage.setItem("userInfo", JSON.stringify(newInfo));
      state.userInfo = newInfo;
    },
    deleteInfo: (state, action: PayloadAction<number>) => {
      const newValues = state.userInfo.filter(
        (item) => item.id !== action.payload
      );
      localStorage.setItem("userInfo", JSON.stringify(newValues));
      state.userInfo = newValues;
    },
    deleteMultipleInfo: (state, action: PayloadAction<number[]>) => {
      const newValues = state.userInfo.filter(
        (item) => !action.payload.includes(item.id)
      );
      localStorage.setItem("userInfo", JSON.stringify(newValues));
      state.userInfo = newValues;
    },
    selectUserInfo: (state, action: PayloadAction<UserInfo>) => {
      state.selectedUser = action.payload;
    },
    deSelectUserInfo: (state) => {
      state.selectedUser = null;
    },
  },
});

export const {
  submitInfo,
  editInfo,
  deleteInfo,
  selectUserInfo,
  deSelectUserInfo,
  deleteMultipleInfo,
  initLocalUserInfo,
} = userInfoSlice.actions;

export default userInfoSlice.reducer;
