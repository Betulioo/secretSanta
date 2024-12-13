'use client'
import { useForm } from "react-form-ease";
import { useState } from "react";
import Link from "next/link";
import Input from "../ui/Input";
import { Spinner } from "@nextui-org/spinner";
import { PiArrowLineLeftLight } from "react-icons/pi";
import { FaTree } from "react-icons/fa";


const RegisterForm = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState<string>("");
  const [isSuccess, setIsSuccess] = useState(false)

  const { formData, updateForm, validateForm, errors: formErrors = {} } = useForm({
    data: {
      email: "",
      password: "",
      confirmPassword: "",
      userName: "",
    },
    validations: {
      email: (value) => {
        if (!value) return "Por favor ingresa el email";
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return "Email no válido.";
      },
      password: (value) => {
        if (!value) return "Por favor ingresa una contraseña.";
        if (value.length < 6) return "La contraseña debe tener al menos 6 caracteres.";
        if (value.length > 12) return "La contraseña no puede tener más de 12 caracteres.";
      },
      confirmPassword: (value, data) => {
        if (!value) return "Por favor confirma tu contraseña.";
        if (value !== data.password) return "Las contraseñas no coinciden.";
      },
      userName: (value) => {
        if (!value) return "Por favor ingresa un nombre de usuario";
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
      const response = await fetch("/api/register", {
        body: JSON.stringify({
          username: formData.userName, 
          password: formData.password,
          email: formData.email,
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Error desconocido");
      }

      const result = await response.json();
      console.log("Usuario registrado:", result);
      setIsSubmitted(true);
      setIsSuccess(true)
    } catch (error: any) {
      setApiError(error.message || "Error en el registro");
      console.error("Error al registrar:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const closePopup = () => {
    setIsSubmitted(false);
  };

  return (
    <>


    <div className="flex justify-center items-center min-h-screen bg-red-50">
  <div className="relative bg-white shadow-xl rounded-lg p-8 w-full max-w-lg border-4 border-dashed border-red-400">
    {/* Estampilla */}
    <div className="absolute top-4 right-4 w-16 h-16 bg-gray-200 border-2 border-gray-400 rounded-md">
      <img src="/image_2-removebg-preview.png" alt="" className="w-[100px] h-16" />
    </div>

    {/* Encabezado */}
    <div className="text-center mb-8">
    <button className="absolute top-0 left-0 bg-red-600 text-white text-1xl p-2 my-2 font-semibold rounded-full shadow-lg hover:bg-red-700 transform transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-red-400 focus:ring-opacity-75 border-4 border-white">
  <Link href="/" className="flex items-center gap-2">
    {/* Icono navideño (Árbol de Navidad) */}
    <span className="text-xl"><FaTree /></span>
    <span className="text-lg">Regresar</span>
  </Link>
</button>
      <h1 className="mt-2 text-3xl font-bold text-red-600">Carta a Santa</h1>
      <p className="mt-8 text-sm text-gray-600">Completa tus datos para registrarte <br> </br>y compartir tus deseos 🎄</p>
    </div>
    <form
        className="max-w-md md:max-w-2xl lg:max-w-3xl p-8 flex flex-col justify-center font-navidad"
        onSubmit={handleSubmit}
      >
        <div className="email text-">
          <Input
            name="email"
            type="email"
            placeholder="Email"
            className=""
            value={formData.email}
            onChange={(e) => updateForm({ email: e.target.value.trim() })
            }
          />
          {formErrors.email && <p className="text-red-500">{formErrors.email}</p>}
          {apiError && <p className="text-red-500">{apiError}</p>}
        </div>
        <div className="password">
          <Input
            name="password"
            type="password"
            placeholder="Contraseña"
            className=""
            value={formData.password}
            onChange={(e) => updateForm({ password: e.target.value.trim() })}
          ></Input>
          {formErrors.password && <p className="text-red-500">{formErrors.password}</p>}
        </div>
        <div className="confirmPassword">
          <Input
            name="confirm_password"
            type="password"
            placeholder="Confirmar Contraseña"
            className=""
            value={formData.confirmPassword}
            onChange={(e) => updateForm({ confirmPassword: e.target.value.trim() })}
          ></Input>
          {formErrors.confirmPassword && <p className="text-red-500">{formErrors.confirmPassword}</p>}
        </div>
        <div className="username">
          <Input
            name="userName"
            type="userName"
            placeholder="Username"
            className=""
            value={formData.userName}
            onChange={(e) => updateForm({ userName: e.target.value.trim() })
            }
          />
          {formErrors.email && <p className="text-red-500">{formErrors.email}</p>}
          {apiError && <p className="text-red-500">{apiError}</p>}
        </div>
        <button className="bg-red-600 text-white text-2xl p-3 my-3 font-semibold rounded-full shadow-lg hover:bg-red-700 transform transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-red-400 focus:ring-opacity-75 border-4 border-white" type="submit">
          Registrar
        </button>
      </form>
      <div className="text-center text-sm text-gray-500">
      <p>🎅 Tu registro está en camino al Polo Norte ❄️</p>
    </div>
      {isLoading && (<Spinner color="danger" label="Danger" labelColor="danger" />)}
      {isSubmitted && isSuccess && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
          <div className="img_volunteercheck">
              <img src="../../public/checkregister.jpg" alt="" />
            </div>
            <h2 className="text-2xl font-semibold mb-4">¡Excelente!</h2>
            <p className="text-lg mb-6">
              A partir de ahora ya eres parte de Secret Santa
            </p>
            <button
              className="bg-primaryLight text-white px-4 py-2 rounded-md"
              onClick={closePopup}
            >
              Cerrar
            </button>
          </div>
        </div>
      )}
      {formErrors && <p className="text-red-500">{apiError}</p>}
    
    {/* Pie de página */}
   
  </div>
</div>

      
    </>
  );
};

export default RegisterForm;