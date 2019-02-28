export default {
    methods: {
        /**
         * 通过a标签下载
         * @param {*} url  下载地址
         * @param {*} download  存储文件名称
         */
        download(url, download) {
            let a = document.createElement('a');
            a.href = url;
            a.download = download;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
        },
    }
}