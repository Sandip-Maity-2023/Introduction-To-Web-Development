import React from "react";

const Products = ({product}) => {
  return (
    <tr>
      <td>{product.id}</td>
      <td>{product.name}</td>
      <td>{product.price}</td>
    </tr>
  );
};

export default Products;



