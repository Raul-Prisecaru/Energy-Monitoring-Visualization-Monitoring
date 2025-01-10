import {useEffect, useState} from "react";
import Table from '@mui/joy/Table';

interface formattedData {
    deviceName: string,
    deviceStatus: boolean,
    deviceEnergy: number
}

function DeviceTable({width, height}: {width: number, height: number}) {
    const [data, setData] = useState<formattedData[]>([])

    useEffect(() => {
        fetch("http://localhost:3001/api/device/getDeviceActiveStatusAndUsage")
            .then((response) => response.json())
            .then((devices) => {
                const formattedData: formattedData[] = Object.keys(devices).map((data) => ({
                    deviceName: data,
                    deviceStatus: devices[data][0],
                    deviceEnergy: devices[data][1],
                })
                );
                console.log(formattedData)
                setData(formattedData);
            })
            .catch((error) => console.error("Failed to fetch Devices: " + error));
    }, []);

    return (
        <div>
            <Table>
                <thead>
                <tr>
                    <th style={{width: 100}}> Active </th>
                    <th> Device </th>
                    <th> Active Usage </th>
                </tr>
                </thead>
                <tbody>

                    {data.map((device, index) => (
                        <tr key={index}>
                            <td>{device.deviceStatus}</td>
                            <td>{device.deviceName}</td>
                            <td>{device.deviceEnergy}</td>
                        </tr>

                ))}
            </tbody>

        </Table>
</div>
)
}


export default DeviceTable;