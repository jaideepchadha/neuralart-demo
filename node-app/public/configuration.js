var GLOBALCONFIG = {
    ServiceManager: {
        protocol: "http://",
        host: "127.0.0.1",
        port: ":80",
        urls: {

        },
        getUrls: function (key, id) {
            return this.protocol + this.host + this.port + this.urls[key] + (id ? "/" + id : '');
        }
    }
}
