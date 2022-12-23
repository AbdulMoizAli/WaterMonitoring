const tankLevelMapping = {
    1: 33,
    2: 66,
    3: 100,
};

export default async function configureTank(latestState) {
    const fm = new FluidMeter();

    fm.init({
        targetContainer: document.getElementById('fluid-meter'),
        fillPercentage:
            tankLevelMapping[latestState['MAX createdOn'].tankLevel],
        options: {
            drawPercentageSign: true,
            drawBubbles: true,
            size: 300,
            borderWidth: 8,
            backgroundColor: '#e0e0e0',
            foregroundColor: '#3880ff',
            foregroundFluidLayer: {
                fillStyle: '#3880ff',
                angularSpeed: 90,
                maxAmplitude: 11,
                frequency: 25,
                horizontalSpeed: -200,
            },
            backgroundFluidLayer: {
                fillStyle: '#3dc2ff',
                angularSpeed: 100,
                maxAmplitude: 13,
                frequency: 23,
                horizontalSpeed: 230,
            },
        },
    });
}
