import "./styles/loginPageStyle.css"
import {useState} from "react";
import {useNavigate} from "react-router-dom";
import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import Button from "@mui/joy/Button";

function SignupPage() {

    const [firstName, setFirstName] = useState("")

    const [lastName, setLastName] = useState("")

    const [username, setUsername] = useState("")

    const [email, setEmail] = useState("")

    const [password, setPassword] = useState("")
    const navigate = useNavigate();





    const buttonPress = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch("http://localhost:3001/api/auth/signUser", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    firstName,
                    lastName,
                    username,
                    email,
                    password
                })
            });

            if (response.ok) {

                navigate("/login")
            } else {
                alert("Failed to submit data")
            }
        } catch (error) {
            alert("An Error occurred when submitting data:" + error)
        }
    }

    const handleFirstNameChange = (e) => {
        setFirstName(e.target.value);
    }

    const handleUsernameChange = (e) => {
        setUsername(e.target.value)
    }

    const handleLastNameChange = (e) => {
        setLastName(e.target.value);
    }

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    }

    const handlePasswordChange = (e) => {
        setPassword(e.target.value)
    }



    return (
        <div className={"Input-Form"}>
            <form>
                <Card size="lg" style={{ width: "600px", height: "500px" }}>
                    <CardContent>
                        <h1 className={"loginFormLabel"}>Sign-Up Form</h1>
                        <div>
                            <label>First Name</label>
                            <input type={"text"} onChange={handleFirstNameChange}/> <br/>
                        </div>

                        <div>
                            <label>Last Name</label>
                            <input type={"text"} onChange={handleLastNameChange}/> <br/>
                        </div>

                        <div>
                            <label>Username</label>
                            <input type={"text"} onChange={handleUsernameChange}/> <br/>
                        </div>

                        <div>
                            <label>Email</label>
                            <input type={"text"} onChange={handleEmailChange}/> <br/>
                        </div>

                        <div>
                            <label>password</label>
                            <input type={"text"} onChange={handlePasswordChange}/>
                        </div>


                        <Button size={"lg"} onClick={buttonPress}>Sign-Up</Button>
                    </CardContent>


                </Card>

            </form>
        </div>
    )
}


export default SignupPage