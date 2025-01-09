import "./styles/dashboardPageStyle.css"

import UsageAreaChart from "../components/usageAreaChart.tsx";
import TopDevicesBarChart from "../components/topDevicesBarChart.tsx";
import EnergyCostBarChart from "../components/energyCostBarChart.tsx";
import EnergyUsageProgressGauge from "../components/energyUsageProgressGauge.tsx";
import EnergyUsageCategoryPieChart from "../components/energyUsageCategoryPieChart.tsx";
import TotalCostMonthChart from "../components/totalCostMonthChart.tsx";
import CostPerDeviceChart from "../components/costPerDeviceChart.tsx"

function DashboardPage() {

    return (

        <div className={"deviceVisualizer"}>

            <div className={"costRelatedVisuals"}>
                <div className={"totalCostMonthChart"}>
                    <TotalCostMonthChart/>
                </div>

                <div className={"energyCostBarChart"}>
                    <EnergyCostBarChart width={500} height={300}/>
                </div>

                <div>
                    <CostPerDeviceChart />
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