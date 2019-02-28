<template>
  <div>
    <span v-if="title !== ''" v-text="title"></span>

    <el-button v-if="showIconBtn" type="text" class="iconfont icon-xiazai" size="medium" @click="downLoadFile"></el-button>
    <el-button v-else type="text" class="btn-download" @click="downLoadFile">下载
    </el-button>
    <a :href="downUrl" download="" target="_blank" ref="download"></a>
  </div>
</template>

<script>
import {downloadFile} from '@/tools/utils.js'
export default {
  name: "down-btn",
  props: ["fileKey", "title", "showIconBtn", "trackId"],
  data() {
    return {
      downUrl: ""
    };
  },
  methods: {
    async downLoadFile() {
      //下载埋点
      if (this.trackId) {
        this.$track.track(parseInt(this.trackId));
      }

      const response = await this.$http.post(this.$urlApi.downloadURL, {
        fileKey: this.fileKey
      });
      if (response.data.url !== "") {
        this.downUrl = response.data.url;
        const contentType = response.data.contentType;
        if (contentType == "application/octet-stream") {
          downloadFile(this.downUrl);
        } else {
          if (window.navigator.userAgent.indexOf("Firefox") >= 1) {
            this.$nextTick(() => {
              this.$refs.download.click();
            });
          } else {
            var $a = document.createElement("a");
            $a.setAttribute("href", this.downUrl);
            $a.setAttribute("download", "");
            var evObj = document.createEvent("MouseEvents");
            evObj.initMouseEvent(
              "click",
              true,
              true,
              window,
              0,
              0,
              0,
              0,
              0,
              false,
              false,
              true,
              false,
              0,
              null
            );
            $a.dispatchEvent(evObj);
          }
        }
      } else {
        this.$message({
          showClose: true,
          message: "下载失败",
          type: "error"
        });
      }
    },
  }
};
</script>

<style scoped>

</style>
