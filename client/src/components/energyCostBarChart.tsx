import {useEffect, useState} from "react";

function EnergyCostBarChart() {
    const [data, setData] = useState()
    useEffect(() => {
        fetch("http://localhost:3001/api/device/getCostEnergyUsage")
            .then((response) => response.json())
            .then((energyDevice) => {
                const formattedData = Object.keys(energyDevice).map((energy) => ({
                    energyCost: energy,
                    energyDate: energyDevice[energy],
                    })
                );
                setData(formattedData);
            })
            .catch((error) => console.error("Failed to fetch Devices: " + error));
    }, []);
}


export default EnergyCostBarChart