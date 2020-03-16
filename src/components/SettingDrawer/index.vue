<template>
  <div>
    <!-- <a-button type="primary" @click="showDrawer">
      Open
    </a-button>-->
    <a-drawer
      placement="right"
      :closable="false"
      @close="onClose"
      :visible="visible"
      :maskClosable="false"
      :afterVisibleChange="afterVisibleChange"
      width="300px"
    >
      <template v-slot:handle>
        <div class="handle" @click="visible = !visible">
          <a-icon :type="visible ? 'close' : 'setting'"></a-icon>
        </div>
      </template>
      <div>
        <template>
          <div>
            <h2>整体风格定制</h2>
            <a-radio-group
              :value="$route.query.navTheme || '1'"
              @change="e => handleSettingChange('navTheme', e.target.value)"
            >
              <a-radio :value="1">黑色</a-radio>
              <a-radio :value="2">白色</a-radio>
            </a-radio-group>
            <h2>导航模式</h2>
            <a-radio-group
              :value="$route.query.navLayout || '1'"
              @change="e => handleSettingChange('navLayout', e.target.value)"
            >
              <a-radio :value="1">左侧</a-radio>
              <a-radio :value="2">顶部</a-radio>
            </a-radio-group>
          </div>
        </template>
      </div>
    </a-drawer>
  </div> </template
>Layout
<script>
export default {
  data() {
    return {
      visible: false
    };
  },
  methods: {
    onClose() {
      this.visible = false;
    },
    // 将选择的信息
    handleSettingChange(type, value) {
      this.$router.push({ query: { ...this.$route.query, [type]: value } });
    }
  }
};
</script>
<style scoped>
.handle {
  position: absolute;
  top: 240px;
  right: 300px;
  width: 48px;
  height: 48px;
  background: #1890ff;
  color: #ffffff;
  font-size: 20px;
  text-align: center;
  line-height: 48px;
  border-radius: 3px 0 0 3px;
}
</style>
