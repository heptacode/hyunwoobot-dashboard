<template>
  <div class="app-roles">
    <div class="app-roles__title">
      <h1>역할</h1>
      <div class="app-roles__action">
        <div class="app-roles__reload" :class="{ 'app-roles__reload-disabled': reloadDelay, 'app-roles__reload-active': isReloading }" @click="reload">
          <div v-if="!isReloading">
            <b>업데이트됨</b>
            <i class="iconify" data-icon="mdi:reload"></i>
          </div>
          <div v-else>
            <b>로드 중</b>
            <i class="iconify" data-icon="mdi:loading"></i>
          </div>
        </div>
      </div>
    </div>
    <md-checkbox v-for="(i, idx) in guilds[guildIdx].userRoles" :key="idx" v-model="roles" :value="i.id" class="app-roles__checkbox md-primary" @change="onRoleUpdate">
      <h4 :style="i.color ? `color: ${i.color}` : ''">{{ i.name }}</h4>
    </md-checkbox>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import { Action, State } from "vuex-class";

@Component
export default class Roles extends Vue {
  isReloading: boolean = false;
  reloadDelay: boolean = false;
  roles: Role[] = [];
  timeout: number = -1;
  @State("guilds") guilds!: Guild;
  @State("guildIdx") guildIdx!: number;
  @Action("getRoles") getRoles!: Function;
  @Action("updateRoles") updateRoles!: Function;

  @Watch("$route")
  onRouteUpdate() {
    this.roles = this.guilds[this.guildIdx].roles;
  }

  mounted() {
    if (!this.guilds[this.guildIdx].userRoles) return this.$router.replace("/");
    this.roles = this.guilds[this.guildIdx].roles;
  }

  onRoleUpdate() {
    if (this.timeout) clearTimeout(this.timeout);
    this.timeout = setTimeout(() => this.updateRoles(this.roles), 1000);
  }

  async reload() {
    if (this.isReloading || this.reloadDelay) return;

    this.isReloading = this.reloadDelay = true;
    await this.getRoles();
    this.roles = this.guilds[this.guildIdx].roles;
    this.isReloading = false;
    setTimeout(() => (this.reloadDelay = false), 5000);
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

    .app-roles__action {
      display: flex;
      align-items: center;

      .app-roles__reload {
        color: white;
        font-size: 17px;

        transition: 0.5s;

        cursor: pointer;

        .iconify {
          margin-left: 8px;

          transform: rotate(-40deg);
        }

        &.app-roles__reload-disabled {
          filter: opacity(0.5);

          cursor: not-allowed;
        }

        &.app-roles__reload-active {
          .iconify {
            animation: loading 0.6s linear infinite;
          }
        }
      }
    }
  }

  .app-roles__checkbox {
    margin: 10px 0;
  }
}
</style>
