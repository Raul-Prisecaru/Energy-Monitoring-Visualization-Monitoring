import {Area, AreaChart, XAxis, YAxis} from "recharts";
import {useEffect, useState} from "react";

interface formattedData {
    energyUsage: number,
    energyDate: string
}

function UsageAreaChart({width, height}: {width: number, height: number}) {
    const [data, setData] = useState<formattedData[]>([])

    useEffect(() => {
        fetch("http://localhost:3001/api/device/")
            .then((response) => response.json())
            .then((devices) => {
                const formattedData: formattedData[] = devices.flatMap((device: any) =>
                    device.energyHistory.map((historyData: formattedData) => ({
                        energyUsage: historyData.energyUsage,
                        energyDate: new Date(historyData.energyDate).toLocaleDateString("en-GB")
                    }))
                );
                console.log(formattedData)
                setData(formattedData);
            })
            .catch((error) => console.error("Failed to fetch Devices: " + error));
    }, []);

    return (
        <div>
            <AreaChart width={width} height={height} data={data}>
                <XAxis dataKey={"energyDate"} />
                <YAxis />
                <Area type="monotone" dataKey="energyUsage" />
            </AreaChart>
        </div>
    )
}


export default UsageAreaChart;