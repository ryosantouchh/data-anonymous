import { create } from "zustand";

interface DeletePostModalState {
  isShowModal: boolean;
  setIsShowModal: (show: boolean) => void;
}

const useDeletePostModal = create<DeletePostModalState>((set) => ({
  isShowModal: false,
  setIsShowModal: (show) => set(() => ({ isShowModal: show })),
}));

export default useDeletePostModal;
