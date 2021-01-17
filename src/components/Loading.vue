<template>
  <div class="app-loading">
    <svg class="app-loading__circular" viewBox="25 25 50 50">
      <circle class="app-loading__circular__path" cx="50" cy="50" r="20" fill="none" stroke-width="2" stroke-miterlimit="10" />
    </svg>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
@Component
export default class Loading extends Vue {}
</script>
<style>
@keyframes rotate {
  100% {
    transform: rotate(360deg);
  }
}
@keyframes dash {
  0% {
    stroke-dasharray: 1, 200;
    stroke-dashoffset: 0;
  }
  50% {
    stroke-dasharray: 89, 200;
    stroke-dashoffset: -35px;
  }
  100% {
    stroke-dasharray: 89, 200;
    stroke-dashoffset: -124px;
  }
}
.app-loading {
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  margin: 5px 0;
}
.app-loading__circular {
  width: 30px;
  height: 30px;
  animation: rotate 2s linear infinite;
  transform-origin: center center;
}
.app-loading__circular__path {
  stroke: white;
  stroke-width: 6px;
  stroke-dasharray: 1, 200;
  stroke-dashoffset: 0;
  stroke-linecap: round;
  animation: dash 1.5s ease-in-out infinite;
}
</style>
