<template>
  <div class="app-guild">
    <Roles v-if="guilds[guildIdx].userAssignableRoles.length" />
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import { State } from "vuex-class";
import Roles from "@/components/Roles.vue";

@Component({ components: { Roles } })
export default class Guild extends Vue {
  @State("guilds") guilds!: Guild;
  @State("guildIdx") guildIdx!: number;
}
</script>

<style lang="scss" scoped>
.app-guild {
  display: flex;
  flex-direction: column;
}
</style>
