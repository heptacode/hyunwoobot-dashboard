import axios from "axios";
import Vue from "vue";
import Vuex, { StoreOptions } from "vuex";
import $router from "../router";
import { Guild, User } from "../";

Vue.use(Vuex);

interface RootState {
  mainPath: string;
  token: string | null;
  isLoading: boolean;
  user: User | null;
  guilds: Guild[];
  guildIdx: number;
  roles: string[];
}
const store: StoreOptions<RootState> = {
  state: {
    mainPath: "https://bot.hyunwoo.dev/api/",
    token: "",
    isLoading: true,
    user: null,
    guilds: [],
    guildIdx: -1,
    roles: [],
  },
  mutations: {
    signout(state) {
      state.token = null;
      state.guilds = [];
      state.guildIdx = -1;
      localStorage.clear();

      location.replace(`https://discord.com/api/oauth2/authorize?client_id=796432154258440242&redirect_uri=https%3A%2F%2Fbot.hyunwoo.dev%2F&response_type=token&scope=identify%20guilds`);
    },
  },
  actions: {
    async init({ state, commit }) {
      try {
        state.token = localStorage.getItem("t") ? String(localStorage.getItem("t")) : null;

        const hash = $router.currentRoute.hash;
        location.hash = "";
        history.pushState("", document.title, window.location.pathname + window.location.search);

        if (hash && hash.length >= 90) {
          state.token = hash
            .slice(1)
            .split("&")[1]
            .split("=")[1];

          localStorage.setItem("t", state.token);
        }

        if (!state.token) return commit("signout");

        const payload: { user: User; guilds: Guild[] } = (await axios.post(`${state.mainPath}fetch`, { token: state.token })).data;
        state.user = payload.user;
        state.guilds = payload.guilds;

        if ($router.currentRoute.params.guild) state.guildIdx = state.guilds.findIndex((guild: Guild) => guild.id === $router.currentRoute.params.guild);
      } catch {
        return commit("signout");
      }
    },
    async getGuild({ state, commit }) {
      try {
        const payload = (await axios.post(`${state.mainPath}guild`, { guild: state.guilds[state.guildIdx].id, member: state.user!.id, token: state.token })).data;
        state.guilds[state.guildIdx].member = payload.member;
        state.guilds[state.guildIdx].userRoles = payload.userRoles;
        state.roles = state.guilds[state.guildIdx].member.roles;
      } catch (err) {
        return commit("signout");
      }
    },
    async updateRoles({ state, commit }) {
      try {
        await axios.put(`${state.mainPath}roles`, { guild: state.guilds[state.guildIdx].id, member: state.user!.id, roles: state.roles, token: state.token });
      } catch (err) {
        return commit("signout");
      }
    },
  },
  modules: {},
};

export default new Vuex.Store(store);
