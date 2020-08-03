<template>
  <div
    class="tabs-item"
    @click="handleClick"
    :class="classes"
    :data-name="name"
  >
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "TabsItem",
  props: {
    disabled: {
      type: Boolean,
      default: false,
    },
    name: {
      type: String | Number,
      required: true,
    },
  },
  data() {
    return {
      active: false,
    };
  },
  computed: {
    classes() {
      return {
        active: this.active,
        disabled: this.disabled,
      };
    },
  },
  created() {
    if (this.eventBus) {
      this.eventBus.$on("update:selected", (name) => {
        this.active = name === this.name;
      });
    }
  },
  inject: ["eventBus"],
  methods: {
    handleClick() {
      if (this.disabled) {
        return;
      }
      this.$emit('click',this) // 这一句是为了测试
      this.eventBus && this.eventBus.$emit("update:selected", this.name, this);
    },
  },
};
</script>

<style lang="scss" scoped>
.tabs-item {
  padding: 12px 16px;
  cursor: pointer;
  &.active {
    color: #1890ff;
    font-weight: 500;
  }
  &.disabled {
    color: rgba(0, 0, 0, 0.25);
    cursor: not-allowed;
  }
}
</style>
