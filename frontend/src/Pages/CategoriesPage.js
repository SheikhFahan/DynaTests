import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const CategoriesPage = () => {
  const [categories, setCategories] = useState([]);
  const [combinationCategories, setCombinationCategories] = useState([]);

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

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/tests/test_combination/")
      .then((response) => {
        console.log(response.data);
        setCombinationCategories(response.data); //response.data isn't getting saved to categories
        console.log(setCombinationCategories);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);
  console.log(categories);

  return (
    <>
      <h3>Categories</h3>
      <div style={{ display: "flex", gap: "10px" }}>
        {categories.map((item) => (
          <button key={item.pk}>
            <Link to={`/dyn_test/${item.pk}`}>{item.name}</Link>
          </button>
        ))}
      </div>
      <br/>
      <h3>Combination categories</h3>
      <div style={{ display: "flex", gap: "10px" }}>
        {combinationCategories.map((item) => (
          <button key={item.pk}>
            <Link to={`/comb_dyn_test/${item.pk}`}>{item.name}</Link>
          </button>
        ))}
      </div>
    </>
  );
};

export default CategoriesPage;
