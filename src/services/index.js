import axiosBase from "./axiosBase";

const getPricesEvolution = async () => {
  try {
    const { data } = await axiosBase({
      method: "GET",
      endpoint: "/price-evolution-chart",
    });
    return data;
  } catch (error) {
    throw error;
  }
};

const getProductsPresence = async () => {
  try {
    const { data } = await axiosBase({
      method: "GET",
      endpoint: "/presence-share-chart",
    });
    return data;
  } catch (error) {
    throw error;
  }
};

const getProductsTable = async () => {
  try {
    const { data } = await axiosBase({
      method: "GET",
      endpoint: "/beer-products",
    });
    return data;
  } catch (error) {
    throw error;
  }
};

export { getPricesEvolution, getProductsPresence, getProductsTable };
