import "./styles/dashboardPageStyle.css"

import EnergyUsageLineChart from "../components/LineChart/energyUsageLineChart.tsx";
import TopDevicesBarChart from "../components/BarChart/topDevicesBarChart.tsx";
import EnergyCostBarChart from "../components/BarChart/energyCostBarChart.tsx";
import EnergyUsageProgressGauge from "../components/Gauge/energyUsageProgressGauge.tsx";
import EnergyUsageCategoryPieChart from "../components/PieChart/energyUsageCategoryPieChart.tsx";
import TotalCostMonthCard from "../components/Cards/totalCostMonthCard.tsx";
import TotalEnergyUsageCard from "../components/Cards/totalEnergyUsageMonthCard.tsx";
import CostPerDeviceChart from "../components/Custom/costPerDeviceChart.tsx"
import DailyStreakCard from "../components/Cards/dailyStreakCard.tsx";
import EmptyCard from "../components/Cards/emptyCard.tsx";
import CostProgressGauge from "../components/Gauge/costProgressGauge.tsx";
import CostHistoryLineChart from "../components/LineChart/costHistoryLineChart.tsx";
import DeviceTable from "../components/table/deviceTable.tsx";

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