import {useEffect, useState} from "react";
import Box from '@mui/joy/Box';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';

import "../../styles/totalCostMonthChartStyle.css"

function TotalNumberDevices() {
    const [data, setData] = useState()
    useEffect(() => {
        const token = localStorage.getItem("token")

        fetch("http://localhost:3001/api/device/getTotalConnectedDevices", {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        })
            .then((response) => response.json())
            .then((energyDevice) => {
                console.log(energyDevice)
                setData(energyDevice);
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
                        <h3>Total Number of Connected Devices</h3>
                        <h2 className={"priceData"}>{data}</h2>
                    </CardContent>

                </Card>

            </Box>


        </div>
    )


}


export default TotalNumberDevices;