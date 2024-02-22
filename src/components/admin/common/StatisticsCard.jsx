export const StatisticsCard = ({ title, count }) => {
  return (
    <div
      className={`flex flex-col items-start gap-2 p-4  last:border-r-0 pr-10`}
    >
      <span className="text-sm font-medium text-gray-500">{title}</span>
      <span className="text-2xl font-bold text-stone-800">
        {count ? count : 0}
      </span>
      <span className={`text-green-500 text-sm`}>15% vs last month</span>
    </div>
  );
};
