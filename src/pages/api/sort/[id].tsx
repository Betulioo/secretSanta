import { NextApiRequest, NextApiResponse } from "next";

// Función principal del handler
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== "GET") {
        return res.status(405).json({ message: "Método no permitido" });
    }

    const { id } = req.query;
    console.log(id);
    
    try {
      const baseUrl = process.env.URL_BD;
      const token = req.headers.authorization?.split(" ")[1]; // Obtener el token del encabezado

      if (!baseUrl) {
        throw new Error("La variable de entorno URL_BD no está configurada");
      }

      const response = await fetch(`${baseUrl}/groups/sort/${id}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // Enviar el token en el header
        },
      });

      if (!response.ok) {
        const errorResponse = await response.json();
        return res
          .status(response.status)
          .json({
            message: errorResponse.message || "Error en la API externa",
          });
      }

      const data = await response.json();

      console.log(data);

      // Enviar el token al cliente
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
