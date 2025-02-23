import {useEffect, useState} from "react";
import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import {Input, Typography} from "@mui/joy";
import Button from "@mui/joy/Button";
import Modal from "@mui/joy/Modal";



function CostsGoalsPage() {
    const [currentUserEnergyCost, setCurrentUserEnergyCost] = useState(0);
    const [currentUserEnergyGoal, setCurrentUserEnergyGoal] = useState(0);
    const [currentUserCostGoal, setCurrentUserCostGoal] = useState(0);

    const [energyCostModal, setEnergyCostModal] = useState(false)
    const [energyGoalModal, setEnergyGoalModal] = useState(false)
    const [userCostGoalModal, setUserCostGoalModal] = useState(false)

    const [newUserCurrentEnergyCost, setNewUserCurrentEnergyCost] = useState(0)
    const [newEnergyCostGoal, setNewEnergyCostGoal] = useState(0)
    const [newEnergyUsageGoal, setNewEnergyUsageGoal] = useState(0)

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
                    setCurrentUserEnergyGoal(userCost.costGoals);
                    setCurrentUserCostGoal(userCost.energyGoals);
                })
                .catch((error) => console.error("Failed to retrieve user payment: " + error));
        } catch (err) {
            console.log("Error", err)
        }

    }, []);


    const updateUserPayment = () => {
        try {
            const token = localStorage.getItem("token")
            fetch("http://localhost:3001/api/user/updateUserCostEnergyPaying/" ,{
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                },

                body: JSON.stringify({
                    "newCost": newUserCurrentEnergyCost,
                }),
            })
                .catch((error) => console.error("Failed to retrieve user payment: " + error));
        } catch (err) {
            console.log("Error", err)
        }
    }


    const updateUserCostGoal = () => {
        try {
            const token = localStorage.getItem("token")
            fetch("http://localhost:3001/api/user/updateUserCostGoal/" ,{
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                },

                body: JSON.stringify({
                    "userCostGoal": newEnergyCostGoal,
                }),
            })
                .catch((error) => console.error("Failed to retrieve user payment: " + error));
        } catch (err) {
            console.log("Error", err)
        }
    }

    const updateUserEnergyUsageGoal = () => {
        try {
            const token = localStorage.getItem("token")
            console.log(token)
            console.log(newEnergyUsageGoal)
            fetch("http://localhost:3001/api/user/updateUserUsageEnergyGoal/" ,{
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                },

                body: JSON.stringify({
                    "newCostGoal": newEnergyUsageGoal,
                }),
            })
                .catch((error) => console.error("Failed to retrieve user payment: " + error));
        } catch (err) {
            console.log("Error", err)
        }
    }



    return (
        <div>

            <div>
                <Card>
                    <CardContent>
                        <Typography level={"h1"}>Energy Cost Rate</Typography>
                        <Typography>Currently Paying Rate towards Energy: £{currentUserEnergyCost} / 1000h</Typography>
                        <Button onClick={() => setUserCostGoalModal(true)}>Update</Button>
                    </CardContent>
                </Card>
            </div>

            <div>
                <Card>
                    <CardContent>
                        <Typography level={"h1"}>Energy Usage Goals</Typography>
                        <Typography>Current Energy Usage Goal: {currentUserCostGoal} kWh</Typography>
                        <Button onClick={() => setEnergyGoalModal(true)}>Update</Button>
                    </CardContent>
                </Card>
            </div>


            <div>
                <Card>
                    <CardContent>
                        <Typography level={"h1"}>Energy Cost Goals</Typography>
                        <Typography>Currently Energy Cost Goal: £{currentUserEnergyGoal}</Typography>
                        <Button onClick={() => setEnergyCostModal(true)}>Update</Button>
                    </CardContent>
                </Card>
            </div>


            <div>
                <Modal
                open={userCostGoalModal}
                onClose={() => setUserCostGoalModal(false)}
                sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Card>
                    <CardContent>
                        <Typography level={"h1"}>Update Energy Rate Cost</Typography>
                        <Typography>How much is the Energy Rate Now?</Typography>
                        <Input onChange={(e) => {
                            setNewUserCurrentEnergyCost(Number(e.target.value))
                        }}/>
                        <Button onClick={() => updateUserPayment()}>Update</Button>
                    </CardContent>
                </Card>
                </Modal>
            </div>


            <div>
                <Modal
                open={energyGoalModal}
                onClose={() => setEnergyGoalModal(false)}
                sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Card>
                    <CardContent>
                        <Typography level={"h1"}>Update your energy (kWh) goal</Typography>
                        <Typography>What is your new energy (kWh) goal?</Typography>
                        <Input onChange={(e) => setNewEnergyUsageGoal(Number(e.target.value))} />
                        <Button onClick={() => updateUserEnergyUsageGoal()}>Update</Button>
                    </CardContent>
                </Card>
                </Modal>
            </div>

            <div>
                <Modal
                open={energyCostModal}
                onClose={() => setEnergyCostModal(false)}
                sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Card>
                    <CardContent>
                        <Typography level={"h1"}>Update Energy Cost Goal</Typography>
                        <Typography>What is your energy cost goal?</Typography>

                        <Input onChange={(e) => setNewEnergyCostGoal(Number(e.target.value))}/>
                        <Button onClick={() => updateUserCostGoal()}>Update</Button>
                    </CardContent>
                </Card>
                </Modal>
            </div>

        </div>
    )
}

export default CostsGoalsPage