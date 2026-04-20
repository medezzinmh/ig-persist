window.IGPersist = window.IGPersist || {};

IGPersist.init = {

    run: function (config) {
        
        if (!config || !config.regionId) return;

        var regionId = config.regionId;
        
        var mode = IGPersist.config.modes[config.mode];

        if (mode.load) {
            IGPersist.load.run(regionId);
        }

        if (mode.refresh) {
            IGPersist.refresh.run(regionId);
        }

        IGPersist.state.disableCapture[regionId] = false;
        var model = IGPersist.core.getGridModel(regionId);

        model.subscribe({
            onChange: function (type) {
                if (type === IGPersist.config.gridEvents.onAdd) {
                    IGPersist.core._waitForPagination(regionId, function () {
                        IGPersist.capture._setPage(regionId);
                       if(!IGPersist.state.disableCapture[regionId]) IGPersist.capture.init(regionId);
                    });                
                }               
            }
        });

    }
};