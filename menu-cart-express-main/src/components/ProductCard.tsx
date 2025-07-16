import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Product } from "@/hooks/useProducts"; // Ajusta la ruta si es diferente

interface ProductCardProps {
  product: Product;
  addToCart: (product: Product, size?: string) => void;
}

export const ProductCard = ({ product, addToCart }: ProductCardProps) => {
  const hasSizes = typeof product.price === "object" && product.price !== null;

  const [selectedSize, setSelectedSize] = useState(
    hasSizes ? Object.keys(product.price)[0] : ""
  );

  // Determinar imagen actual según el tamaño seleccionado
  const currentImage = hasSizes && product.images?.[selectedSize]
    ? product.images[selectedSize]
    : product.image;

  // Estado para controlar el src mostrado y el efecto visual
  const [displayedImage, setDisplayedImage] = useState("");
  const [loaded, setLoaded] = useState(false);

  // Cargar imagen de forma asincrónica
  useEffect(() => {
    if (!currentImage) return;

    const img = new Image();
    const finalSrc = currentImage.startsWith("http")
      ? currentImage
      : `https://raw.githubusercontent.com/jhonedwar12/imagenes/main/${currentImage}`;

     setLoaded(false); // Ocultar mientras carga

  img.src = finalSrc;

  img.onload = () => {
    // Espera 300ms antes de mostrar
    setTimeout(() => {
      setDisplayedImage(finalSrc);
      setLoaded(true);
    }, 300); // puedes probar con 500 o 700 si quieres aún más suave
  };
}, [currentImage]);

  const currentPrice = hasSizes
    ? product.price[selectedSize]
    : product.price;

  const handleAdd = () => {
    if (hasSizes) {
      addToCart({ ...product, image: currentImage }, selectedSize);
    } else {
      addToCart(product);
    }
  };

  return (
   <Card className="overflow-hidden card-hover group cursor-pointer bg-white dark:bg-gradient-to-br dark:from-[#363738] dark:to-[#2a2b2c]">
  <div className="aspect-square overflow-hidden bg-gray-100 dark:bg-gray-800">
    <picture>
      {displayedImage.endsWith(".webp") && (
        <source srcSet={displayedImage} type="image/webp" />
      )}
      <img
        src={displayedImage}
        alt={product.name}
        className={`w-full h-full object-cover transition-all duration-700 ease-in-out ${
          loaded ? "opacity-100 scale-100" : "opacity-0 scale-105"
        }`}
        loading="lazy"
      />
    </picture>
  </div>

  <CardContent className="p-4">
    <div className="flex items-start justify-between mb-2">
      <h3 className="text-lg font-semibold break-words text-gray-900 dark:text-white">
        {product.name}
      </h3>
    </div>

    <p className="text-gray-600 text-sm mb-3 break-words dark:text-gray-300">
      {product.description}
    </p>

    {hasSizes && (
      <select
        className="mb-3 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-black dark:text-white rounded-md px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition"
        value={selectedSize}
        onChange={(e) => setSelectedSize(e.target.value)}
      >
        <option disabled value="">
          Selecciona un tamaño
        </option>
        {Object.entries(product.price).map(([size, price]) => (
          <option key={size} value={size}>
            {size.charAt(0).toUpperCase() + size.slice(1)} – ${Number(price).toLocaleString()}
          </option>
        ))}
      </select>
    )}

    <div className="flex items-center justify-between">
      <span className="text-xl font-bold text-orange-600 dark:text-orange-300">
        ${Number(currentPrice).toLocaleString()}
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
