<script>
export default {
  name: "",
  props: {
    icon: String,
    iconPosition: {
      default: "left",
    },
  },
  render(h) {
    const icon = this.icon;
    const svgnode = {
      render(h) {
        return h(
          "svg",
          {
            class: {
              icon: true,
            },
          },
          [
            h("use", {
              attrs: {
                "xlink:href": `#i-${icon}`,
              },
            }),
          ]
        );
      },
    };

    return h(
      "button",
      {
        class: {
          "g-button": true,
        },
      },
      [
        icon && this.iconPosition === "left",
        this.$slots.default,
        icon && this.iconPosition === "right",
      ]
        .filter((ele) => ele)
        .map((p) => {
          if (typeof p === "boolean") {
            return h(svgnode);
          } else {
            return p;
          }
        })
    );
  },
};
</script>

<style lang="scss">
.g-button {
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
}
</style>
