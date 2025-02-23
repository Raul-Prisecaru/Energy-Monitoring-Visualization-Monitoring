import "./styles/dashboardPageStyle.css"

import EnergyUsageBarChart from "../dashboardComponents/LineChart/energyUsageBarChart.tsx";
import TopDevicesBarChart from "../dashboardComponents/BarChart/topDevicesBarChart.tsx";
import EnergyCostBarChart from "../dashboardComponents/BarChart/energyCostBarChart.tsx";
import EnergyUsageProgressStat from "../dashboardComponents/Gauge/energyUsageProgressStat.tsx";
import EnergyUsageCategoryPieChart from "../dashboardComponents/PieChart/energyUsageCategoryPieChart.tsx";
import TotalCostMonthCard from "../dashboardComponents/Cards/totalCost/totalCostMonthCard.tsx";
import TotalEnergyUsageCard from "../dashboardComponents/Cards/totalEnergyUsageMonthCard.tsx";
import CostPerDeviceChart from "../dashboardComponents/Custom/costPerDeviceChart.tsx"
import DailyStreakCard from "../dashboardComponents/Cards/dailyStreakCard.tsx";
import EmptyCard from "../dashboardComponents/Cards/emptyCard.tsx";
import CostProgressGauge from "../dashboardComponents/Gauge/costProgressStat.tsx";
import CostHistoryLineChart from "../dashboardComponents/LineChart/costHistoryLineChart.tsx";
import DeviceTable from "../dashboardComponents/table/deviceTable.tsx";

import Modal from '@mui/joy/Modal';
import Button from '@mui/joy/Button';
import ButtonGroup from '@mui/joy/ButtonGroup';
import {useState} from "react";
import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import TotalCostSpecifiedMonthCard from "../dashboardComponents/Cards/totalCost/totalCostSpecifiedMonthCard.tsx";
import TotalCostSpecifiedYearCard from "../dashboardComponents/Cards/totalCost/totalCostSpecifiedYearCard.tsx";
import TotalCostYearCard from "../dashboardComponents/Cards/totalCost/totalCostYearCard.tsx";
import TotalNumberDevices from "../dashboardComponents/Cards/totalCost/totalNumberDevices.tsx";

function DashboardPage() {
    const [yearModal, setYearModal] = useState(false)
    const [monthModal, setMonthModal] = useState(false)



    return (

        <div className={"deviceVisualizer"}>

            <div className={"topRelatedVisuals"}>
                <div className={"totalCostMonthChart"}>
                    <TotalCostMonthCard/>
                </div>

                <div className={"totalEnergyUsageCard"}>
                    <TotalEnergyUsageCard/>
                </div>

                <div className={"totalEnergyUsageCard"}>
                    <TotalNumberDevices/>
                </div>


            </div>

            <div className={"topMiddleRelatedVisuals"}>
                <div className={"energyUsageProgressionGauge"}>
                    <EnergyUsageProgressStat width={200} height={200}/>
                </div>

                <div className={"energyUsageLineChart"}>
                    <Card>
                        <CardContent>
                            <EnergyUsageBarChart width={1200} height={300}/>
                        </CardContent>
                    </Card>
                </div>
            </div>


            <div className={"bottomMiddleRelatedVisuals"}>
                <div className={"costProgressGauge"}>
                    <CostProgressGauge width={200} height={200}/>
                </div>

                <div>
                    <Card>
                        <CardContent>
                            <CostHistoryLineChart width={1200} height={300}/>
                        </CardContent>
                    </Card>
                </div>

            </div>

            <div className={"bottomRelatedVisuals"}>
                <div className={"deviceTable"}>
                    <Card>
                        <CardContent>

                        <DeviceTable width={500} height={500}/>

                    </CardContent>
                    </Card>
                </div>

                <div className={"energyUsageCategoryPieChart"}>
                    <EnergyUsageCategoryPieChart width={500} height={300}/>
                </div>
            </div>

        </div>
    )

}


export default DashboardPage