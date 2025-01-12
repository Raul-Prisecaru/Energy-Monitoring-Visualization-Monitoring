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

    const generateDataset = async (deviceID: string) => {
        const startDate: Date = new Date(`${2023}-01-01`);
        const endDate: Date = new Date(`${2023}-12-31`);
        let currentDate: Date = new Date(startDate);

        while (currentDate <=endDate) {
            const response = await fetch("http://localhost:3001/api/device/" + deviceID, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    energyHistory: [
                        {
                            energyUsage: Math.floor(Math.random() * 101) + 100,
                            energyDate: currentDate,
                        },
                    ],
                }),
            });

            const result = await response.json();
            console.log(result);

            currentDate.setDate(currentDate.getDate() + 1)

        };

        }



    const addDeviceButton = async (e) => {
        e.preventDefault()
        const token = localStorage.getItem("token")
        try {
            const response = await fetch("http://localhost:3001/api/device", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify({
                    deviceName: deviceName,
                    deviceType: deviceType,
                    energyHistory: [

                    ]
                })
            });

            if (response.ok) {
                const data = await response.json()
                const device = data.device

                // await generateDataset(device._id);

                alert("Data submitted successfully")
            } else {
                const errorDetail = await response.json()
                alert("There has been an Error: " + errorDetail)
                console.error("There has been an Error: ", errorDetail)
            }
        } catch (error) {
            alert("An Error occurred when submitting data:" + error)
        }
    }

    return (
        <div>
            {/*<GenerateDataDevice deviceID={"678097cb60ef2d6a4a66142a"} startYear={2023} />*/}
            {/*<button onClick={clickTest}> test</button>*/}

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
                                    <EnergyCard deviceID={viewDevice._id}/>
                                    {/*<EnergyHistoryBarChart deviceID={viewDevice._id} />*/}
                                    <CostHistoryLineChart deviceID={viewDevice._id}/>
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