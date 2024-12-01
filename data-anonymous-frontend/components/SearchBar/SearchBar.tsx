"use client";

import { usePostStore } from "@/hooks";
import { ChevronDownIcon, CorrectIcon, MagnifierIcon } from "@/icons";
import { fetchCategoriesService } from "@/services";
import { isNil } from "lodash";
import { useEffect, useState } from "react";

export default function SearchBar() {
  const [search, setSearch] = useState("");
  const [categories, setCategories] = useState([]);
  const [isShowDropdown, setIsShowDropdown] = useState(false);
  const { categoryId, setCategoryId } = usePostStore();

  const fetchCategories = async () => {
    const categoriesResponse = await fetchCategoriesService();
    setCategories(categoriesResponse);
  };

  const handleClickCategoryItem = (categoryId: number) => {
    setCategoryId(categoryId);
  };

  useEffect(() => {
    fetchCategories();

    return setCategories([]);
  }, []);

  return (
    <div className="flex items-center gap-8 pb-8">
      <div className="relative w-full">
        <div className="absolute h-10 left-2">
          <div className="h-10 flex justify-center items-center">
            <MagnifierIcon />
          </div>
        </div>
        <input
          className="bg-transparent border border-green-100 rounded-lg h-10 pl-8 w-full"
          onChange={(e) => setSearch(e.target.value)}
          value={search}
          placeholder="Search"
        />
      </div>

      <div className="relative">
        <button
          className="flex items-center gap-1 font-semibold cursor-pointer"
          onClick={() => setIsShowDropdown(!isShowDropdown)}
        >
          <p>Community</p>
          <ChevronDownIcon />
        </button>

        {isShowDropdown && (
          <ul className="absolute bg-white w-[200px] right-0 top-8 shadow-gray-100 shadow-inner rounded-lg">
            {categories.map((category, index) => {
              return (
                <li
                  key={category.id}
                  className="flex items-center justify-between py-2 px-2 hover:bg-green-100"
                  onClick={() => handleClickCategoryItem(category.id)}
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
        className={`bg-success rounded-lg w-32 h-10 border-1 border-success relative`}
      >
        <span className="text-white font-semibold">Create +</span>
      </button>
    </div>
  );
}
