import React from "react";

const FollowingLabel = ({ count }) => {
  const formatCount = (count) => {
    if (count >= 1000000000) return `${(count / 1000000000).toFixed(1)}B`;
    if (count >= 1000000) return `${(count / 1000000).toFixed(1)}M`;
    if (count >= 1000) return `${(count / 1000).toFixed(1)}K`;
    return count.toString();
  };

  const formattedCount = formatCount(count);

  return (
    <dd className="font-semibold text-gray-500 dark:text-gray-400">
      {formattedCount}
    </dd>
  );
};

export default function Dummy() {
  return <div>Dummy</div>;
}
