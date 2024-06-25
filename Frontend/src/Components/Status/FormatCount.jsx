import React from "react";

const FormatCount = ({ count }) => {
  const formatCount = (count) => {
    if (count >= 1000000000) return `${(count / 1000000000).toFixed(1)}B`;
    if (count >= 1000000) return `${(count / 1000000).toFixed(1)}M`;
    if (count >= 1000) return `${(count / 1000).toFixed(1)}K`;
    return count.toString();
  };

  const formattedCount = formatCount(count);

  return <dd className="font-semibold text-gray-600">{formattedCount}</dd>;
};

export default FormatCount;
