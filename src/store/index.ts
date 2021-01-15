import axios from "axios";
import Vue from "vue";
import Vuex, { StoreOptions } from "vuex";
import $router from "@/router";
import { firestore } from "@/firebase";

Vue.use(Vuex);

interface RootState {
  proxy: string;
  user: User | null;
  guilds: Guild[];
  guildIdx: number;
  roles: Role[];
}
const store: StoreOptions<RootState> = {
  state: {
    proxy: "https://bot.hyunwoo.dev/api/",
    user: null,
    guilds: [],
    guildIdx: -1,
    roles: [],
  },
  mutations: {
    signout(state) {
      state.guilds = [];
      state.guildIdx = -1;
      localStorage.clear();

      $router.replace("/");
    },
  },
  actions: {
    async init({ state, dispatch }) {
      try {
        state.user = JSON.parse(String(localStorage.getItem("hyunwoobot.user")));
        state.guilds = JSON.parse(String(localStorage.getItem("hyunwoobot.guilds")));

        const hash = location.hash;
        if (hash) {
          location.hash = "";
          if (hash && hash.length >= 90) {
            const access_token = hash
              .slice(1)
              .split("&")[1]
              .split("=")[1];

            const payload = (await axios.get(state.proxy, { headers: { access_token: access_token } })).data;

            state.user = payload.user;
            state.guilds = payload.guilds;
            localStorage.setItem("hyunwoobot.user", JSON.stringify(payload.user));
            localStorage.setItem("hyunwoobot.guilds", JSON.stringify(payload.guilds));

            $router.replace("/");
          }
        }

        if (!state.user || !state.guilds)
          return location.replace(`https://discord.com/api/oauth2/authorize?client_id=796432154258440242&redirect_uri=https%3A%2F%2Fbot.hyunwoo.dev%2F&response_type=token&scope=identify%20guilds`);
        else if ($router.currentRoute.params.guild) state.guildIdx = state.guilds.findIndex((guild: Guild) => guild.id === $router.currentRoute.params.guild);

        for (let i = 0; i < state.guilds.length; i++) {
          state.guilds[i].userAssignableRoles = (
            await firestore
              .collection(state.guilds[i].id)
              .doc("config")
              .get()
          ).data()!.userRoles;

          state.guilds[i].roles = (await axios.get(`${state.proxy}guild/${state.guilds[i].id}/member/${state.user.id}/roles`)).data;
        }
      } catch (err) {
        console.error(err);
      }
    },
    async updateRoles({ state }) {
      try {
        state.guilds[state.guildIdx].roles = (await axios.patch(`${state.proxy}guild/${state.guilds[state.guildIdx].id}/member/${state.user!.id}/roles`, { roles: state.roles })).data;
      } catch (err) {
        console.error(err);
      }
    },
  },
  modules: {},
};

export default new Vuex.Store(store);
