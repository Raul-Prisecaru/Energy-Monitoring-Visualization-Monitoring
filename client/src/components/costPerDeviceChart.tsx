import {useEffect, useState} from "react";
import DeviceDisplayComponent from "./deviceDisplayComponent"


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
            {Object.entries(data).map(([device, cost]) => (
                <DeviceDisplayComponent deviceName={device} deviceCost={cost} />
            ))}
        </div>
    )
}

export default CostPerDeviceChart