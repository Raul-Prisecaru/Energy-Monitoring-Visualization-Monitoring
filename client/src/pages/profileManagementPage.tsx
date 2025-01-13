import { useState, useEffect } from "react";
import "./styles/profileManagementStyle.css"
import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import {Input, Typography} from "@mui/joy";
import Button from "@mui/joy/Button";
import Modal from "@mui/joy/Modal";
function ProfileManagementPage() {
    const [data, setData] = useState({});
    const [firstNameModal, setFirstNameModal] = useState(false);
    const [lastNameModal, setLastNameModal] = useState(false);
    const [usernameModal, setUsernameModal] = useState(false);
    const [emailModal, setEmailModal] = useState(false);

    const [firstNameInput, setFirstNameInput] = useState("")
    const [lastNameInput, setLastNameInput] = useState("")
    const [usernameInput, setUsernameInput] = useState(null)
    const [emailInput, setEmailInput] = useState(null)


    useEffect(() => {
        try {
            const token = localStorage.getItem("token");
            fetch(`http://localhost:3001/api/auth/profile`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
                .then(response => response.json())
                .then((dataSet) => {
                    const formattedData = {
                        firstName: dataSet.firstName,
                        lastName: dataSet.lastName,
                        username: dataSet.username,
                        email: dataSet.email
                    }
                    setData(formattedData)
                })

        } catch (error) {
            alert("An error occurred while fetching profile data: " + error.message);
        }
    }, []);

    const handleFirstNameChange = (event: any) => {
        setFirstNameInput(event.target.value)
    }

    const handleLastNameChange = (event: any) => {
        setLastNameInput(event.target.value)
    }

    const handleUsernameChange = (event: any) => {
        setUsernameInput(event.target.value)
    }

    const handleEmailChange = (event: any) => {
        setEmailInput(event.target.value)
    }





    const updateFirstName = async () => {
        try {
            const token = localStorage.getItem("token");
            const response = await fetch(`http://localhost:3001/api/user/`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    firstName: firstNameInput
                }),
            })

            if (response.ok) {
                console.log("Success")
            } else {
                console.log(response.json())
            }
        } catch (error) {
            alert("An error occurred while fetching profile data: " + error.message);
        }
    }


    const deleteAccount = async () => {
        try {
            const token = localStorage.getItem("token");
            const response = await fetch(`http://localhost:3001/api/user/`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${token}`,
                },

            })
        } catch (err) {
            console.log("Failed to delete account " + err)
        }
    }





    const updateLastName = async () => {
        try {
            const token = localStorage.getItem("token");
            const response = await fetch(`http://localhost:3001/api/user/`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    lastName: lastNameInput
                }),
            })

            if (response.ok) {
                console.log("Success")
            } else {
                console.log(response.json())
            }
        } catch (error) {
            alert("An error occurred while fetching profile data: " + error.message);
        }
    }



    const updateUsername = async () => {
        try {
            const token = localStorage.getItem("token");
            const response = await fetch(`http://localhost:3001/api/user/`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    username: usernameInput
                }),
            })

            if (response.ok) {
                console.log("Success")
            } else {
                console.log(response.json())
            }
        } catch (error) {
            alert("An error occurred while fetching profile data: " + error.message);
        }
    }


    const updateEmail = async () => {
        try {
            const token = localStorage.getItem("token");
            const response = await fetch(`http://localhost:3001/api/user/`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    email: emailInput
                }),
            })

            if (response.ok) {
                console.log("Success")
            } else {
                console.log(response.json())
            }
        } catch (error) {
            alert("An error occurred while fetching profile data: " + error.message);
        }
    }


    return (
        <div className={"profileComponent"}>
            <div>
                <h1 className={"profileTitle"}>Profile</h1>
            </div>
            <div className={"userData"}>

                <Card sx={{ width: "600px", margin: "0 auto" }}>
                    <CardContent>
                        <Typography level="h2">First Name</Typography>
                        <Typography level={"h4"}>{data.firstName}</Typography>
                        <Button onClick={() => setFirstNameModal(true)}>Change First Name</Button>

                        <Modal open={firstNameModal} onClose={() => setFirstNameModal(false)}>
                            <Card>
                                <CardContent>
                                    <Typography level="h2">Update First Name</Typography>
                                    <Input placeholder={"Enter your new First Name here"} onChange={handleFirstNameChange}> </Input>
                                    <Button onClick={updateFirstName}> Update First Name</Button>
                                </CardContent>
                            </Card>
                        </Modal>


                    </CardContent>
                </Card>

                <Card sx={{ width: "600px", margin: "0 auto" }}>
                    <CardContent>
                        <Typography level={"h2"}>Last Name</Typography>
                        <Typography level={"h4"}>{data.lastName}</Typography>

                        <Button onClick={() => setLastNameModal(true)}>Change Last Name</Button>

                        <Modal open={lastNameModal} onClose={() => setLastNameModal(false)}>
                            <Card>
                                <CardContent>
                                    <Typography level="h2">Update Last Name</Typography>
                                    <Input placeholder={"Enter your new Last Name here"} onChange={handleLastNameChange}> </Input>
                                    <Button onClick={updateLastName}> Update Last Name</Button>
                                </CardContent>
                            </Card>
                        </Modal>

                    </CardContent>
                </Card>

                <Card sx={{ width: "600px", margin: "0 auto" }}>
                    <CardContent>
                        <Typography level={"h2"}>Username</Typography>
                        <Typography level={"h4"}>{data.username}</Typography>

                        <Button onClick={() => setUsernameModal(true)}>Change Username</Button>

                        <Modal open={usernameModal} onClose={() => setUsernameModal(false)}>
                            <Card>
                                <CardContent>
                                    <Typography level="h2">Update Username</Typography>
                                    <Input placeholder={"Enter your new username here"} onChange={handleUsernameChange}> </Input>
                                    <Button onClick={updateUsername}> Update username</Button>
                                </CardContent>
                            </Card>
                        </Modal>
                    </CardContent>
                </Card>

                <Card sx={{ width: "600px", margin: "0 auto" }}>
                    <CardContent>
                        <Typography level={"h2"}>Email</Typography>
                        <Typography level={"h4"}>{data.email}</Typography>

                        <Button onClick={() => setEmailModal(true)}>Change Email</Button>

                        <Modal open={emailModal} onClose={() => setEmailModal(false)}>
                            <Card>
                                <CardContent>
                                    <Typography level="h2">Update Email</Typography>
                                    <Input placeholder={"Enter your new Email here"} onChange={handleEmailChange}> </Input>
                                    <Button onClick={updateEmail}> Update Email</Button>
                                </CardContent>
                            </Card>
                        </Modal>
                    </CardContent>
                </Card>

                <div className={"deleteButton"}>
                    <Card>
                        <CardContent>
                            <Button onClick={deleteAccount}>Delete Account</Button>
                        </CardContent>
                    </Card>
                </div>

            </div>
        </div>
    );
}

export default ProfileManagementPage;
