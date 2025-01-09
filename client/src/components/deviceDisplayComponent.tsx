function DeviceDisplayComponent({deviceName, deviceCost}: {deviceName: string, deviceCost: number}) {

    return (
        <div>
            <div className={"deviceName"}>
                {deviceName}
            </div>

            <div className={"deviceCost"}>
                {deviceCost}
            </div>
        </div>
    )
}