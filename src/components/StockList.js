import Link from "next/link";
import React from "react";
import { IoIosAdd } from "react-icons/io";

const StockList = ({ stocks, addToPortfolio, setAdd }) => {
  if (!stocks) return null;

  return (
    <div className="min-w-[600px]  py-4 pr-4">
      <div className="text-2xl font-mono font-bold p-2 ">Stocks</div>
      <div className="list-none p-2">
        {stocks.map((stk) => {
          return (
            <li
              key={stk.mic_code}
              className="flex justify-between my-2 p-2 rounded-lg items-center hover:bg-slate-800"
            >
              <Link href={`/stockAnalysis/${stk.symbol}`}>
                <div className="font-bold">{stk.symbol}</div>
                <div className="max-w-[200px]">{stk.name}</div>
              </Link>
              <div className="cursor-pointer hover:bg-slate-900 p-4 rounded-lg">
                <IoIosAdd
                  size={"24px"}
                  onClick={() => {
                    addToPortfolio(stk);
                    setAdd((add) => !add);
                  }}
                />
              </div>
            </li>
          );
        })}
      </div>
    </div>
  );
};

export default StockList;
