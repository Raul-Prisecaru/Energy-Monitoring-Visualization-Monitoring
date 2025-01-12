import { useState, useEffect } from "react";

function ProfileManagementPage() {
    const [data, setData] = useState({}); // State to store user profile data

    useEffect(() => {
        try {
            const token = localStorage.getItem("token");
            fetch(`http://localhost:3001/api/auth/profile`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
                .then(response => response.json())
                .then((dataSet) => {
                    const formattedData = {
                        firstName: dataSet.firstName,
                        lastName: dataSet.lastName,
                        username: dataSet.username,
                        email: dataSet.email
                    }
                    setData(formattedData)
                })

        } catch (error) {
            alert("An error occurred while fetching profile data: " + error.message);
        }
    }, []);

    return (
        <div>
            <h1>Profile</h1>
            <div>
                <p><strong>First Name:</strong> {data.firstName}</p>
                <p><strong>Last Name:</strong> {data.lastName}</p>
                <p><strong>Username:</strong> {data.username}</p>
                <p><strong>Email:</strong> {data.email}</p>
            </div>
        </div>
    );
}

export default ProfileManagementPage;
