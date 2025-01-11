import {useEffect, useState} from "react";

interface formattedData {
    month: string,
    energyUsage: number
}

function EnergyHistoryBarChart({deviceID}: {deviceID: string}) {
    const [data, setData] = useState<formattedData[]>([])

    useEffect(() => {
        fetch("http://localhost:3001/api/device/getEnergyHistoryDevice/" + deviceID)
            .then(response => response.json())
            .then(dataSet => {
                const formattedData: formattedData[] = Object.keys(dataSet).map((dataMonth) => ({
                    month: dataMonth,
                    energyUsage: dataSet[dataMonth]
                }))
                setData(formattedData)
            })
    }, []);
    return (
        <div>

        </div>
    )

}


export default EnergyHistoryBarChart