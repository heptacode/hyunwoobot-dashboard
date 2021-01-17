<template>
  <div class="app-home">
    <Loading v-if="isLoading" />
    <h2 v-else-if="guilds.length <= 0">HyunwooBot과 함께하는 서버가 없어요.</h2>
    <h2 v-else>서버를 선택해주세요.</h2>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { Action, State } from "vuex-class";
import Loading from "@/components/Loading.vue";

@Component({ components: { Loading } })
export default class Home extends Vue {
  @State("isLoading") isLoading!: boolean;
  @State("guilds") guilds!: Guild[];
}
</script>

<style lang="scss" scoped>
.app-home {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
