import React, { useState } from "react";
import axios from "axios";

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
    <div className="login-container">
      <h1>Inicia Sesión</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="username"
          name="username"
          placeholder="Nombre de Usuario"
          value={formData.username}
          onChange={handleChange}
        />
        <input
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
  );
};

export default LoginForm;


// import React, { useContext, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { Context } from "../store/appContext";
// import "../../styles/login.css";
// import {jwtDecode} from "jwt-decode";
// import { errors } from './../../../.next/static/chunks/main';
// import { axios } from 'axios';
// import { axios } from 'axios';


// const Login = () => {
// 	const { store, actions } = useContext(Context);
// 	const [email, setEmail] = useState("");
// 	const [password, setPassword] = useState("");
// 	const [showPassword, setShowPassword] = useState(false);
// 	const navigate = useNavigate();

// 	const handleLogin = async (event) => {
// 		event.preventDefault();

// 		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// 		if (!email || !password) {
// 			alert("Todos los campos son obligatorios.");
// 		} else if (!emailRegex.test(email)) {
// 			alert("El email es incorrecto.");
// 		} else if (password.length < 8 || password.length > 12) {
// 			alert("La contraseña debe tener entre 8 y 12 caracteres.");
// 		} else {
// 			try {
// 				await actions.getTokenLogin(email, password);
// 				const token = store.token;

// 				if (!token) throw new Error("Token no recibido");

// 				const decodedToken = jwtDecode(token);
// 				localStorage.setItem("token", token);

// 				switch(decodedToken.roles) {
// 					case "admin":
// 						navigate("/app/caja");
// 						break;
// 					case "cocina":
// 						navigate("/app/restaurants/1/orders");
// 						break;
// 					case "caja":
// 						navigate("/app/caja");
// 						break;
// 					default:
// 						throw new Error("Rol no reconocido");
// 				}
// 			} catch (error) {
// 				alert("Usuario o contraseña incorrectos.");
// 				console.error("Login error:", error);
// 			}
// 		}
// 	};

// 	const togglePasswordVisibility = () => {
// 		setShowPassword(!showPassword);
// 	}

// 	const handleSectionCreateAccount = () => {
// 		navigate("/app/signup")
// 	}

// 	return (
// 		<section>
// 			<div className="container-login">
// 				<div className="formulario inputlogin">
// 					<form action="#" method="POST">
// 						<h1>Login</h1>
// 						<div className="input-container">
// 							<i className="fa-solid fa-envelope"></i>
// 							<input type="email" value={email} onChange={(event) => setEmail(event.target.value)} required></input>
// 							<label htmlFor="Email">Email</label>
// 						</div>
// 						<div className="input-container password">
// 							<i className={`fa-solid ${showPassword ? 'fa-lock-open' : 'fa-lock'}`} onClick={togglePasswordVisibility}></i>
// 							<input type={showPassword ? "text" : "password"} value={password} onChange={(event) => setPassword(event.target.value)} required></input>
// 							<label htmlFor="Contraseña">Password</label>
// 						</div>
// 						<div className="olvidar">
// 							<label htmlFor="forgotPassword">
// 								<input type="checkbox"/> Remember me
// 							</label>
// 						</div>
// 						<button className="r6" onClick={handleLogin}>Access</button>
// 					</form>
// 					<div>

// 						<div className="registrar">
// 							<p>Not have an account ?</p>
// 							<button onClick={handleSectionCreateAccount}>Create an account</button>
// 						</div>
// 					</div>
// 				</div>
// 			</div>
// 		</section>
// 	);
// };

// export default Login;