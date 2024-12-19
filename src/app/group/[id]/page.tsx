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
  const [isFull, setIsFull] = useState(false);
  const [inGroup, setInGroup] = useState(false);
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
      setIsFull(groupData[0].usersList?.length === groupData[0].quantity);

    const userId = localStorage.getItem("profile") ? JSON.parse(localStorage.getItem("profile") || "{}")._id : null;
    const groupOwner = groupData[0].owner

      console.log(userId, groupOwner);
          if (userId && groupOwner && userId === groupOwner) {
      setIsOwner(true);
  };
    };
    fetchData();
  }, [id, inGroup]);

  const getGroupStatus = (group: IGroup): string => {
    return `${group.usersList?.length ?? 0}/${group.quantity}`;
  };

  const handleJoinGroup = async (name: string) => { 
    setIsLoading(true);
    const nametrim = name.trim().replace(/\s+/g, "%20");
    console.log(nametrim);
    
    const response = await fetch(`/api/inGroup/${nametrim}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("authToken")}`,
      },
    });
    const data = await response.json();
    setInGroup(data.inGroup);
    console.log(data);

  };

  const handleSortGroup = async (name: string) => {
        setIsLoading(true);
    const nametrim = name.trim().replace(/\s+/g, "%20");
    console.log(nametrim);
    
    const response = await fetch(`/api/sort/${nametrim}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("authToken")}`,
      },
    });
    const data = await response.json();
    await fetch('/api/profile', { method: 'GET', headers: { Authorization: `Bearer ${localStorage.getItem("authToken")}` } });
    setInGroup(data.inGroup);

    console.log(data);
   }
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
          ❓ _ _ _ _ 
        </li>
          ))}
        </ul>
      </div>

      <div className="mt-4">
        <button
          onClick={() => groupData && handleJoinGroup(groupData.name)}
          disabled={isFull}
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
            onClick={() => groupData && handleSortGroup(groupData.name)}
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
