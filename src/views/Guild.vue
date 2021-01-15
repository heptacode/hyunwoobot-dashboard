<template>
  <div class="guild">
    <Roles />
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import Roles from "@/components/Roles.vue";

@Component({ components: { Roles } })
export default class Guild extends Vue {}
</script>

<style lang="scss" scoped>
.guild {
  display: flex;
  flex-direction: column;
}
</style>
