import { NextApiRequest, NextApiResponse } from 'next';

// Función principal del handler
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Manejar solo el método POST
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Método no permitido' });
  }

  // Extraer el cuerpo de la solicitud
  const body = JSON.parse(req.body)
  const { username, password, email } = body;

  // Validar campos requeridos

  if (!username || !password || !email) {
    return res.status(400).json({ message: 'Faltan campos por llenar' });
  }

  try {
    // Obtener URL desde las variables de entorno
    const baseUrl = process.env.URL_BD;

    if (!baseUrl) {
      throw new Error('La variable de entorno URL_BD no está configurada');
    }

    // Realizar la solicitud a la API externa
    const response = await fetch(`${baseUrl}/user/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password, email }),
    });

    // Manejar errores de la API externa
    if (!response.ok) {
      const errorResponse = await response.json();
      return res.status(response.status).json({ message: errorResponse.message || 'Error en la API externa' });
    }

    // Obtener la respuesta de la API externa y enviarla al cliente
    const data = await response.json();
    return res.status(200).json(data);
  } catch (error) {
    if (error instanceof Error) {
      console.error('Error en el servidor:', error.message);
      return res.status(500).json({ message: 'Error en el servidor' });
    } else {
      console.error('Error en el servidor:', error);
      return res.status(500).json({ message: 'Error en el servidor' });
    }
  }
}
