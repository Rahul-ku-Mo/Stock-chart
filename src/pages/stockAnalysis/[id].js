import Navbar from "@/components/Navbar";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import useDimensions from "react-use-dimensions";
import CandleChart from "@/components/CandleChart";

export default function Details() {
  const {
    query: { id },
  } = useRouter();
  const [ref, { width, height }] = useDimensions();
  const [stock, setStock] = useState({});

  useEffect(() => {
    const getStock = async () => {
      const options = {
        method: "GET",
        headers: {
          "X-RapidAPI-Key":
            "89346ec63dmsh20fa5782792aedbp18742fjsn2f8a3a7e7633",
          "X-RapidAPI-Host": "twelve-data1.p.rapidapi.com",
        },
      };

      await fetch(
        `https://twelve-data1.p.rapidapi.com/quote?symbol=${id}&interval=1day&outputsize=30&format=json`,
        options
      )
        .then((response) => response.json())
        .then((response) => {
          setStock(response);
        })
        .catch((err) => {
          toast.error("💥 Stock details not found!", {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            progress: undefined,
            theme: "dark",
          });
        });
    };

    getStock();
  }, []);

  if (!stock) return null;

  return (
    <div className="p-5">
      <Navbar />
      <div className="flex justify-between p-4 max-w-[700px] items-center">
        <div className="flex flex-col">
          <div className="text-2xl font-semibold ">{stock.symbol}</div>
          <div className="text-md">{stock.name}</div>
        </div>
        <div className="flex items-center gap-2">
          <div>
            {stock.percent_change > 0 ? (
              <div className=" text-green-400">{stock.percent_change}%</div>
            ) : (
              <div className=" text-red-400">{stock.percent_change}%</div>
            )}
            {stock.percent_change > 0 ? (
              <div className=" text-green-400">{stock.change}%</div>
            ) : (
              <div className=" text-red-400">{stock.change}%</div>
            )}
          </div>
          <div className="text-6xl font-bold proportional-nums">
            {stock.close}
          </div>
        </div>
      </div>
      <div
        className="p-4 bg-slate-50"
        ref={ref}
        style={{ width: "100%", height: "100%" }}
      >
        <CandleChart symbol={id} />
      </div>
      <div className="p-4">Stock Details:</div>
      <div className="px-4 gap-14 my-2 flex opacity-80">
        <div className="opacity-60">High: {stock.high}</div>
        <div className="opacity-60">Low: {stock.low}</div>
        <div className="opacity-60">Open: {stock.open}</div>

        <div className="opacity-60">Prev. Close: {stock.previous_close}</div>
      </div>
    </div>
  );
}
