<template>
  <div id="app"
       class="app-wrapper">
    <div class="colors-wrapper">
      <color-box v-for="color in colors"
                 :key="color.id"
                 :color="color" />
    </div>
    <div class="button-wrapper">
      <button :disabled="showMoreButton"
              class="button"
              @click="nextPage">
        More colors
      </button>
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
    totalPageCount: 1,
    currentPage: 1,
    colors: [],
  }),
  computed: {
    showMoreButton() {
      return this.currentPage >= this.totalPageCount;
    },
  },
  created() {
    this.getColors();
  },
  methods: {
    async getColors(page = 1) {
      const result = await api.colors(page);
      this.colors = result.data;
      this.page = result.page;
      this.totalPageCount = result.total_pages;
    },
    nextPage() {
      this.getColors((this.currentPage += 1));
    },
  },
};
</script>

<style lang="scss">
:root {
  --spacing-default: 1.2rem;
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
  background: #f6f6f6;
}

.app-wrapper {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: var(--spacing-default);
  height: 100%;
  width: 100%;
}

.colors-wrapper {
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  max-width: 720px;
  margin: 0 auto;
  grid-gap: var(--spacing-default);
  @media (min-width: 480px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (min-width: 720px) {
    grid-template-columns: repeat(4, 1fr);
  }
}

.button-wrapper {
  margin-top: calc(var(--spacing-default) * 2);
  display: flex;
}

.button {
  position: relative;
  border: none;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  vertical-align: middle;
  zoom: 1;
  overflow: visible;
  text-decoration: none;
  text-align: center;
  border-radius: 4px;
  height: 50px;
  line-height: 50px;
  padding: 0 2.2em;
  white-space: nowrap;
  touch-action: manipulation;
  transition: all 0.4s;
  font-size: 1.18rem;
  outline: none;
  border-radius: 25px;
  padding: 0 2.2em;
  background: hsla(228, 30%, 70%, 1);
  color: hsl(228, 26%, 20%);
}
</style>
