import {useEffect, useState} from "react";

function EnergyUsageProgressHalfDonutChart(width, height) {
    const [data, setData] = useState()
    
    useEffect(() => {
        fetch("http://localhost:3001/api/device/getEnergyUsageProgress")
            .then((response) => response.json())
            .then((data) => {
                const formattedData = [
                     {
                        totalEnergyUsage: data.total,
                        limit: data.limit
                     }
                ];

                setData(formattedData);
            })
            .catch((error) => console.error("Failed to fetch Devices: " + error));
    }, []);


    return (
        <div>

        </div>
    )
}


export default EnergyUsageProgressHalfDonutChart