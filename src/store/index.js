// store.js

import { createStore } from "vuex";

const store = createStore({
  state: {
    user: JSON.parse(localStorage.getItem("user")) || null,
    accounts: JSON.parse(localStorage.getItem("accounts")) || [],
    loans: JSON.parse(localStorage.getItem("loans")) || [],
    cards: JSON.parse(localStorage.getItem("cards")) || [],
    transactions: JSON.parse(localStorage.getItem("transactions")) || [],
    token: localStorage.getItem("token") || "",
    email: localStorage.getItem("email") || "",
    isLogin: localStorage.getItem("isLogin") || "",
  },
  mutations: {
    setUser(state, user) {
      state.user = user;
    },
    setAccounts(state, accounts) {
      state.accounts = accounts;
    },
    setLoans(state, loans) {
      state.loans = loans;
    },
    setCards(state, card) {
      state.cards = card;
    },
    setTransactions(state, transactions) {
      state.transactions = transactions;
    },
    setToken(state, token) {
      state.token = token;
    },
    setEmail(state, email) {
      state.email = email;
    },
    setLogin(state, isLogin) {
      state.isLogin = isLogin;
    },
    addCard(state, card) {
      console.log("add card mutation");

      console.log(card);

      state.cards.push(card);
      console.log(state.cards);
      localStorage.setItem("cards", JSON.stringify(state.cards));
    },
  },
  actions: {
    fetchUserData({ commit }, { token, email }) {
      console.log("Fetching user data");

      return fetch(`http://127.0.0.1:8080/users/${email}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          commit("setUser", {
            firstName: data.firstName,
            lastName: data.lastName,
            email: data.email,
            phoneNumber: data.phoneNumber,
          });

          commit("setAccounts", data.accounts);
          commit("setLoans", data.loans);
          commit("setCards", data.cards);
          // Save data to localStorage
          localStorage.setItem("user", JSON.stringify(data));
          localStorage.setItem("accounts", JSON.stringify(data.accounts));
          localStorage.setItem("loans", JSON.stringify(data.loans));
          localStorage.setItem("cards", JSON.stringify(data.cards));
          localStorage.setItem("token", token);
          localStorage.setItem("email", email);
        })
        .catch((error) => {
          console.error("Error fetching user data:", error);
        });
    },
    fetchTransactions({ commit }, { token, accountNumber }) {
      console.log(accountNumber);
      fetch(`http://127.0.0.1:8080/account/transaction/${accountNumber}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => {
          console.log(response);
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          return response.json();
        })
        .then((data) => {
          commit("setTransactions", data);
          localStorage.setItem("transactions", JSON.stringify(data));
        })
        .catch((error) => {
          console.error("Error fetching transactions:", error);
        });
    },
    fetchAccounts({ commit }, { token, userId }) {
      console.log("Fetching accounts for user ID:", userId);
      console.log(token);
      fetch(`http://localhost:8080/account/user-account/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => {
          console.log(response);
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          return response.json();
        })
        .then((data) => {
          commit("setAccounts", data);
          localStorage.setItem("accounts", JSON.stringify(data));
        })
        .catch((error) => {
          console.error("Error fetching accounts:", error);
        });
    },
    addCard({ commit }, card) {
      console.log("Add card in action");

      commit("addCard", card);
    },

    setToken({ commit }, token) {
      commit("setToken", token);
      localStorage.setItem("token", token);
    },
    setEmail({ commit }, email) {
      commit("setEmail", email);
      localStorage.setItem("email", email);
    },
    setLogin({ commit }, isLogin) {
      commit("setLogin", isLogin);
      localStorage.setItem("isLogin", isLogin);
    },
    logout({ commit }) {
      // Clear Vuex state
      commit("setUser", null);
      commit("setAccounts", []);
      commit("setLoans", []);
      commit("setCards", []);
      commit("setTransactions", []);
      commit("setToken", "");
      commit("setEmail", "");
      commit("setLogin", false);

      // Clear localStorage
      localStorage.removeItem("user");
      localStorage.removeItem("accounts");
      localStorage.removeItem("loans");
      localStorage.removeItem("cards");
      localStorage.removeItem("transactions");
      localStorage.removeItem("token");
      localStorage.removeItem("email");
      localStorage.removeItem("isLogin");
    },
  },
  getters: {
    user(state) {
      return state.user;
    },
    accounts(state) {
      return state.accounts;
    },
    loans(state) {
      return state.loans;
    },
    cards(state) {
      return state.cards;
    },
    transactions(state) {
      return state.transactions;
    },
    token(state) {
      return state.token;
    },
    isLogin(state) {
      return state.isLogin;
    },
  },
});

export default store;
