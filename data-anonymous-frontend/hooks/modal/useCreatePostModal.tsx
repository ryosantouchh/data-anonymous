import { create } from "zustand";

interface CreatePostModalState {
  postModalAction: "CREATE" | "EDIT";
  isShowModal: boolean;
  isShowDropdown: boolean;
  selectedPost: number | null;
  selectedCommunity: { id: number | null; name: string };
  title: string;
  content: string;
  setPostModalAction: (action: "CREATE" | "EDIT") => void;
  setIsShowModal: (show: boolean) => void;
  setIsShowDropdown: (show: boolean) => void;
  setSelectedCommunity: (community: {
    categoryId: number | null;
    name: string;
  }) => void;
  setSelectedPost: (postId: number | null) => void;
  setTitle: (title: string) => void;
  setContent: (content: string) => void;
}

const useCreatePostModal = create<CreatePostModalState>((set) => ({
  postModalAction: "CREATE",
  isShowModal: false,
  isShowDropdown: false,
  selectedPost: null,
  selectedCommunity: { id: null, name: "" },
  title: "",
  content: "",

  setPostModalAction: (action) => set(() => ({ postModalAction: action })),
  setIsShowModal: (show) => set(() => ({ isShowModal: show })),
  setIsShowDropdown: (show) => set(() => ({ isShowDropdown: show })),
  setSelectedCommunity: ({ categoryId, name }) =>
    set(() => ({ selectedCommunity: { id: categoryId, name } })),
  setSelectedPost: (postId) => set(() => ({ selectedPost: postId })),
  setTitle: (title) => set(() => ({ title })),
  setContent: (content) => set(() => ({ content })),
}));

export default useCreatePostModal;
