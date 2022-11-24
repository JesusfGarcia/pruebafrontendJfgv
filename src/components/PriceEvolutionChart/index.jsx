import React from "react";

import { getPricesEvolution } from "../../services";

import ReactApexChart from "react-apexcharts";
import Card from "../Card";

export default function PriceEvolutionChart() {
  const [data, setData] = React.useState({
    series: [],
    options: {
      chart: {
        height: 350,
        type: "line",
      },
      stroke: {
        curve: "smooth",
      },
      fill: {
        type: "solid",
      },
      labels: [],
      markers: {
        size: 0,
      },
      tooltip: {
        shared: true,
        intersect: false,
        y: {
          formatter: function (y) {
            if (typeof y !== "undefined") {
              return y.toFixed(0) + " points";
            }
            return y;
          },
        },
      },
    },
  });

  const getInformation = async () => {
    try {
      const response = await getPricesEvolution();

      const series = [];
      const labels = [];

      response.forEach((element) => {
        const index = series.findIndex((item) => item.sku === element.sku);
        if (index !== -1) {
          const uniqueObject = series[index];
          uniqueObject.data.push(element.price);
        } else {
          series.push({
            sku: element.sku,
            name: element.name,
            data: [element.price],
            type: "line",
          });
        }

        const labelIndex = labels.findIndex(
          (item) => item === element.dateExtraction
        );
        if (labelIndex === -1) {
          labels.push(element.dateExtraction);
        }
      });

      setData({
        ...data,
        series: series,
        options: {
          ...data.options,
          labels: labels,
        },
      });

      //recorrere los elementos para ordenarlos por fechas
      /* response.forEach((element) => {
        const index = dates.findIndex(
          (item) => item.dateExtraction === element.dateExtraction
        );
        if (index !== -1) {
          const uniqueObject = dates[index];
          uniqueObject.data.push(element);
        } else {
          dates.push({
            dateExtraction: element.dateExtraction,
            data: [element],
          });
        }
      });

      //ordenaremos las fechas en orden cronologico
      const newDates = dates.sort((a, b) => {
        if (a.dateExtraction > b.dateExtraction) {
          return 1;
        }
        if (a.dateExtraction < b.dateExtraction) {
          return -1;
        }

        return 0;
      });

      console.log("newDates", newDates); */
    } catch (error) {
      console.log(error);
    }
  };

  React.useEffect(() => {
    getInformation();
  }, []);

  return (
    <div style={{ height: "100%" }}>
      <span>Price Evolution</span>
      <Card>
        <ReactApexChart
          options={data.options}
          series={data.series}
          type="line"
          height={350}
        />
      </Card>
    </div>
  );
}
