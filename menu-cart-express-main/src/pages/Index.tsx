import { useState } from "react";
import { Header } from "@/components/Header";
import { ProductCard } from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useProducts } from "@/hooks/useProducts";
import { useDomis } from "@/hooks/useDomis";

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

const Index = () => {
  const [cart, setCart] = useState<CartProduct[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("Todos");
  const [selectedBarrio, setSelectedBarrio] = useState("");
  const [domicilio, setDomicilio] = useState(0);
  const [direccion, setDireccion] = useState("");
  const { toast } = useToast();
  const { products, categories, loading } = useProducts();
  const { domis } = useDomis();

  const filteredProducts = selectedCategory === "Todos"
    ? products
    : products.filter(product => product.category === selectedCategory);

  const addToCart = (product: Product, size?: string) => {
    let price = product.price;
    let name = product.name;
    if (size && typeof product.price === "object") {
      price = product.price[size];
      name = `${product.name} (${size})`;
    }
    setCart(prevCart => {
      const existingItem = prevCart.find(
        item => item.id === product.id && (!size || item.name === name)
      );
      if (existingItem) {
        return prevCart.map(item =>
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

    setCart(prevCart =>
      prevCart.map(item =>
        item.id === id ? { ...item, quantity } : item
      )
    );
  };

  const removeFromCart = (id: number) => {
    setCart(prevCart => prevCart.filter(item => item.id !== id));

    toast({
      title: "Producto eliminado",
      description: "El producto se eliminó de tu carrito",
      duration: 2000,
    });
  };

  const handleWhatsAppOrder = () => {
    if (!selectedBarrio) {
      toast({
        title: "Selecciona donde quieres tu pedido",
        description: "Debes hacer la selección antes de hacer el pedido.",
        variant: "destructive",
      });
      return;
    }
    if (selectedBarrio !== "Otro barrio a convenir con el cliente" && selectedBarrio !== "Recoger en el restaurante") {
      if (!direccion || direccion.length < 10) {
        toast({
          title: "Debes escribir  tu dirección",
          description: "Debes dar la direccion correctamente antes de hacer el pedido.",
          variant: "destructive",
        });
        return;
      }
    }
    if (cart.length === 0) {
      toast({
        title: "Carrito vacío",
        description: "Agrega productos antes de realizar el pedido",
        variant: "destructive",
      });
      return;
    }

    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const total = subtotal + domicilio;

    let message = "  🖐️ ¡Hola! Me gustaría hacer el siguiente pedido:\n\n";
    cart.forEach(item => {
      message += `  🍗 ${item.name} x${item.quantity} - 💵 $${(item.price * item.quantity).toLocaleString()}\n`;
    });

    message += `\n  📍 *Para :* ${selectedBarrio}`;
    message += `\n  🏡 *Dirección:* ${direccion}`;
    message += `\n  🧾 *Subtotal:* $${subtotal.toLocaleString()}`;
    message += `\n  🛵 *Domicilio:* $${domicilio.toLocaleString()}`;
    message += `\n  💲 *Total:* $${total.toLocaleString()}\n`;
    message += "¡Muchas gracias! 😁 \n\n";
    message += "¡Recuerda, puedes pagar cuando te llegue en *efectivo* o transferir el total al siguiente Nequi : 3022685964 ! ";


    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/573136752878?text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank');
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
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-50">
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
      />

      {/* Hero Section  header */}
      <section
        className="relative py-20 px-4 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `linear-gradient(rgba(255, 107, 53, 0.8), rgba(247, 147, 30, 0.8)), url('https://raw.githubusercontent.com/jhonedwar12/imagenes/main/fondo1.png')`
        }}
      >
        <div className="container mx-auto text-center text-white">
          <div className="w-12 h-12 mx-auto mb-4">
            <img
              src="https://raw.githubusercontent.com/jhonedwar12/imagenes/main/imagenpaisa.jpg"
              alt="Logo Restaurante"
              className="w-12 h-12 rounded-full object-cover mx-auto"
            />
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 drop-shadow-lg">
            Bienvenido a <span className="text-white">Arroz master</span>
          </h1>
          <p className="text-xl mb-8 max-w-2xl mx-auto drop-shadow-md">
            Disfruta de nuestros platos frescos y deliciosos, preparados con amor e ingredientes de la mejor calidad
          </p>
          <div className="w-24 h-1 bg-white mx-auto rounded-full"></div>
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
                className={selectedCategory === category ? "restaurant-gradient text-white" : ""}
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
          <div className="w-12 h-12 mx-auto mb-4">
            <img
              src="https://raw.githubusercontent.com/jhonedwar12/imagenes/main/imagenpaisa.jpg"
              alt="Logo Restaurante"
              className="w-12 h-12 rounded-full object-cover mx-auto"
            />
          </div>
          <h3 className="text-2xl font-bold mb-4">Restaurante Arroz master</h3>
          <p className="text-gray-400 mb-6 max-w-2xl mx-auto">
            Comprometidos con ofrecerte la mejor experiencia gastronómica.
            Síguenos en nuestras redes sociales y mantente al día con nuestras novedades.
          </p>
          <div className="flex justify-center space-x-6 text-sm text-gray-400">
            <span>📍 Av santander # 54-15, Manizales</span>
            <span>📞 +57 302 2685964</span>
            <span>⏰ Lun-Dom: 11:00 AM - 5:00 PM</span>
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
            Creamos páginas web profesionales y sistemas de automatización para impulsar tu empresa
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
