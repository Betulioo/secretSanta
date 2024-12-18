import { NextApiRequest, NextApiResponse } from "next";

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

    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({ message: "Token no proporcionado" });
    }

    const token = authHeader.split(" ")[1];

    if (!token) {
      return res
        .status(401)
        .json({ message: "Token inválido o no proporcionado" });
    }

    // Obtener el ID del usuario desde req.query
    const { id } = req.query;

    if (!id || typeof id !== "string") {
      return res
        .status(400)
        .json({ message: "ID de usuario no proporcionado o inválido" });
    }

    // Llamar a la API externa con el ID
    const response = await fetch(`${baseUrl}/groups/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const errorResponse = await response.json();
      return res
        .status(response.status)
        .json({ message: errorResponse.message || "Error en la API externa" });
    }

    const data = await response.json();

    return res.status(200).json(data);
  } catch (error) {
    console.error("Error en el servidor:", error);
    return res.status(500).json({ message: "Error en el servidor" });
  }
}
