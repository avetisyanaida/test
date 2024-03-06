import React from 'react';

const ProductItem = ({ product }) => (
  <li>
    <p>{product.id}</p>
    <p>{product.product}</p>
    <p>{product.price}</p>
    <p>{product.brand || 'Unknown'}</p>
  </li>
);

export default ProductItem;
