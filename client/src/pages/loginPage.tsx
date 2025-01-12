import "./styles/loginPageStyle.css"
import {useState} from "react";

function LoginPage() {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

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
                const token = await response.json()
                localStorage.setItem('token', JSON.stringify(token));

                alert("Logged in")

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
                <div>
                    <label>Username</label>
                    <input onChange={handleUsernameChange} type={"text"}/> <br/>
                </div>

                <div>
                    <label>password</label>
                    <input onChange={handlePasswordChange} type={"text"}/>
                </div>


                <button onClick={buttonPress}>Login</button>
            </form>
        </div>
    )
}

export default LoginPage