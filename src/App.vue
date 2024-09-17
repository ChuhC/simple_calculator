<script>
export default {
  data() {
    return {
      keepAliveInclude: []  // 添加这一行
    }
  },
  onLaunch: function() {
    console.log('App Launch')
  },
  onShow: function() {
    console.log('App Show')
  },
  onHide: function() {
    console.log('App Hide')
  },
  // 添加以下方法
  methods: {
    showTabBar() {
      return false;
    }
  }
}
</script>

<style>
/* 全局样式 */
page {
  background-color: black;
  color: white;
  height: 100%;
  overflow: hidden;
}
</style>
