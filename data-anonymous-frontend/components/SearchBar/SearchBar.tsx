"use client";

import { useCategoryStore, useCreatePostModal, usePostStore } from "@/hooks";
import { ChevronDownIcon, CorrectIcon, MagnifierIcon } from "@/icons";
import { fetchCategoriesService } from "@/services";
import { isNil } from "lodash";
import { useEffect, useState } from "react";

export default function SearchBar() {
  const [search, setSearch] = useState("");
  const [isShowDropdown, setIsShowDropdown] = useState(false);
  const { categoryId, setCategoryId } = usePostStore();
  const [categoryName, setCategoryName] = useState("");

  const { categories, setCategories, clearCategories } = useCategoryStore();
  const { isShowModal, setIsShowModal, setPostModalAction } =
    useCreatePostModal();

  const fetchCategories = async () => {
    const categoriesResponse = await fetchCategoriesService();
    setCategories(categoriesResponse);
  };

  const handleClickCategoryItem = (categoryId: number) => {
    setCategoryId(categoryId);
  };

  useEffect(() => {
    fetchCategories();

    return clearCategories();
  }, []);

  return (
    <div className="flex items-center gap-2 sm:gap-8 pb-4 sm:pb-8">
      <div className="relative w-full">
        <div className="block sm:absolute h-10 sm:left-2">
          <div className="h-10 flex justify-start sm:justify-center items-center">
            <MagnifierIcon />
          </div>
        </div>
        <input
          className="hidden sm:block bg-transparent border border-green-100 rounded-lg h-10 pl-8 w-full focus:outline-none"
          onChange={(e) => setSearch(e.target.value)}
          value={search}
          placeholder="Search"
        />
      </div>

      <div className="relative w:full sm:w-auto">
        <button
          className="flex items-center text-sm gap-1 font-semibold cursor-pointer"
          onClick={() => setIsShowDropdown(!isShowDropdown)}
        >
          <p>{categoryName ? categoryName : "Community"}</p>
          <ChevronDownIcon />
        </button>

        {isShowDropdown && (
          <div className="sm:hidden fixed left-0 top-0 h-screen w-screen flex justify-center items-center bg-black bg-opacity-50 z-20" />
        )}

        {isShowDropdown && (
          <ul className="absolute bg-white w-[200px] right-0 top-8 shadow-gray-100 shadow-inner rounded-lg z-30">
            <li
              className="flex items-center justify-between py-2 px-2 hover:bg-green-100"
              onClick={() => {
                handleClickCategoryItem(0);
                setCategoryName("");
                setIsShowDropdown(false);
              }}
            >
              <span>All</span>
              {!categoryName && (
                <span>
                  <CorrectIcon />
                </span>
              )}
            </li>
            {categories.map((category) => {
              return (
                <li
                  key={category.id}
                  className="flex items-center justify-between py-2 px-2 hover:bg-green-100"
                  onClick={() => {
                    handleClickCategoryItem(category.id);
                    setCategoryName(category.name);
                    setIsShowDropdown(false);
                  }}
                >
                  <span>{category.name}</span>
                  {!isNil(categoryId) && category.id === categoryId && (
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

      <button
        className={`bg-success rounded-lg sm:px-0 w-[65%] sm:w-32 h-10 border-1 border-success relative text-sm`}
        onClick={() => {
          setIsShowModal(!isShowModal);
          setPostModalAction("CREATE");
        }}
      >
        <span className="text-white font-semibold">Create +</span>
      </button>
    </div>
  );
}
