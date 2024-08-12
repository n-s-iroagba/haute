import React from "react";
import { MiniChart } from "react-ts-tradingview-widgets";

const Chart: React.FC = () => {
  return (
    <div className="px-4">
      <MiniChart colorTheme="light" width="100%"></MiniChart>
    </div>
  );
};
export default Chart;
