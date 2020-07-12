<template>
  <div :span="span" class="col" :offset="offset" :style="colStyle">
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
  },
};
</script>

<style scoped lang="scss">
.col {
  height: 100px;
  width: 100%;
  // background-color: salmon;
  border: 1px solid green;

  @for $i from 1 through 24 {
    &[span="#{$i}"] {
      width: ($i / 24) * 100%;
    }
    &[offset="#{$i}"] {
      margin-left: ($i / 24) * 100%;
    }
  }
}
</style>
