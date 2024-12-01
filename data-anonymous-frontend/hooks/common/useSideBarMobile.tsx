"use client";

import { create } from "zustand";

interface SideBarMobileState {
  isShowSideBarMobile: boolean;
  setIsShowSideBarMobile: (show: boolean) => void;
}

const useSideBarMobile = create<SideBarMobileState>((set) => ({
  isShowSideBarMobile: false,
  setIsShowSideBarMobile: (show) => set(() => ({ isShowSideBarMobile: show })),
}));

export default useSideBarMobile;
