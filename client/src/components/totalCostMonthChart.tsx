import {useEffect, useState} from "react";

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
        <div>
            <h3>Your Currently Paying: </h3>

            <h1>£{data}</h1>

        </div>
    )



}


export default TotalCostMonthChart;