<template>
  <div class="app-signout">
    <h1>로그아웃됨</h1>
    <h3>5초 후 로그인 페이지로 이동</h3>
    <Loading />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Loading from "@/components/Loading.vue";

setTimeout(() => {
  location.replace(`https://discord.com/api/oauth2/authorize?client_id=796432154258440242&redirect_uri=https%3A%2F%2Fbot.hyunwoo.dev%2F&response_type=token&scope=identify%20guilds`);
}, 5000);

@Component({ components: { Loading } })
export default class Signout extends Vue {}
</script>

<style lang="scss" scoped>
.app-signout {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  h1,
  h3 {
    margin-bottom: 20px;
  }
}
</style>
