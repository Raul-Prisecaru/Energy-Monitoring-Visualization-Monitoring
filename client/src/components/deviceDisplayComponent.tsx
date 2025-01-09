import "./styles/deviceDisplayStyle.css"

function DeviceDisplayComponent({deviceName, deviceCost}: {deviceName: string, deviceCost: number}) {

    return (
        <div className={"component"}>
            <div className={"deviceName"}>
                {deviceName}
            </div>

            <div className={"deviceCost"}>
                £{deviceCost}
            </div>
        </div>
    )
}

export default DeviceDisplayComponent