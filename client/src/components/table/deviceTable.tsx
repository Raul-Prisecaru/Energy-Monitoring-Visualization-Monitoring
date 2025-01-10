import {Pie, PieChart} from "recharts";
import {useEffect, useState} from "react";
import Table from '@mui/joy/Table';

interface formattedData {
    deviceCategory: string,
    energyUsage:number
}

function DeviceTable({width, height}: {width: number, height: number}) {
    const [data, setData] = useState<formattedData[]>([])

    useEffect(() => {
        fetch("http://localhost:3001/api/device/getEnergyOfEachCategory")
            .then((response) => response.json())
            .then((devices) => {
                const formattedData: formattedData[] = Object.keys(devices).map((category) => ({
                    deviceCategory: category,
                    energyUsage: devices[category]
                })
                );
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

            </Table>
        </div>
    )
}


export default DeviceTable;