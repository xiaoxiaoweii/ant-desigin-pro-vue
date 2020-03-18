<template>
  <div>
    <!-- sider -->
    <a-layout id="components-layout-demo-side" style="min-height: 100vh">
      <a-layout-sider
        collapsible
        v-model="collapsed"
        :trigger="null"
        width="256px"
      >
        <div class="logo">xiaoxiaoweii</div>
        <SiderMenu />
      </a-layout-sider>
      <a-layout>
        <!-- header -->
        <a-layout-header style="background: #fff; padding: 0">
          <a-icon
            v-auth="['admin']"
            class="trigger"
            :type="collapsed ? 'menu-unfold' : 'menu-fold'"
            @click="collapsed = !collapsed"
          ></a-icon>
          <Header />
        </a-layout-header>
        <!-- content -->
        <a-layout-content style="margin: 0 16px">
          <router-view></router-view>
        </a-layout-content>
        <a-layout-footer style="text-align: center">
          <Footer />
        </a-layout-footer>
      </a-layout>
    </a-layout>
  </div>
</template>
<script>
import Header from "../layouts/Header";
import Footer from "../layouts/Footer";
import SiderMenu from "../layouts/SiderMenu";
export default {
  data() {
    return {
      collapsed: false
    };
  },
  components: {
    Header,
    Footer,
    SiderMenu
  }
};
</script>
<style scoped>
.trigger {
  padding: 0 20px;
  line-height: 64px;
  font-size: 20px;
}
.trigger:hover {
  background: #eeeeee;
}
.logo {
  height: 64px;
  line-height: 64px;
  text-align: center;
  overflow: hidden;
}
</style>
