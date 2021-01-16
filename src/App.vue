<template>
  <div v-if="guilds && guilds.length" id="app">
    <nav class="app-server">
      <div class="app-server__item">
        <transition name="expand">
          <div v-if="guildHover === -1 || !$route.params.guild" class="app-server__item__indicator" :class="{ 'app-server__item__indicator__active': !$route.params.guild }"></div>
        </transition>
        <img
          class="app-server__item__icon app-server__item__icon__home"
          :class="{ 'app-server__item__icon__active': !$route.params.guild }"
          src="/img/icons/hyunwoo.png"
          width="48px"
          height="48px"
          alt="hyunwoo"
          draggable="false"
          @click="selectGuild(-1)"
          @mouseover="guildHover = -1"
          @mouseout="guildHover = -2"
        />
        <transition name="pop">
          <div v-if="guildHover === -1" class="app-server__item__tooltip">홈</div>
        </transition>
      </div>

      <div class="app-server__divider"></div>

      <div v-for="(i, idx) in guilds" :key="idx" class="app-server__item">
        <transition name="expand">
          <div v-if="guildHover === idx || i.id === $route.params.guild" class="app-server__item__indicator" :class="{ 'app-server__item__indicator__active': i.id === $route.params.guild }"></div>
        </transition>
        <img
          v-if="i.icon"
          class="app-server__item__icon"
          :class="{ 'app-server__item__icon__active': i.id === $route.params.guild }"
          width="48px"
          height="48px"
          :src="`https://cdn.discordapp.com/icons/${i.id}/${i.icon}.png?size=64`"
          :alt="i.name"
          draggable="false"
          @click="selectGuild(idx)"
          @mouseover="guildHover = idx"
          @mouseout="guildHover = -2"
        />
        <div v-else class="app-server__item__icon app-server__item__icon__empty" @click="selectGuild(idx)">{{ i.name }}</div>
        <transition name="pop">
          <div v-if="guildHover === idx" class="app-server__item__tooltip">{{ i.name }}</div>
        </transition>
      </div>
    </nav>
    <div class="app-content-wrapper">
      <nav class="app-appbar">
        <h1 class="app-appbar__title">{{ $route.params.guild && $route.params.guild === guilds[guildIdx].id ? guilds[guildIdx].name : "홈" }}</h1>
        <img
          class="app-appbar__avatar"
          width="40px"
          height="40px"
          :src="user.avatar ? `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png?size=64` : `/images/clyde.png`"
          :alt="user.username"
          draggable="false"
          @click="isActionVisible = !isActionVisible"
        />
        <transition name="slide">
          <div v-if="isActionVisible" class="app-appbar__action">
            <div>
              <span class="app-appbar__action__username">{{ user.username }}</span>
              <span class="app-appbar__action__discriminator">#{{ user.discriminator }}</span>
            </div>
            <md-button class="md-accent" @click="signout">로그아웃</md-button>
          </div>
        </transition>
      </nav>
      <section class="app-content" @click="closeAll">
        <transition name="fade">
          <router-view class="app-content__router" />
        </transition>
      </section>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { Action, Mutation, State } from "vuex-class";

@Component
export default class App extends Vue {
  isActionVisible: boolean = false;
  guildHover: number = -2;
  @State("user") user!: User;
  @State("guilds") guilds!: Guild[];
  @State("guildIdx") guildIdx!: number;
  @State("roles") roles!: Guild;
  @Mutation("signout") signout!: Function;
  @Action("init") init!: Function;
  @Action("getUserAssignableRoles") getUserAssignableRoles!: Function;

  mounted() {
    this.init();
  }

  selectGuild(idx: number) {
    if (idx === -1) {
      if (!this.$route.params.guild) return;

      this.$router.replace("/");
      this.$store.state.guildIdx = -1;
    } else {
      if (this.$route.params.guild === this.guilds[idx].id) return;

      this.$router.replace(`/guild/${this.guilds[idx].id}`);
      this.$store.state.guildIdx = idx;
      this.$store.state.roles = this.guilds[idx].roles;
    }
  }

  closeAll() {
    this.isActionVisible = false;
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

.pop-enter-active,
.pop-leave-active {
  transition: 0.15s cubic-bezier(0.86, 0, 0.07, 1);
}
.pop-enter,
.pop-leave-to {
  opacity: 0;
}

.expand-enter-active,
.expand-leave-active {
  position: absolute;
  left: 100px;
  height: 22px;
  transition: 0.5s;
}
.expand-enter,
.expand-leave-to {
  left: 100px;
  height: 0;
  opacity: 0;
  transition: 0.5;
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

.app-server {
  display: flex;
  flex-direction: column;
  align-items: center;

  padding: 12px 0;

  width: 76px;
  height: 100%;

  background-color: #202225;
  overflow: hidden scroll;

  .app-server__divider {
    width: 60%;
    border-bottom: 1px solid #444;
    margin-bottom: 12px;
  }

  .app-server__item {
    display: flex;
    justify-content: center;
    align-items: center;

    margin-bottom: 12px;

    .app-server__item__indicator {
      position: absolute;
      left: 0;

      width: 4px;
      height: 22px;

      background-color: white;
      border-radius: 0 4px 4px 0;

      transition: 0.2s;

      &.app-server__item__indicator__active {
        height: 40px;
      }
    }

    .app-server__item__icon {
      display: flex;
      justify-content: center;
      align-items: center;

      transition: 0.25s;

      border-radius: 20px;

      &.app-server__icon__empty {
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
      &.app-server__item__icon__active {
        border-radius: 14px;
      }

      &:active {
        position: relative;
        top: 1px;
      }

      &.app-server__item__icon__home {
        background-color: #a6bbd7;

        &:hover {
          background-color: #7788d4;
        }
      }
    }

    .app-server__item__tooltip {
      position: absolute;
      left: 75px;

      padding: 8px 15px;

      box-shadow: 2px 2px 5px rgba(#000, 0.3);

      border-radius: 8px;
      background-color: #18191c;

      font-size: 16px;
      font-weight: 900;

      z-index: 1;
    }
  }
}

.app-content-wrapper {
  width: 100%;
  height: 100%;

  .app-appbar {
    display: flex;
    justify-content: space-between;
    align-items: center;

    height: 52px;

    background-color: #35373a;

    border-bottom: 2px solid #2b2d31;

    .app-appbar__title {
      margin-left: 12px;
    }
    .app-appbar__avatar {
      margin-right: 12px;
      border-radius: 50%;

      width: 40px;
      height: 40px;

      cursor: pointer;
    }
    .app-appbar__action {
      display: flex;
      justify-content: center;
      align-items: center;

      position: fixed;
      top: 50px;
      right: 12px;

      padding-left: 18px;

      border-radius: 5px;
      background-color: #18191c;

      .app-appbar__action__username {
        font-weight: 700;
      }
      .app_appbar__action__discriminator {
        color: #72767d;
      }
    }
  }

  .app-content {
    width: 100%;
    height: 100%;
    overflow-y: hidden;

    .app-content__router {
      width: 100%;
      height: 100%;
      overflow: hidden auto;

      background-color: #37393e;
    }
  }
}
</style>
