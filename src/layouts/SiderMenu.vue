<template>
  <div style="width: 256px">
    <a-menu
      :SelectedKeys="SelectedKeys"
      :OpenKeys.sync="OpenKeys"
      mode="inline"
      theme="dark"
      :inlineCollapsed="collapsed"
    >
      <template v-for="item in menuData">
        <a-menu-item
          v-if="!item.children"
          :key="item.path"
          @click="() => $router.push({ path: item.path })"
        >
          <a-icon v-if="item.meta.icon" :type="item.meta.icon" />
          <span>{{ item.meta.title }}</span>
        </a-menu-item>
        <sub-menu v-else :menu-info="item" :key="item.path" />
      </template>
    </a-menu>
  </div>
</template>

<script>
import SubMenu from "../layouts/SubMenu";
export default {
  components: {
    "sub-menu": SubMenu
  },
  watch: {
    "$route.path": function(val) {
      this.SelectedKeys = this.SelectedKeysMap[val];
      this.OpenKeys = this.collapsed ? [] : this.OpenKeysMap[val];
    }
  },
  data() {
    this.SelectedKeysMap = {};
    this.OpenKeysMap = {};
    const menuData = this.getMenuData(this.$router.options.routes); // 拿到路由中的配置信息
    return {
      collapsed: false,
      menuData,
      SelectedKeys: this.SelectedKeysMap[this.$route.path],
      OpenKeys: this.collapsed ? [] : this.OpenKeysMap[this.$route.path]
    };
  },
  methods: {
    getMenuData(routes = [], parentKeys = [], SelectedKeys) {
      const menuData = [];
      routes.forEach(item => {
        if (item.name && !item.hideInMenu) {
          this.OpenKeysMap[item.path] = parentKeys;
          this.SelectedKeysMap[item.path] = [SelectedKeys || item.path];
          const newItem = { ...item }; // 解构数组 不改变原数据
          delete newItem.children; //删除\子路由
          if (item.children && !item.hideChildrenInMenu) {
            newItem.children = this.getMenuData(item.children, [
              ...parentKeys,
              item.path
            ]);
          } else {
            this.getMenuData(
              item.children,
              SelectedKeys ? parentKeys : [...parentKeys, item.path],
              SelectedKeys || item.path
            );
          }
          menuData.push(newItem);
          // 如果没有子路由也没有标志 直接渲染到侧边菜单
        } else if (
          !item.hideInMenu &&
          !item.hideChildrenInMenu &&
          item.children
        ) {
          menuData.push(
            ...this.getMenuData(item.children, [...parentKeys, item.path])
          );
        }
      });
      return menuData;
    }
  }
};
</script>
