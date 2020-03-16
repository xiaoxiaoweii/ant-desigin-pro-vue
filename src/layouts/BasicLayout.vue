<template>
  <div :class="[`nav-theme-${navTheme}`, `nav-layout-${navLayout}`]">
    <!-- sider -->
    <a-layout id="components-layout-demo-side" style="min-height: 100vh">
      <a-layout-sider
        v-if="navLayout === 1"
        :theme="navTheme"
        collapsible
        v-model="collapsed"
        :trigger="null"
      >
        <div class="logo">xiaoxiaoweii</div>
        <SiderMenu />
      </a-layout-sider>
      <a-layout>
        <!-- header -->
        <a-layout-header style="background: #fff; padding: 0">
          <a-icon
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
    <SettingDrawer />
  </div>
</template>
<script>
import Header from "../layouts/Header";
import Footer from "../layouts/Footer";
import SiderMenu from "../layouts/SiderMenu";
import SettingDrawer from "../components/SettingDrawer";
export default {
  data() {
    return {
      collapsed: false
    };
  },
  computed: {
    navTheme() {
      return this.$route.query.navTheme || "1";
    },
    navLayout() {
      return this.$route.query.navLayout || "1";
    }
  },
  components: {
    Header,
    Footer,
    SiderMenu,
    SettingDrawer
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
.nav-theme-1 >>> .logo {
  color: #ffffff;
}
.nav-theme-2 >>> .logo {
  color: #111111;
}
</style>
