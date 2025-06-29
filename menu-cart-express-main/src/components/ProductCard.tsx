import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  description: string;
  category: string;
}

interface ProductCardProps {
  product: Product;
  addToCart: (product: Product, size?: string) => void;
}

export const ProductCard = ({ product, addToCart }: ProductCardProps) => {
  // Si el producto tiene precios por tamaño, selecciona uno por defecto
  const hasSizes = typeof product.price === "object" && product.price !== null;
  const [selectedSize, setSelectedSize] = useState(
    hasSizes ? Object.keys(product.price)[0] : ""
  );

  const handleAdd = () => {
    if (hasSizes) {
      addToCart(product, selectedSize);
    } else {
      addToCart(product);
    }
  };

  return (
    <Card className="overflow-hidden card-hover group cursor-pointer">
      <div className="aspect-square overflow-hidden">
        <img
          src={
            product.image.startsWith("http")
              ? product.image
              : `https://images.unsplash.com/${product.image}`
          }
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>

      <CardContent className="p-4">
        <div className="flex items-start justify-between mb-2">
          <h3 className="text-lg font-semibold break-words">{product.name}</h3>
          <Badge variant="secondary" className="text-xs">
            {product.category}
          </Badge>
        </div>

        <p className="text-gray-600 text-sm mb-3 line-clamp-2">
          {product.description}
        </p>

        {/* Toggle de tamaños si aplica */}
        {hasSizes && (
          <select
            className="mb-3 border rounded px-2 py-1"
            value={selectedSize}
            onChange={(e) => setSelectedSize(e.target.value)}
          >
            {Object.entries(product.price).map(([size, price]) => (
              <option key={size} value={size}>
                {size.charAt(0).toUpperCase() + size.slice(1)} ${" "}
                {Number(price).toLocaleString()}
              </option>
            ))}
          </select>
        )}

        <div className="flex items-center justify-between">
          <span className="text-xl font-bold text-orange-600">
            {hasSizes
              ? `$${Number(product.price[selectedSize]).toLocaleString()}`
              : `$${product.price.toLocaleString()}`}
          </span>
          <Button
            onClick={handleAdd}
            className="restaurant-gradient text-white hover:opacity-90 transition-opacity"
            size="sm"
          >
            Agregar
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
