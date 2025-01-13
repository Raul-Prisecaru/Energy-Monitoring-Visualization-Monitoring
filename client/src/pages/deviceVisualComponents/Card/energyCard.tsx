import Box from '@mui/joy/Box';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import Typography from '@mui/joy/Typography';
import {useEffect, useState} from "react";


interface formattedData {
    deviceName: string,
    energy: number
}

function EnergyCard({deviceID}: {deviceID: string}) {
    const [data, setData] = useState([])

    useEffect(() => {
        const token = localStorage.getItem("token")
        fetch("http://localhost:3001/api/device/getDayEnergyUsageDevice/"+ deviceID, {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        })
            .then(response => response.json())
            .then(dataSet => {
                const formattedData: formattedData[] = Object.keys(dataSet).map((device) => ({
                        deviceName: device,
                        energy: dataSet[device]
                    })
                );
                console.log(formattedData)
                setData(formattedData)
            })
    }, []);

    return (
        <div className={"cardComponent"}>
            <Box>
                <Card>
                    <CardContent>
                        {data.map((device) => (
                            <div key={device.deviceName}>
                                <Typography level="title-md"> Today's energy usage of {device.deviceName}</Typography>
                                <Typography>energy Usage: {device.energy} kWh</Typography>
                            </div>
                        ))}
                    </CardContent>
                </Card>
            </Box>
        </div>
    )
}

export default EnergyCard