import { useForm } from "react-form-ease";
import { useState } from "react";
import Link from "next/link";
import Input from "../ui/Input";
import { Spinner } from "@nextui-org/spinner";
import { PiArrowLineLeftLight } from "react-icons/pi";


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
        if (!value) return "Por favor ingresa un nombre";
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
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: formData.userName, 
          password: formData.password,
          email: formData.email,
        }),
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
      <button className="bg-primaryLight text-light text-2xl p-2 my-2 font-semibold rounded-full shadow-md hover:bg-primaryDark focus:outline-none focus:ring-2 focus:ring-teal-400 focus:ring-opacity-75 absolute">
        <Link href="/home"><PiArrowLineLeftLight /></Link>
      </button>
      <div className="">
        <img src="/dog.webp" alt="" className="w-full" />
      </div>
      <form
        className="max-w-md md:max-w-2xl lg:max-w-3xl p-8 flex flex-col justify-center"
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
        <button className="border-1 rounded-3xl h-14 w-[85%] bg-primaryLight text-white mb-[30px] mx-auto mt-4" type="submit">
          Registrar
        </button>
      </form>
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
    </>
  );
};

export default RegisterForm;