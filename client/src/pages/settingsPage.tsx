import "./styles/settingsPageStyle.css"
import { useNavigate } from 'react-router-dom';
import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import {Typography} from "@mui/joy";
import Button from "@mui/joy/Button";

function SettingsPage() {
    const navigate = useNavigate();

    return (
        <div className={"Management"}>
            <div className={"ProfileManagementCard"}>
                <Card sx={{width: "500px"}}>
                    <CardContent>
                        <Typography level={"h1"}>Profile Management</Typography>

                        <Button onClick={() => navigate("/ProfileManagement")}> Profile Management </Button>
                    </CardContent>
                </Card>
            </div>
            <div className={"OtherManagementCard"}>
                <Card sx={{width: "500px"}}>
                    <CardContent>
                        <Typography level={"h1"}>Cost/Goals</Typography>

                        <Button onClick={() => navigate("/costGoalsPage")}> Cost/Goals </Button>
                    </CardContent>
                </Card>
            </div>
        </div>
    )

}


export default SettingsPage