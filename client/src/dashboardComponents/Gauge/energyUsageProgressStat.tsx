import {useEffect, useState} from "react";
import { Gauge } from '@mui/x-charts/Gauge';
import Box from '@mui/joy/Box';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';

import {Typography} from "@mui/joy";
import Divider from "@mui/joy/Divider";



interface formattedData {
    dataLimit: number,
    dataCurrent: number
}

function EnergyUsageProgressStat({width, height}: {width: number, height: number}) {
    const [data, setData] = useState<formattedData>({});

    useEffect(() => {
        const token = localStorage.getItem("token")
        fetch("http://localhost:3001/api/device/getMonthEnergyUsageProgress", {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        })
            .then((response) => response.json())
            .then((data) => {
                const formattedData: formattedData = {
                    dataLimit: data.limit,
                    dataCurrent: data.total
                };

                setData(formattedData);
            })
            .catch((error) => console.error("Failed to fetch Devices: " + error));
    }, []);


    return (
        <div className={"gaugeChart"}>
            <Box sx={{width: 250}}>
                <Card>
            <Typography level={"h4"}>Energy Usage</Typography>
                    <Divider orientation="horizontal" />
                    <CardContent>
                        <Typography level={"h4"} sx={{paddingTop: 1}}>Current:</Typography>
                        <Typography level={"h3"} sx={{paddingBottom: 3, paddingLeft: 3}}>{data.dataCurrent} kWh</Typography>
                        <Divider orientation="horizontal" />
                        <Typography level={"h4"} sx={{paddingTop: 1}}>Target:</Typography>
                        <Typography level={"h3"} sx={{paddingBottom: 3, paddingLeft: 3}}>{data.dataLimit} kWh</Typography>
                        <Divider orientation="horizontal" />

                        {/*Show how much the user needs to decrease to reach target*/}

                    </CardContent>
                </Card>

            </Box>

        </div>
    )
}


export default EnergyUsageProgressStat