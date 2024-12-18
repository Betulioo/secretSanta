// pages/api/groups/create.ts
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Método no permitido" });
  }

  const { name, quantity, password } = req.body;

  if (!name || !quantity) {
    return res.status(400).json({ message: "Por favor ingresa todos los campos requeridos" });
  }

  try {
    const token = req.headers.authorization?.split(" ")[1]; // Obtener el token del encabezado

    if (!token) {
      return res.status(401).json({ message: "No se proporcionó token de autenticación" });
    }

    // Llamada al backend para crear el grupo
    const response = await fetch(`${process.env.URL_BD}/groups/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`, // Enviar el token en el header
      },
      body: JSON.stringify({ name, quantity, password }),
    });

    if (!response.ok) {
      const errorResponse = await response.json();
      return res.status(response.status).json({ message: errorResponse.message || "Error en la creación del grupo" });
    }

    const data = await response.json();
    return res.status(200).json(data); // Devuelves la respuesta del backend al cliente
  } catch (error) {
    console.error("Error en la creación del grupo:", error);
    return res.status(500).json({ message: "Error en el servidor" });
  }
}
