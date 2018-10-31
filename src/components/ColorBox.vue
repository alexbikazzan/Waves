<template>
  <div class="color-box"
       :style="styleObject">
    {{ color.name }}
    <div class="subtitle">
      {{ color.year }}
    </div>
  </div>
</template>

<script>
import helpers from '../services/ColorHelpers';

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
        color: this.calculateTextColor(this.color.color),
      };
    },
  },
  methods: {
    calculateTextColor(hexColor) {
      const threshold = 120;
      const { r, g, b } = helpers.hexToRgb(hexColor);
      const brightness = helpers.getBrightness(r, g, b);

      return brightness > threshold ? this.getDarkTextColor(r, g, b) : '#fff';
    },
    getDarkTextColor(r, g, b) {
      const { h, s } = helpers.rgbToHsl(r, g, b);
      return `hsl(${Math.round(h * 360)},${Math.round(s * 100)}%, 20%)`;
    },
  },
};
</script>

<style scoped lang="scss">
.color-box {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 5px;
  color: #000;
  height: 200px;
  width: 200px;
  font-size: 1.2em;
  font-weight: 700;
}

.subtitle {
  font-size: 0.7em;
  opacity: 0.7;
  margin-top: 0.3em;
}
</style>
