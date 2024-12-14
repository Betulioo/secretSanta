'use client'
import React from "react";
import { useState } from "react";
import axios from "axios";
import Input from "../ui/Input";
import Link from "next/link";

const LoginForm: React.FC = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

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
  
    // setIsLoading(true);
    // setApiError("");
  
    try {
      // Realizar la solicitud de inicio de sesión
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
        throw new Error(errorData.message || "Error desconocido");
      }
  
      const result = await response.json();
  
      // Guardar el token en localStorage
      const token = result.token;
      if (token) {
        localStorage.setItem("authToken", token);
        console.log("Inicio de sesión exitoso. Token guardado en localStorage:", token);
      } else {
        throw new Error("No se recibió un token en la respuesta.");
      }
  
      // setIsSubmitted(true);
      // setIsSuccess(true);
    } catch (error: any) {
      // setApiError(error.message || "Error en el inicio de sesión");
      console.error("Error al iniciar sesión:", error);
    } finally {
      // setIsLoading(false);
    }
  };

  return (

    <div className="flex justify-center items-center min-h-screen bg-[#7C956F] font-navidad">
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
        <button type="submit" className="bg-red-600 text-white  p-2 my-2 font-semibold rounded-full shadow-lg hover:bg-red-700 transform transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-red-400 focus:ring-opacity-75 border-4 border-white">Iniciar Sesión</button>

      </form>
      <div className="grid place-items-center">
      ¿No tienes usuario aún?  <Link href="/register" className="mt-2"> Registrate 🎅</Link>

      </div>
      </div>
    </div>
  );
};

export default LoginForm;

