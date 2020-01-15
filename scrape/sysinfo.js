const si = require('systeminformation');

async function cpuData() {
    try {
        let data = await si.cpu();
        // console.log('CPU Information:');
        // console.log('- manufucturer: ' + data.manufacturer);
        // console.log('- brand: ' + data.brand);
        // console.log('- speed: ' + data.speed);
        // console.log('- cores: ' + data.cores);
        // console.log('- physical cores: ' + data.physicalCores);
        // console.log('...');
        let {manufacturer, brand, speed, cores, physicalCores, ...other} = data
        return {manufacturer, brand, speed, cores, physicalCores}
    } catch (e) {
        console.log(e)
    }
}
async function gpuData() {
    try {
        let data = await si.graphics();
        return data.controllers
    } catch (e) {
        console.log(e)
    }
}

const x = Promise.all([cpuData(), gpuData()])
x.then(data => {
    const [cpu, gpu] = data
    console.log(cpu, gpu)
})