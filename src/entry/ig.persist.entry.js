function igPersistInit() {

    var daThis = this;

    if (!daThis || !daThis.affectedElements) {
        IGPersist.log.warn("IGPersist: Dynamic Action context is invalid (affectedElements missing)");
        return;
    }

    var regionId = daThis.affectedElements[0]?.id;

    if (!regionId) {
        IGPersist.log.warn("IGPersist: Region ID not found in affectedElements");
        return;
    }

    var isStaticID = /^[R]?\d+$/.test(regionId) && regionId.length > 15;
    if (isStaticID) {
        IGPersist.log.warn("IGPersist: consider setting a Static ID for better stability", regionId);
    }

    var igRegion = apex.region(regionId);

    if (!igRegion) {
        IGPersist.log.warn("IGPersist: Region not found for ID:", regionId);
        return;
    }

    if (igRegion.type !== IGPersist.config.attributes.type) {
        IGPersist.log.warn("IGPersist: Region is not an Interactive Grid:", regionId);
        return;
    }

    var igConfig;
    try {
        igConfig = igRegion.widget().interactiveGrid("option").config;
    } catch (e) {
        IGPersist.log.warn("IGPersist: Unable to access Interactive Grid config:", e);
        return;
    }
    
    var paginationType = (igConfig.pagination.type || "").toLowerCase();

    if (!igConfig.lazyLoading) {
        IGPersist.log.warn("IGPersist disabled: Lazy Loading must be enabled", regionId);
        return;
    }

    if (paginationType !== IGPersist.config.attributes.pagination) {
        IGPersist.log.warn("IGPersist disabled: Pagination Type must be 'Page' (set)", regionId);
        return;
    }

    if (igConfig.pagination.showTotalRowCount !== true) {
        IGPersist.log.warn("IGPersist disabled: 'Show Total Count' must be enabled", regionId);
        return;
    }

    var mode = daThis.action.attribute01 || "BOTH";

    IGPersist.init.run({
        regionId: regionId,
        mode: mode
    });
}