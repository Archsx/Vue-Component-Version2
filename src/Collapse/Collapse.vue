<template>
  <div class="collapse">
    <slot></slot>
  </div>
</template>

<script>
export default {
  model: {
    prop: "activekey",
    event: "change",
  },
  props: {
    activekey: {
      type: Array,
      required: true,
    },
    "single-open": {
      type: Boolean,
      default: false,
    },
  },
  provide() {
    return {
      getActiveKey: () => {
        return this.activekey;
      },
      toggleActiveState: (key) => {
        let keyArray;

        if (this.singleOpen) {
          keyArray = [key];
          this.$children.forEach((vm) => {
            if (key !== vm.$vnode.key) {
              vm.isActive = false;
            }
          });
        } else {
          const idx = this.activekey.indexOf(key);

          if (idx >= 0) {
            keyArray = this.activekey.filter((val) => {
              return val !== key;
            });
          } else {
            keyArray = [...this.activekey, key];
          }
        }

        this.$emit("change", keyArray);
      },
    };
  },
  mounted() {},
  methods: {},
};
</script>

<style scoped lang="scss">
.collapse {
  line-height: 1.5;
  background-color: #fafafa;
  border: 1px solid #d9d9d9;
  border-bottom: 0;
}
</style>
