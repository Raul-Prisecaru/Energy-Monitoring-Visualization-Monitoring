import {useEffect, useState} from "react";
import {Bar, BarChart, XAxis, YAxis} from "recharts";

function EnergyCostBarChart() {
    const [data, setData] = useState()
    useEffect(() => {
        fetch("http://localhost:3001/api/device/getCostEnergyUsage")
            .then((response) => response.json())
            .then((energyDevice) => {
                const formattedData = Object.keys(energyDevice).map((energy) => ({
                    energyCost: energyDevice[energy],
                    energyDate: new Date(energy).toLocaleDateString("en-GB"),
                    })
                );
                setData(formattedData);
            })
            .catch((error) => console.error("Failed to fetch Devices: " + error));
    }, []);

    return (
        <div>
            <BarChart width={500} height={200} data={data}>
                <XAxis dataKey={"energyDate"} />
                <YAxis />
                <Bar dataKey={"energyCost"} />
            </BarChart>
        </div>
    )


}


export default EnergyCostBarChart