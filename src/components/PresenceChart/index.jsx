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
    },
  });

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
    } catch (error) {
      console.log(error);
    }
  };

  React.useEffect(() => {
    getPresenceData();
  }, []);

  return (
    <div style={{ height: "100%" }}>
      <Subtitle>Presence Share by Product</Subtitle>
      <Card>
        <ReactApexChart
          options={data.options}
          series={data.series}
          type="pie"
        />
      </Card>
    </div>
  );
}
