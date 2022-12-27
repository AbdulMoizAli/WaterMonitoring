import { httpGet, getEventSource } from '../modules/httpClient.js';
import configureTank from '../modules/tank.js';
import configureMotor from '../modules/motor.js';
import configureFlow from '../modules/flow.js';
import { showAlert } from '../modules/components.js';

document.addEventListener('deviceready', onDeviceReady, false);

async function onDeviceReady() {
    const latestState = await httpGet(
        'rest/status-logs?h={"$aggregate":["MAX:createdOn"]}'
    );

    if (latestState === null) {
        handleRequestFailure();
        return;
    }

    const eventSource = getEventSource();

    configureTank(latestState, eventSource);
    configureMotor(latestState, eventSource);
    configureFlow(latestState, eventSource);
}

function handleRequestFailure() {
    showAlert('Connection Failed', 'Server is unavailable', ['Close']);

    const markup =
        '<center><ion-text color="medium"><h1 class="server-unavailable">Server is unavailable</h1></ion-text></center>';

    $('ion-tab[tab="tank"] ion-content').html(markup);
    $('ion-tab[tab="motor"] ion-content').html(markup);
    $('ion-tab[tab="flow"] ion-content').html(markup);
}
