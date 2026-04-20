window.IGPersist = window.IGPersist || {};

IGPersist.core = {

    getAppId: function () {
        return $v("pFlowId");
    },

    getPageId: function () {
        return $v("pFlowStepId");
    },

    getPageKey: function (regionId) {
        return "IGPERSIST:" +
            this.getAppId() + ":" +
            this.getPageId() + ":" +
            regionId;
    },

    getGridBase: function (regionId) {
        return "#" + regionId + IGPersist.config.selectors.gridSuffix;
    },

    getGridModel: function (regionId) {
        
        var region = apex.region(regionId);
        if (!region) return;

        var ig$ = region.widget();
        var view = ig$.interactiveGrid("getViews", "grid");

        if (!view || !view.model) return;

        var model = view.model;

        return model;
    },

    unSubscribeGridModel: function (regionId, subId) {
        var model = this.getGridModel(regionId);
        model.unSubscribe(subId);
        return;
    },

    getStoredSelector: function (regionId, page) {

        var s = IGPersist.config.selectors;

        return this.getGridBase(regionId) +
            " " + s.pageItem +
            "[data-page='" + page + "'] " +
            s.button;
    },

    _waitForPagination: function (regionId, callback) {

        var base = this.getGridBase(regionId);
        var s = IGPersist.config.selectors;

        var target = document.querySelector(base + " " + s.pagination);

        if (!target) return;

        var observer = new MutationObserver(function () {

            var items = $(base + " " + s.pageItem);
            var selected = $(base + " " + s.selected);

            if (items.length && selected.length === 1) {
                observer.disconnect();
                callback();
            }
        });

        observer.observe(target, {
            childList: true,
            subtree: true
        });
    },

    _gotoPage: function (regionId, type) {
        

        var key = this.getPageKey(regionId);
        var targetPage = parseInt(IGPersist.storage.load(key), 10);
        if (!targetPage) targetPage = 0;
        
        var igRegion = apex.region(regionId);
        var gridView = igRegion.call("getViews", "grid");
        gridView.view$.grid("gotoPage", targetPage);
        if(IGPersist.state.igModelsubId[regionId]){
            this.unSubscribeGridModel(regionId, IGPersist.state.igModelsubId[regionId]);
        }
        return;
    },

    _waitPageButton: function (regionId, targetPage, callback) {

        var tries = 0;
        var maxTries = 50;

        function check() {

            var btn = $(this.getStoredSelector(regionId, targetPage));

            if (btn.length) {
                if (callback) callback();
                return;
            }

            if (tries < maxTries) {
                tries++;
                requestAnimationFrame(check);
            } else {
                IGPersist.log.warn("IGPersist: page button not found");
            }
        }

        check();
    }
};
