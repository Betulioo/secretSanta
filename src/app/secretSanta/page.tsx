"use client"
import React from "react";
import { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Spinner } from "@nextui-org/spinner";
import { Loader } from "@/components/spinners/Loader";

const SecretSanta: React.FC = () => {
  const [isLoading, setIsLoading] = React.useState(true);


   useEffect(() => {
    const protectedRoute = async () => {
      const auth = await fetch("/api/protected", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      });
  
      const isauth = await auth.json();
      console.log(isauth);
      
      if (isauth.message === "Authorized") {
        setIsLoading(false);
        window.location.href = "/home"; // Redirección manual
      }
      if (isauth.message === "Unauthorized" || isauth.error) {
        setIsLoading(false);
      }
    };
  
    protectedRoute();
  }, []);

  const Layout:React.FC<{ children?: React.ReactNode }> =({children})=>{
    return (
          <section className="relative  w-full h-screen background-christ">
            {children}
          </section>
    )
  }

  if(isLoading){
    return (
      <Layout>
        <div className="w-full h-full m-auto flex justify-center">
      <Loader loading={isLoading}/>
      </div>
      </Layout>
    )
  }

  return (
    <Layout >


      {/* snow svg line*/}
      <div className="absolute w-full h-screen overflow-hidden bg-transparent z-10">
        <div
          className="absolute w-2 h-2 bg-white rounded-full opacity-80 animate-snow"
          style={{ left: "10%", animationDelay: "0s" }}
        ></div>
        <div
          className="absolute w-3 h-3 bg-white rounded-full opacity-80 animate-snow"
          style={{ left: "30%", animationDelay: "2s" }}
        ></div>
        <div
          className="absolute w-2 h-2 bg-white rounded-full opacity-80 animate-snow"
          style={{ left: "50%", animationDelay: "1s" }}
        ></div>
        <div
          className="absolute w-2 h-2 bg-white rounded-full opacity-80 animate-snow"
          style={{ left: "60%", animationDelay: "0s" }}
        ></div>
        <div
          className="absolute w-3 h-3 bg-white rounded-full opacity-80 animate-snow"
          style={{ left: "80%", animationDelay: "2s" }}
        ></div>
        <div
          className="absolute w-2 h-2 bg-white rounded-full opacity-80 animate-snow"
          style={{ left: "90%", animationDelay: "1s" }}
        ></div>
      </div>

      {/*title */}
      <div className="relative pt-6 z-10 main-title">
        <div className="relative z-10 rounded-full w-[150px] h-[150px] mx-auto">
          <Image
            src="/images/home/santa.png"
            alt="Santa"
            width={500}
            height={500}
            style={{ objectFit: "cover" }}
            className="rounded-full"
          />
        </div>
        <h1 className="text-center mt-4 text-5xl text-white font-navidad">
          Secret <br />
          <span className="text-6xl"> Santa</span>
        </h1>
      </div>

      {/* buttons*/}
      <div className="absolute bottom-[23%] w-full  z-10 font-navidad">
        <div className="flex flex-col gap-4 justify-center">
          <button className="bg-[#687E57] text-white px-4 py-2 rounded-lg w-1/2 mx-auto">
            <Link href={"/login"}>Iniciar sesión</Link>
          </button>
          <button className="bg-[#D22C31] text-white px-4 py-2 rounded-lg w-1/2 mx-auto">
            <Link href={"/register"}>Registrarse</Link>
          </button>
        </div>
      </div>
    </Layout>
  );
};

export default SecretSanta;
