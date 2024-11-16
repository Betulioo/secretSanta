import { NextApiRequest, NextApiResponse } from "next";

// Función principal del handler
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Método no permitido" });
  }

  try {
    const baseUrl = process.env.URL_BD;

    if (!baseUrl) {
      throw new Error("La variable de entorno URL_BD no está configurada");
    }

    // Obtener el token del encabezado Authorization
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({ message: "Token no proporcionado" });
    }

    const token = authHeader.split(" ")[1]; // Asume formato: "Bearer <token>"

    if (!token) {
      return res
        .status(401)
        .json({ message: "Token inválido o no proporcionado" });
    }

    // Realizar la solicitud a la API externa con el token
    const response = await fetch(`${baseUrl}/user/profile`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`, // Agregar el token al encabezado
      },
    });

    if (!response.ok) {
      const errorResponse = await response.json();
      return res
        .status(response.status)
        .json({ message: errorResponse.message || "Error en la API externa" });
    }

    const data = await response.json();

    // Enviar los datos del perfil al cliente
    return res.status(200).json(data);
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error en el servidor:", error.message);
      return res.status(500).json({ message: "Error en el servidor" });
    } else {
      console.error("Error en el servidor:", error);
      return res.status(500).json({ message: "Error en el servidor" });
    }
  }
}
