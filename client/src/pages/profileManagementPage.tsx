import { useState, useEffect } from "react";
import "./styles/profileManagementStyle.css"
import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import {Typography} from "@mui/joy";
function ProfileManagementPage() {
    const [data, setData] = useState({}); // State to store user profile data

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
                    </CardContent>
                </Card>

                <Card sx={{ width: "600px", margin: "0 auto" }}>
                    <CardContent>
                        <Typography level={"h2"}>Last Name</Typography>
                        <Typography level={"h4"}>{data.lastName}</Typography>
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
