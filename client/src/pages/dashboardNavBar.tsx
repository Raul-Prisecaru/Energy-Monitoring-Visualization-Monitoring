import {Button, Dropdown, Menu, MenuButton, MenuItem, Typography} from "@mui/joy";
import {useNavigate} from "react-router-dom";
import {useState} from "react";

function DashboardNavBar() {
    const navigate = useNavigate();

    return (

        <div className={"LoginNavBar"}>
            <div className={"TopNavBar"}>
                <div className={"TopNavOptions"}>
                    <Button onClick={() => navigate("/Dashboard")} variant={"plain"}>
                        <Typography level="h4">
                            Dashboard
                        </Typography>
                    </Button>

                    <Dropdown >
                        <MenuButton>Menu</MenuButton>
                        <Menu>
                            <MenuItem onClick={() => navigate("/ProfileManagement")}>Profile Management</MenuItem>
                            <MenuItem onClick={() => navigate("/devices")}>Devices</MenuItem>
                            <MenuItem onClick={() => navigate("/settings")}>Settings</MenuItem>
                            <MenuItem onClick={() => {
                                localStorage.removeItem("token")
                                navigate("/")
                                location.reload()
                            }}>Logout</MenuItem>
                        </Menu>
                    </Dropdown>

                </div>
            </div>
        </div>
    )

}


export  default DashboardNavBar