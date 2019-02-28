<template>
    <div>
        <el-button type="text" class="btn-download" @click="downLoadFile">预览
        </el-button>
        <el-dialog v-if="downUrl" title="预览" :visible.sync="visible" width="80%" :fullscreen="true" :modal="false">
            <img v-if="downUrl.indexOf('.pdf') == -1" :src="downUrl" class="image">
            <h2 class="text-center" v-else>请下载后预览！</h2>
        </el-dialog>
    </div>
</template>

<script>
export default {
    name: "preview-btn",
    props: ["fileKey"],
    data() {
        return {
            downUrl: "",
            visible: false
        };
    },
    methods: {
        async downLoadFile() {
            const response = await this.$http.post(this.$urlApi.downloadURL, {
                fileKey: this.fileKey
            });
            if (response.data.url !== "") {
                this.downUrl = response.data.url;
                this.visible = true;
            } else {
                this.$message({
                    showClose: true,
                    message: "预览失败",
                    type: "error"
                });
            }
        }
    }
};
</script>

<style scoped>
/* 图片等比缩放 */
.image {
    width: auto;
    height: auto;
    max-width: 100%;
    max-height: 100%;
}

</style>
