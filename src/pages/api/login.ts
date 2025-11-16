import { NextApiRequest, NextApiResponse } from "next";

// Función principal del handler
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Método no permitido" });
  }

  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: "Faltan campos por llenar" });
  }
  const baseUrl = process.env.URL_BD;

  if (!baseUrl) {
    throw new Error("La variable de entorno URL_BD no está configurada");
  }

  try {
    const response = await fetch(`${baseUrl}/user/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });

    const data = await response.json();
    if(!data.success){
      return  res.status(401).json({ message: data.message });  
    }

    const token = data.token;
    if (!token) {
      return res.status(500).json({ message: data });
    }
    return res.status(200).json({ token });
  } catch (error) {
    console.log(error);
    // const contentType = response.headers.get("content-type");
    // if (contentType && contentType.includes("application/json")) {
    //     const errorResponse = await response.json();
    //     console.log(errorResponse)
    //     return res.status(response.status).json({ message: errorResponse.message || "Error en la API externa" });
    // } else {
    //     const errorText = await response.text();

    //     console.log(errorText)
    //     return res.status(response.status).json({ message: `Error en la API externa: ${response.status} ${response.statusText}` });
    // }
  }
}
