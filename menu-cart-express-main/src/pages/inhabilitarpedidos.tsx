import { useState, useEffect } from "react";

const InhabilitarPedidos = () => {
  const [habilitado, setHabilitado] = useState(true);

  useEffect(() => {
    const estadoGuardado = localStorage.getItem("pedidosHabilitados");
    if (estadoGuardado !== null) {
      setHabilitado(JSON.parse(estadoGuardado));
    }
  }, []);

  const handleToggle = () => {
    setHabilitado((h) => {
      localStorage.setItem("pedidosHabilitados", JSON.stringify(!h));
      return !h;
    });
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <h1 className="text-2xl font-bold mb-6">Administración de Pedidos</h1>
      <p className="mb-4">
        Los pedidos actualmente están:{" "}
        <span className={habilitado ? "text-green-600" : "text-red-600"}>
          {habilitado ? "HABILITADOS" : "INHABILITADOS"}
        </span>
      </p>
      <button
        onClick={handleToggle}
        className={`px-6 py-2 rounded font-semibold ${
          habilitado
            ? "bg-red-500 hover:bg-red-600 text-white"
            : "bg-green-500 hover:bg-green-600 text-white"
        }`}
      >
        {habilitado ? "Inhabilitar pedidos" : "Habilitar pedidos"}
      </button>
    </div>
  );
};

export default InhabilitarPedidos;