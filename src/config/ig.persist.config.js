window.IGPersist = window.IGPersist || {};

IGPersist.config = {

    debug: false,

    modes: {
        ON_LOAD: { load: true, refresh: false },
        ON_REFRESH: { load: false, refresh: true },
        BOTH: { load: true, refresh: true }
    },

    selectors: {
        gridSuffix: "_ig_grid_vc",
        pagination: ".a-GV-pagination",
        pageItem: ".a-GV-pageSelector-item",
        selected: ".a-GV-pageSelector-item.is-selected",
        button: "button",
        first: ".a-GV-pageButton--nav.js-pg-first",
    },

    attributes: {
        page: "data-page",
        type: "InteractiveGrid",
        pagination: "set"
    },

    timing: {
        waitClick   : 60
    },
    
    gridEvents: {
        onRefresh: "refresh",
        onAdd: "addData"
    }
    
};