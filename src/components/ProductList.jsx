import React, { useState, useEffect } from 'react';
import { makeRequest } from '../services/Api';
import ProductItem from './ProductItem';
import Filter from './Filter';
import Pagination from './Pagination';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [filters, setFilters] = useState({
    name: '',
    minPrice: '',
    maxPrice: '',
    brand: '',
  });

  const fetchProductList = async (page) => {
    try {
      setIsLoading(true);

      const limit = 50;
      const offset = (page - 1) * limit;

      const filterParams = {
        minPrice: parseInt(filters.minPrice, 10) || undefined,
        maxPrice: parseInt(filters.maxPrice, 10) || undefined,
        ...filters,
      };

      const productIds = await makeRequest('get_ids', {
        offset,
        limit,
        ...filterParams,
      });

      const uniqueProductIds = Array.from(new Set(productIds));

      const productDetails = await makeRequest('get_items', {
        ids: uniqueProductIds,
      });

      const productsWithKeys = productDetails.map((product, index) => ({
        ...product,
        id: `${product.id}-${index}`,
      }));

      setProducts(productsWithKeys);
    } catch (error) {
      console.error('Ошибка при получении списка товаров:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchTotalPages = async () => {
    const totalProducts = await makeRequest('get_ids', {
      offset: 0,
      limit: 500,
      ...filters,
    });

    const total = totalProducts.length;
    const totalPages = Math.ceil(total / 50);

    setTotalPages(totalPages);
  };

  const handleFilterChange = (filterName, value) => {
    setFilters((prevFilters) => {
      return { ...prevFilters, [filterName]: value };
    });
  };

  const handleApplyFilters = () => {
    setCurrentPage(1);
    fetchProductList(1, filters);
    fetchTotalPages(filters);
  };

  useEffect(() => {
    fetchProductList(1, filters);
    fetchTotalPages(filters);
  }, [currentPage, filters]);

  return (
    <div className="app-container">
      <h1>Products</h1>
      <Filter
        filters={filters}
        onFilterChange={handleFilterChange}
        onApplyFilters={handleApplyFilters}
      />
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <ul className="ul-list">
          <div className="headerProducts">
            <p>ID</p>
            <p>Name</p>
            <p>Price</p>
            <p>Brand</p>
          </div>
          <hr />
          {products.map((product) => (
            <ProductItem key={product.id} product={product} />
          ))}
        </ul>
      )}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={(page) => setCurrentPage(page)}
      />
    </div>
  );
};

export default ProductList;
