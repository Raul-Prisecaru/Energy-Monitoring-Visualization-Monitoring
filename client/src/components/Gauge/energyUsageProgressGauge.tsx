import {useEffect, useState} from "react";
import { Gauge } from '@mui/x-charts/Gauge';
import Box from '@mui/joy/Box';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';

import "../styles/energyUsageProgressGaugeStyle.css"



interface formattedData {
    dataTotal: number,
    dataCurrent: number
}

function EnergyUsageProgressGauge({width, height}: {width: number, height: number}) {
    const [data, setData] = useState<formattedData>({});

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
            <Box sx={{width: 300}}>
                <Card>
                    <CardContent>
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

                    </CardContent>

                </Card>

            </Box>

        </div>
    )
}


export default EnergyUsageProgressGauge