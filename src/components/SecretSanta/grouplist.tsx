"use client";
import React, { useEffect, useState } from "react";
import Image from 'next/image';

interface Group {
  _id: string;
  name: string;
  usersList: string[];
  isPrivate: boolean;
  owner: string;
  quantity: number;
}
const GroupList: React.FC = () => {

  const [groups, setGroups] = useState<Group[]>([]);

  //useEffect para proteger la ruta
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
  };

  protectedRoute();
}, []);


  // useEffect para obtener los grupos
  useEffect(() => {
  const token = localStorage.getItem("authToken");  


    const fetchData = async () => {
      const response = await fetch("/api/groups", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      const data = await response.json();
      setGroups(data);

      // setUserlist(data);
    };
    fetchData();
  }, []);


  //    const fetchUsernames = async (groupsData: Group[]) => {
  //   const userList = groupsData.map((group) => group.usersList).flat();
    
  //   const usersWithNames = await Promise.all(
  //     userList.map(async (userId) => {
  //       const response = await fetch(`/api/userbyId/${userId}`, {
  //          headers: {
  //     Authorization: `Bearer ${token}`,
  // },
  //       });
  //       const data = await response.json();
  //       return { userId, username: data.username };
  //     })
  //   );
  //   return usersWithNames;
  // };
  //       const usernames = await fetchUsernames(groups);
  //     console.log(usernames);


  const getGroupStatus = (group: Group): string => {
    return `${group.usersList.length}/${group.quantity}`;
  };
  return (
    <div className="flex flex-col relative bg-[#7C956F] w-full h-full font-navidad items-center mt-10">
          

      <div className="flex flex-col gap-4 relative w-[95%] rounded-xl  min-h-[10vh]  z-10 py-14 drop-shadow-2xl">
        {groups.map((group,index) => (
          <div key={index} className="bg-stamped border-4 border-[#D22C31] rounded-xl">

            <div className="p-2  grid grid-cols-2 gap-2 bg-[#EDE5E5B0] rounded-xl">
            <div className="flex flex-col items-center text-black text-xl">
              <h2 className="font-bold">{group.name }</h2>
              <Image src="/image_2-removebg-preview.png" alt="" width={50} height={30} className="" />
            </div>
            
            <div className="flex flex-col gap-2  text-center text-black font-bold">
              <p>Participantes: {getGroupStatus(group)}</p>
            <p className="text-3xl">
              
              {group.isPrivate ? (
                <span role="img" aria-label="locked" >
                  🔒
                </span>
              ) : (
                <span role="img" aria-label="unlocked" >
                  🔓
                </span>
              )}
            </p>

            </div>
          </div>
          </div>
        ))}
              
    </div>

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
    </div>
  );
};

export default GroupList;
