<style lang="scss" scoped>
  .layout-footer {
    .footer-fixed {
      z-index: 100;
      position: fixed;
      bottom: 0;
      left: 0;
      right: 0;
      background: #495060;
      color: #fff;

      .company {
        text-align: center;
        font-size: 10px;
        padding-top: 5px;
        margin: 0;
      }
      .copyright {
        text-align: center;
        font-size: 6px;
        padding: 2px;
        margin: 0;
      }
    }
  }
</style>
<template lang="html">
  <section class="layout-footer">
    <div class="footer-fixed">
      <p class="company">北京蝉鸣信息科技有限公司</p>
      <p class="copyright">Copyright © imzhiliao.com. All rights reserved | 京ICP备14061569号</p>
    </div>
  </section>
</template>

<script>
  export default {
    name: '',
    data() {
      return {}
    },
    created() {

    },
    mounted() {

    },
    methods: {}
  }
</script>


