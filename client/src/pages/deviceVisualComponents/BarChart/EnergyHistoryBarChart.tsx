import {useEffect, useState} from "react";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import {Bar, BarChart, XAxis, YAxis} from "recharts";
import Box from "@mui/joy/Box";

interface formattedData {
    month: string,
    energyUsage: number
}

function EnergyHistoryBarChart({deviceID}: {deviceID: string}) {
    const [data, setData] = useState<formattedData[]>([])

    useEffect(() => {
        const token = localStorage.getItem("token")
        fetch("http://localhost:3001/api/device/getEnergyHistoryDevice/" + deviceID, {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        })
            .then(response => response.json())
            .then(dataSet => {
                const formattedData: formattedData[] = Object.keys(dataSet).map((dataMonth) => ({
                    month: dataMonth,
                    energyUsage: dataSet[dataMonth]
                }))
                setData(formattedData)
            })
    }, []);
    return (
        <div>
            <Box>
                <Card>
                    <CardContent>
                        <BarChart width={1000} height={250} data={data}>
                            <XAxis dataKey={"month"}/>
                            <YAxis dataKey={"energyUsage"} />
                            <Bar dataKey={"energyUsage"} />
                        </BarChart>
                    </CardContent>
                </Card>
            </Box>
        </div>
    )

}


export default EnergyHistoryBarChart