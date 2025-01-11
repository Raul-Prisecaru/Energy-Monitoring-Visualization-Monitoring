import "./styles/dashboardPageStyle.css"

import EnergyUsageLineChart from "../dashboardComponents/LineChart/energyUsageLineChart.tsx";
import TopDevicesBarChart from "../dashboardComponents/BarChart/topDevicesBarChart.tsx";
import EnergyCostBarChart from "../dashboardComponents/BarChart/energyCostBarChart.tsx";
import EnergyUsageProgressGauge from "../dashboardComponents/Gauge/energyUsageProgressGauge.tsx";
import EnergyUsageCategoryPieChart from "../dashboardComponents/PieChart/energyUsageCategoryPieChart.tsx";
import TotalCostMonthCard from "../dashboardComponents/Cards/totalCostMonthCard.tsx";
import TotalEnergyUsageCard from "../dashboardComponents/Cards/totalEnergyUsageMonthCard.tsx";
import CostPerDeviceChart from "../dashboardComponents/Custom/costPerDeviceChart.tsx"
import DailyStreakCard from "../dashboardComponents/Cards/dailyStreakCard.tsx";
import EmptyCard from "../dashboardComponents/Cards/emptyCard.tsx";
import CostProgressGauge from "../dashboardComponents/Gauge/costProgressGauge.tsx";
import CostHistoryLineChart from "../dashboardComponents/LineChart/costHistoryLineChart.tsx";
import DeviceTable from "../dashboardComponents/table/deviceTable.tsx";

function DashboardPage() {

    return (

        <div className={"deviceVisualizer"}>

            <div className={"topRelatedVisuals"}>
                <div className={"totalCostMonthChart"}>
                    <TotalCostMonthCard/>
                </div>

                <div className={"totalEnergyUsageCard"}>
                    <TotalEnergyUsageCard/>
                </div>

                <div className={"dailyStreakCard"}>
                    <DailyStreakCard />
                </div>

                <div className={"emptyCard"}>
                    <EmptyCard />
                </div>

                {/*<div className={"energyCostBarChart"}>*/}
                {/*    <EnergyCostBarChart width={500} height={300}/>*/}
                {/*</div>*/}

                {/*<div>*/}
                {/*    <CostPerDeviceChart/>*/}
                {/*</div>*/}
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
                    <CostProgressGauge width={200} height={200} />
                </div>

                <div>
                    <CostHistoryLineChart width={1200} height={300} />
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