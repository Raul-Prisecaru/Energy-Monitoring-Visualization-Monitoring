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

    const updateFirstName = (newUsername: string) => {

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
                                    <Input placeholder={"Enter your new First Name here"}> </Input>
                                    <Button> Update First Name</Button>
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
                                    <Input placeholder={"Enter your new Last Name here"}> </Input>
                                    <Button> Update First Name</Button>
                                </CardContent>
                            </Card>
                        </Modal>

                    </CardContent>
                </Card>

                <Card sx={{ width: "600px", margin: "0 auto" }}>
                    <CardContent>
                        <Typography level={"h2"}>Username</Typography>
                        <Typography level={"h4"}>{data.username}</Typography>
                    </CardContent>
                </Card>

                <Card sx={{ width: "600px", margin: "0 auto" }}>
                    <CardContent>
                        <Typography level={"h2"}>Email</Typography>
                        <Typography level={"h4"}>{data.email}</Typography>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}

export default ProfileManagementPage;
