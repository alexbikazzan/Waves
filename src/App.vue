<template>
  <div id="app"
       class="app-wrapper">
    <header class="page-header">
      <h1 class="page-title">Colors of the year</h1>
      <h2 class="page-subtitle">{{ yearsText }}</h2>
    </header>
    <div class="colors-wrapper">
      <color-box v-for="color in colors"
                 :key="color.id"
                 :color="color"
                 class="color-box" />
    </div>
    <div class="button-wrapper">
      <button :class="{'show-back': isLastPage}"
              class="button"
              @click="showMore">
        <span v-if="!isLastPage">
          More colors
        </span>
        <svg v-else
             xmlns="http://www.w3.org/2000/svg"
             class="back-icon"
             fill="currentColor"
             viewBox="0 0 492 492">
          <path d="M27.7 284.6l-.8-.2h329.2L252.6 388.1c-5.1 5.1-7.8 11.9-7.8 19.1 0 7.2 2.8 14 7.8 19.1l16.1 16.1c5.1 5.1 11.8 7.9 19 7.9 7.2 0 14-2.8 19-7.8l177.4-177.4c5.1-5.1 7.9-11.9 7.8-19.1 0-7.2-2.8-14-7.8-19.1L306.7 49.5c-5.1-5.1-11.8-7.8-19-7.8-7.2 0-13.9 2.8-19 7.8l-16.1 16.1c-5.1 5.1-7.8 11.8-7.8 19 0 7.2 2.8 13.6 7.8 18.7l104.7 104.3h-330C12.5 207.6 0 220.4 0 235.2V258c0 14.8 12.8 26.6 27.7 26.6z" /></svg>
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
    isLastPage() {
      return this.currentPage >= this.totalPageCount;
    },
    yearsText() {
      if (this.colors.length) {
        return `${this.colors[0].year} - ${
          this.colors[this.colors.length - 1].year
        }`;
      }
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
    showMore() {
      if (!this.isLastPage) {
        this.getColors((this.currentPage += 1));
      } else {
        this.getColors((this.currentPage -= 1));
      }
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
  font-family: 'Bangers', cursive;
  background: #fff;
}

.page-header {
  margin-bottom: calc(var(--spacing-default) * 4);
}

.page-title {
  color: #454c61;
  font-size: 2.4em;
}

.page-subtitle {
  color: #454c61;
  opacity: 0.7;
  font-size: 2em;
}

.app-wrapper {
  padding: calc(var(--spacing-default) * 2);
  height: 100%;
  width: 100%;
  text-align: center;
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

@keyframes grow {
  from {
    opacity: 0;
    transform: scale(0.2);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

.color-box {
  animation: grow 0.6s ease;
  animation-fill-mode: forwards;
  opacity: 0;
}

@for $i from 1 to 9 {
  .color-box:nth-child(#{$i}) {
    animation-delay: $i * 0.05s;
  }
}

.button-wrapper {
  margin-top: calc(var(--spacing-default) * 4);
  display: flex;
  justify-content: center;
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
  background: #dadada;
  color: #4a4a4a;
  cursor: pointer;
  animation: grow 0.6s ease;
  animation-delay: 0.8s;
  animation-fill-mode: forwards;
  opacity: 0;
  &.show-back {
    padding: 0 1.4em;
  }
  &:hover {
    background: #4d69d8;
    color: #fff;
  }
}

.back-icon {
  display: inline-flex;
  fill: currentColor;
  width: 20px;
  transform: rotate(180deg);
}
</style>
