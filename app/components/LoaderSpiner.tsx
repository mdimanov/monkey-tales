import { Loader } from "lucide-react";
import React from "react";

const LoaderSpiner = () => {
  return (
    <div className="flex-center h-screen w-full">
      <Loader className="animate-spin text-violet-300" size={30} />
    </div>
  );
};

export default LoaderSpiner;
