import { useRouter } from "next/router";
import React, { FC, useState, useEffect, useRef } from "react";
import { Category } from "../../../types";
import SidebarItem from "./SidebarItem";

interface CategoriesProps {
  categories: Category[];
  title: string;
  name: string;
  type: "checkbox" | "radio";
}

const Categories: FC<CategoriesProps> = ({ categories, title, name, type }) => {
  const router = useRouter();

  const [check, setCheck] = useState<string[]>(
    (router.query[name] as string)?.split(",") || []
  );

  useEffect(() => {
    if (check && check.length > 0) {
      router.push({
        query: {
          ...router.query,
          [name]: check.join(","),
        },
      });
    } else {
      if (check.length === 0) {
        delete router.query[name];
        router.push({
          query: {
            ...router.query,
          },
        });
      }
    }
  }, [check]);

  const handleChange = (e: any) => {
    if (check.some((item) => item === e.target.value)) {
      return setCheck(check.filter((item) => item !== e.target.value));
    }
    if (type === "checkbox") {
      setCheck([...check, e.target.value]);
    } else {
      setCheck([e.target.value]);
    }
  };

  return (
    <SidebarItem title={title}>
      <ul className="mt-2">
        {categories.map((item) => (
          <li key={item._id} className="mb-2 last:mb-0">
            <div className="flex items-center">
              <input
                onChange={handleChange}
                checked={check?.includes(item._id)}
                className="mr-2"
                type="checkbox"
                value={item._id}
              />
              <p className="font-normal text-xs text-gray-600 line-clamp-1">
                {item.name}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </SidebarItem>
  );
};

export default Categories;
