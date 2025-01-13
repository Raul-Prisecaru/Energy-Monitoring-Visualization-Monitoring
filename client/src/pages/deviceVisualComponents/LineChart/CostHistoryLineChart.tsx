import {Line, LineChart, XAxis, YAxis} from "recharts";
import Box from "@mui/joy/Box";
import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import {useEffect, useState} from "react";

function CostHistoryLineChart({deviceID}: {deviceID: string}) {
    const [data, setData] = useState([])

    useEffect(() => {
        const token = localStorage.getItem("token")
        fetch("http://localhost:3001/api/device/getCostHistoryDevice/" + deviceID, {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        })
            .then(response => response.json())
            .then(dataSet => {
                const formattedData = Object.keys(dataSet).map(month => ({
                    month: month,
                    cost: dataSet[month]
                }))
                setData(formattedData)
            })
    }, []);

    return (
        <div>
            <Box>
                <Card>
                    <CardContent>
                        <LineChart width={1000} height={400} data={data}>
                        <XAxis dataKey={"month"}/>
                        <YAxis dataKey={"cost"} />
                        <Line dataKey={"cost"} />
                        </LineChart>

                    </CardContent>
                </Card>
            </Box>
        </div>
    )

}

export default CostHistoryLineChart