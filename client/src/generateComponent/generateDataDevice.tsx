function GenerateDataDevice({ deviceID, startYear }: { deviceID: string; startYear: number;}) {
    const startDate: Date = new Date(`${startYear}-01-01`);
    const endDate: Date = new Date(`${startYear}-12-31`);
    let currentDate: Date = new Date(startDate);

    let counter: number = 0;

    while (currentDate <= endDate) {
        console.log(counter);
        currentDate.setDate(currentDate.getDate() + 1);
        counter += 1;
    }

}
export default GenerateDataDevice
