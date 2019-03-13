export default {

    getEnv() {
        let HOST = window.location.host;
        if (HOST.indexOf('http://39.98.173.65:9000') != -1) {
            return 'prod';
        } else {
            return 'localhost';
        }
    },
    getHttpUrl() {
        let HTTPAPI = '';
        if (this.getEnv() == 'prod') {
            HTTPAPI = 'http://39.98.173.65:9000';
        } else {
            HTTPAPI = '/api'; // 本地开发
        }
        // console.log(HTTPAPI)
        return HTTPAPI;
    },
}