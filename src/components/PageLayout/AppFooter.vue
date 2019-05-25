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
      <p class="company">正消物联</p>
      <p class="copyright">Copyright 2018</p>
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


