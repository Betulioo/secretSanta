'use client'
import MenuPrincipal from "@/components/Layout/MenuPrincipal";
import GroupList from "@/components/SecretSanta/grouplist";
import React from "react";


const House: React.FC = () => {

  return (
    <div className="bg-[#7C956F] h-screen">
      <MenuPrincipal />
      <GroupList />
    </div>
  );
};

export default House;
 