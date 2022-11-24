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
      responsive: [
        {
          breakpoint: 1030,
          options: {
            chart: {
              width: 580,
            },
            legend: {
              position: "bottom",
            },
          },
        },
        {
          breakpoint: 620,
          options: {
            chart: {
              width: 350,
            },
            legend: {
              position: "bottom",
              show: false,
            },
          },
        },
      ],
    },
  });

  const [isLoading, setIsLoading] = React.useState(true);
  const [error, setError] = React.useState(null);

  const getInformation = async () => {
    try {
      const response = await getPricesEvolution();
      const series = [];

      //creamos lista de fechas disponibles
      const dates = [];
      const skus = [];
      response.forEach((item) => {
        const isRepited = skus.find((sku) => sku === item.sku);
        if (!isRepited) {
          skus.push(item.sku);
        }
      });

      response.forEach((item) => {
        const isRepited = dates.find((date) => date === item.dateExtraction);
        if (!isRepited) {
          dates.push(item.dateExtraction);
        }
      });

      //ordenamos las fechas
      const sortedDates = dates.sort((a, b) => {
        if (a > b) {
          return 1;
        }
        if (a < b) {
          return -1;
        }
        return 0;
      });

      sortedDates.forEach((date) => {
        skus.forEach((sku) => {
          const product = response.find(
            (item) => item.sku === sku && item.dateExtraction === date
          );
          if (!product) {
            const index = series.findIndex((item) => item.sku === sku);
            if (index !== -1) {
              const uniqueObject = series[index];
              return uniqueObject.data.push(
                uniqueObject.data[uniqueObject.data.length - 1]
              );
            }
          }

          const index = series.findIndex((item) => item.sku === product.sku);
          if (index !== -1) {
            const uniqueObject = series[index];
            return uniqueObject.data.push(product.price);
          }
          return series.push({
            sku: product.sku,
            name: product.name,
            data: [product.price],
            type: "line",
          });
        });
      });

      const labels = dates.map((date) => {
        const dateString = new Date(date).toDateString();
        const dateArray = dateString.split(" ");
        return `${dateArray[1]} ${dateArray[2]}`;
      });

      setData({
        series,
        options: {
          ...data.options,
          labels,
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
