<template>
  <button
    class="g-button"
    :class="{ 'icon-right': iconPosition === 'right' }"
    :disabled="loading"
    @click="handleClick"
  >
    <g-icon :name="icon" v-if="icon && !loading" class="icon"></g-icon>
    <g-icon name="loading" class="loading icon" v-if="loading"></g-icon>
    <div class="content">
      <slot></slot>
    </div>
  </button>
</template>

<script>
import Icon from "./Icon.vue";
export default {
  name: "",
  components: {
    "g-icon": Icon,
  },
  props: {
    icon: String,
    loading: {
      type: Boolean,
      default: false,
    },
    iconPosition: {
      default: "left",
      validator(value) {
        if (value !== "left" && value !== "right") {
          return false;
        } else {
          return true;
        }
      },
    },
  },
  methods: {
    handleClick() {
      this.$emit("click");
    },
  },
  // 使用render函数的方式，可以不用css方式控制icon出现的位置，但是太麻烦了
  // render(h) {
  //   const icon = this.icon;
  //   const svgnode = {
  //     render(h) {
  //       return h(
  //         "svg",
  //         {
  //           class: {
  //             icon: true,
  //           },
  //         },
  //         [
  //           h("use", {
  //             attrs: {
  //               "xlink:href": `#i-${icon}`,
  //             },
  //           }),
  //         ]
  //       );
  //     },
  //   };

  //   return h(
  //     "button",
  //     {
  //       class: {
  //         "g-button": true,
  //       },
  //     },
  //     [
  //       icon && this.iconPosition === "left",
  //       this.$slots.default,
  //       icon && this.iconPosition === "right",
  //     ]
  //       .filter((ele) => ele)
  //       .map((p) => {
  //         if (typeof p === "boolean") {
  //           return h(svgnode);
  //         } else {
  //           return p;
  //         }
  //       })
  //   );
  // },
};
</script>

<style lang="scss">
$button-height: 32px;
$font-size: 14px;
$button-bg: white;
$button-active-bg: #eee;
$border-radius: 4px;
$color: #333;
$border-color: #999;
$border-color-hover: #666;

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}

button:disabled {
  pointer-events: none;
  cursor: not-allowed;
  filter: alpha(opacity=65);
  -webkit-box-shadow: none;
  box-shadow: none;
  opacity: 0.65;
}

.g-button {
  vertical-align: middle;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  font-size: $font-size;
  height: $button-height;
  padding: 0 1em;
  border-radius: $border-radius;
  border: 1px solid $border-color;
  background: $button-bg;

  &:hover {
    border-color: $border-color-hover;
  }

  &:active {
    background-color: $button-active-bg;
  }

  &:focus {
    outline: none;
  }

  > .content {
    order: 2;
  }

  > .icon {
    order: 1;
    margin: 0 0.3em 0 0;
  }

  &.icon-right {
    > .content {
      order: 1;
    }

    > .icon {
      order: 2;
      margin: 0 0 0 0.3em;
    }
  }

  .loading {
    animation: spin 1.5s linear infinite;
  }
}
</style>
