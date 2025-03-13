import React from "react";
import ProductCard from "./ProductCard";

const ProductGrid = ({ products = [], handleAddToCart }) => {
  if (!Array.isArray(products)) {
    console.error("Expected products to be an array, but got:", products);
    return (
      <div className="text-center py-10">
        <h2 className="text-xl font-bold text-red-500">Invalid product data</h2>
      </div>
    );
  }

  return (
    <div>
      {products.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <ProductCard key={product.productId} product={product} handleAddToCart={handleAddToCart} />
          ))}
        </div>
      ) : (
        <div className="text-center py-10">
          <h2 className="text-xl font-bold text-gray-500">No products available</h2>
        </div>
      )}
    </div>
  );
};

export default ProductGrid;
