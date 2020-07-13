<template>
  <div
    :span="span"
    class="col"
    :offset="offset"
    :style="colStyle"
    :class="colClass"
  >
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "Col",
  props: {
    span: {
      type: String | Number,
    },
    offset: {
      type: String | Number,
    },
    xs: {
      type: String | Number,
    },
    sm: {
      type: String | Number,
    },
    md: {
      type: String | Number,
    },
    lg: {
      type: String | Number,
    },
    xl: {
      type: String | Number,
    },
  },
  data() {
    return {
      gutter: 0,
    };
  },
  computed: {
    colStyle() {
      return {
        paddingLeft: this.gutter / 2 + "px",
        paddingRight: this.gutter / 2 + "px",
      };
    },
    colClass() {
      let { xs, sm, md, lg, xl } = this;
      return [
        xs && `col-xs-${xs}`,
        sm && `col-sm-${sm}`,
        md && `col-md-${md}`,
        lg && `col-lg-${lg}`,
        xl && `col-xl-${xl}`,
      ];
    },
  },
};
</script>

<style scoped lang="scss">
@import "./responsive.scss";

.col {
  width: 100%;
}

@include set-respond-max-width-or-span-or-offset(span, width);
@include set-respond-max-width-or-span-or-offset(offset, margin-left);
@include set-respond-max-width-or-span-or-offset(xl, width);
@include set-respond-max-width-or-span-or-offset(lg, width);
@include set-respond-max-width-or-span-or-offset(md, width);
@include set-respond-max-width-or-span-or-offset(sm, width);
@include set-respond-max-width-or-span-or-offset(xs, width);
</style>
