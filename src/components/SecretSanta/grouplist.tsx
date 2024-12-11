import React from "react";

const GroupList: React.FC = () => {
  return (
    <div className="relative bg-[#7C956F] w-full h-screen">
          <h1>Group List</h1>
          

          <div className="absolute w-[90%] h-[50vh] bg-[#CC6D44B4] z-10 top-[20%] left-[5%]">
              
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
      {/* mountain img*/}
      <div className="absolute bottom-[25%] bg-home-mountain w-full h-[40vh]"></div>
      {/* white line*/}
      <div className="absolute bottom-0 bg-[#E9E9E9FF] w-full h-[40vh]"></div>

      {/* snow svg line*/}
      <div className="absolute bottom-[38%] left-0 w-full rotate-180">
        <svg viewBox="0 0 1440 320" className="w-full h-24">
          <path
            fill="#E9E9E9FF"
            d="M0,256L48,234.7C96,213,192,171,288,176C384,181,480,235,576,256C672,277,768,267,864,250.7C960,235,1056,213,1152,208C1248,203,1344,213,1392,218.7L1440,224L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"
          ></path>
        </svg>
      </div>













    </div>
  );
};

export default GroupList;
