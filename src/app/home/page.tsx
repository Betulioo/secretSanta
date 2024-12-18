'use client'
import MenuPrincipal from "@/components/Layout/MenuPrincipal";
import GroupList from "@/components/SecretSanta/grouplist";
import GroupCreationForm from "@/components/ui/GroupCreationForm";
import React from "react";
import { useState } from "react";


const House: React.FC = () => {

  return (
    <div className="bg-[#7C956F]">
      <MenuPrincipal />
      <GroupList />
    </div>
  );
};

export default House;
 