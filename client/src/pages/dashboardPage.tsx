import "./styles/dashboardPageStyle.css"

import EnergyUsageLineChart from "../dashboardComponents/LineChart/energyUsageLineChart.tsx";
import TopDevicesBarChart from "../dashboardComponents/BarChart/topDevicesBarChart.tsx";
import EnergyCostBarChart from "../dashboardComponents/BarChart/energyCostBarChart.tsx";
import EnergyUsageProgressGauge from "../dashboardComponents/Gauge/energyUsageProgressGauge.tsx";
import EnergyUsageCategoryPieChart from "../dashboardComponents/PieChart/energyUsageCategoryPieChart.tsx";
import TotalCostMonthCard from "../dashboardComponents/Cards/totalCost/totalCostMonthCard.tsx";
import TotalEnergyUsageCard from "../dashboardComponents/Cards/totalEnergyUsageMonthCard.tsx";
import CostPerDeviceChart from "../dashboardComponents/Custom/costPerDeviceChart.tsx"
import DailyStreakCard from "../dashboardComponents/Cards/dailyStreakCard.tsx";
import EmptyCard from "../dashboardComponents/Cards/emptyCard.tsx";
import CostProgressGauge from "../dashboardComponents/Gauge/costProgressGauge.tsx";
import CostHistoryLineChart from "../dashboardComponents/LineChart/costHistoryLineChart.tsx";
import DeviceTable from "../dashboardComponents/table/deviceTable.tsx";

import Modal from '@mui/joy/Modal';
import Button from '@mui/joy/Button';
import ButtonGroup from '@mui/joy/ButtonGroup';
import {useState} from "react";
import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import TotalCostSpecifiedMonthCard from "../dashboardComponents/Cards/totalCost/totalCostSpecifiedMonthCard.tsx";

function DashboardPage() {
    const [yearModal, setYearModal] = useState(false)
    const [monthModal, setMonthModal] = useState(false)
    const [specifiedMonth, setSpecifiedMonth] = useState(null)
    const [specifiedYear, setSpecifiedYear] = useState(null)

    const changeToCurrentMonth = () => {
        setSpecifiedYear(null)
    }

    const changeToSpecifiedMonth = (value: number, yearValue: number) => {
        setSpecifiedMonth(value);
        setSpecifiedYear(yearValue);
    }

    const changeToCurrentYear = () => {
        setSpecifiedYear(null)
    }

    const changeToSpecifiedYear = (value: number) => {
        setSpecifiedYear(value)
    }



    return (

        <div className={"deviceVisualizer"}>
            <ButtonGroup size="lg" variant="solid">
                <Button onClick={() => setYearModal(true)}>Year</Button>
                <Button onClick={() => setMonthModal(true)}>Month</Button>
            </ButtonGroup>

            <div>
                <Modal open={yearModal} onClose={() => setYearModal(false)}>
                    <Card>
                        <CardContent>
                            <Button onClick={() => changeToCurrentYear()}>Current Year</Button>
                            <Button onClick={() => changeToSpecifiedYear(1)}>Select Year</Button>
                        </CardContent>
                    </Card>
                </Modal>
            </div>

            <div>
                <Modal open={monthModal} onClose={() => setMonthModal(false)}>
                    <Card>
                        <CardContent>
                            <Button onClick={() => changeToCurrentMonth()}>Current Month</Button>
                            <Button onClick={() => changeToSpecifiedMonth(1, 2023)}>Select Month</Button>
                        </CardContent>
                    </Card>
                </Modal>
            </div>


            <div className={"topRelatedVisuals"}>
                <div className={"totalCostMonthChart"}>
                    {specifiedMonth != null && specifiedYear != null  ? (
                        <TotalCostSpecifiedMonthCard month={specifiedMonth} year={specifiedYear}/>

                    ) : (
                        <TotalCostMonthCard/>

                    )}
                </div>

                <div className={"totalEnergyUsageCard"}>
                    <TotalEnergyUsageCard/>
                </div>

                <div className={"dailyStreakCard"}>
                    <DailyStreakCard/>
                </div>

                <div className={"emptyCard"}>
                    <EmptyCard/>
                </div>

            </div>

            <div className={"topMiddleRelatedVisuals"}>
                <div className={"energyUsageProgressionGauge"}>
                    <EnergyUsageProgressGauge width={200} height={200}/>
                </div>

                <div className={"energyUsageLineChart"}>
                    <EnergyUsageLineChart width={1200} height={300}/>
                </div>
            </div>


            <div className={"bottomMiddleRelatedVisuals"}>
                <div className={"costProgressGauge"}>
                    <CostProgressGauge width={200} height={200}/>
                </div>

                <div>
                    <CostHistoryLineChart width={1200} height={300}/>
                </div>

            </div>

            <div className={"bottomRelatedVisuals"}>
                <div className={"deviceTable"}>
                    <DeviceTable width={500} height={500}/>
                </div>

                <div className={"energyUsageCategoryPieChart"}>
                    <EnergyUsageCategoryPieChart width={500} height={300}/>
                </div>
            </div>

        </div>
    )

}


export default DashboardPage