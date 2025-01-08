import {useEffect, useState} from "react";
import {Bar, BarChart, XAxis, YAxis} from "recharts";

interface formattedData {
    energyCost: number,
    energyDate: string
}

function EnergyCostBarChart({width, height}: {width: number, height: number}) {
    const [data, setData] = useState<formattedData[]>([])

    useEffect(() => {
        fetch("http://localhost:3001/api/device/getEnergyUsageCostPerMonth")
            .then((response) => response.json())
            .then((energyDevice) => {
                const formattedData: formattedData[] = Object.keys(energyDevice).map((energy) => ({
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
            <BarChart width={width} height={height} data={data}>
                <XAxis dataKey={"energyDate"} />
                <YAxis />
                <Bar dataKey={"energyCost"} />
            </BarChart>
        </div>
    )


}


export default EnergyCostBarChart