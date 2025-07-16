import { Minus, Plus, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Product,CartProduct} from "@/hooks/useProducts"; // o la ruta correcta según tu estructura


interface CartItemProps {
  item: CartProduct;
  updateQuantity: (id: number, quantity: number) => void;
  removeFromCart: (id: number) => void;
}

export const CartItem = ({ item, updateQuantity, removeFromCart }: CartItemProps) => {
  const hasSizes = typeof item.price === "object" && item.price !== null;
  const currentPrice = hasSizes && item.selectedSize 
    ? item.price[item.selectedSize] 
    : item.price;

  return (
    <div className="group flex items-start space-x-3 p-3 bg-gray-50 rounded-lg transition-transform duration-200 hover:scale-[1.02] active:scale-[1.03]">
      <picture>
        {item.image.endsWith(".webp") && (
          <source
            srcSet={`https://raw.githubusercontent.com/jhonedwar12/imagenes/main/${item.image}`}
            type="image/webp"
          />
        )}
        <img
          src={
            item.image.startsWith("http")
              ? item.image
              : `https://raw.githubusercontent.com/jhonedwar12/imagenes/main/${item.image}`
          }
          alt={item.name}
          className="w-20 h-20 object-cover rounded-md flex-shrink-0 bg-gray-100"
          loading="lazy"
        />
      </picture>

      <div className="flex-1 min-w-0">
        <div className="flex justify-between items-start mb-2">
          <h4
            className="
              font-medium text-sm text-gray-900
              truncate pr-2
              group-hover:whitespace-normal group-hover:break-words group-hover:leading-snug group-hover:max-w-full
              transition-all duration-200 ease-in-out
            "
          >
            {item.name} {hasSizes && item.selectedSize && `(${item.selectedSize})`}
          </h4>

          <Button
            variant="ghost"
            size="icon"
            className="h-6 w-6 text-red-500 hover:text-red-700 flex-shrink-0"
            onClick={() => removeFromCart(item.id)}
          >
            <X className="h-3 w-3" />
          </Button>
        </div>

        <p className="text-sm text-orange-600 font-semibold mb-2">
          ${Number(currentPrice).toLocaleString()}
        </p>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="icon"
              className="h-6 w-6"
              onClick={() => updateQuantity(item.id, Math.max(0, item.quantity - 1))}
            >
              <Minus className="h-3 w-3" />
            </Button>

            <span className="text-sm font-medium w-6 text-center">{item.quantity}</span>

            <Button
              variant="outline"
              size="icon"
              className="h-6 w-6"
              onClick={() => updateQuantity(item.id, item.quantity + 1)}
            >
              <Plus className="h-3 w-3" />
            </Button>
          </div>

          <div className="text-right">
            <p className="text-sm font-semibold text-gray-900">
              ${(Number(currentPrice) * item.quantity).toLocaleString()}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};