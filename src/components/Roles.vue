<template>
  <div class="app-roles">
    <h1 class="app-roles__title">역할</h1>
    <md-checkbox v-for="(i, idx) in guilds[guildIdx].userAssignableRoles" :key="idx" v-model="$store.state.roles" :value="i.id" class="app-roles__checkbox md-primary" @change="onRoleUpdate">
      <h4 :style="`color: ${i.color}`">{{ i.name }}</h4>
    </md-checkbox>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import { Action, State } from "vuex-class";

@Component
export default class Roles extends Vue {
  timeout: number = -1;
  @State("guilds") guilds!: Guild;
  @State("guildIdx") guildIdx!: number;
  @Action("updateRoles") updateRoles!: Function;

  mounted() {
    if (!this.guilds[this.guildIdx].userAssignableRoles) return this.$router.replace("/");
  }

  onRoleUpdate() {
    if (this.timeout) clearTimeout(this.timeout);
    this.timeout = setTimeout(() => this.updateRoles(), 1000);
  }
}
</script>

<style lang="scss" scoped>
.app-roles {
  display: flex;
  flex-direction: column;

  padding: 30px;

  .app-roles__title {
    margin-bottom: 10px;
  }

  .app-roles__checkbox {
    margin: 10px 0;
  }
}
</style>
