import jwt from "jsonwebtoken";
import { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const token = req.headers.authorization?.split(" ")[1]; // Extraer token del header.
  if (!token) {
    return res.status(401).json({ error: "No token provided" });
  }

  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY as string); // Usar la clave del .env.
    if (typeof decoded !== "string" && "data" in decoded) {
      localStorage.setItem("id", decoded.data.id);
    }
    console.log(decoded);
    return res.status(200).json({ message: "Authorized", data: decoded });
  } catch  {
    return res.status(401).json({ error: "Invalid token" });
  }
}
