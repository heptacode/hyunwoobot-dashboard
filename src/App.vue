<template>
  <div v-if="$store.state.guilds.length" id="app">
    <nav class="servers">
      <div class="server-item">
        <div v-if="guildHover === 'home' || !$route.params.guild" class="indicator" :class="{ active: !$route.params.guild }"></div>
        <img class="icon home" src="/images/hyunwoo.png" width="48px" height="48px" alt="hyunwoo" draggable="false" @click="home" @mouseover="guildHover = 'home'" @mouseout="guildHover = ''" />
        <md-tooltip md-direction="right">홈</md-tooltip>
      </div>
      <div class="server-divider"></div>
      <div v-for="(i, idx) in $store.state.guilds" :key="idx" class="server-item">
        <div v-if="guildHover === i.id || i.id === $route.params.guild" class="indicator" :class="{ active: i.id === $route.params.guild }"></div>
        <img
          v-if="i.icon"
          class="icon"
          :class="{ active: i.id === $route.params.guild }"
          width="48px"
          height="48px"
          :src="`https://cdn.discordapp.com/icons/${i.id}/${i.icon}.png?size=64`"
          :alt="i.name"
          draggable="false"
          @click="selectGuild(i.id)"
          @mouseover="guildHover = i.id"
          @mouseout="guildHover = ''"
        />
        <div v-else class="icon empty" @click="selectGuild(i.id)">{{ i.name }}</div>
        <md-tooltip md-direction="right">{{ i.name }}</md-tooltip>
      </div>
    </nav>
    <div class="content-wrapper">
      <nav class="appbar">
        <h1 class="title">{{ $store.state.guild.id === $route.params.guild ? $store.state.guild.name : "홈" }}</h1>
        <img
          class="avatar"
          width="40px"
          height="40px"
          :src="$store.state.user.avatar ? `https://cdn.discordapp.com/avatars/${$store.state.user.id}/${$store.state.user.avatar}.png?size=64` : `/images/clyde.png`"
          :alt="$store.state.user.username"
          draggable="false"
          @click="isActionVisible = !isActionVisible"
        />
        <transition name="slide">
          <div v-if="isActionVisible" class="action">
            <div>
              <span class="username">{{ $store.state.user.username }}</span>
              <span class="discriminator">#{{ $store.state.user.discriminator }}</span>
            </div>
            <md-button class="md-accent" @click="signout">로그아웃</md-button>
          </div>
        </transition>
      </nav>
      <router-view class="content" />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import axios from "axios";

@Component
export default class App extends Vue {
  isActionVisible: boolean = false;
  guildHover: string = "";

  async mounted() {
    const payload = JSON.parse(String(localStorage.getItem("hyunwoobot")));
    this.$store.state.user = payload.user;
    this.$store.state.guilds = payload.guilds;

    const hash = location.hash;
    if (hash) {
      location.hash = "";
      if (hash && hash.length >= 90) {
        const access_token = hash
          .slice(1)
          .split("&")[1]
          .split("=")[1];

        const data = (await axios.post("/api", { access_token: access_token })).data;

        console.log(data);
        this.$store.state.guilds = data;
        localStorage.setItem("hyunwoobot", JSON.stringify(data));

        // location.replace("/");
      }
    }

    if (!this.$store.state.guilds)
      return location.replace(`https://discord.com/api/oauth2/authorize?client_id=796432154258440242&redirect_uri=http%3A%2F%2Flocalhost%3A8080%2F&response_type=token&scope=identify%20guilds`);
  }

  home() {
    if (!this.$route.params.guild) return;
    this.$router.replace("/");
    this.$store.state.guild = {};
  }
  selectGuild(id: string) {
    if (this.$route.params.guild === id) return;

    this.$router.replace(`/guild/${id}`);
    this.$store.state.guild = this.$store.state.guilds.find((guild) => guild.id === id);
  }

  signout() {
    this.$store.state.guilds = [];
    this.$store.state.guild = {};
    localStorage.clear();
  }
}
</script>

<style lang="scss">
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

::-webkit-scrollbar {
  width: 0;
  height: 0;
}

.slide-enter-active,
.slide-leave-active {
  position: fixed;
  top: 0;
  transition: 0.3s;
}
.slide-enter,
.slide-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}

body {
  height: 100%;
}

#app {
  display: flex;
  height: 100%;

  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  word-break: keep-all;

  user-select: none;
  overflow: hidden;
}

.servers {
  display: flex;
  flex-direction: column;
  align-items: center;

  padding: 12px 0;

  width: 76px;
  height: 100%;

  background-color: #202225;
  overflow: hidden scroll;

  .server-divider {
    width: 60%;
    border-bottom: 1px solid #444;
    margin-bottom: 12px;
  }

  .server-item {
    display: flex;
    justify-content: center;
    align-items: center;

    margin-bottom: 12px;

    .indicator {
      position: absolute;
      left: 0;

      width: 4px;
      height: 22px;

      background-color: white;
      border-radius: 0 4px 4px 0;

      transition: 0.2s;

      &.active {
        height: 40px;
      }
    }

    .icon {
      display: flex;
      justify-content: center;
      align-items: center;

      transition: 0.25s;

      border-radius: 20px;

      &.empty {
        width: 48px;
        height: 48px;

        font-size: 12px;

        white-space: nowrap;
        text-overflow: ellipsis;

        overflow: hidden;

        background-color: #37393e;

        &:hover {
          background-color: #7788d4;
        }
      }
      cursor: pointer;

      &:hover,
      &.active {
        border-radius: 14px;
      }

      &:active {
        position: relative;
        top: 1px;
      }

      &.home {
        background-color: #a6bbd7;

        &:hover {
          background-color: #7788d4;
        }
      }
    }
  }
}

.content-wrapper {
  width: 100%;
  height: 100%;

  .appbar {
    display: flex;
    justify-content: space-between;
    align-items: center;

    height: 52px;

    background-color: #35373a;

    border-bottom: 2px solid #2b2d31;

    .title {
      margin-left: 12px;
    }
    .avatar {
      margin-right: 12px;
      border-radius: 50%;

      width: 40px;
      height: 40px;

      cursor: pointer;
    }
    .action {
      display: flex;
      justify-content: center;
      align-items: center;

      position: fixed;
      top: 50px;
      right: 12px;

      padding-left: 18px;

      border-radius: 5px;
      background-color: #18191c;

      .username {
        font-weight: 700;
      }
      .discriminator {
        color: #72767d;
      }
    }
  }

  .content {
    height: 100%;
    overflow-y: scroll;
  }
}
</style>
