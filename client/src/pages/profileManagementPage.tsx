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
        <div>

        </div>

    )

}


export default ProfileManagementPage;