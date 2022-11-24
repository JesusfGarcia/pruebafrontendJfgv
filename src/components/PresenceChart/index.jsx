import React from "react";
import ReactApexChart from "react-apexcharts";

import { getProductsPresence } from "../../services";
import Card from "../Card";
import Subtitle from "../Subtitle";

export default function PresenceChart() {
  const [data, setData] = React.useState({
    series: [],
    options: {
      labels: [],
      colors: ["#d6215b", "#006fff", "#23b794", "#ff7a00", "#7540b2"],
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
              width: 300,
            },
          },
        },
      ],
    },
  });

  const [isLoading, setIsLoading] = React.useState(true);
  const [error, setError] = React.useState(null);

  const getPresenceData = async () => {
    try {
      const response = await getProductsPresence();
      const series = [];
      const labels = [];

      response.forEach((item) => {
        series.push(item.presenceShare);
        labels.push(item.name);
      });

      setData({
        ...data,
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
    getPresenceData();
  }, []);

  return (
    <div style={{ height: "100%" }}>
      <Subtitle>Presence Share by Product</Subtitle>
      <Card isLoading={isLoading} error={error}>
        <ReactApexChart
          options={data.options}
          series={data.series}
          type="pie"
        />
      </Card>
    </div>
  );
}
