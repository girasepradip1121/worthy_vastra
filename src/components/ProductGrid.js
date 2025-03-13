  import React from "react";
  import ProductCard from "./ProductCard";

  const ProductGrid = ({ products, handleAddToCart }) => {
    return (
      <div className="">
        {products && products?.length > 0 ? (
          <div className="col-span-1 lg:col-span-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products?.map((product) => (
              <ProductCard key={product.productId} product={product} handleAddToCart={handleAddToCart} />
            ))}
          </div>
        ) : (
          <div className="text-center py-10">
            <h2 className="text-xl font-bold text-gray-500">
              No products available
            </h2>
          </div>
        )}
      </div>
    );
  };

  export default ProductGrid;
