"use client";
import MenuPrincipal from "@/components/Layout/MenuPrincipal";
import SpinnerNavideño from "@/components/ui/SpinnerNavideño";
import React, { useEffect, useState } from "react";

const Profile: React.FC = () => {

 
  const [isLoading, setIsLoading] = useState(false);
  const [profile, setProfile] = useState<{ username: string; secretSanta: string }>({ username: "", secretSanta: "" });

  useEffect(() => {
    const storedProfile = localStorage.getItem("profile");
    if (storedProfile) {
      setProfile(JSON.parse(storedProfile));
    }
  }, []);
  const { username, secretSanta } = profile;
  const [isFlipped, setIsFlipped] = useState(false);

  const flipCard = () => { 
    setIsFlipped((prev) => !prev);
    console.log(isFlipped);
  };

  return (
    <>
      <MenuPrincipal></MenuPrincipal>

      <div className="bg-[#FFFFFF] h-screen font-navidad flex items-center justify-center ">
        {isLoading ? (
          <SpinnerNavideño />
        ) : (
          <div className="grid place-items-center text-black">
            <div className="flex justify-center items-center min-h-screen bg-[#7C956F] font-navidad w-screen">
              <div className="m-2 relative flex flex-col bg-[#FFECB4] shadow-xl rounded-lg p-6 w-full max-w-lg border-4 border-dashed border-red-400 ">
                <div className="flex flex-col items-center gap-6 justify-center">
                  <div className="relative"  onClick={() => flipCard()}>
                  <img
                    src="/image_3-removebg-preview.png"
                    alt=""
                    className={`w-[165px] h-32 mb-2 transition-transform duration-500 ${isFlipped ? 'transform rotate-y-180' : ''}`}
                   
                  />
                  <div className={`absolute inset-0 flex flex-col  items-center justify-center bg-[#FFECB4] text-black transition-opacity duration-500 ${isFlipped ? 'opacity-100' : 'opacity-0'}`}>
                    <h2 className="text-black text-md">Tu amigo secreto es </h2>
                    <span className="text-xl text-red-400">{secretSanta !== "" ? secretSanta : "No tienes amigo secreto"}</span>
                    
                  </div>
                  </div>
                  {username ? (
                  <>
                    <h2 className="text-black text-3xl">Nombre:</h2>
                    <p>{username}</p>
                  </>
                  ) : (
                  <p>Loading...</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Profile;
