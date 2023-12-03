import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const CategoriesPage = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/tests/categories/")
      .then((response) => {
        console.log(response.data);
        setCategories(response.data); //response.data isn't getting saved to categories
        console.log(categories);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  return (
    <>
      <ul>
        {categories.map((item) => (
          <li key={item.id}>
            <Link to={ `/dyn_test/${item.pk}`}>{item.name}</Link>
          </li>
        ))}
      </ul>
    </>
  );
};

export default CategoriesPage;
