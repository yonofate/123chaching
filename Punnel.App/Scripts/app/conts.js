﻿punnelApp.constant("APP_CONFIG", {
        URL_REFERRAL: URL_BASE + "/r/",
        URL_HUB:"https://api.punnel.com/signalr/hubs",
        URL_SCREENSHOT: "https://www.googleapis.com/pagespeedonline/v1/runPagespeed?screenshot=true&url=",       
        URL_IMAGE: "https://hstatic.punnel.com/img",
        URL_IMAGE_S: "https://hstatic.punnel.com/img/s200x200",
        URL_IMAGE_TEMPLATE_THUMB: "https://hstatic.punnel.com/img/s360x207",
        URL_STATIC: "https://hstatic.punnel.com/",
        URL_BASE: "https://",
        URL_BASE_IMAGE: "https:",
        URL_PREVIEW: "/preview",
        URL_UPLOAD: "/",
        URL_APP: URL_BASE,
        URL: URL_BASE + "/api",
        IMAGE_DEFAULT: "data:image/png;base64,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",
        HEADER: function () {
            return {
                "Content-Type": "application/json",
                Accept: "application/json"
            }
        }
});