<template>
  <div class="app-member">
    <img
      class="app-member__avatar"
      width="40px"
      height="40px"
      :src="user.avatar ? `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png?size=64` : `/img/icons/clyde.png`"
      :alt="user.username"
      draggable="false"
    />
    <div>
      <div class="app-member__name" :style="guilds[guildIdx].member.displayHexColor !== '#000000' ? `color: ${guilds[guildIdx].member.displayHexColor}` : ''">
        {{ guilds[guildIdx].member.displayName }}
      </div>
      <div class="app-member__activity" v-for="(i, idx) in this.guilds[this.guildIdx].member.presence.activities" :key="idx">{{ i.name }} {{ getActivityType(i.type) }}</div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { Action, State } from "vuex-class";
import { Guild, User } from "../";

const activityTypes: { [key: string]: string } = {
  PLAYING: "하는 중",
  STREAMING: "방송 중",
  LISTENING: "듣는 중",
  WATCHING: "시청 중",
  CUSTOM_STATUS: "사용자 정의 상태",
  COMPETING: "경쟁 중",
};

@Component
export default class Member extends Vue {
  @State("user") user!: User;
  @State("guilds") guilds!: Guild;
  @State("guildIdx") guildIdx!: number;

  getActivityType(type) {
    return activityTypes[type];
  }
}
</script>

<style lang="scss" scoped>
.app-member {
  display: flex;
  justify-content: center;
  align-items: center;

  font-weight: bold;

  .app-member__avatar {
    margin-right: 12px;
    border-radius: 50%;

    width: 32px;
    height: 32px;

    cursor: pointer;
  }

  .app-member__name {
    font-size: 1rem;
  }

  .app-member__activity {
    font-size: 0.85rem;
  }
}
</style>
