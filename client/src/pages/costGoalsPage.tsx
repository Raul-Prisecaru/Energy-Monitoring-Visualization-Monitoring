import {useEffect, useState} from "react";
import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import {Typography} from "@mui/joy";
import Button from "@mui/joy/Button";


function CostsGoalsPage() {
    const [currentUserEnergyCost, setCurrentUserEnergyCost] = useState(0);
    const [currentUserEnergyGoal, setCurrentUserEnergyGoal] = useState(0);
    const [currentUserCostGoal, setCurrentUserCostGoal] = useState(0);

    const [newUserEnergyCost, setNewUserEnergyCost] = useState(0);
    const [newUserEnergyGoal, setNewUserEnergyGoal] = useState(0);
    const [newUserCostGoal, setNewUserCostGoal] = useState(0);

    useEffect(() => {
        try {
        const token = localStorage.getItem("token")
        fetch("http://localhost:3001/api/user/getUserPriceCostSettings" ,{
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`
            }
        })
            .then((response) => response.json())
            .then((userCost) => {
                setCurrentUserEnergyCost(userCost.pricePerkWh);
                setCurrentUserEnergyGoal(userCost.energyGoals);
                setCurrentUserCostGoal(userCost.costGoals);
            })
            .catch((error) => console.error("Failed to retrieve user payment: " + error));
        } catch (err) {
            console.log("Error", err)
        }

    }, []);


    return (
        <div>

            <div>
                <Card>
                    <CardContent>
                        <Typography level={"h1"}>Cost</Typography>
                        <Typography>You are currently paying: {currentUserEnergyCost}</Typography>
                        <Button>Update</Button>
                    </CardContent>
                </Card>
            </div>

            <div>
                <Card>
                    <CardContent>
                        <Typography level={"h1"}>Cost Goals</Typography>
                        <Typography>Your current cost goal: {currentUserCostGoal}</Typography>
                        <Button>Update</Button>
                    </CardContent>
                </Card>
            </div>


            <div>
                <Card>
                    <CardContent>
                        <Typography level={"h1"}>Energy Goals</Typography>
                        <Typography>Your current cost goal: {currentUserEnergyGoal}</Typography>
                        <Button>Update</Button>
                    </CardContent>
                </Card>
            </div>


        </div>
    )
}

export default CostsGoalsPage