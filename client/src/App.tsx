import { useEffect, useState } from 'react';
import './App.css';
import BattedBallTable from './components/BattleBallTable';
import ScatterChart from './components/ScatterChart';
import { IBattedBallData } from './models/IBattedBallData';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { NavBar } from './components/NavBar';

const App = () => {
  const [data, setData] = useState<Array<IBattedBallData>>(Array<IBattedBallData>());
  
  useEffect(() => {
    fetch("/v1/batted-ball")
      .then(response => response.json())
      .then(data => {
        //Set id on elements so the table displays properly
        data.map((element: IBattedBallData, index: number) => element.id = index );
        setData(data);
      })
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<NavBar />}>
          <Route index element={<BattedBallTable battedBallData={data}></BattedBallTable>} />
          <Route path="graph" element={ <ScatterChart battedBallData={data}></ScatterChart> } />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
