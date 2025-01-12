import Box from '@mui/joy/Box';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import Typography from '@mui/joy/Typography';
import {useEffect, useState} from "react";


interface formattedData {
    deviceName: string,
    cost: number
}

function CostCard({deviceID}: {deviceID: string}) {
    const [data, setData] = useState([])

    useEffect(() => {
        fetch("http://localhost:3001/api/device/getDayCostDevice/"+ deviceID)
            .then(response => response.json())
            .then(dataSet => {
                const formattedData: formattedData[] = Object.keys(dataSet).map((device) => ({
                        deviceName: device,
                        cost: dataSet[device]
                    })
                );
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
                                <Typography level="title-md"> Today's Cost of {device.deviceName}</Typography>
                                <Typography>Cost: £{device.cost}</Typography>
                            </div>
                        ))}
                    </CardContent>
                </Card>
            </Box>
        </div>
    )
}

export default CostCard