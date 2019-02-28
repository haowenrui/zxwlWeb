export default {

    getEnv() {
        let HOST = window.location.host;
        if (HOST.indexOf('zxwl') != -1) {
            return 'prod';
        } else {
            return 'localhost';
        }
    },
    getHttpUrl() {
        let HTTPAPI = '';
        if (this.getEnv() == 'prod') {
            HTTPAPI = window.location.origin;
        } else {
            HTTPAPI = '/api'; // 本地开发
        }
        // console.log(HTTPAPI)
        return HTTPAPI;
    },
}