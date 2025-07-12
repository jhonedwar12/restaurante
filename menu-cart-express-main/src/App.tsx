import { useEffect, useState } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import About from "./pages/About";
import NotFound from "./pages/NotFound";
import InhabilitarPedidos from "./pages/inhabilitarpedidos";

const queryClient = new QueryClient();

const App = () => {
  const [pedidosHabilitados, setPedidosHabilitados] = useState(true);

  const fetchPedidosHabilitados = async () => {
    try {
      const res = await fetch("https://api-restaurante-mwkh.onrender.com/api/pedidos-habilitados");
      const data = await res.json();
      setPedidosHabilitados(data.pedidosHabilitados);
    } catch (error) {
      console.error("Error obteniendo estado de pedidos:", error);
      setPedidosHabilitados(true); // Fallback
    }
  };

  useEffect(() => {
    fetchPedidosHabilitados(); // Carga inicial
    const interval = setInterval(fetchPedidosHabilitados, 30000); // Actualiza cada 30 segundos

    return () => clearInterval(interval); // Limpia el intervalo al desmontar
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route
              path="/"
              element={<Index pedidosHabilitados={pedidosHabilitados} />}
            />
            <Route path="/sobre-nosotros" element={<About />} />
            <Route
              path="/inhabilitar-pedidos/5964"
              element={<InhabilitarPedidos />}
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;