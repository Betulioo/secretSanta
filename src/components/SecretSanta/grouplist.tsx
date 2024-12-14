
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

  const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3MzdkYWY4ZTNkMGI5M2U0YjRjYzU4OCIsImVtYWlsIjoiZW1haWw4QGVtYWlsLmNvbSIsImlhdCI6MTczNDE4MTc3MiwiZXhwIjoxNzM0MTkyNTcyfQ.APKiiHpofl3ckXhBTUutfajtZoQikXJPYsCi_-5TIUg";

  const data: Group[] = [
     {
        "_id": "6737d977228ae510eb7682c5",
        "name": "familia2022",
        "usersList": [
            "6737c70b8868b3d22330c4f0",
            "6737a87d85abcb0af29fdd08",
            "6737dae0e3d0b93e4b4cc574",
            "6737dae6e3d0b93e4b4cc578",
            "6737daf8e3d0b93e4b4cc588"
        ],
        "isPrivate": false,
        "owner": "6737c70b8868b3d22330c4f0",
        "quantity": 8,
    }, {
        "_id": "6737d977228ae510eb7682c5",
        "name": "familia2022",
        "usersList": [
            "6737c70b8868b3d22330c4f0",
            "6737a87d85abcb0af29fdd08",
            "6737dae0e3d0b93e4b4cc574",
            "6737dae6e3d0b93e4b4cc578",
            "6737daede3d0b93e4b4cc580",
            "6737daf1e3d0b93e4b4cc584",
            "6737daf8e3d0b93e4b4cc588"
        ],
        "isPrivate": false,
        "owner": "6737c70b8868b3d22330c4f0",
        "quantity": 8,
    }, {
        "_id": "6737d977228ae510eb7682c5",
        "name": "familia2022",
        "usersList": [
            "6737c70b8868b3d22330c4f0",
            "6737a87d85abcb0af29fdd08",
            "6737dae9e3d0b93e4b4cc57c",
            "6737daede3d0b93e4b4cc580",
            "6737daf1e3d0b93e4b4cc584",
            "6737daf8e3d0b93e4b4cc588"
        ],
        "isPrivate": true,
        "owner": "6737c70b8868b3d22330c4f0",
        "quantity": 8,
    }, {
        "_id": "6737d977228ae510eb7682c5",
        "name": "familia2022",
        "usersList": [
            "6737c70b8868b3d22330c4f0",
            "6737a87d85abcb0af29fdd08",
            "6737dae0e3d0b93e4b4cc574",
            "6737dae6e3d0b93e4b4cc578",
            "6737dae9e3d0b93e4b4cc57c",
            "6737daede3d0b93e4b4cc580",
            "6737daf1e3d0b93e4b4cc584",
            "6737daf8e3d0b93e4b4cc588"
        ],
        "isPrivate": false,
        "owner": "6737c70b8868b3d22330c4f0",
        "quantity": 8,
    }, {
        "_id": "6737d977228ae510eb7682c5",
        "name": "familia2022",
        "usersList": [
            "6737c70b8868b3d22330c4f0",
            "6737a87d85abcb0af29fdd08",
            "6737dae0e3d0b93e4b4cc574",
            "6737dae6e3d0b93e4b4cc578",
            "6737dae9e3d0b93e4b4cc57c",
            "6737daede3d0b93e4b4cc580",
            "6737daf1e3d0b93e4b4cc584",
            "6737daf8e3d0b93e4b4cc588"
        ],
        "isPrivate": true,
        "owner": "6737c70b8868b3d22330c4f0",
        "quantity": 8,
    },
  ]
  const [groups, setGroups] = useState<Group[]>(data);
  const [usersList, setUserlist] = useState<{ userId: string; username: string }[]>([]);



  const fetchUsernames = async (groupsData: Group[]) => {
    const userList = groupsData.map((group) => group.usersList).flat();
    
    const usersWithNames = await Promise.all(
      userList.map(async (userId) => {
        const response = await fetch(`/api/userbyId/${userId}`, {
           headers: {
      Authorization: `Bearer ${token}`,
  },
        });
        const data = await response.json();
        return { userId, username: data.username };
      })
    );
    return usersWithNames;
  };

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchUsernames(groups);
      console.log(data);
      setUserlist(data);
    };
    fetchData();
  }, [groups]);

  const isGroupFull = (group: Group): boolean => {
    return group.usersList.length >= group.quantity;
  };

  const getGroupStatus = (group: Group): string => {
    return `${group.usersList.length}/${group.quantity}`;
  };
  return (
    <div className="flex flex-col relative bg-[#7C956F] w-full h-full font-navidad items-center mt-10">
          

      <div className="flex flex-col gap-4 relative w-[95%] rounded-xl  min-h-[10vh]  z-10 py-14 drop-shadow-2xl">
        {groups.map((group) => (
          <div key={group._id} className="bg-stamped border-4 border-[#D22C31] rounded-xl">

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
