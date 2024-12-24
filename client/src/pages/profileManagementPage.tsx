import {useState} from "react";

function ProfileManagementPage() {
    const [userID, setUserID] = useState("")
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("")

    const confirmChangedButton = async (e) => {
        e.preventDefault()

        try {
            const response = await fetch(`http://localhost:3001/api/user/${userID}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
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
                alert("Data submitted successfully")
            } else {
                alert("Failed to submit data")
            }
        } catch (error) {
            alert("An Error occurred when submitting data:" + error)
        }
    }

    const deleteProfileButton = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch("http://localhost:3001/api/user/${userID}", {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json"
                }
            })

            if (response.ok) {
                alert("Data Deleted Successfully")

            }
        } catch (error) {
            alert("An Error occurred when submitting data:" + error)

        }
    }

    const handleUserIDChange = async (e) => {
        setUserID(e.target.value)
    }

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
                    <label>ID</label>
                    <input type={"text"} onChange={handleUserIDChange}/> <br/>
                </div>

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


                <button onClick={confirmChangedButton}>Update Profile</button>
                <button onClick={deleteProfileButton}>Delete Profile</button>
            </form>
        </div>
    )

}


export default ProfileManagementPage;