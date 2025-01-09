import {useEffect, useState} from "react";
import DeviceDisplayComponent from "./deviceDisplayComponent.tsx"
import Box from '@mui/material/Box';

function CostPerDeviceChart() {
    const [data, setData] = useState({})
    useEffect(() => {
        fetch("http://localhost:3001/api/device/getCostPerDevice")
            .then(response => response.json())
            .then((data) => {
                setData(data)
            })
    }, []);

    return (
        <div>
            <Box
                sx={{
                    maxHeight: '400px',
                    overflowY: 'auto',
                }}
            >
                {Object.entries(data).map(([device, cost]) => (
                    <DeviceDisplayComponent key={device} deviceName={device} deviceCost={cost} />
                ))}

            </Box>
        </div>
    )
}

export default CostPerDeviceChart