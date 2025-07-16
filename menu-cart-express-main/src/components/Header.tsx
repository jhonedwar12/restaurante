import { ShoppingCart, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link, useLocation } from "react-router-dom";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { CartItem } from "./CartItem";
import { LOGO_URL } from "@/constants";
import { useEffect } from "react";

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  description: string;
  category: string;
}

interface CartProduct extends Product {
  quantity: number;
}

interface HeaderProps {
  cart: CartProduct[];
  updateQuantity: (id: number, quantity: number) => void;
  removeFromCart: (id: number) => void;
  handleWhatsAppOrder: () => void;
  deliveryCost: number;
  domis: { barrio: string; tarifa: number }[];
  selectedBarrio: string;
  setSelectedBarrio: (barrio: string) => void;
  setDomicilio: (tarifa: number) => void;
  direccion: string;
  setDireccion: (direccion: string) => void;
  pedidosHabilitados: boolean;
}

export const Header = ({
  cart,
  updateQuantity,
  removeFromCart,
  handleWhatsAppOrder,
  deliveryCost,
  domis,
  selectedBarrio,
  setSelectedBarrio,
  setDomicilio,
  direccion,
  setDireccion,
  pedidosHabilitados,
}: HeaderProps) => {
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const totalPrice = subtotal + (cart.length > 0 ? deliveryCost : 0);
  const location = useLocation();

  useEffect(() => {
    if (
      selectedBarrio === "Recoger en el restaurante" ||
      selectedBarrio === "Otro barrio a convenir con el cliente"
    ) {
      setDireccion(""); // Limpia la dirección si el barrio no la requiere
    }
  }, [selectedBarrio, setDireccion]);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="container mx-auto px-8 h-20 flex items-center justify-between">
          <div className="flex flex-col sm:flex-row items-center sm:space-x-2 space-y-2 sm:space-y-0">
            <Link to="/" className="flex items-center space-x-2">
              <img
                src={LOGO_URL}
                alt="Logo Restaurante"
                className="w-14 h-14 sm:w-16 sm:h-16 rounded-full object-cover"
                style={{ borderColor: "rgba(240, 111, 19, 0)" }}
              />
              <h1 className="text-2xl sm:text-4xl font-extrabold uppercase text-neutral-800 drop-shadow-[2px_2px_2px_rgba(0,0,0,0.5)]">
                Arroz Master
              </h1>
            </Link>
          </div>
        </div>

        <nav className="hidden md:flex items-center space-x-6">
          <Link
            to="/"
            className={`text-sm font-semibold hover:text-orange-600 ${location.pathname === "/" ? "text-orange-600" : "text-gray-700"
              }`}
          >
            Menú
          </Link>
          <Link
            to="/sobre-nosotros"
            className={`text-sm font-semibold hover:text-orange-600 ${location.pathname === "/sobre-nosotros" ? "text-orange-600" : "text-gray-700"
              }`}
          >
            Sobre Nosotros
          </Link>


        </nav>

        <div className="flex items-center space-x-2">
          {/* Navegación móvil */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="sm" className="md:hidden">
                <Menu className="h-4 w-4" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="flex flex-col min-h-screen p-4 pb-16 bg-[#fff9ec] text-gray-900 dark:bg-[#1c1c1f] dark:text-gray-100">
              <SheetHeader>
                <SheetTitle>Navegación</SheetTitle>
              </SheetHeader>
              <div className="mt-6 space-y-4">
                <Link
                  to="/"
                  className={`block text-lg font-medium hover:text-orange-600 ${location.pathname === "/" ? "text-orange-600" : "text-gray-700"
                    }`}
                >
                  Menú
                </Link>
                <Link
                  to="/sobre-nosotros"
                  className={`block text-lg font-medium hover:text-orange-600 ${location.pathname === "/sobre-nosotros" ? "text-orange-600" : "text-gray-700"
                    }`}
                >
                  Sobre Nosotros
                </Link>
              </div>
            </SheetContent>
          </Sheet>

          {/* Carrito */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="sm" className="relative">
                <ShoppingCart className="h-4 w-4" />
                {totalItems > 0 && (
                  <Badge
                    variant="destructive"
                    className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs"
                  >
                    {totalItems}
                  </Badge>
                )}
              </Button>
            </SheetTrigger>

            <SheetContent className="flex flex-col min-h-screen p-4 pb-16 bg-[#fff9ec] text-gray-900 dark:bg-[#1c1c1f] dark:text-gray-100">
              {!pedidosHabilitados ? (
                <div className="flex-1 flex items-center justify-center">
                  <p className="text-center text-lg text-red-600 dark:text-red-400 font-semibold">
                    No tenemos servicio en este momento
                  </p>
                </div>
              ) : cart.length === 0 ? (
                <div className="flex-1 flex items-center justify-center">
                  <p className="text-center text-lg #000000 dark:text-red-400 font-semibold">
                    El carrito está vacío
                  </p>
                </div>
              ) : (
                <>
                  <SheetHeader>
                    <SheetTitle className="text-center #000000 dark:text-amber-400 py-2">
                      Carrito de Compras
                    </SheetTitle>
                    <SheetDescription>Revisa tu pedido antes de continuar</SheetDescription>
                  </SheetHeader>

                  <div className="flex-1 overflow-y-auto mt-2 space-y-2">
                    {cart.map((item) => (
                      <CartItem
                        key={item.id}
                        item={item}
                        updateQuantity={updateQuantity}
                        removeFromCart={removeFromCart}
                      />
                    ))}
                  </div>

                  <div className="border-t pt-3 space-y-2 bg-[#fff9ec] dark:bg-[#1c1c1f]">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Subtotal:</span>
                      <span className="text-sm font-medium">${subtotal.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between items-center dark:bg-[#1c1c1f]">
                      <span className="text-sm">Domicilio:</span>
                      <span className="text-sm font-medium">${deliveryCost.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between items-center border-t pt-2 dark:bg-[#1c1c1f]">
                      <span className="text-lg font-semibold">Total:</span>
                      <span className="text-xl font-bold text-orange-600 dark:text-orange-400">
                        ${totalPrice.toLocaleString()}
                      </span>
                    </div>
                    <label htmlFor="barrio" className="font-semibold mb-1 block dark:bg-[#1c1c1f]">
                      Selecciona dónde quieres tu pedido:
                    </label>
                    <select
                      id="barrio"
                      value={selectedBarrio}
                      onChange={(e) => {
                        const barrio = e.target.value;
                        setSelectedBarrio(barrio);
                        const tarifa = barrio === "" ? 0 : domis.find((b) => b.barrio === barrio)?.tarifa || 0;
                        setDomicilio(tarifa);
                      }}
                      className="border rounded px-3 py-2 w-full mb-1 bg-white dark:bg-[#1c1c1f] dark:border-gray-600 dark:text-gray-100"
                    >
                      <option value="">Seleccionar</option>
                      {domis.map((b) => (
                        <option key={b.barrio} value={b.barrio}>
                          {b.barrio} ${b.tarifa.toLocaleString()}
                        </option>
                      ))}
                      <option value="Recoger en el restaurante">Recoger en el restaurante</option>
                      <option value="Otro barrio a convenir con el cliente">Otro barrio o zona</option>
                    </select>

                    {selectedBarrio &&
                      selectedBarrio !== "Recoger en el restaurante" &&
                      selectedBarrio !== "Otro barrio a convenir con el cliente" && (
                        <input
                          id="direccion"
                          type="text"
                          value={direccion}
                          onChange={(e) => setDireccion(e.target.value)}
                          maxLength={28}
                          className="border rounded px-3 py-2 w-full mb-1 bg-white dark:bg-gray-800 dark:border-gray-600 dark:text-gray-100"
                          placeholder="Escribe tu dirección aquí..."
                          required
                        />
                      )}

                    <Button
                      onClick={handleWhatsAppOrder}
                      disabled={!pedidosHabilitados}
                      className={`w-full mt-2 text-white font-semibold transition ${pedidosHabilitados
                        ? "bg-green-500 hover:bg-green-600 dark:bg-green-600 dark:hover:bg-green-700"
                        : "bg-gray-400 dark:bg-gray-700 cursor-not-allowed"
                        }`}
                    >
                      Finalizar pedido por WhatsApp
                    </Button>

                    <div className="h-5 flex items-center justify-center text-xs text-gray-500 dark:text-gray-400 mt-2">
                      .
                    </div>
                  </div>
                </>
              )}
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};