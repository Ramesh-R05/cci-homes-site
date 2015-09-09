export default {
    tagPage: {
        body: {
            request: {
                pathAndQuery: "/tag?leaf=how-to",
                userAgent: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/45.0.2454.85 Safari/537.36",
                queryString: {
                    leaf: ["how-to"]
                },
                dnsSafeHost: "dev.homes-api.wn.bauer-media.net.au"
            }
        }
    },
    homePage: {
        body: {
            request: {
                pathAndQuery: "/",
                userAgent: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/45.0.2454.85 Safari/537.36",
                dnsSafeHost: "dev.homes-api.wn.bauer-media.net.au"
            }
        }
    }
}
