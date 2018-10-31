<template>
  <div id="app"
       class="app-wrapper">
    <div class="colors-wrapper">
      <color-box v-for="color in colors"
                 :key="color.id"
                 :color="color" />
    </div>
  </div>
</template>

<script>
import api from './services/ApiService';
import ColorBox from './components/ColorBox';

export default {
  name: 'App',
  components: {
    ColorBox,
  },
  data: () => ({
    pageCount: 1,
    colors: [],
  }),
  created() {
    this.getColors();
  },
  methods: {
    async getColors() {
      const result = await api.colors();
      this.colors = result.data;
      this.pageCount = result.total_pages;
    },
  },
};
</script>

<style lang="scss">
:root {
  --default-spacing: 1.2rem;
}

* {
  box-sizing: border-box;
  -webkit-overflow-scrolling: touch;
}

html,
body {
  -webkit-font-smoothing: antialiased;
  position: relative;
  margin: 0;
  padding: 0;
  height: 100%;
}

html {
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  font-size: 100%;
  -ms-overflow-style: -ms-autohiding-scrollbar;
  /* Edge 12+, Internet Explorer 11- */
  touch-action: manipulation;
}

body {
  font-family: 'Fjalla One', sans-serif;
}

.app-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: var(--default-spacing);
  height: 100%;
  width: 100%;
}

.colors-wrapper {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  max-width: 720px;
  margin: auto;
  grid-gap: var(--default-spacing);
}
</style>
