import "./styles/loginPageStyle.css"
import {useState} from "react";
function SignupPage() {

    const [firstName, setFirstName] = useState("")

    const [lastName, setLastName] = useState("")

    const [email, setEmail] = useState("")

    const [password, setPassword] = useState("")


    const handleFirstNameChange = (e) => {
        setFirstName(e.target.value);
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
                <div>
                    <label>First Name</label>
                    <input type={"text"}/> <br/>
                </div>

                <div>
                    <label>Last Name</label>
                    <input type={"text"}/> <br/>
                </div>

                <div>
                    <label>Email</label>
                    <input type={"text"}/> <br/>
                </div>

                <div>
                    <label>password</label>
                    <input type={"text"}/>
                </div>


                <button>Signup</button>
            </form>
        </div>
    )
}

export default SignupPage