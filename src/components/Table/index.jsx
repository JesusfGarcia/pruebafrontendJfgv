import React from "react";

import { getProductsTable } from "../../services";
import PersistenceLabel from "../PersistenceLabel";

import "./styles.css";

export default function Table() {
  const [rows, setRows] = React.useState([]);

  const getInformation = async () => {
    try {
      const response = await getProductsTable();
      setRows(response);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  React.useEffect(() => {
    getInformation();
  }, []);

  return (
    <div>
      <span>Comparative Analysis</span>
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
                      height="80px"
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
