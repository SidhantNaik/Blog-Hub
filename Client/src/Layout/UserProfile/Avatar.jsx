import React from 'react';

const Avatar = ({ src, alt, size = "md", className = "" }) => {
  // Size classes mapping
  const sizeClasses = {
    xs: "w-8 h-8",
    sm: "w-10 h-10",
    md: "w-12 h-12",
    lg: "w-16 h-16",
    xl: "w-20 h-20"
  };

  // Get the appropriate size class or default to md
  const sizeClass = sizeClasses[size] || sizeClasses.md;

  // If no image is provided, create a text avatar with the first letter of the alt text
  const firstLetter = alt ? alt.charAt(0).toUpperCase() : 'U';

  // Generate a color based on the name to make it consistent for the same user
  const getColorClass = (name) => {
    const colors = [
      "bg-orange-500",
      "bg-purple-500",
      "bg-blue-500",
      "bg-green-500",
      "bg-red-500",
      "bg-pink-500",
      "bg-indigo-500"
    ];
    const charSum = name?.split('').reduce((sum, char) => sum + char.charCodeAt(0), 0) || 0;
    return colors[charSum % colors.length];
  };

  return (
    <div
      className={`
        ${sizeClass} 
        rounded-full 
        overflow-hidden 
        flex 
        items-center 
        justify-center 
        ring-2 ring-gray-300
        shadow-sm
        text-white
        font-bold
        ${className}
      `}
    >
           {src ? (
        <div className="relative w-full h-full">
          <img 
            src={src} 
            alt={alt || "User avatar"} 
            className="absolute inset-0 w-full h-full object-cover"
            onError={(e) => {
              // If image loading fails, show the text avatar instead
              e.target.style.display = 'none';
              e.target.parentNode.parentNode.classList.add(getColorClass(alt));
              e.target.parentNode.parentNode.setAttribute('data-content', firstLetter);
            }}
          />
        </div>
      ) : (
        <div className={`w-full h-full flex items-center justify-center text-white font-bold ${getColorClass(alt)}`}>
          {firstLetter}
        </div>
      )}
    </div>
  );
};

export default Avatar;
