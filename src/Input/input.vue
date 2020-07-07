<template>
  <div class="wrapper" :class="{ error: error }">
    <input
      :value="value"
      type="text"
      :disabled="disabled"
      :readonly="readonly"
    />
    <template v-if="error">
      <icon name="error" class="iconError"></icon>
      <span class="errorMessage">{{ error }}</span>
    </template>
  </div>
</template>

<script>
import Icon from "../Button/Icon";
export default {
  name: "custom-input",
  components: {
    Icon,
  },
  props: {
    value: {
      type: String,
      default: "Hello World",
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    readonly: {
      type: Boolean,
      default: false,
    },
    error: {
      type: String,
    },
  },
};
</script>

<style lang="scss" scoped>
$height: 32px;
$border-color: #d9d9d9;
$border-color-hover: #40a9ff;
$border-color-disabled: #e4e7ed;
$color-disabled: #c0c4cc;
$border-radius: 4px;
$border-padding: 4px 11px;
$error-color: #e74c3c;
// $box-shadow-color:rgba(0,0,0,0.5); 太丑了 没用
.wrapper {
  font-size: 14px;
  display: inline-flex;
  align-items: center;
  > :not(:last-child){
    margin-right: .5em;
  }
  &.error {
    > input {
      border-color: $error-color;
    }
    .iconError {
      fill: $error-color;
    }
    .errorMessage{
      color: $error-color;
    }
  }
  > input {
    height: $height;
    border: 1px solid $border-color;
    border-radius: $border-radius;
    padding: $border-padding;
    font-size: inherit;
    line-height: 1.5;
    transition: all 0.3s;
    color: rgba(0, 0, 0, 0.65);
    &:hover {
      border-color: $border-color-hover;
    }
    &:focus {
      box-shadow: 0 0 0 2px rgba(24, 144, 255, 0.2);
      border-color: $border-color-hover;
      outline: none;
    }
    &[disabled],
    &:read-only {
      border-color: $border-color-disabled;
      color: $color-disabled;
      cursor: not-allowed;
    }
  }
}
</style>
