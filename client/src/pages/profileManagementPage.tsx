import {useState} from "react";

function ProfileManagementPage() {
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("")

    const handleFirstNameChange = async (e) => {
        setFirstName(e.target.value);
    }

    const handleLastNameChange = async (e) => {
        setLastName(e.target.value);
    }

    const handleUsernameChange = async (e) => {
        setUsername(e.target.value);
    }

    const handleEmailChange = async (e) => {
        setEmail(e.target.value);
    }

    const handlePasswordChange = async (e) => {
        setPassword(e.target.value)
    }

    return (
        <div className={"Input-Form"}>
            <form>
                <div>
                    <label>Update First Name</label>
                    <input type={"text"} onChange={handleFirstNameChange}/> <br/>
                </div>

                <div>
                    <label>Update Last Name</label>
                    <input type={"text"} onChange={handleLastNameChange}/> <br/>
                </div>

                <div>
                    <label>Update Username</label>
                    <input type={"text"} onChange={handleUsernameChange}/> <br/>
                </div>

                <div>
                    <label>Update Email</label>
                    <input type={"text"} onChange={handleEmailChange}/> <br/>
                </div>

                <div>
                    <label>Update password</label>
                    <input type={"text"} onChange={handlePasswordChange}/>
                </div>


                <button onClick={}>Update Changes</button>
            </form>
        </div>
    )

}


export default ProfileManagementPage;