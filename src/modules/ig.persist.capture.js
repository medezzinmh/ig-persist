IGPersist.capture = {

    init: function (regionId) {

        if (IGPersist.state.captureInit[regionId]) return;
        IGPersist.state.captureInit[regionId] = true;

        var s = IGPersist.config.selectors;
        var base = IGPersist.core.getGridBase(regionId);

        document.addEventListener(
            "click",
            function (e) {
                
                var target = e.target.closest(base + " " + s.pagination + " " + s.button);

                if (!target) return;

                setTimeout(function () {

                    var selected = $(base + " " + s.selected);

                    if (!selected.length) return;

                    var page = selected.attr(IGPersist.config.attributes.page);

                    if (page) {
                        var key = IGPersist.core.getPageKey(regionId);
                        IGPersist.storage.save(key, page);
                    }

                }, IGPersist.config.timing.waitClick);

            },
            true
        );
    },

    _setPage: function (regionId) {
        var s = IGPersist.config.selectors;
        var base = IGPersist.core.getGridBase(regionId);
        var selected = $(base + " " + s.selected);
        if (!selected.length) return;
        var page = selected.attr(IGPersist.config.attributes.page);
        if (page) { 
            var key = IGPersist.core.getPageKey(regionId);
            IGPersist.storage.save(key, page);
        }
    }
};