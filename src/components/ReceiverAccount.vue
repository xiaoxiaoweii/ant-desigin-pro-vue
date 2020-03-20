<template>
  <!-- 输入框组合 -->
  <a-input-group compact>
    <a-select v-model="type" style="width: 130px" @change="handleTypeChange">
      <a-select-option value="alipay">支付宝</a-select-option>
      <a-select-option value="bank">银行账户</a-select-option>
    </a-select>
    <a-input
      style="width: calc(100% - 130px)"
      defaultValue="input content"
      v-model="number"
      @change="handleNumberChange"
    />
  </a-input-group>
</template>

<script>
export default {
  props: {
    value: {
      type: Object
    }
  },
  watch: {
    value(val) {
      Object.assign(this, val);
    }
  },
  data() {
    // 将type number放入value中 如果没有值 赋予空对象
    const { type, number } = this.value || {};
    return {
      type: type || "alipay",
      number: number || ""
    };
  },
  methods: {
    // 将值传递出去
    handleTypeChange(val) {
      this.$emit("change", { ...this.value, type: val });
    },
    handleNumberChange(e) {
      this.$emit("change", { ...this.value, number: e.target.value });
    }
  }
};
</script>
