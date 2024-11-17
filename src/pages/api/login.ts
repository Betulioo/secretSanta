import { NextApiRequest, NextApiResponse } from "next";

// Función principal del handler
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== "POST") {
        return res.status(405).json({ message: "Método no permitido" });
    }

    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ message: "Faltan campos por llenar" });
    }

    try {
        const baseUrl = process.env.URL_BD;

        if (!baseUrl) {
            throw new Error("La variable de entorno URL_BD no está configurada");
        }

        const response = await fetch(`${baseUrl}/user/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ username, password }),
        });

        if (!response.ok) {
            const errorResponse = await response.json();
            return res.status(response.status).json({ message: errorResponse.message || "Error en la API externa" });
        }

        const data = await response.json();
        const token = data.token; // Asumiendo que el token está en la respuesta de la API externa

        if (!token) {
            return res.status(500).json({ message: "No se recibió el token de autenticación" });
        }

        // Enviar el token al cliente
        return res.status(200).json({ token });
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
