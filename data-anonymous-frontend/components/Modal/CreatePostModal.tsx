"use client";

import { isNil } from "lodash";
import { useCategoryStore, useCreatePostModal, usePostStore } from "@/hooks";
import { ChevronDownGreenIcon, CorrectIcon } from "@/icons";
import {
  createPostService,
  editPostService,
  fetchPostByIdService,
} from "@/services";
import { useEffect } from "react";

export default function CreatePostModal() {
  const {
    isShowDropdown,
    selectedPost,
    selectedCommunity,
    title,
    content,
    setIsShowModal,
    setIsShowDropdown,
    setTitle,
    setContent,
    setSelectedCommunity,
    postModalAction,
  } = useCreatePostModal();

  const { categories } = useCategoryStore();

  const { appendSinglePost, posts, setPosts } = usePostStore();

  const handleCreatePost = async () => {
    if (title && content && selectedCommunity.id) {
      const createdPost = await createPostService({
        title,
        content,
        categoryId: selectedCommunity.id,
      });

      const fetchedPost = await fetchPostByIdService(createdPost.id);
      appendSinglePost(fetchedPost);

      setIsShowModal(false);
    }
  };

  const handleEditPost = async () => {
    if (selectedPost) {
      await editPostService(selectedPost, {
        ...(title ? { title } : {}),
        ...(content ? { content } : {}),
        ...(selectedCommunity.id ? { categoryId: selectedCommunity.id } : {}),
      });

      const tempPosts = [...posts];
      const updatedIndex = tempPosts.findIndex(
        (post) => post.id === selectedPost,
      );

      const fetchedPost = await fetchPostByIdService(selectedPost);
      tempPosts.splice(updatedIndex, 1, fetchedPost);

      setPosts(tempPosts);
      setIsShowModal(false);
    }
  };

  const handleSubmitPostModal = () => {
    if (postModalAction === "CREATE") {
      handleCreatePost();
    }

    if (postModalAction === "EDIT") {
      handleEditPost();
    }
  };

  const renderPostModalTitle = () => {
    if (postModalAction === "CREATE") return "Create Post";
    if (postModalAction === "EDIT") return "Edit Post";
  };

  const renderSuccessButtonText = () => {
    if (postModalAction === "CREATE") return "Post";
    if (postModalAction === "EDIT") return "Confirm";
  };

  useEffect(() => {
    return () => {
      setTitle("");
      setContent("");
      setSelectedCommunity({ categoryId: null, name: "" });
    };
  }, []);

  return (
    <div className="fixed left-0 top-0 h-screen w-screen flex justify-center items-center bg-black bg-opacity-50">
      <div className="relative bg-white p-6 rounded-xl w-[685px]">
        <button
          className="font-semibold absolute right-4 top-4"
          onClick={() => setIsShowModal(false)}
        >
          X
        </button>
        <h2 className="text-[28px] font-semibold mb-4">
          {renderPostModalTitle()}
        </h2>

        <div className="relative">
          <button
            className="mb-3 bg-white text-success rounded-lg flex items-center gap-1 font-semibold cursor-pointer px-4 h-[40px] border border-success justify-center"
            onClick={() => setIsShowDropdown(!isShowDropdown)}
          >
            <p className="text-sm">
              {selectedCommunity.id
                ? selectedCommunity.name
                : "Choose a community"}
            </p>
            <ChevronDownGreenIcon />
          </button>

          {isShowDropdown && (
            <ul className="absolute bg-white w-[200px] left-0 top-8 shadow-gray-100 shadow-inner rounded-lg">
              {categories.map((category, index) => {
                return (
                  <li
                    key={category.id}
                    className="flex items-center justify-between py-2 px-2 hover:bg-green-100"
                    onClick={() => {
                      setSelectedCommunity({
                        categoryId: category.id as number,
                        name: category.name as string,
                      });

                      setIsShowDropdown(false);
                    }}
                  >
                    <span>{category.name}</span>
                    {!isNil(selectedCommunity.id) &&
                      category.id === selectedCommunity && (
                        <span>
                          <CorrectIcon />
                        </span>
                      )}
                  </li>
                );
              })}
            </ul>
          )}
        </div>

        <input
          className="mb-3 bg-transparent border border-[#DADADA] rounded-lg h-10 pl-3 w-full focus:outline-none"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <textarea
          className="mb-1 w-full h-[234px] p-3 border border-[#DADADA] resize-none focus:outline-none rounded-lg"
          placeholder="What's on your mind..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />

        <div className="flex gap-2 justify-end">
          <button
            className={`bg-white rounded-lg w-[105px] h-[40px] border border-success`}
            onClick={() => setIsShowModal(false)}
          >
            <span className="text-success font-semibold">Cancel</span>
          </button>

          <button
            className={`bg-success rounded-lg w-[105px] h-[40px] border-1 border-success`}
            onClick={() => handleSubmitPostModal()}
          >
            <span className="text-white font-semibold">
              {renderSuccessButtonText()}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}
