import "./styles/dashboardPageStyle.css"

import UsageAreaChart from "../components/usageAreaChart.tsx";
import TopDevicesBarChart from "../components/topDevicesBarChart.tsx";
import EnergyCostBarChart from "../components/energyCostBarChart.tsx";
import EnergyUsageProgressHalfDonutChart from "../components/energyUsageProgressHalfDonutChart.tsx";

function DashboardPage() {


    return (

        <div className={"deviceVisualizer"}>
            <UsageAreaChart width={500} height={300} />
            <TopDevicesBarChart width={500} height={300} />
            <EnergyCostBarChart width={500} height={300}/>
            <EnergyUsageProgressHalfDonutChart />
        </div>
    )

}


export default DashboardPage