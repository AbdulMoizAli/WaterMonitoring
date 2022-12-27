export default function configureFlow(latestState, eventSource) {
    const state =
        latestState['MAX createdOn'].waterFlow === 0
            ? { color: 'danger', text: 'OFF' }
            : { color: 'success', text: 'ON' };

    $('#flow-state-container').hide();
    $('#flow-state-container ion-spinner').remove();
    $('#flow-state-container ion-chip').attr('color', state.color).show();
    $('#flow-state-container ion-chip ion-label').text(state.text);
    $('#flow-state-container').show();

    eventSource.addEventListener(
        'post',
        function (e) {
            const state =
                JSON.parse(e.data).data.waterFlow === 0
                    ? { color: 'danger', text: 'OFF' }
                    : { color: 'success', text: 'ON' };

            $('#flow-state-container').hide();
            $('#flow-state-container ion-chip')
                .attr('color', state.color)
                .show();
            $('#flow-state-container ion-chip ion-label').text(state.text);
            $('#flow-state-container').show();
        },
        false
    );
}
