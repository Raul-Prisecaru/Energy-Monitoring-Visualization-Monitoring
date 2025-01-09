import {useEffect, useState} from "react";
import Box from '@mui/joy/Box';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';

import "./styles/totalCostMonthChartStyle.css"

function TotalCostMonthCard() {
    const [data, setData] = useState()
    useEffect(() => {
        fetch("http://localhost:3001/api/device/getCurrentMonthCost")
            .then((response) => response.json())
            .then((energyDevice) => {
                setData(energyDevice.totalEnergy);
            })
            .catch((error) => console.error("Failed to fetch Devices: " + error));
    }, []);

    return (
        <div className={"monthCostChart"}>
            <Box sx={{
                width: 400,
            }}>
                <Card>
                    <CardContent orientation={"horizontal"}>
                        <h3>Currently Paying: </h3>
                        <h2 className={"priceData"}>£{data}</h2>
                    </CardContent>

                </Card>

            </Box>


        </div>
    )


}


export default TotalCostMonthCard;