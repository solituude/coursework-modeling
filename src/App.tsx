import React from 'react';

import './App.css';
import Microprogramm from "./components/GSA/Microprogramm";
import DischargeGrid from "./components/DischargeGrig/DischargeGrid";
import ProgramControls from "./components/ProgramControls/ProgramControls";
import UA_OA from "./components/UA_OA/UA_OA";

function App() {
    return (
        <div className={"app"}>
            <Microprogramm/>
            <div className={"col"}>
                <DischargeGrid/>
                <UA_OA/>
            </div>
            <ProgramControls/>
        </div>
    );
}

export default App;
