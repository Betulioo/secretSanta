import React from "react";

const ChristmasSpinner: React.FC = () => {
  return (
    <div className="flex justify-center items-center h-screen bg-blue-50">
      <div className="relative">
        {/* <div className="animate-spin rounded-full h-32 w-32 border-t-4 border-red-600 border-dashed"></div> */}
        <div className="absolute inset-0 flex justify-center items-center">
          <div className="absolute rounded-full h-32 w-32 bg-gradient-to-t from-red-600 via-green-600 to-yellow-400 opacity-30"></div>
          <div className="absolute text-4xl text-white font-bold">🎄</div>
        </div>
      </div>
    </div>
  );
};

export default ChristmasSpinner;
