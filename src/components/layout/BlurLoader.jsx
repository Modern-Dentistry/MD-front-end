import React from "react";
import { BeatLoader } from "react-spinners";

const BlurLoader = ({ children, isLoading }) => {
    return (
        <div className="relative">
            {isLoading && (
                <div className="absolute inset-0 flex items-center justify-center backdrop-blur-[2px] bg-white/10 z-10 rounded-lg">
                    <BeatLoader />
                </div>
            )}
            {children}
        </div>
    );
};

export default BlurLoader;