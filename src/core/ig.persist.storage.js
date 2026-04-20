window.IGPersist = window.IGPersist || {};

IGPersist.storage = {

    save: function (key, value) {
        try {
            localStorage.setItem(key, value);
        } catch(e) {
            IGPersist.log.warn("IGPersist storage error", e);
        }
    },

    load: function (key) {
        return localStorage.getItem(key);
    }
};