import { useState, useEffect } from "react";

const InhabilitarPedidos = () => {
  const [habilitado, setHabilitado] = useState(true);
  const [loading, setLoading] = useState(true);
  const ADMIN_TOKEN = "5964"; // Idealmente ponlo en .env o contexto

  const obtenerEstado = () => {
    fetch("https://api-restaurante-mwkh.onrender.com/api/pedidos-habilitados")
      .then((res) => res.json())
      .then((data) => {
        setHabilitado(data.pedidosHabilitados);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error al obtener estado:", error);
        setLoading(false);
      });
  };

  useEffect(() => {
    obtenerEstado(); // primera carga
  }, []);

  const handleToggle = () => {
    const nuevoEstado = !habilitado;

    fetch("https://api-restaurante-mwkh.onrender.com/api/pedidos-habilitados", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${ADMIN_TOKEN}`,
      },
      body: JSON.stringify({ habilitado: nuevoEstado }),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Fallo la autenticación o el servidor");
        return res.json();
      })
      .then((data) => {
        if (data.success) {
          // En lugar de setHabilitado(nuevoEstado), volvemos a leer el estado real
          obtenerEstado();
        } else {
          alert("Error al actualizar el estado");
        }
      })
      .catch((error) => {
        console.error("Error al cambiar estado:", error);
        alert("Error: No tienes permisos o el servidor falló");
      });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <p className="text-lg font-medium">Cargando estado...</p>
      </div>
    );
  }

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
