import React from 'react';

import './App.css';
import Microprogramm from "./components/GSA/Microprogramm";
import DischargeGrid from "./components/DischargeGrig/DischargeGrid";
import ProgramControls from "./components/ProgramControls/ProgramControls";

function App() {
    return (
        <div className={"app"}>
            <Microprogramm/>
            <DischargeGrid/>
            <ProgramControls/>
        </div>
    );
}

export default App;
