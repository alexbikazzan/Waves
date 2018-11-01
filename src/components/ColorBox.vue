<template>
  <div class="color-box"
       :style="styleObject">
    {{ colorName }}
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
    colorName() {
      return this.color.name.charAt(0).toUpperCase() + this.color.name.slice(1);
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
  height: 150px;
  min-width: 150px;
  font-size: 1.4em;
  font-weight: 500;
}

.subtitle {
  font-size: 0.7em;
  opacity: 0.7;
  margin-top: 0.3em;
}
</style>
