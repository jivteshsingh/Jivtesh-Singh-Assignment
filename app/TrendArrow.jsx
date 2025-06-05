import React from 'react';

const TrendArrow = ({ trend }) => {
  if (trend === 0) return null;
  return (
    <span className={`inline-block ml-1 ${trend > 0 ? 'text-green-500' : 'text-red-500'} text-xs`}>
      {trend > 0 ? '↑' : '↓'}
    </span>
  );
};

export default TrendArrow;