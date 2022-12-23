import { httpGet } from '../modules/httpClient.js';
import configureTank from '../modules/tank.js';

document.addEventListener('deviceready', onDeviceReady, false);

async function onDeviceReady() {
    const latestState = await httpGet(
        'rest/status-logs?h={"$aggregate":["MAX:createdOn"]}'
    );

    configureTank(latestState);
}
