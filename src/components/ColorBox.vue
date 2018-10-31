<template>
  <div class="color-box"
       :style="styleObject">
    {{ color.name }}
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    color: {
      type: Object,
      required: true,
    },
  },
  computed: {
    styleObject() {
      return {
        background: this.color.color,
      };
    },
  },
};
</script>

<style scoped lang="scss">
.color-box {
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 5px;
  color: #000;
  height: 200px;
  width: 200px;
  font-size: 1.2em;
  font-weight: 700;
}
</style>
