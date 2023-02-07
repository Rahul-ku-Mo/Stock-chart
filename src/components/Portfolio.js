import React, { useState, useEffect } from "react";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { AiOutlineDelete } from "react-icons/ai";
import Link from "next/link";
import { db } from "@/Firebase";
const Portfolio = ({ add }) => {
  const [portfolio, setPortfolio] = useState([]);
  const [del, setDel] = useState(false);

  const deleteStock = async (id) => {
    await deleteDoc(doc(db, "portfolio", id));
  };

  useEffect(() => {
    const getStockFromDB = async () => {
      const querySnapshot = await getDocs(collection(db, "portfolio"));
      let stocksFound = [];
      querySnapshot.forEach((doc) => {
        stocksFound.push(doc.data());
      });

      setPortfolio(stocksFound);
    };

    getStockFromDB();
  }, [del, add]);

  return (
    <div className="basis-full min-w-[400px] ">
      <div className="text-2xl font-mono font-bold p-2">Portfolio</div>
      <div className="list-none p-2">
        {portfolio.map((stk) => {
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
                <AiOutlineDelete
                  size={"24px"}
                  onClick={() => {
                    deleteStock(stk.mic_code);
                    setDel(del => !del);
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

export default Portfolio;
