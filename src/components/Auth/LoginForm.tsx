'use client'
import React from "react";
import { useState } from "react";
import Input from "../ui/Input";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Avisos } from "./components_/Avisos";

const LoginForm: React.FC = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState<string>("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();


    if (!formData.username || !formData.password) {
      console.log("Faltan campos por llenar en el Login");
      return alert("Tienes que llenar todos los campos");
    }

    setIsLoading(true);
    setApiError("");

    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: formData.username,
          password: formData.password,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message);
      }

      const result = await response.json();

      const token = result.token;
      if (token) {
        localStorage.setItem("authToken", token);
        console.log("Inicio de sesión exitoso. Token guardado en localStorage:", token);
        try {
          const response = await fetch("/api/profile", {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          if (!response.ok) {
            throw new Error("Error al obtener los datos del usuario");
          }
          const data = await response.json();
          localStorage.setItem("profile", JSON.stringify(data));
        } catch (error) {
          console.error("Error al obtener los datos del usuario:", error);

        }
      } else {
        throw new Error("No se recibió un token en la respuesta.");
      }

      router.push("/home")
    } catch (error: any) {
      setApiError(error.message);
      console.log("Error al iniciar sesión: HOLAHOLA", apiError);
      setIsLoading(false);

    } finally {
      setIsLoading(false);

    }
  };

  const Layout: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
    return (
      <div className="flex justify-center items-center min-h-screen font-navidad">
        {children}
      </div>
    )
  }

  return (
    <Layout >
      <div className="m-2 relative flex flex-col bg-[#FFECB4] shadow-xl rounded-lg p-6 w-full max-w-lg border-4 border-dashed border-red-400">
        <img src="/image_3-removebg-preview.png" alt="" className="w-[65px] h-16 self-end mb-2" />
        <form onSubmit={handleSubmit} className="grid place-items-center">
          <Input
            type="username"
            name="username"
            placeholder="Nombre de Usuario"
            value={formData.username}
            onChange={handleChange}
          />
          <Input
            type="password"
            name="password"
            placeholder="Contraseña"
            value={formData.password}
            onChange={handleChange}
          />
          {/* meter aqui el erro de contraseña */}
          <Avisos mensajeError={apiError}/>
          <button disabled={isLoading} type="submit" className={`${isLoading ? 'bg-gray-600':'bg-red-600'}  text-white  p-2 my-2 font-semibold rounded-full shadow-lg border-4 border-white`}>Iniciar Sesión</button>

        </form>
        <div className="grid place-items-center text-black">
          ¿No tienes usuario aún?  <Link href="/register" className={`${isLoading ? 'bg-gray-600':'bg-green-600'}  text-white  p-2 my-2 font-semibold rounded-full shadow-lg border-4 border-white`}> Registrate 🎅</Link>
        </div>
      </div>
    </Layout>
  );

};

export default LoginForm;

