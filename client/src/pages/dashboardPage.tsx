import "./styles/dashboardPageStyle.css"

import UsageAreaChart from "../components/usageAreaChart.tsx";
import TopDevicesBarChart from "../components/topDevicesBarChart.tsx";

function DashboardPage() {


    return (

        <div className={"deviceVisualizer"}>
            <UsageAreaChart width={500} height={300} />
            <TopDevicesBarChart width={500} height={300} />
        </div>
    )

}


export default DashboardPage