'use client'
import React from "react";
import { useState } from "react";
import axios from "axios";
import Input from "../ui/Input";

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

    try {
      const response = await axios.post("/api/login", formData);

      console.log("Login successful:", response.data);
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  return (

    <div className="flex justify-center items-center min-h-screen bg-red-50 font-navidad">
      <div className="relative flex flex-col bg-[#FFECB4] shadow-xl rounded-lg p-6 w-full max-w-lg border-4 border-dashed border-red-400">
      <img src="/image_2-removebg-preview.png" alt="" className="w-[65px] h-16 self-end" />
      <h1>Inicia Sesión</h1>
      <form onSubmit={handleSubmit}>
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
        <button type="submit">Iniciar Sesión</button>

      </form>
      <a href="#">¿Olvidaste tu contraseña? 🎅</a>
      </div>
    </div>
  );
};

export default LoginForm;

