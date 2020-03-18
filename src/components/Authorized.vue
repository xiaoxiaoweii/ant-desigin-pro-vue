<script>
import { check } from "../utils/auth";
export default {
  functional: true,
  props: {
    authority: {
      type: Array,
      required: true
    }
  },
  render(h, context) {
    const { props, scopedSlots } = context;
    // 校验用户 校验通过返回插槽 没通过返回null
    return check(props.authority) ? scopedSlots.default() : null;
  }
};
</script>
