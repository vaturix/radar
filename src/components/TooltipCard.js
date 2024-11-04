import React from 'react';

const TooltipCard = ({ title, image, thsName, style }) => {
  return (
    <div className="bg-white p-4 border border-gray-300 rounded-lg shadow-md text-sm z-2 absolute" style={style}>
      <h4 className="font-bold mb-2">{title}</h4>
      <img src={image} alt={title} className="w-12 h-12 mb-2" />
      <p>{thsName}</p>
    </div>
  );
};

export default TooltipCard;
