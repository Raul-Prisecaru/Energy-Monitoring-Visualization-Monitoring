import "./styles/loginPageStyle.css"
import {useState} from "react";
import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import {Typography} from "@mui/joy";
import Button from "@mui/joy/Button";
import {useNavigate} from "react-router-dom";

function LoginPage() {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate();


    const handleUsernameChange = (e) => {
        setUsername(e.target.value)
    }

    const handlePasswordChange = (e) => {
        setPassword(e.target.value)
    }


    const buttonPress = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch("http://localhost:3001/api/auth/loginUser", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    username,
                    password
                })
            });

            if (response.ok) {
                const data = await response.json()
                localStorage.setItem('token', data.token);

                navigate("/dashboard")
                location.reload()
            } else {
                alert("Unable to login")
            }
        } catch (error) {
            alert("An Error occurred when trying to login:" + error)
        }
    }

    return (
        <div className={"Input-Form"}>
            <form>
                <Card size="lg" style={{ width: "600px", height: "500px" }}>

                    <CardContent>

                        <h1 className={"loginFormLabel"}>Login Form</h1>


                        <div>
                            <label>Username</label>
                            <input onChange={handleUsernameChange} type={"text"}/> <br/>
                        </div>

                        <div>
                            <label>password</label>
                            <input onChange={handlePasswordChange} type={"text"}/>
                        </div>


                        <Button size={"lg"} onClick={buttonPress}>Login</Button>
                    </CardContent>


                </Card>

            </form>
        </div>
    )
}

export default LoginPage