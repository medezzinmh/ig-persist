window.IGPersist = window.IGPersist || {};

IGPersist.load = {

    run: function (regionId) {

        var model = IGPersist.core.getGridModel(regionId);

        IGPersist.state.igModelsubId[regionId] = 
            model.subscribe({

                onChange: function (type) {
                    
                    if (type === IGPersist.config.gridEvents.onAdd) {
                        IGPersist.state.disableCapture[regionId] = false;
                        IGPersist.core._waitForPagination(regionId, function () {
                            IGPersist.state.disableCapture[regionId] = false;
                            IGPersist.core._gotoPage(regionId, type);
                        });
                        
                    }
                }
            });
    }
};