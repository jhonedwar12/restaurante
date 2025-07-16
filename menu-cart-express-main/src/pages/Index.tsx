import { useState } from "react";
import { Header } from "@/components/Header";
import { ProductCard } from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useProducts } from "@/hooks/useProducts";
import { useDomis } from "@/hooks/useDomis";
import { LOGO_URL } from "@/constants";

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

interface IndexProps {
  pedidosHabilitados: boolean;
}

const Index = ({ pedidosHabilitados }: IndexProps) => {
  const [cart, setCart] = useState<CartProduct[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("Todos");
  const [selectedBarrio, setSelectedBarrio] = useState("");
  const [domicilio, setDomicilio] = useState(0);
  const [direccion, setDireccion] = useState("");
  const { toast } = useToast();
  const { products, categories, loading } = useProducts();
  const { domis } = useDomis();

  const filteredProducts =
    selectedCategory === "Todos"
      ? products
      : products.filter((product) => product.category === selectedCategory);

  const addToCart = (product: Product, size?: string) => {
    let price = product.price;
    let name = product.name;
    if (size && typeof product.price === "object") {
      price = product.price[size];
      name = `${product.name} (${size})`;
    }
    setCart((prevCart) => {
      const existingItem = prevCart.find(
        (item) => item.id === product.id && (!size || item.name === name)
      );
      if (existingItem) {
        return prevCart.map((item) =>
          item.id === product.id && item.name === name
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prevCart, { ...product, name, price, quantity: 1 }];
      }
    });

    toast({
      title: "¡Producto agregado!",
      description: `${name} se añadió a tu carrito`,
      duration: 2000,
    });
  };

  const updateQuantity = (id: number, quantity: number) => {
    if (quantity === 0) {
      removeFromCart(id);
      return;
    }

    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === id ? { ...item, quantity } : item
      )
    );
  };

  const removeFromCart = (id: number) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));

    toast({
      title: "Producto eliminado",
      description: "El producto se eliminó de tu carrito",
      duration: 2000,
    });
  };

  const handleWhatsAppOrder = () => {
    if (!pedidosHabilitados) {
      toast({
        title: "Pedidos deshabilitados",
        description: "Lo sentimos, los pedidos están temporalmente deshabilitados.",
        variant: "destructive",
      });
      return;
    }

    if (!selectedBarrio) {
      toast({
        title: "Selecciona donde quieres tu pedido",
        description: "Debes hacer la selección antes de hacer el pedido.",
        variant: "destructive",
      });
      return;
    }
    if (
      selectedBarrio !== "Otro barrio a convenir con el cliente" &&
      selectedBarrio !== "Recoger en el restaurante" &&
      (!direccion || direccion.length < 10)
    ) {
      toast({
        title: "Debes escribir tu dirección",
        description:
          "Debes dar la dirección correctamente antes de hacer el pedido.",
        variant: "destructive",
      });
      return;
    }
    if (cart.length === 0) {
      toast({
        title: "Carrito vacío",
        description: "Agrega productos antes de realizar el pedido",
        variant: "destructive",
      });
      return;
    }

    const subtotal = cart.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
    const total = subtotal + domicilio;

    let message = "🖐️ ¡Hola! Me gustaría hacer el siguiente pedido:\n\n";
    cart.forEach((item) => {
      message += `🍗 ${item.name} x${item.quantity} - 💵 $${(
        item.price * item.quantity
      ).toLocaleString()}\n`;
    });

    message += `\n📍 *Para:* ${selectedBarrio}`;
    message += `\n🏡 *Dirección:* ${direccion}`;
    message += `\n🧾 *Subtotal:* $${subtotal.toLocaleString()}`;
    message += `\n🛵 *Domicilio:* $${domicilio.toLocaleString()}`;
    message += `\n💲 *Total:* $${total.toLocaleString()}\n`;
    message += "¡Muchas gracias! 😁 \n\n";
    message += "¡Recuerda, puedes pagar cuando te llegue en *efectivo* o transferir el total al siguiente Nequi: 3022685964 ! ";

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/573136752878?text=${encodedMessage}`;
    window.open(whatsappUrl, "_blank");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 restaurant-gradient rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
            <span className="text-white font-bold text-xl">R</span>
          </div>
          <p className="text-gray-600">Cargando productos...</p>
        </div>
      </div>
    );
  }

  return (
   <div className="min-h-screen bg-white dark:bg-[linear-gradient(to_bottom_right,_rgb(15,15,18),_rgb(22,23,29))]"
   >


      <Header
        cart={cart}
        updateQuantity={updateQuantity}
        removeFromCart={removeFromCart}
        handleWhatsAppOrder={handleWhatsAppOrder}
        deliveryCost={domicilio}
        selectedBarrio={selectedBarrio}
        setSelectedBarrio={setSelectedBarrio}
        setDomicilio={setDomicilio}
        domis={domis}
        direccion={direccion}
        setDireccion={setDireccion}
        pedidosHabilitados={pedidosHabilitados}
      />

      {/* Hero Section */}
      <section
        className="relative py-20 px-4 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `linear-gradient(rgba(255, 144, 53, 0.11), rgba(249, 91, 91, 0.38)), url('https://raw.githubusercontent.com/jhonedwar12/imagenes/main/fondo1.png')`,
        }}
      >
     <div className="container mx-auto text-center py-4 px-2 sm:py-6 sm:px-4 rounded-lg shadow-lg max-w-xs sm:max-w-md md:max-w-xl lg:max-w-2xl" style={{ background: 'linear-gradient(to bottom, rgba(255, 144, 53, 0.72), rgba(249, 91, 91, 0.77))' }}>
 <div className="w-20 h-20 sm:w-28 sm:h-28 mx-auto mb-4 sm:mb-6 transform transition-transform duration-300 hover:rotate-12">
  <img
    src={LOGO_URL}
    alt="Logo Restaurante"
    className="w-24 h-24 sm:w-32 sm:h-32 mx-auto mb-4 transition-transform duration-300 hover:scale-110"
    style={{ borderColor: 'rgba(240, 111, 19, 0)' }}
  />
</div>

  <h1 className="text-2xl sm:text-3xl md:text-5xl font-['Playfair_Display'] font-bold mb-3 sm:mb-4 drop-shadow-2xl">
    Bienvenido a <span className="text-2xl sm:text-4xl font-['Dancing_Script'] uppercase text-neutral-800 drop-shadow-[2px_2px_2px_rgba(0,0,0,0.5)]" style={{ color: 'rgb(255, 255, 255)' }}>Arroz Master</span>
  </h1>
  <p className="text-base sm:text-lg md:text-xl mb-6 sm:mb-8 max-w-md sm:max-w-2xl md:max-w-3xl mx-auto font-['Lora'] leading-relaxed drop-shadow-lg" style={{ color: 'rgba(255, 255, 255, 1)' }}>
    Disfruta de nuestros platos frescos y deliciosos, preparados con amor e ingredientes de la mejor calidad
  </p>
  <div className="w-16 sm:w-24 h-1 mx-auto rounded-full transition-all duration-300 hover:w-20 sm:hover:w-32" style={{ backgroundColor: 'rgb(255, 255, 255)' }}></div>
</div>

      </section>

      {/* Category Filter */}
      <section className="py-8 px-4">
        <div className="container mx-auto">
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                onClick={() => setSelectedCategory(category)}
                className={
                  selectedCategory === category ? "restaurant-gradient text-white" : ""
                }
              >
                {category}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-12 px-4">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                addToCart={addToCart}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4 mt-20">
        <div className="container mx-auto text-center">
        <div className="w-24 h-24 sm:w-32 sm:h-32 mx-auto mb-4">
  <img
    src={LOGO_URL}
    alt="Logo Restaurante"
    className="w-24 h-24 sm:w-32 sm:h-32 mx-auto mb-4 transition-transform duration-300 hover:scale-110"
    style={{ borderColor: 'rgba(240, 111, 19, 0)' }}
  />
</div>

          <h3 className="text-2xl font-bold mb-4">Restaurante Arroz master</h3>
          <p className="text-gray-400 mb-6 max-w-2xl mx-auto">
            Comprometidos con ofrecerte la mejor experiencia gastronómica. Síguenos
            en nuestras redes sociales y mantente al día con nuestras novedades.
          </p>
          <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-400 mb-4">
            <span>📍 Av santander # 54-15, Manizales</span>
            <span>📞 +57 302 2685964</span>
            <span>⏰ Lun-Dom: 11:00 AM - 5:00 PM</span>
          </div>
          <div className="flex justify-center gap-6">
            <a
              href="https://www.instagram.com/arrozmaster_manizales/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-pink-400 hover:text-pink-300 font-semibold transition-colors"
            >
              <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                <path d="M7.75 2h8.5A5.75 5.75 0 0 1 22 7.75v8.5A5.75 5.75 0 0 1 16.25 22h-8.5A5.75 5.75 0 0 1 2 16.25v-8.5A5.75 5.75 0 0 1 7.75 2zm0 1.5A4.25 4.25 0 0 0 3.5 7.75v8.5A4.25 4.25 0 0 0 7.75 20.5h8.5A4.25 4.25 0 0 0 20.5 16.25v-8.5A4.25 4.25 0 0 0 16.25 3.5zm4.25 3.25a5.25 5.25 0 1 1 0 10.5 5.25 5.25 0 0 1 0-10.5zm0 1.5a3.75 3.75 0 1 0 0 7.5 3.75 3.75 0 0 0 0-7.5zm5.25.75a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
              </svg>
              Instagram
            </a>
            <a
              href="https://wa.me/573044696573"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-green-400 hover:text-green-300 font-semibold transition-colors"
            >
              <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.52 3.48A12.07 12.07 0 0 0 12 0C5.37 0 0 5.37 0 12c0 2.12.55 4.19 1.6 6.02L0 24l6.18-1.62A12.07 12.07 0 0 0 12 24c6.63 0 12-5.37 12-12 0-3.21-1.25-6.23-3.48-8.52zM12 22c-1.85 0-3.68-.5-5.26-1.44l-.38-.22-3.67.96.98-3.58-.25-.37A9.94 9.94 0 0 1 2 12c0-5.52 4.48-10 10-10s10 4.48 10 10-4.48 10-10 10zm5.2-7.8c-.28-.14-1.65-.81-1.9-.9-.25-.09-.43-.14-.61.14-.18.28-.7.9-.86 1.08-.16.18-.32.2-.6.07-.28-.14-1.18-.44-2.25-1.4-.83-.74-1.39-1.65-1.55-1.93-.16-.28-.02-.43.12-.57.12-.12.28-.32.42-.48.14-.16.18-.28.28-.46.09-.18.05-.34-.02-.48-.07-.14-.61-1.48-.84-2.03-.22-.53-.45-.46-.61-.47-.16-.01-.34-.01-.52-.01-.18 0-.48.07-.73.34-.25.27-.97.95-.97 2.3 0 1.35.99 2.65 1.13 2.83.14.18 1.95 2.98 4.73 4.06.66.28 1.17.45 1.57.58.66.21 1.26.18 1.73.11.53-.08 1.65-.67 1.89-1.32.23-.65.23-1.2.16-1.32-.07-.12-.25-.18-.53-.32z" />
              </svg>
              WhatsApp
            </a>
          </div>
        </div>
      </footer>

      {/* Promo */}
      <section className="bg-gradient-to-r from-orange-600 to-amber-600 text-white py-8 px-4">
        <div className="container mx-auto text-center">
          <h4 className="text-lg font-semibold mb-2">
            ¿Tu negocio necesita presencia digital?
          </h4>
          <p className="text-orange-100 mb-4">
            Creamos páginas web profesionales y sistemas de automatización para
            impulsar tu empresa
          </p>
          <div className="flex items-center justify-center space-x-4">
            <span className="text-sm">📱 Contáctanos:</span>
            <a
              href="https://wa.me/573127142928?text=Hola!%20Me%20interesa%20una%20página%20web%20para%20mi%20negocio"
              target="_blank"
              rel="noopener noreferrer"
              className="font-bold text-yellow-200 hover:text-yellow-100 transition-colors underline"
            >
              +57 312 714 2928
            </a>
            <a
              href="https://wa.me/573136752878?text=Hola!%20Me%20interesa%20una%20página%20web%20para%20mi%20negocio"
              target="_blank"
              rel="noopener noreferrer"
              className="font-bold text-yellow-200 hover:text-yellow-100 transition-colors underline"
            >
              +57 313 675 2878
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;