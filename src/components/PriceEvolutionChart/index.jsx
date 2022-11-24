import React from "react";

import { getPricesEvolution } from "../../services";

import ReactApexChart from "react-apexcharts";
import Card from "../Card";
import Subtitle from "../Subtitle";

export default function PriceEvolutionChart() {
  const [data, setData] = React.useState({
    series: [],
    options: {
      colors: ["#d6215b", "#ff7a00", "#7540b2"],
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
              return `$${y.toFixed(2)}`;
            }
            return y;
          },
        },
      },
    },
  });

  const [isLoading, setIsLoading] = React.useState(true);
  const [error, setError] = React.useState(null);

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

      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      setError("Error al cargar los datos :(");
    }
  };

  React.useEffect(() => {
    getInformation();
  }, []);

  return (
    <div style={{ height: "100%" }}>
      <Subtitle>Price Evolution</Subtitle>
      <Card isLoading={isLoading} error={error}>
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
