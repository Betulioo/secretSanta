'use client'

import React from "react";
import { useState } from "react";
import { useForm } from "react-form-ease";
import Input from "./Input";

const GroupCreationForm: React.FC = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState<string>("");
  const [isSuccess, setIsSuccess] = useState(false);

  const {
    formData,
    updateForm,
    validateForm,
    errors: formErrors = {},
  } = useForm({
    data: {
      name: "",
      quantity: "",
    },
    validations: {
      name: (value) => {
        if (!value) return "Por favor ingresa el nombre del grupo";
      },
      quantity: (value) => {
        if (!value) return "Por favor ingresa la cantidad de personas.";
        if (isNaN(Number(value)))
          return "La cantidad debe ser un número válido.";
        if (Number(value) <= 0) return "La cantidad debe ser mayor que 0."; //
      },
    },
  });


  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const isValid = validateForm();
    if (!isValid) {
      console.log("Errores en el formulario:", formErrors);
      return;
    }

    setIsLoading(true);
    setApiError("");

    try {
      const response = await fetch("/api/createGroups", {
        method: "POST",
        body: JSON.stringify({
          name: formData.name,
          quantity: formData.quantity,
          // password: formData.password,
        }),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("authToken")}`, 
        },
      });
      console.log(formData)

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Error desconocido");
      }

      const result = await response.json();
      console.log("Grupo creado:", result);
      setIsSubmitted(true);
      setIsSuccess(true);
    } catch (error: any) {
      setApiError(error.message || "Error al crear el grupo");
      console.error("Error al crear el grupo:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const closePopup = () => {
    setIsSubmitted(false);
  };
  return (
    <>
      <div
        className="mt-12 max-w-2xl mx-auto p-10 shadow-xl border border-gray-200 relative w-full max-w-md p-8 bg-white bg-opacity-90 shadow-md rounded-lg text-center mb-8"
        style={{
          backgroundImage: 'url("/decor.jpg")',
          backgroundSize: "contain",
          backgroundPosition: "center",
        }}
      >
        {/* Título */}

        <div className="mt-4 text-center mb-8">
          <h2 className="text-4xl font-extrabold text-black-900 tracking-wide">
            🎁 Crear Grupo de Secret Santa
          </h2>
          <p className="mt-2 text-lg text-black-600 font-medium">
            Organiza tu intercambio de regalos con estilo.
          </p>
        </div>

        {/* Formulario */}
        <form className="space-y-8" onSubmit={handleSubmit}>
          {/* Campo: Nombre del grupo */}
          <div>
            <label
              htmlFor="groupName"
              className="block text-lg font-semibold text-black-700"
            >
              Nombre del Grupo
            </label>
            <Input
              name="groupName"
              type="text"
              placeholder="Ej. Familia Navnameeña 2024"
              className="mt-2 block w-full bg-white border border-black-300 rounded-lg shadow-sm focus:ring-gold-500 focus:border-gold-500 p-4 text-black-700"
              value={formData.name}
              onChange={(e) => updateForm({ name: e.target.value })}
              
            />
          </div>

          {/* Campo: Participantes */}
          <div>
            <label
              htmlFor="participants"
              className="block text-lg font-semibold text-black-700"
            >
              Participantes
            </label>
            <div className="flex items-center mt-2 space-x-4">
              <Input
                name="participants"
                type="text"
                placeholder="Número de participantes"
                className="flex-1 bg-white border border-black-300 rounded-lg shadow-sm focus:ring-gold-500 focus:border-gold-500 p-4 text-black-700"
                value={formData.quantity}
                onChange={(e) => updateForm({ quantity: e.target.value })}
              />
               {formErrors.quantity && (
              <p className="text-red-500 text-sm">{formErrors.quantity}</p>
            )}
            </div>
          </div>

          {/* Campo: Fecha del intercambio */}
          <div>
            <label
              htmlFor="exchangeDate"
              className="block text-lg font-semibold text-gray-700"
            >
              Fecha del Intercambio
            </label>
            <Input
              name="exchangeDate"
              type="date"
              className="mt-2 block w-full bg-white border border-gray-300 rounded-lg shadow-sm focus:ring-gold-500 focus:border-gold-500 p-4 text-gray-700"
            />
          </div>

          {/* Botones */}
          <div className="flex justify-end items-center space-x-4">
            <button
              type="button"
              className="px-6 py-3 bg-gray-200 text-gray-700 font-semibold rounded-lg shadow-sm hover:bg-gray-300 focus:ring-2 focus:ring-offset-2 focus:ring-gray-400 transition"
              onClick={closePopup}
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-6 py-3 bg-green-900 text-white font-semibold rounded-lg shadow-lg hover:bg-green-800 focus:ring-2 focus:ring-offset-2 focus:ring-gold-500 transition"
            >
              Crear Grupo
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default GroupCreationForm;
