<template>
  <component
    :is="tag"
    :type="nativeType"
    :disabled="disabled || loading"
    class="btn"
    :class="[
      { 'btn-round': round },
      { 'btn-block': block },
      { 'btn-just-icon': icon },
      { [`btn-${type}`]: type && !outline },
      { [`btn-outline-${type}`]: type && outline },
      { [`btn-${size}`]: size },
      { 'btn-link': simple },
    ]"
  >
    <slot name="loading">
      <i v-if="loading" class="fa fa-spinner fa-spin"></i>
    </slot>
    <slot></slot>
  </component>
</template>
<script>
export default {
  name: "p-button",
  props: {
    tag: {
      type: String,
      default: "button",
    },
    round: Boolean,
    icon: Boolean,
    outline: Boolean,
    block: Boolean,
    loading: Boolean,
    disabled: Boolean,
    type: {
      type: String,
      default: "default",
    },
    nativeType: {
      type: String,
      default: "button",
    },
    size: {
      type: String,
      default: "",
    },
    simple: Boolean,
  },
};
</script>

<style scoped lang="scss">
.btn-primary {
  background: #2d9cdb;
  border: 0.0625rem solid #2d9cdb;
  font-weight: 500;
  font-size: 0.75rem;
  line-height: 1.125rem;
  letter-spacing: 0.1em;

  &:hover {
    background: #247daf;
    border: 0.0625rem solid #247daf;
  }

  &:focus {
    background: #2d9cdb;
    border: 0.0625rem solid #2d9cdb;
  }

  &:not(:disabled):active {
    background: #1b5e83 !important;
    border: 0.0625rem solid #1b5e83 !important;
    outline-color: #1b5e83 !important;
  }

  &:disabled {
    background: #81c4e9 !important;
    border: 0.0625rem solid #81c4e9 !important;
  }
}
</style>
