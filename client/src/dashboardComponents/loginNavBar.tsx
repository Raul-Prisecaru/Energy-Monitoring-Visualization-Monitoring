import "./styles/navBarStyle.css"
import Button from "@mui/joy/Button";
import {Typography} from "@mui/joy";
import {useNavigate} from "react-router-dom";


function LoginNavBar() {
    const navigate = useNavigate();
    return (

        <div className={"LoginNavBar"}>
            <div className={"TopNavBar"}>
                <div className={"TopNavOptions"}>
                    <Button onClick={() => navigate("/login")} variant={"plain"}>
                        <Typography level="h4">
                            Login
                        </Typography>
                    </Button>


                    <Button onClick={() => navigate("/sign-up")} variant={"plain"}>
                        <Typography level="h4">
                            SignUp
                        </Typography>
                    </Button>
                </div>
            </div>
        </div>
    )

}

export default LoginNavBar