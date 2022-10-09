<template>
  <input
    :value="modelValue"
    :placeholder="placeholder"
    @input="updateInput"
    class="input"
    type="text"
  />
</template>

<script>
export default {
  name: "my-input",
  props: {
    modelValue: [String, Number],
    placeholder: {
      type: String,
      default: "Поиск",
    },
  },
  methods: {
    updateInput(event) {
      this.$emit("update:modelValue", event.target.value);
    },
  },
};
</script>

<style scoped>
.input {
  width: 100%;
  border: 1px solid teal;
  padding: 10px 15px;
  outline: none;
}
</style>
