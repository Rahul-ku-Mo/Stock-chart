import React, { useEffect, useState } from "react";

import Chart from "./Chart";
import { toast } from "react-toastify";
import { TypeChooser } from "react-stockcharts/lib/helper";

const ChartComponent = ({ symbol }) => {
  const [data, setData] = useState({});
  useEffect(() => {
    const options = {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": "89346ec63dmsh20fa5782792aedbp18742fjsn2f8a3a7e7633",
        "X-RapidAPI-Host": "twelve-data1.p.rapidapi.com",
      },
    };

    const getCandles = async () => {
  
      await fetch(
        `https://twelve-data1.p.rapidapi.com/time_series?symbol=${symbol}&interval=1day&outputsize=30&format=json`,
        options
      )
        .then((response) => response.json())
        .then((data) => {
          const input = data.values;
       
          const output = input.map((obj) => ({
            ...obj,
            datetime: new Date(obj.datetime),
          }));

          const sorted = output.reverse();
          setData({ data: sorted });
        })
        .catch((err) => {
          toast.error("💥 Stock Chart not found!", {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            progress: undefined,
            theme: "dark",
          });
        });
    };

    getCandles();
  }, []);

  if (data.data == null) {
    return <div className="text-slate-800">Loading...</div>;
  }

  return (
    <TypeChooser>{(type) => <Chart type={type} data={data.data} />}</TypeChooser>
  );
};

export default ChartComponent;
