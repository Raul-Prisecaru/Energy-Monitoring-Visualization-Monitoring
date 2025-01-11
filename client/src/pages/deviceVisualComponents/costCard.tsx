import Box from '@mui/joy/Box';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import Typography from '@mui/joy/Typography';
import {useEffect, useState} from "react";
import {response} from "express";

interface formattedData {
    deviceName: string,
    cost: number
}

function CostCard() {
    const [data, setData] = useState([])

    useEffect(() => {
        fetch("https://localhost:3001/api/device/getDayCostDevice/")
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
        <div>

        </div>
    )
}

export default CostCard