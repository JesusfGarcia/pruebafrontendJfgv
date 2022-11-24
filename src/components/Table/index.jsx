import React from "react";

import { getProductsTable } from "../../services";
import PersistenceLabel from "../PersistenceLabel";
import Subtitle from "../Subtitle";

import "./styles.css";

export default function Table() {
  const [rows, setRows] = React.useState([]);

  const getInformation = async () => {
    try {
      const response = await getProductsTable();
      setRows(response);
    } catch (error) {}
  };

  React.useEffect(() => {
    getInformation();
  }, []);

  return (
    <div className="tableContainer">
      <Subtitle>Comparative Analysis</Subtitle>
      <table>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>SKU</th>
            <th>% Presencia</th>
            <th>Av. Price</th>
            <th>A. Position</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((product) => {
            return (
              <tr key={`product${product.id}`}>
                <td>
                  <div className="name-image">
                    <img
                      loading="lazy"
                      alt="product-logo"
                      src={product.productImage}
                      height={80}
                    />
                    <span>{product.name}</span>
                  </div>
                </td>
                <td>{product.sku}</td>
                <td>
                  <PersistenceLabel per={product.persistence} />
                </td>
                <td>{`$${parseFloat(product.averagePrice).toFixed(2)}`}</td>
                <td>{product.averagePosition}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
