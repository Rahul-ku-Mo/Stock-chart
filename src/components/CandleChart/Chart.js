import React from "react";
import PropTypes from "prop-types";

import { ChartCanvas, Chart } from "react-stockcharts";
import { CandlestickSeries } from "react-stockcharts/lib/series";
import { XAxis, YAxis } from "react-stockcharts/lib/axes";

import { discontinuousTimeScaleProvider } from "react-stockcharts/lib/scale";

import { last } from "react-stockcharts/lib/utils";

class CandleStickStockScaleChart extends React.Component {
  render() {
    const { type, data: initialData, ratio } = this.props;

    const xScaleProvider = discontinuousTimeScaleProvider.inputDateAccessor(
      (d) => d.datetime
    );
    const { data, xScale, xAccessor, displayXAccessor } =
      xScaleProvider(initialData);
    const start = xAccessor(last(data));
    const end = xAccessor(data[Math.max(0, data.length - 30)]);
    const xExtents = [start, end];

    return (
      <ChartCanvas
        height={500}
        ratio={1.25}
        width={1024}
        margin={{ left: 50, right: 50, top: 10, bottom: 30 }}
        type={type}
        seriesName="MSFT"
        data={data}
        xScale={xScale}
        xAccessor={xAccessor}
        displayXAccessor={displayXAccessor}
        xExtents={xExtents}
      >
        <Chart id={1} yExtents={(d) => [d.high, d.low]}>
          <XAxis axisAt="bottom" orient="bottom" ticks={6} />
          <YAxis axisAt="left" orient="left" ticks={5} />

          <CandlestickSeries />
        </Chart>
      </ChartCanvas>
    );
  }
}

export default CandleStickStockScaleChart;
