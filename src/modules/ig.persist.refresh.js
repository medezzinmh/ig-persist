window.IGPersist = window.IGPersist || {};

IGPersist.refresh = {

    run: function (regionId) {
        
        var model = IGPersist.core.getGridModel(regionId);

        model.subscribe({
            onChange: function (type) {
                if (type === IGPersist.config.gridEvents.onRefresh) {
                    IGPersist.core._waitForPagination(regionId, function () {
                        IGPersist.state.disableCapture[regionId] = false;
                        IGPersist.core._gotoPage(regionId, type);
                    });
                }              
            }
        });
    }
};