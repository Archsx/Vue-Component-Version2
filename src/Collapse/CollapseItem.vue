<template>
  <div class="collapse-item-wrap">
    <div class="header-wrap" @click="toggle" :class="headClasses">
      <slot name="icon" :active = "isActive">
        <icon
          v-if="!withoutIcon"
          name="arrow-right"
          :class="arrowClasses"
        ></icon>
      </slot>
      <p v-if="header">{{ header }}</p>
    </div>
    <collapse-transition>
      <div v-show="isActive" class="content-wrap">
        <div class="slot-wrap">
          <slot></slot>
        </div>
      </div>
    </collapse-transition>
  </div>
</template>

<script>
import Icon from "../Button/Icon";
import CollapseTransition from "./CollapseTransition";
export default {
  components: {
    CollapseTransition,
    Icon,
  },
  props: {
    header: {
      type: String,
    },
    withoutIcon: {
      default: false,
    },
  },
  computed: {
    headClasses() {
      return {
        "without-icon": this.withoutIcon,
      };
    },
    arrowClasses() {
      return {
        spread: this.isActive,
        arrow: true,
      };
    },
  },
  data() {
    return {
      isActive: true,
    };
  },
  inject: ["getActiveKey", "toggleActiveState"],
  methods: {
    toggle() {
      this.isActive = !this.isActive;
      this.toggleActiveState(this.$vnode.key);
    },
  },
  created() {
    this.isActive = this.getActiveKey().includes(this.$vnode.key);
  },
};
</script>

<style scoped lang="scss">
.collapse-item-wrap {
  border-bottom: 1px solid #d9d9d9;
  .header-wrap {
    border-radius: 0 0 4px 4px;
    position: relative;
    padding: 12px 16px 12px 40px;
    color: rgba(0, 0, 0, 0.85);
    line-height: 22px;
    cursor: pointer;
    transition: all 0.3s;
    &.without-icon {
      padding-left: 16px;
    }
    .arrow {
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      left: 16px;
      &.spread {
        transform: translateY(-50%) rotate(90deg);
      }
    }
  }
  .content-wrap {
    border-top: 1px solid #d9d9d9;
    background-color: #fff;
    .slot-wrap {
      padding: 16px;
    }
  }
}
</style>
