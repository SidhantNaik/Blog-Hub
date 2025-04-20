import React, { useState } from 'react';

const Avatar = ({ src, alt = "User", size = "md", className = "" }) => {
  const sizeClasses = {
    xs: "w-8 h-8",
    sm: "w-10 h-10",
    md: "w-12 h-12",
    lg: "w-16 h-16",
    xl: "w-20 h-20"
  };

  const getColorClass = (name) => {
    const colors = [
      "bg-orange-500", "bg-purple-500", "bg-blue-500",
      "bg-green-500", "bg-red-500", "bg-pink-500", "bg-indigo-500"
    ];
    const charSum = name?.split('').reduce((sum, char) => sum + char.charCodeAt(0), 0) || 0;
    return colors[charSum % colors.length];
  };

  const [isImageError, setIsImageError] = useState(false);
  const sizeClass = sizeClasses[size] || sizeClasses.md;
  const firstLetter = alt.charAt(0).toUpperCase();

  return (
    <div className={`${sizeClass} rounded-full overflow-hidden flex items-center justify-center ring-2 ring-gray-300 shadow-sm text-white ${className}`}>
      {!isImageError && src ? (
        <img 
          src={src} 
          alt={alt} 
          className="w-full h-full object-cover"
          onError={() => setIsImageError(true)} 
        />
      ) : (
        <div className={`w-full h-full flex items-center justify-center font-bold ${getColorClass(alt)}`}>
          {firstLetter}
        </div>
      )}
    </div>
  );
};

export default Avatar;
