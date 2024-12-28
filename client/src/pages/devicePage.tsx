import "./styles/devicePageStyle.css"
import {useEffect, useState} from "react";
import {Box, Modal} from "@mui/material";

function DevicePage() {
    const [isOpen, setIsOpen] = useState(false);
    const [devices, setDevices] = useState([]);
    const [deviceName, setDeviceName] = useState("");
    const [deviceType, setDeviceType] = useState("");

    useEffect(() => {
        fetch("http://localhost:3001/api/device/")
            .then((response) => response.json())
            .then((data) => setDevices(data))
            .catch((error) => console.error("Failed to fetch Devices" + error))
    }, [])


    const handleOpen = () => setIsOpen(true);

    const handleClose = () => setIsOpen(false);

    const handleDeviceNameChange = (e) => setDeviceName(e.target.value);

    const handleDeviceTypeChange = (e) => setDeviceType(e.target.value);

    const addDeviceButton = async (e) => {
        e.preventDefault()

        try {
            const response = await fetch("http://localhost:3001/api/device", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    deviceName: deviceName,
                    deviceType: deviceType,
                    energyHistory: [
                        {
                            energyUsage: 150,
                            energyDate: Date.now()
                        },
                        {
                            energyUsage: 200,
                            energyDate: Date.now()
                        },
                        {
                            energyUsage: 120,
                            energyDate: Date.now()
                        },
                        {
                            energyUsage: 100,
                            energyDate: Date.now()
                        },
                        {
                            energyUsage: 200,
                            energyDate: Date.now()
                        }
                    ]
                })
            });

            if (response.ok) {
                alert("Data submitted successfully")
            } else {
                const errorDetail = response.json()
                alert("There has been an Error: " + errorDetail)
                console.error("There has been an Error: ", errorDetail)
            }
        } catch (error) {
            alert("An Error occurred when submitting data:" + error)
        }
    }

    return (
        <div>
            <div>
                <h1 id={"Heading"}>Virtual Devices</h1>
                <button id={"addDeviceButton"} onClick={handleOpen}>Add Device</button>

                <Modal
                    open={isOpen}
                    onClose={handleClose}>

                    <Box className={"styleBoxModal"}>
                        <div className={"modalContent"}>

                            <div className={"modalHeader"}>
                                <h1>Add Device</h1>
                            </div>

                            <div className={"modalForm"}>

                                <form>
                                    <div className={"modalDeviceNameLabel"}>
                                        <label>Device Name</label>
                                    </div>

                                    <div className={"modalDeviceNameInput"}>
                                        <input type={"textext"} onChange={handleDeviceNameChange}/>
                                    </div>


                                    <div className={"modalDeviceTypeLabel"}>
                                        <label>Device Type</label>
                                    </div>

                                    <div className={"modalDeviceTypeInput"}>
                                        <input type={"text"} onChange={handleDeviceTypeChange}/>
                                    </div>

                                </form>

                                <button onClick={addDeviceButton}>Confirm Changes</button>
                            </div>
                        </div>
                    </Box>

                </Modal>

            </div>

            <div>
                <div className={"device-grid"}>
                    {devices.map((device, index) => (
                        <div key={index} className="device-card">
                            <h1>{device.deviceName}</h1>
                            <h3>Device Type: {device.deviceType}</h3>
                        </div>
                    ))}
                </div>

            </div>


        </div>
    )
}


export default DevicePage