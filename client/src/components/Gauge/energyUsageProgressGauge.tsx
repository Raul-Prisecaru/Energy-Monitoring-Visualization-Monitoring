import {useEffect, useState} from "react";
import { Gauge, gaugeClasses } from '@mui/x-charts/Gauge';
import "../styles/energyUsageProgressGaugeStyle.css"

import { Chart as ChartJS, Tooltip, Legend, ArcElement } from "chart.js";


interface formattedData {
    dataTotal: number,
    dataCurrent: number
}

function EnergyUsageProgressGauge({width, height}: {width: number, height: number}) {
    const [data, setData] = useState<formattedData>({});

    ChartJS.register(Tooltip, Legend, ArcElement);

    useEffect(() => {
        fetch("http://localhost:3001/api/device/getEnergyUsageProgress")
            .then((response) => response.json())
            .then((data) => {
                const formattedData: formattedData = {
                    dataTotal: data.limit,
                    dataCurrent: data.total
                };


                setData(formattedData);
            })
            .catch((error) => console.error("Failed to fetch Devices: " + error));
    }, []);


    return (
        <div className={"gaugeChart"}>
            <Gauge
                value={data.dataCurrent}
                valueMax={data.dataTotal}
                startAngle={-110}
                endAngle={110}
                width={width}
                height={height}
                text={
                    ({ value, valueMax }) => `${value} / ${valueMax}`
                }
            />
        </div>
    )
}


export default EnergyUsageProgressGauge