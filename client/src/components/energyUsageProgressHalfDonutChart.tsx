import {useEffect, useState} from "react";
import { Gauge } from '@mui/x-charts/Gauge';

import { Chart as ChartJS, Tooltip, Legend, ArcElement } from "chart.js";


interface formattedData {
    dataTotal: number,
    dataCurrent: number
}

function EnergyUsageProgressHalfDonutChart({width, height}: {width: number, height: number}) {
    const [data, setData] = useState<formattedData>();

    ChartJS.register(Tooltip, Legend, ArcElement);

    useEffect(() => {
        fetch("http://localhost:3001/api/device/getEnergyUsageProgress")
            .then((response) => response.json())
            .then((data) => {
                const formattedData: formattedData = {
                    dataTotal: data.limit,
                    dataCurrent: data.total
                };


                console.log(formattedData)
                setData(formattedData);
            })
            .catch((error) => console.error("Failed to fetch Devices: " + error));
    }, []);


    return (
        <div>
            <Gauge width={width} height={height} value={data.dataCurrent} startAngle={-90} endAngle={90} valueMax={data.dataTotal} />
        </div>
    )
}


export default EnergyUsageProgressHalfDonutChart