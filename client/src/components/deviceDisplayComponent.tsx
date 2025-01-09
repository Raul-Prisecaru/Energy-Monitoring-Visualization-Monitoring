import "./styles/deviceDisplayStyle.css"
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';


function DeviceDisplayComponent({deviceName, deviceCost}: {deviceName: string, deviceCost: number}) {
    const card = (
        <CardContent>
            <div className={"deviceName"}>
                {deviceName}
            </div>

            <div className={"deviceCost"}>
                £{deviceCost}
            </div>
        </CardContent>
    )

    return (
        <div className={"component"}>
            <Card>{card}</Card>

        </div>
    )
}

export default DeviceDisplayComponent