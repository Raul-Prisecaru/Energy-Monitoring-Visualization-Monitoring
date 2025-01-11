import {LineChart} from "recharts";
import Box from "@mui/joy/Box";
import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import {useEffect, useState} from "react";

function CostHistoryLineChart({deviceID}: {deviceID: string}) {
    const [data, setData] = useState([])

    useEffect(() => {
        fetch("http://localhost:3001/api/device/getCostHistoryDevice" + deviceID)
            .then(response => response.json())
            .then(dataSet => {
                const formattedData = Object.keys(dataSet).map(month => ({
                    month: month,
                    cost: dataSet[month]
                }))
                setData(data)
            })
    }, []);

    return (
        <div>
            <Box>
                <Card>
                    <CardContent>

                    </CardContent>
                </Card>
            </Box>
        </div>
    )

}

export default CostHistoryLineChart