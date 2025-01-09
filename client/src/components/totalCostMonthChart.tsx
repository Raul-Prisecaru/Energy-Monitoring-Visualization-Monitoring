import {useEffect, useState} from "react";
import Box from '@mui/joy/Box';

import "./styles/totalCostMonthChartStyle.css"

function TotalCostMonthChart() {
    const [data, setData] = useState()
    useEffect(() => {
        fetch("http://localhost:3001/api/device/getCurrentMonthCost")
            .then((response) => response.json())
            .then((energyDevice) => {
                setData(energyDevice.totalEnergy);
            })
            .catch((error) => console.error("Failed to fetch Devices: " + error));
    }, []);

    return (
        <div className={"monthCostChart"}>
            <Box>
                <h3>Your Currently Paying: </h3>

                <h1 className={"priceData"}>£{data}</h1>
            </Box>


        </div>
    )


}


export default TotalCostMonthChart;