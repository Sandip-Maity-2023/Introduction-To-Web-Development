import React from "react";
import Products from "./Product";

const ProductList = ({p}) => {
  return (
    <div>
      <h2>products List</h2>
      <table border={1}>
        <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {p.map((p1) => (
            <Products key={p1.id} product={p1} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductList;
