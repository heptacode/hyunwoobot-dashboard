import axios from "axios";
import Vue from "vue";
import Vuex, { StoreOptions } from "vuex";
import $router from "../router";
import { Guild, User } from "../";

Vue.use(Vuex);

interface RootState {
  mainPath: string;
  token: string;
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
      state.guilds = [];
      state.guildIdx = -1;
      localStorage.clear();

      if ($router.currentRoute.path === "/") location.replace("/");
      else $router.replace("/");
    },
  },
  actions: {
    async init({ state }) {
      try {
        state.token = String(localStorage.getItem("t"));
        state.user = JSON.parse(String(localStorage.getItem("u")));
        state.guilds = JSON.parse(String(localStorage.getItem("g")));

        const hash = $router.currentRoute.hash;
        location.hash = "";
        history.pushState("", document.title, window.location.pathname + window.location.search);

        if (hash && hash.length >= 90) {
          state.token = hash
            .slice(1)
            .split("&")[1]
            .split("=")[1];

          const payload: { user: User; guilds: Guild[] } = (await axios.post(`${state.mainPath}fetch`, { token: state.token })).data;

          state.user = payload.user;
          state.guilds = payload.guilds;
          localStorage.setItem("t", state.token);
          localStorage.setItem("u", JSON.stringify(payload.user));
          localStorage.setItem("g", JSON.stringify(payload.guilds));
        }

        if (!state.token || !state.user || !state.guilds)
          return location.replace(`https://discord.com/api/oauth2/authorize?client_id=796432154258440242&redirect_uri=https%3A%2F%2Fbot.hyunwoo.dev%2F&response_type=token&scope=identify%20guilds`);
        else if ($router.currentRoute.params.guild) state.guildIdx = state.guilds.findIndex((guild: Guild) => guild.id === $router.currentRoute.params.guild);
      } catch (err) {
        console.error(err);
      }
    },
    async getGuild({ state }) {
      try {
        const payload = (await axios.post(`${state.mainPath}guild`, { guild: state.guilds[state.guildIdx].id, member: state.user!.id, token: state.token })).data;
        state.guilds[state.guildIdx].member = payload.member;
        state.guilds[state.guildIdx].userRoles = payload.userRoles;
        state.roles = state.guilds[state.guildIdx].member.roles;
      } catch (err) {
        console.error(err);
      }
    },
    async updateRoles({ state }) {
      try {
        await axios.put(`${state.mainPath}roles`, { guild: state.guilds[state.guildIdx].id, member: state.user!.id, roles: state.roles, token: state.token });
      } catch (err) {
        console.error(err);
      }
    },
  },
  modules: {},
};

export default new Vuex.Store(store);
