<template>
  <div class="app-guild">
    <div class="app-guild__action">
      <div class="app-guild__reload" :class="{ 'app-guild__reload-disabled': reloadDelay, 'app-guild__reload-active': isReloading }" @click="reload">
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
    <Member />
    <Roles />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { Action, State } from "vuex-class";
import Member from "@/components/Member.vue";
import Roles from "@/components/Roles.vue";

@Component({ components: { Member, Roles } })
export default class Guild extends Vue {
  isReloading: boolean = false;
  reloadDelay: boolean = false;
  @State("guilds") guilds!: Guild;
  @State("guildIdx") guildIdx!: number;
  @Action("getGuild") getGuild!: Function;

  mounted() {
    if (this.$route.params.guild && !this.guilds[this.guildIdx]) return this.$router.replace("/");
  }

  async reload() {
    if (this.isReloading || this.reloadDelay) return;

    this.isReloading = this.reloadDelay = true;
    await this.getGuild();
    this.isReloading = false;
    setTimeout(() => (this.reloadDelay = false), 5000);
  }
}
</script>

<style lang="scss" scoped>
.app-guild {
  display: flex;
  flex-direction: column;

  .app-guild__action {
    display: flex;
    justify-content: flex-end;
    align-items: center;

    margin: 20px;

    .app-guild__reload {
      color: white;
      font-size: 17px;

      transition: 0.5s;

      cursor: pointer;

      .iconify {
        margin-left: 8px;

        transform: rotate(-40deg);
      }

      &.app-guild__reload-disabled {
        filter: opacity(0.5);

        cursor: not-allowed;
      }

      &.app-guild__reload-active {
        .iconify {
          animation: loading 0.6s linear infinite;
        }
      }
    }
  }
}
</style>
