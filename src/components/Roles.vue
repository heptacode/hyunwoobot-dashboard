<template>
  <div class="app-roles">
    <div class="app-roles__title">
      <h1>역할</h1>
    </div>
    <md-checkbox v-for="(i, idx) in guilds[guildIdx].userRoles" :key="idx" v-model="$store.state.roles" :value="i.id" class="app-roles__checkbox md-primary" @change="onRoleUpdate">
      <h4 :style="i.color ? `color: ${i.color}` : ''">{{ i.name }}</h4>
    </md-checkbox>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import { Action, State } from "vuex-class";
import { Guild } from "../";

@Component
export default class Roles extends Vue {
  timeout: number = -1;
  @State("guilds") guilds!: Guild;
  @State("guildIdx") guildIdx!: number;
  @Action("updateRoles") updateRoles!: Function;

  @Watch("$route")
  onRouteUpdate() {
    this.$store.state.roles = this.guilds[this.guildIdx].member.roles;
  }

  mounted() {
    this.$store.state.roles = this.guilds[this.guildIdx].member.roles;
  }

  onRoleUpdate() {
    if (this.timeout) clearTimeout(this.timeout);
    this.timeout = window.setTimeout(() => this.updateRoles(), 3000);
  }
}
</script>

<style lang="scss" scoped>
@keyframes loading {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
.app-roles {
  display: flex;
  flex-direction: column;

  margin: 30px 30px 120px 30px;

  .app-roles__title {
    display: flex;
    justify-content: space-between;
    align-items: center;

    margin-bottom: 10px;
  }

  .app-roles__checkbox {
    margin: 10px 0;
  }
}
</style>
