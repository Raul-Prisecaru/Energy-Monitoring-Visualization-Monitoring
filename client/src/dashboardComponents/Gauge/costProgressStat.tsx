import { useEffect, useState } from "react";
import { Gauge } from '@mui/x-charts/Gauge';
import Box from '@mui/joy/Box';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import { Typography } from "@mui/joy";
import Divider from "@mui/joy/Divider";

interface formattedData {
    cost: number,
    userGoal: number
}

function EnergyUsageProgressGauge({ width, height }: { width: number, height: number }) {
    const [data, setData] = useState<formattedData>({ cost: 0, userGoal: 0 });

    useEffect(() => {
        const token = localStorage.getItem("token");
        fetch("http://localhost:3001/api/device/getCostMonthGaugeChart", {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        })
            .then((response) => response.json())
            .then((data) => {
                const formattedData: formattedData = ({
                    cost: data.cost,
                    userGoal: data.target
                });
                setData(formattedData);
            })
            .catch((error) => console.error("Failed to fetch Devices: " + error));
    }, []);

    return (
        <div className={"gaugeChart"}>
            <Box sx={{ width: 250 }}>
                <Card>
                    <Typography level={"h3"}>Currently Paying Over Goal </Typography>
                    <CardContent>
                        <Typography level={"h4"} sx={{paddingTop: 1}}>Current:</Typography>
                        <Typography level={"h3"} sx={{paddingBottom: 3, paddingLeft: 3}}>{data.cost} kWh</Typography>
                        <Divider orientation="horizontal" />
                        <Typography level={"h4"} sx={{paddingTop: 1}}>Target:</Typography>
                        <Typography level={"h3"} sx={{paddingBottom: 3, paddingLeft: 3}}>{data.userGoal} kWh</Typography>
                        <Divider orientation="horizontal" />

                    </CardContent>
                </Card>
            </Box>
        </div>
    );
}

export default EnergyUsageProgressGauge;
