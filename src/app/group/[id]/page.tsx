"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation"; // Importa useParams
import { IGroup } from "@/models/group";
import SpinnerNavideño from "@/components/ui/SpinnerNavideño";
import MenuPrincipal from "@/components/Layout/MenuPrincipal";
const Group: React.FC = () => {
  const params = useParams(); // Obtiene los parámetros dinámicos
  const id = Array.isArray(params?.id) ? params.id[0] : params?.id ?? "defaultId"; // Extrae el id con verificación de null y maneja el caso de array
  const [groupData, setGroupData] = useState<IGroup | null>(null);
  const [usernames, setUsernames] = useState<{ userId: string; username: string }[]>([]);
  const [isOwner, setIsOwner] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const getGroup = async (id: string) => {
    const response = await fetch(`/api/group/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("authToken")}`,
      },
    });
    const data = await response.json();
    return data;
  };
    
  const getUsernames = async (groups: IGroup[]) => {
    const userList = groups.map((group) => group.usersList).flat();
    const usersWithNames = await Promise.all(
      userList.map(async (userId) => {
        const response = await fetch(`/api/userbyId/${userId}`, {
           headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        });
        const data = await response.json();
        return { userId: userId ?? "", username: data.username };
      })
    );
    return usersWithNames;
  }

  console.log(usernames);
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

    if (isauth.message === "Unauthorized" || isauth.error) {
      window.location.href = "/login"; // Redirección manual
    }

    const userId = localStorage.getItem("id");
    const groupOwner = groupData?.owner;
    if (userId && groupOwner && userId === groupOwner) {
      setIsOwner(true);
  };

}
protectedRoute();

}, []);

  useEffect(() => {
    const fetchData = async () => {
      const groupData = await getGroup(id);
      setGroupData(groupData[0]);
      console.log(groupData);
      
      const usernames = await getUsernames(groupData);
      setUsernames(usernames);
      setIsLoading(false);
    };
    fetchData();
  }, [id]);

  const getGroupStatus = (group: IGroup): string => {
    return `${group.usersList?.length ?? 0}/${group.quantity}`;
  };
  return (
    <>
    <MenuPrincipal></MenuPrincipal>

    <div className="bg-[#FFFFFF] h-screen font-navidad flex items-center justify-center">

    {isLoading ? (
        <SpinnerNavideño />
      ) : (
        <div className="grid place-items-center text-black">
                <div className="flex justify-center items-center min-h-screen bg-[#7C956F] font-navidad">
      <div className="m-2 relative flex flex-col bg-[#FFECB4] shadow-xl rounded-lg p-6 w-full max-w-lg border-4 border-dashed border-red-400">
    <div className="absolute right-[10px] top-[10px] text-red-400 text-lg font-bold">
      {groupData && getGroupStatus(groupData)}
    </div>
        <div className="flex items-center gap-6">
      <img src="/image_3-removebg-preview.png" alt="" className="w-[65px] h-16 self-start mb-2" />
        {groupData ? <h2 className="text-black text-3xl">{groupData.name}</h2> : <p>Loading...</p>}

      </div>


      <div className="flex flex-col gap-4">
        <ul className="flex flex-wrap gap-4 ">
          {usernames.map((user) => (
        <li key={user.userId} className="text-black flex items-center">
          🎅 {user.username}
        </li>
          ))}
          {groupData && Array.from({ length: groupData.quantity - usernames.length }).map((_, index) => (
        <li key={`empty-${index}`} className="text-black flex items-center">
          ❓ Empty Slot
        </li>
          ))}
        </ul>
      </div>

      <div className="mt-4">
        <button
          onClick={() => alert("Ingresando al grupo...")}
          disabled={groupData && usernames.length >= groupData.quantity}
          className={`px-4 py-2 rounded ${
            groupData && usernames.length < groupData.quantity
              ? "bg-green-500 text-white"
              : "bg-gray-400 text-gray-700 cursor-not-allowed"
          }`}
        >
          Ingresar al grupo
        </button>
      </div>

      {isOwner && (
        <div className="mt-4">
          <button
            onClick={() => alert("Sorteando Secret Santa...")}
            className="px-4 py-2 rounded bg-red-500 text-white"
          >
            Sortear Secret Santa
          </button>
        </div>
      )}
     
      </div>
    </div>
        </div>
      )}
    </div>
 
  </> );
};

export default Group;
