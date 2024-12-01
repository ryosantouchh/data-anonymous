import { create } from "zustand";

interface AddCommentModalState {
  isShowModal: boolean;
  content: string;
  setIsShowModal: (show: boolean) => void;
  setContent: (content: string) => void;
}

const useAddCommentModal = create<AddCommentModalState>((set) => ({
  isShowModal: false,
  content: "",

  setIsShowModal: (show) => set(() => ({ isShowModal: show })),
  setContent: (content) => set(() => ({ content })),
}));

export default useAddCommentModal;
