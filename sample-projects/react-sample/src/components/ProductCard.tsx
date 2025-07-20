import React from 'react';

/**
 * Displays product information in a card format
 */
interface ProductCardProps {
  productId: string;
  showImage: boolean;
  onSelect?: () => void;
}

export function ProductCard({ productId, showImage, onSelect }: ProductCardProps) {
  return (
    <div className="product-card" onClick={onSelect}>
      {showImage && (
        <div className="product-image">
          <img src={`/products/${productId}.jpg`} alt="Product image" />
        </div>
      )}
      <div className="product-info">
        <h3>Product {productId}</h3>
        <p>Product details go here</p>
      </div>
    </div>
  );
} 