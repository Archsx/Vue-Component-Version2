<template>
  <div class="tabs-pane" :class="classes" v-if="active">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "TabsPane",
  props: {
    name: {
      required: true,
      type: String | Number,
    },
  },
  data() {
    return {
      active: false,
    };
  },
  computed: {
    classes(){
      return {
        active:this.active
      }
    }
  },
  inject: ["eventBus"],
  created() {
    this.eventBus.$on("update:selected", (name) => {
      this.active = name === this.name;
    });
  },
};
</script>

<style lang="scss" scoped>
  .tabs-pane{
    &.active{
    }
  }


</style>
