import "./styles/dashboardPageStyle.css"

import UsageAreaChart from "../components/AreaChart/usageAreaChart.tsx";
import TopDevicesBarChart from "../components/BarChart/topDevicesBarChart.tsx";
import EnergyCostBarChart from "../components/BarChart/energyCostBarChart.tsx";
import EnergyUsageProgressGauge from "../components/Gauge/energyUsageProgressGauge.tsx";
import EnergyUsageCategoryPieChart from "../components/PieChart/energyUsageCategoryPieChart.tsx";
import TotalCostMonthCard from "../components/Cards/totalCostMonthCard.tsx";
import TotalEnergyUsageCard from "../components/Cards/totalEnergyUsageMonthCard.tsx";
import CostPerDeviceChart from "../components/Custom/costPerDeviceChart.tsx"
import DailyStreakCard from "../components/Cards/dailyStreakCard.tsx";
import EmptyCard from "../components/Cards/emptyCard.tsx";

function DashboardPage() {

    return (

        <div className={"deviceVisualizer"}>

            <div className={"costRelatedVisuals"}>
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

                <div className={"energyCostBarChart"}>
                    <EnergyCostBarChart width={500} height={300}/>
                </div>

                <div>
                    <CostPerDeviceChart/>
                </div>
            </div>


            <div className={"deviceRelatedVisuals"}>
                <div className={"energyUsageAreaChart"}>
                <UsageAreaChart width={500} height={300}/>
                </div>

                <div className={"topDevicesEnergyUsageBarChart"}>
                    <TopDevicesBarChart width={500} height={300}/>
                </div>


                <div className={"energyUsageProgressionHalfDonutChart"}>
                    <EnergyUsageProgressGauge width={550} height={550}/>
                </div>

                <div className={"energyUsageCategoryPieChart"}>
                    <EnergyUsageCategoryPieChart width={500} height={300}/>
                </div>
            </div>


        </div>
    )

}


export default DashboardPage