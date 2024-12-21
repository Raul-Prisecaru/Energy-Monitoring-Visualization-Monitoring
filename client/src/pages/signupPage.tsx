import "./styles/loginPageStyle.css"
import {useState} from "react";
function SignupPage() {

    const [firstName, setFirstName] = useState("")

    const [lastName, setLastName] = useState("")

    const [email, setEmail] = useState("")

    const [password, setPassword] = useState("")

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