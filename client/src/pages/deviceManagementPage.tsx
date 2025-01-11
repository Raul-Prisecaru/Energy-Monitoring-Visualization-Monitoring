import "./styles/devicePageStyle.css"
import {useEffect, useState} from "react";
import {Box} from "@mui/material";
import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';
import DialogTitle from '@mui/joy/DialogTitle';
import DialogContent from '@mui/joy/DialogContent';
import CostCard from "./deviceVisualComponents/Card/costCard.tsx";
import EnergyCard from "./deviceVisualComponents/Card/energyCard.tsx";
import EnergyHistoryBarChart from "./deviceVisualComponents/BarChart/EnergyHistoryBarChart.tsx";
import CostHistoryLineChart from "./deviceVisualComponents/LineChart/CostHistoryLineChart.tsx";

function DeviceManagementPage() {
    const [isOpen, setIsOpen] = useState(false);
    const [devicesList, setDevicesList] = useState([]);
    const [deviceName, setDeviceName] = useState("");
    const [deviceType, setDeviceType] = useState("");


    const [viewDevice, setViewDevice] = useState(null)

    useEffect(() => {
        fetch("http://localhost:3001/api/device/")
            .then((response) => response.json())
            .then((data) => setDevicesList(data))
            .catch((error) => console.error("Failed to fetch Devices" + error))
    }, [])


    const handleOpen = () => setIsOpen(true);

    const handleClose = () => {
        setIsOpen(false);
        setViewDevice(null);

    }

    const handleDeviceNameChange = (e) => setDeviceName(e.target.value);

    const handleDeviceTypeChange = (e) => setDeviceType(e.target.value);

    const handleViewDevice = (device) => {
        setViewDevice(device);
        console.log("Device + ID: " + device._id)
        handleOpen();
    };

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
                            energyUsage: Math.floor(Math.random() * 101) + 100, // Random value between 100-200
                            energyDate: new Date(2023, 0, 15).getTime() // January
                        },
                        {
                            energyUsage: Math.floor(Math.random() * 101) + 100, // Random value between 100-200
                            energyDate: new Date(2023, 1, 15).getTime() // February
                        },
                        {
                            energyUsage: Math.floor(Math.random() * 101) + 100, // Random value between 100-200
                            energyDate: new Date(2023, 2, 15).getTime() // March
                        },
                        {
                            energyUsage: Math.floor(Math.random() * 101) + 100, // Random value between 100-200
                            energyDate: new Date(2023, 3, 15).getTime() // April
                        },
                        {
                            energyUsage: Math.floor(Math.random() * 101) + 100, // Random value between 100-200
                            energyDate: new Date(2023, 4, 15).getTime() // May
                        },
                        {
                            energyUsage: Math.floor(Math.random() * 101) + 100, // Random value between 100-200
                            energyDate: new Date(2023, 5, 15).getTime() // June
                        },
                        {
                            energyUsage: Math.floor(Math.random() * 101) + 100, // Random value between 100-200
                            energyDate: new Date(2023, 6, 15).getTime() // July
                        },
                        {
                            energyUsage: Math.floor(Math.random() * 101) + 100, // Random value between 100-200
                            energyDate: new Date(2023, 7, 15).getTime() // August
                        },
                        {
                            energyUsage: Math.floor(Math.random() * 101) + 100, // Random value between 100-200
                            energyDate: new Date(2023, 8, 15).getTime() // September
                        },
                        {
                            energyUsage: Math.floor(Math.random() * 101) + 100, // Random value between 100-200
                            energyDate: new Date(2023, 9, 15).getTime() // October
                        },
                        {
                            energyUsage: Math.floor(Math.random() * 101) + 100, // Random value between 100-200
                            energyDate: new Date(2023, 10, 15).getTime() // November
                        },
                        {
                            energyUsage: Math.floor(Math.random() * 101) + 100, // Random value between 100-200
                            energyDate: new Date(2023, 11, 15).getTime() // December
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
                            {viewDevice ? (
                                <div>
                                    {viewDevice.deviceName}
                                    <CostCard deviceID={viewDevice._id}/>
                                    <EnergyCard deviceID={viewDevice._id} />
                                    {/*<EnergyHistoryBarChart deviceID={viewDevice._id} />*/}
                                    <CostHistoryLineChart deviceID={viewDevice._id} />
                                </div>


                            ) : (


                                    <div>
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
                            )}
                        </div>
                    </Box>

                </Modal>

            </div>

            <div>
                <div className={"device-grid"}>
                    {devicesList.map((device, index) => (
                        <div key={index} className="device-card">
                            <h1>{device.deviceName}</h1>
                            <h3>Device Type: {device.deviceType}</h3>
                            <button onClick={() => handleViewDevice(device)}>View Details</button>
                        </div>
                    ))}
                </div>

            </div>


        </div>
    )
}


export default DeviceManagementPage