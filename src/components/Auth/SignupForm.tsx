import { useForm } from "react-form-ease";
import { useState } from "react";

const RegisterForm = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState<string>("");

  const { formData, updateForm, validateForm, errors: formErrors = {} } = useForm({
    data: {
      email: "",
      password: "",
      confirmPassword: "",
      name: "",
      lastName: "",
      registerUser: "" as "user" | "refugee",
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
      name: (value) => {
        if (!value) return "Por favor ingresa un nombre";
      },
      lastName: (value) => {
        if (!value) return "Por favor ingresa apellidos";
      },
      registerUser: (value) => {
        if (!value) return "Por favor selecciona una opción.";
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
      const response = await fetch("/api/user/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: formData.name, // Ajustar según los nombres que espera tu API
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
      <form
        className="max-w-md md:max-w-2xl lg:max-w-3xl mt-10 ml-[52px] flex flex-col justify-center"
        onSubmit={handleSubmit}
      >
        {/* Campos del formulario */}
        <div className="email">
          <input
            type="email"
            placeholder="Email"
            className="border-2 rounded-3xl h-14 w-[85%] mb-[25px] placeholder-black pl-2"
            value={formData.email}
            onChange={(e) => updateForm({ email: e.target.value })}
          />
          {formErrors.email && <p className="text-red-500">{formErrors.email}</p>}
        </div>

        {/* ... otros campos como password, confirmPassword, etc. ... */}

        <button
          className="border-1 rounded-3xl h-14 w-[85%] bg-primaryLight text-white"
          type="submit"
          disabled={isLoading}
        >
          {isLoading ? "Cargando..." : "Registrar"}
        </button>
      </form>

      {isSubmitted && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <h2 className="text-2xl font-semibold mb-4">¡Registro Exitoso!</h2>
            <p className="text-lg mb-6">Tus datos han sido registrados correctamente.</p>
            <button
              className="bg-primaryLight text-white px-4 py-2 rounded-md"
              onClick={closePopup}
            >
              Cerrar
            </button>
          </div>
        </div>
      )}

      {apiError && <p className="text-red-500">{apiError}</p>}
    </>
  );
};

export default RegisterForm;
