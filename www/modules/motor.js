export default function configureMotor(latestState, eventSource) {
    const state =
        latestState['MAX createdOn'].motorState === 0
            ? { color: 'danger', text: 'OFF' }
            : { color: 'success', text: 'ON' };

    $('#motor-state-container').hide();
    $('#motor-state-container ion-spinner').remove();
    $('#motor-state-container ion-chip').attr('color', state.color).show();
    $('#motor-state-container ion-chip ion-label').text(state.text);
    $('#motor-state-container').show();

    eventSource.addEventListener(
        'post',
        function (e) {
            const state =
                JSON.parse(e.data).data.motorState === 0
                    ? { color: 'danger', text: 'OFF' }
                    : { color: 'success', text: 'ON' };

            $('#motor-state-container').hide();
            $('#motor-state-container ion-chip')
                .attr('color', state.color)
                .show();
            $('#motor-state-container ion-chip ion-label').text(state.text);
            $('#motor-state-container').show();
        },
        false
    );
}
