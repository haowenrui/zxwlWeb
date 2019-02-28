<style lang="scss" scoped>
.layout-content-main{
  min-height: 66vh;
}
</style>

<script>
export default {
  name: 'AppMain',
  computed: {

  }
}
</script>
<template lang="html">
    <div class="layout-content-main">
      <transition name="fade" mode="out-in">
          <router-view></router-view>
      </transition>
    </div>
</template>

