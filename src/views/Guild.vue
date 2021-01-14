<template>
  <div class="guild">
    <h1>역할</h1>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class Guild extends Vue {
  async mounted() {}
}
</script>

<style lang="scss" scoped>
.guild {
  display: flex;

  background-color: #37393e;
}
</style>
