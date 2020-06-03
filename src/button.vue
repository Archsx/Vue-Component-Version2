<template>
  <button class="g-button" :class="{ 'icon-right': iconPosition === 'right' }">
    <svg class="icon" v-if="icon"><use :xlink:href="`#i-${icon}`"></use></svg>
    <div class="content">
      <slot></slot>
    </div>
  </button>
</template>
<script>
export default {
  name: "",
  props: {
    icon: String,
    iconPosition: {
      default: "left",
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
.g-button {
  vertical-align: middle;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  font-size: var(--font-size);
  height: var(--button-height);
  padding: 0 1em;
  border-radius: var(--border-radius);
  border: 1px solid var(--border-color);
  background: var(--button-bg);
  &:hover {
    border-color: var(--border-color-hover);
  }

  &:active {
    background-color: var(--button-active-bg);
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
}
</style>
