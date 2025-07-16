import { Header } from "@/components/Header";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Clock, MapPin, Phone, Users, Award, Heart } from "lucide-react";

const About = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white dark:bg-[linear-gradient(to_bottom_right,_rgb(15,15,18),_rgb(22,23,29))]">
      <Header
        cart={[]}
        updateQuantity={() => {}}
        removeFromCart={() => {}}
        handleWhatsAppOrder={() => {}}
        deliveryCost={0}
        domis={[]}
        selectedBarrio=""
        setSelectedBarrio={() => {}}
        setDomicilio={() => {}}
        direccion=""
        setDireccion={() => {}}
      />

      {/* Hero Section with Background */}
      <section
        className="relative py-20 px-4 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `linear-gradient(rgba(223, 96, 96, 0.44), rgba(0,0,0,0.5)), url('https://raw.githubusercontent.com/jhonedwar12/imagenes/main/fondo2.png')`,
        }}
      >
        <div className="container mx-auto text-center text-white">
          <Button
            variant="ghost"
            onClick={() => navigate("/")}
            className="mb-6 text-white hover:text-orange-300 dark:hover:text-orange-400"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Volver al Menú
          </Button>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-white">
            Sobre{" "}
            <span className="bg-gradient-to-r from-orange-400 to-amber-400 bg-clip-text text-transparent">
              Nosotros
            </span>
          </h1>
          <p className="text-xl mb-8 max-w-2xl mx-auto text-white dark:text-gray-200">
            Descubre la historia detrás de los sabores que conquistan corazones
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-4xl">
          {/* Our Story */}
          <div className="mb-16">
            <div className="flex items-center justify-center mb-8">
              <Heart className="h-8 w-8 text-orange-500 dark:text-orange-400 mr-3" />
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Nuestra Historia</h2>
            </div>
            <div className="bg-white dark:bg-[#1c1c1f] rounded-xl shadow-lg p-8">
              <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed mb-6">
                Arroz Máster nació con la pasión de ofrecer los mejores arroces y platos frescos de la ciudad. Nos hemos convertido en el punto de encuentro favorito de quienes buscan calidad, sabor y una experiencia gastronómica única.
              </p>
              <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed">
                Cada plato es preparado con amor y dedicación, usando ingredientes frescos y de la mejor calidad. ¡Ven y vive la experiencia Arroz Máster!
              </p>
            </div>
          </div>

          {/* Our Values */}
          <div className="mb-16">
            <div className="flex items-center justify-center mb-8">
              <Award className="h-8 w-8 text-orange-500 dark:text-orange-400 mr-3" />
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Nuestros Valores</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white dark:bg-[#1c1c1f] rounded-xl shadow-lg p-6 text-center">
                <div className="w-16 h-16 restaurant-gradient rounded-full flex items-center justify-center mx-auto mb-4">
                  <Heart className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">Pasión</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Cada plato es preparado con amor y dedicación, porque creemos que la pasión se siente en cada bocado.
                </p>
              </div>
              <div className="bg-white dark:bg-[#1c1c1f] rounded-xl shadow-lg p-6 text-center">
                <div className="w-16 h-16 restaurant-gradient rounded-full flex items-center justify-center mx-auto mb-4">
                  <Award className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">Calidad</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Seleccionamos cuidadosamente cada ingrediente para garantizar la mejor experiencia gastronómica.
                </p>
              </div>
              <div className="bg-white dark:bg-[#1c1c1f] rounded-xl shadow-lg p-6 text-center">
                <div className="w-16 h-16 restaurant-gradient rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">Comunidad</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Somos más que un restaurante, somos parte de la familia de cada cliente que nos visita.
                </p>
              </div>
            </div>
          </div>

          {/* Contact Info */}
          <div className="bg-white dark:bg-[#1c1c1f] rounded-xl shadow-lg p-8">
            <div className="flex items-center justify-center mb-8">
              <MapPin className="h-8 w-8 text-orange-500 dark:text-orange-400 mr-3" />
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Encuéntranos</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
              <div className="flex flex-col items-center">
                <MapPin className="h-6 w-6 text-orange-500 dark:text-orange-400 mb-2" />
                <h3 className="font-semibold text-gray-900 dark:text-white mb-1">Dirección</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Av santander # 54-15<br />Manizales, Colombia
                </p>
              </div>
              <div className="flex flex-col items-center">
                <Phone className="h-6 w-6 text-orange-500 dark:text-orange-400 mb-2" />
                <h3 className="font-semibold text-gray-900 dark:text-white mb-1">Teléfono</h3>
                <p className="text-gray-600 dark:text-gray-300">+57 302 2685964</p>
              </div>
              <div className="flex flex-col items-center">
                <Clock className="h-6 w-6 text-orange-500 dark:text-orange-400 mb-2" />
                <h3 className="font-semibold text-gray-900 dark:text-white mb-1">Horarios</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Lunes a Domingo<br />11:00 AM - 5:00 PM
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 px-4 bg-gray-900 dark:bg-gray-950">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-6">
            ¿Listo para vivir la experiencia Arroz Máster?
          </h2>
          <p className="text-gray-300 dark:text-gray-200 text-lg mb-8 max-w-2xl mx-auto">
            Te invitamos a visitarnos y descubrir por qué somos el restaurante favorito de la ciudad.
          </p>
          <Button
            onClick={() => navigate("/")}
            className="restaurant-gradient text-white hover:opacity-90 transition-opacity"
            size="lg"
          >
            Ver Nuestro Menú
          </Button>
        </div>
      </section>
    </div>
  );
};

export default About;