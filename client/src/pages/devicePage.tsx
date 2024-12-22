import "./styles/devicePageStyle.css"
import {useEffect, useState} from "react";

function DevicePage() {
    const [devices, setDevices] = useState([])
    useEffect(() => {
        fetch("http://localhost:3001/api/device/")
            .then((response) => response.json())
            .then((data) => setDevices(data))
            .catch((error) => console.error("Failed to fetch Devices" + error))
    }, [])


    const addDeviceButton = async (e) => {
        e.preventDefault()

        try {
            const response = await fetch("http://localhost:3001/api/device", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    deviceType: "TestDeviceType",
                    energyUsage: 100,
                    energyDate: Date.now(),
                })
            });

            if (response.ok) {
                alert("Data submitted successfully")
            } else {
                alert("Failed to submit data")
            }
        } catch (error) {
            alert("An Error occurred when submitting data:" + error)
        }
    }

    return (
        <div>
            <div>
                <h1 id={"Heading"}>Virtual Devices</h1>
                <button id={"addDeviceButton"} onClick={addDeviceButton}>Add Device</button>

            </div>

            <div>
                <div className={"deviceGrid"}>
                    {devices.map((device, index) => (
                        <div key={index} className="device-card">
                            <h3>{device.deviceType}</h3>
                            <p>{device.energyUsage}</p>
                            <p>Status: {device.energyDate}</p>
                        </div>
                    ))}
                </div>

            </div>


        </div>
    )
}


export default DevicePage