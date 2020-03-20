<template>
  <div>
    <a-form layout="horizontal" :form="form">
      <a-form-item
        label="付款账户"
        :label-col="formItemLayout.labelCol"
        :wrapper-col="formItemLayout.wrapperCol"
      >
        <a-input
          v-decorator="[
            'payAccount',
            {
              initialValue: step.payAccount,
              rules: [{ required: true, message: '请输入付款账号' }]
            }
          ]"
          placeholder="请输入付款账号"
        ></a-input>
      </a-form-item>
      <a-form-item>
        <a-button type="primary" @click="handleSubmit">下一步</a-button>
      </a-form-item>
    </a-form>
  </div>
</template>
<script>
export default {
  data() {
    this.form = this.$form.createForm(this);
    return {
      formItemLayout: {
        labelCol: { span: 4 },
        wrapperCol: { span: 14 }
      }
    };
  },
  computed: {
    step() {
      return this.$store.state.form.step;
    }
  },
  methods: {
    handleSubmit() {
      // 将表单信息取出放到this中
      const { form, $router, $store } = this;
      form.validateFields((err, values) => {
        // 如果表单没有报错 将数据提交到store
        if (!err) {
          $store.commit({
            type: "form/saveStepFormData",
            payload: values
          });
          // 提交成功 路由跳转到第二步
          $router.push("/form/step-form/confirm");
        }
      });
    }
  }
};
</script>
<style scoped></style>
