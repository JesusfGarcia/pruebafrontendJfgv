import "./App.css";
import Header from "./components/Header";
import PresenceChart from "./components/PresenceChart";
import PriceEvolutionChart from "./components/PriceEvolutionChart";
import Table from "./components/Table";

function App() {
  return (
    <div className="container">
      <Header />
      <div className="content">
        <div className="priceEv">
          <PriceEvolutionChart />
        </div>
        <div className="presence">
          <PresenceChart />
        </div>
        <div className="tabl">
          <Table />
        </div>
      </div>
    </div>
  );
}

export default App;
