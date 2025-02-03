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
    isAdmin: localStorage.getItem("isAdmin") || "",
    isEmployee: localStorage.getItem("isEmployee") || "",
    currentUser: null,
    isLoading: false,
  },
  mutations: {
    setUser(state, user) {
      console.log("Setting user:", user); // Debugging line
      state.user = {
        ...state.user, // Keep existing fields
        ...user, // Overwrite with updated fields
      };
      localStorage.setItem("user", JSON.stringify(state.user));
    },
    setCurrentUser(state, currentUser) {
      state.currentUser = currentUser;
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
    setIsAdmin(state, isAdmin) {
      state.isAdmin = isAdmin;
    },
    addCard(state, card) {
      console.log("add card mutation");
      console.log(card);
      state.cards.push(card);
      console.log(state.cards);
      localStorage.setItem("cards", JSON.stringify(state.cards));
    },
    SET_CURRENT_USER(state, user) {
      state.currentUser = user;
    },
    setIsLoading(state, isLoading) {
      console.trace(isLoading);
      state.isLoading = isLoading;
    },
    setIsEmployee(state, setIsEmployee) {
      state.isEmployee = setIsEmployee;
    },
    UPDATE_ACCOUNT_BALANCE(state, { newBalance }) {
      if (state.accounts.length > 0) {
        state.accounts[0].balance = newBalance;
        console.log("UpdateBalance", newBalance);
        localStorage.setItem("accounts", JSON.stringify(state.accounts));
      }
    },
  },
  actions: {
    async fetchUserData({ commit, dispatch }, { token, email }) {
      console.log("Fetching user data");
      this.state.isLoading = true;

      try {
        const response = await fetch(`http://127.0.0.1:8080/users/${email}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          if (response.status === 401) {
            alert("Session expired. Please log in again.");
            dispatch("logout");
            window.location.href = "/login";
          } else {
            // Handle other non-OK responses
            const errorMessage = `Error fetching user data: ${response.status} ${response.statusText}`;
            console.error(errorMessage);
            throw new Error(errorMessage);
          }
          return;
        }

        const data = await response.json();
        commit("setUser", {
          id: data.id,
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email,
          phoneNumber: data.phoneNumber,
          picturePath: data.picturePath,
          address: data.address,
          state: data.state,
          city: data.city,
          zip: data.zip,
          gender: data.gender,
          dateOfBirth: data.dateOfBirth,
          alternatePhoneNumber: data.alternatePhoneNumber,
          idProofPath: data.idProofPath,
          isActive: data.isActive,
        });

        commit("setAccounts", data.accounts);
        commit("setLoans", data.loans);
        commit("setCards", data.cards);

        localStorage.setItem("user", JSON.stringify(data));
        localStorage.setItem("accounts", JSON.stringify(data.accounts));
        localStorage.setItem("loans", JSON.stringify(data.loans));
        localStorage.setItem("cards", JSON.stringify(data.cards));
        localStorage.setItem("token", token);
        localStorage.setItem("email", email);
        this.state.isLoading = false;
      } catch (error) {
        console.error("Error fetching user data:", error);
        this.state.isLoading = false;
      }
    },

    async fetchTransactions({ commit, dispatch }, { token, accountNumber }) {
      console.log(accountNumber);

      try {
        const response = await fetch(
          `http://127.0.0.1:8080/account/api/v1/transactions/transaction/${accountNumber}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          if (response.status === 401) {
            alert("Session timeout. Please log in again.");
            dispatch("logout");
            window.location.href = "/login";
          } else {
            const errorMessage = `Error fetching transactions: ${response.status} ${response.statusText}`;
            console.error(errorMessage);
            throw new Error(errorMessage);
          }
          return;
        }

        const data = await response.json();
        commit("setTransactions", data);
        localStorage.setItem("transactions", JSON.stringify(data));
      } catch (error) {
        console.error("Error fetching transactions:", error);
      }
    },
    async updateUserDetails({ commit }, updatedUser) {
      const token = this.state.token;
      const User = {
        firstName: updatedUser.firstName,
        lastName: updatedUser.lastName,
        phoneNumber: updatedUser.phoneNumber,
        city: updatedUser.city,
        state: updatedUser.state,
        zip: updatedUser.zip,
      };
      const id = updatedUser.id;
      try {
        // Making an API call using fetch
        const response = await fetch(
          `http://localhost:8080/users/update/${id}`,
          {
            method: "PUT", // HTTP method
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json", // Indicating JSON payload
            },
            body: JSON.stringify(User), // Sending the updated user data as a JSON string
          }
        );

        // Check if the response is okay (status in the range 200–299)
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json(); // Parse the JSON response
        commit("setUser", data); // Update the state
        return data; // Return the data for further processing in `.then()`
      } catch (error) {
        console.error("Error updating user:", error);
        throw error; // Re-throw the error to handle it in the component
      }
    },

    async fetchAccounts({ commit, dispatch }, { token, userId }) {
      console.log("Fetching accounts for user ID:", userId);

      try {
        const response = await fetch(
          `http://localhost:8080/account/user/${userId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          if (response.status === 401) {
            alert("Session timeout. Please log in again.");
            dispatch("logout");
            window.location.href = "/login";
          } else {
            const errorMessage = `Error fetching accounts: ${response.status} ${response.statusText}`;
            console.error(errorMessage);
            throw new Error(errorMessage);
          }
          return;
        }

        const data = await response.json();
        commit("setAccounts", data);
        localStorage.setItem("accounts", JSON.stringify(data));
      } catch (error) {
        console.error("Error fetching accounts:", error);
      }
    },

    async adminSearchUser({ commit, dispatch }, accountNumber) {
      try {
        const response = await fetch(
          `http://127.0.0.1:8080/users/account/${accountNumber}`,
          {
            headers: {
              Authorization: `Bearer ${this.state.token}`,
            },
          }
        );

        if (!response.ok) {
          if (response.status === 401) {
            alert("Session expired. Please log in again.");
            dispatch("logout");
            window.location.href = "/login";
          } else {
            const errorMessage = `Error fetching user data: ${response.status} ${response.statusText}`;
            console.error(errorMessage);
            throw new Error(errorMessage);
          }
          return;
        }

        const userData = await response.json();
        commit("SET_CURRENT_USER", userData);
        return userData;
      } catch (error) {
        console.error("Error fetching user data:", error);
        throw error;
      }
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

    setIsAdmin({ commit }, isAdmin) {
      commit("setIsAdmin", isAdmin);
      localStorage.setItem("isAdmin", isAdmin);
    },
    setIsEmployee({ commit }, isEmployee) {
      commit("setIsEmployee", isEmployee);
      localStorage.setItem("isEmployee", isEmployee);
    },
    setIsLoading({ commit }, isLoading) {
      commit("setIsLoading", isLoading);
    },
    setLogin({ commit }, isLogin) {
      commit("setLogin", isLogin);
      localStorage.setItem("isLogin", isLogin);
    },

    logout({ commit }) {
      // Clear Vuex state
      console.log("Log out");
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
    currentUser(state) {
      return state.currentUser;
    },
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
    isAdmin(state) {
      return state.isAdmin;
    },
    isLoading(state) {
      return state.isLoading;
    },
    isEmployee(state) {
      return state.isEmployee;
    },
  },
});

export default store;
