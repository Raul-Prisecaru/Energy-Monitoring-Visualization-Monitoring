import "./styles/devicePageStyle.css"
import {useEffect, useState} from "react";
import {Box} from "@mui/material";
import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';
import DialogTitle from '@mui/joy/DialogTitle';
import DialogContent from '@mui/joy/DialogContent';
import Checkbox from '@mui/joy/Checkbox';
import CostCard from "./deviceVisualComponents/Card/costCard.tsx";
import EnergyCard from "./deviceVisualComponents/Card/energyCard.tsx";
import EnergyHistoryBarChart from "./deviceVisualComponents/BarChart/EnergyHistoryBarChart.tsx";
import CostHistoryLineChart from "./deviceVisualComponents/LineChart/CostHistoryLineChart.tsx";
import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import {Input, TextField, Typography} from "@mui/joy";
import Button from "@mui/joy/Button";

function DeviceManagementPage() {
    const [isOpen, setIsOpen] = useState(false);
    const [devicesList, setDevicesList] = useState([]);
    const [deviceName, setDeviceName] = useState("");
    const [deviceType, setDeviceType] = useState("");

    const [checkBox, setCheckBox] = useState(false)
    const [startDay, setStartDay] = useState(null);
    const [startMonth, setStartMonth] = useState(null);
    const [startYear, setStartYear] = useState(null);
    const [endDay, setEndDay] = useState(null);
    const [endMonth, setEndMonth] = useState(null);
    const [endYear, setEndYear] = useState(null);


    const [viewDevice, setViewDevice] = useState(null)

    useEffect(() => {
        const token = localStorage.getItem("token")
        fetch("http://localhost:3001/api/device/", {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`
            }
        })
            .then((response) => response.json())
            .then((data) => setDevicesList(data))
            .catch((error) => console.error("Failed to fetch Devices" + error))
    }, [])



    const handleCheckboxChange = (event) => {
        setCheckBox(event.target.checked);
    };

    const handleStartDateChange = (event) => {
        const dateValue = event.target.value;

        if (dateValue) {
            const dateObj = new Date(dateValue);
            setStartDay(dateObj.getDate());
            setStartMonth(dateObj.getMonth() + 1);
            setStartYear(dateObj.getFullYear());
        }
    };

    const handleEndDateChange = (event) => {
        const dateValue = event.target.value;

        if (dateValue) {
            const dateObj = new Date(dateValue);
            setEndDay(dateObj.getDate());
            setEndMonth(dateObj.getMonth() + 1);
            setEndYear(dateObj.getFullYear());
        }
    };

    const handleOpen = () => setIsOpen(true);

    const handleClose = () => {
        setIsOpen(false);
        setViewDevice(null);

    }

    const handleDeviceNameChange = (e) => setDeviceName(e.target.value);

    const handleDeviceTypeChange = (e) => setDeviceType(e.target.value);

    const handleViewDevice = (device) => {
        setViewDevice(device);
        handleOpen();
    };

    const generateDataset = async (deviceID: string, startYear: number, startMonth: number, startDay: number, endYear: number, endMonth: number, endDay: number) => {
        const minWatts = 0;
        const maxWatts = 200;
        const startDate: Date = new Date(`${startYear}-${startMonth}-${startDay}`);
        const endDate: Date = new Date(`${endYear}-${endMonth}-${endDay}`);
        let currentDate: Date = new Date(startDate);
        const token = localStorage.getItem("token")

        while (currentDate <=endDate) {
            const response = await fetch("http://localhost:3001/api/device/" + deviceID, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`

                },
                body: JSON.stringify({
                    energyHistory: [
                        {
                            energyUsage: (Math.floor(Math.random() * (maxWatts - minWatts)) + minWatts) * 24,
                            energyDate: currentDate,
                        },
                    ],
                }),
            });

            const result = await response.json();

            currentDate.setDate(currentDate.getDate() + 1)

        };

        }


    const deleteDeviceButton = async (deviceID: string) => {
        const token = localStorage.getItem("token")
        const response = await fetch("http://localhost:3001/api/device/" + deviceID, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        });

        if (response.ok) {
            console.log("Successfully Deleted Device")
        } else {
            const errorDetail = await response.json()
            console.error("There has been an Error: ", errorDetail)
        }
    }


    const createDeviceButton = async (e) => {
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

                if (checkBox) {
                    await generateDataset(device._id, startYear, startMonth, startDay, endYear, endMonth, endDay);

                }

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
                                    <Card>
                                        <CardContent>
                                            <Typography level={"h2"}>{viewDevice.deviceName}</Typography>
                                            <CostCard deviceID={viewDevice._id}/>
                                            <EnergyCard deviceID={viewDevice._id}/>
                                            <EnergyHistoryBarChart deviceID={viewDevice._id} />
                                            <CostHistoryLineChart deviceID={viewDevice._id}/>
                                            <Button onClick={() => deleteDeviceButton(viewDevice._id)}>Delete Device</Button>


                                        </CardContent>
                                    </Card>
                                </div>


                            ) : (


                                <div>


                                    <div className={"modalForm"}>

                                        <Card>
                                            <CardContent>
                                                <div className={"modalHeader"}>
                                                    <h1>Add Device</h1>
                                                </div>
                                                
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

                                                <Checkbox checked={checkBox} onChange={handleCheckboxChange} label={"Generate Dataset"}/>

                                                {checkBox && (
                                                    <div className={"modalDeviceDateInput"}>
                                                        <Typography>Start Date</Typography>
                                                        <input onChange={handleStartDateChange} type={"date"} />
                                                        <Typography>End Date</Typography>
                                                        <input onChange={handleEndDateChange} type={"date"} />
                                                    </div>
                                                )}

                                                <Button onClick={createDeviceButton}>Confirm Changes</Button>

                                            </CardContent>
                                        </Card>


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
                            <Card>
                                <CardContent>
                                    <h1>{device.deviceName}</h1>
                                    <h3>Device Type: {device.deviceType}</h3>
                                    <button onClick={() => handleViewDevice(device)}>View Details</button>
                                </CardContent>
                            </Card>
                        </div>
                    ))}
                </div>

            </div>

        </div>
    )
}


export default DeviceManagementPage