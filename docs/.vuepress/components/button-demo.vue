<template>
  <div>
    <g-button>Default Button</g-button>
    <g-button icon="settings">Default Button</g-button>
    <g-button :loading="true">Default Button</g-button>
  </div>
</template>

<script>
import Button from "../../../src/Button/Button.vue";
export default {
  components: {
    "g-button": Button,
  },
};
</script>

<style></style>
