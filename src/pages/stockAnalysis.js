import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import { BsSearch } from "react-icons/bs";
import { toast } from "react-toastify";
import StockList from "@/components/StockList";
import Portfolio from "@/components/Portfolio";
import { setDoc, doc } from "firebase/firestore";
import { db } from "@/Firebase";

const stockAnalysis = () => {
  const [query, setQuery] = useState("");
  const [stocks, setStocks] = useState([]);
  const [add, setAdd] = useState(false);

  const addToPortfolio = async (stock) => {
    await setDoc(doc(db, "portfolio", stock.mic_code), {
      name: stock.name,
      symbol: stock.symbol,
      mic_code: stock.mic_code,
    });
  };

  const getStocks = async () => {
    const options = {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": "89346ec63dmsh20fa5782792aedbp18742fjsn2f8a3a7e7633",
        "X-RapidAPI-Host": "twelve-data1.p.rapidapi.com",
      },
    };

    await fetch(
      `https://twelve-data1.p.rapidapi.com/stocks?symbol=${query}&format=json`,
      options
    )
      .then((response) => response.json())
      .then((data) => {
        if (data.data.length != 0) {
          setStocks(data.data);
          toast.success("🦄 Stocks Found!", {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            progress: undefined,
            theme: "dark",
          });
        } else {
          toast.warn(`💥No stocks starts from ${query}!`, {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            progress: undefined,
            theme: "dark",
          });
        }
      })
      .catch((err) => {
        toast.error("💥 Stocks Not Found!", {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          progress: undefined,
          theme: "dark",
        });
      });
  };

  return (
    <div className="p-5">
      <Navbar />
      <div className="my-4 flex items-center">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search Stocks"
          className="py-2 pl-2 pr-6 rounded-md focus:outline-none"
        />
        <div
          className="relative right-6 z-[9999] cursor-pointer "
          onClick={() => {
            getStocks();
          }}
        >
          <BsSearch />{" "}
        </div>
      </div>
      <main className="flex flex-wrap md:flex-nowrap">
        <StockList
          stocks={stocks}
          addToPortfolio={addToPortfolio}
          setAdd={setAdd}
        />
        <Portfolio add={add} />
      </main>
    </div>
  );
};

export default stockAnalysis;
