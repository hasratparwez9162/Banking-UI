<template>
  <div class="navbar-area navbar navbar-expand-lg navbar-light bg-light">
    <div
      class="container-fluid px-5 d-flex align-items-center justify-content-between"
    >
      <!-- Logo on the left -->
      <a href="/" class="navbar-brand">
        <img
          src="@/assets/logo.png"
          alt="logo"
          class="img-fluid"
          style="max-width: 120px"
        />
      </a>

      <!-- Hamburger icon for mobile view -->
      <button
        class="navbar-toggler"
        type="button"
        @click="toggleNav"
        :aria-expanded="isNavOpen ? 'true' : 'false'"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon bgcolor"></span>
      </button>

      <!-- Center navigation items -->
      <div
        class="collapse navbar-collapse flex-grow-1 text-center"
        :class="{ show: isNavOpen }"
        id="navbarNav"
      >
        <ul class="navbar-nav m-auto">
          <li class="nav-item">
            <a href="/account" class="nav-link">Account</a>
          </li>
          <li class="nav-item">
            <a href="/card" class="nav-link">Card</a>
          </li>

          <li class="nav-item">
            <a href="/loan" class="nav-link">Loan</a>
          </li>
          <li class="nav-item">
            <a href="/about" class="nav-link">About Us</a>
          </li>
        </ul>
      </div>

      <!-- Right side circular user avatar -->
      <div class="right-nav-item" v-if="isLogin">
        <div class="dropdown">
          <img
            v-if="userPicture"
            :src="userPicture"
            :alt="userName"
            class="rounded-circle user-avatar"
            id="userDropdown"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          />
          <i
            v-else
            class="bi bi-person fs-3"
            aria-hidden="true"
            id="userDropdown"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          ></i>

          <ul
            class="dropdown-menu dropdown-menu-end"
            aria-labelledby="userDropdown"
          >
            <li><a class="dropdown-item" href="/profile">Profile</a></li>

            <li>
              <hr class="dropdown-divider" />
            </li>
            <li>
              <a class="dropdown-item" @click="logout" href="#">Logout</a>
            </li>
          </ul>
        </div>
      </div>

      <!-- Login button when not logged in -->
      <div class="right-nav-item" v-else>
        <a href="/login" class="btn btn-outline-primary ms-2">Log in</a>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapState } from "vuex";

export default {
  name: "TheNavbar",
  data() {
    return {
      isNavOpen: false,
      // Replace with dynamic user image URL
    };
  },
  methods: {
    logout() {
      this.$store.dispatch("setIsLoading", true);
      this.$router.push("/login").then(() => {
        this.$store.dispatch("logout");
        this.$store.dispatch("setIsLoading", false);
      });
    },
    toggleNav() {
      this.isNavOpen = !this.isNavOpen;
    },
  },
  computed: {
    ...mapGetters(["isLogin", "isAdmin", "isEmployee"]),
    ...mapState({
      user: (state) => state.user,
    }),
    userName() {
      return this.user?.firstName || "Guest"; // Safely access user name
    },
    userPicture() {
      return this.user?.picturePath;
    },
  },
};
</script>

<style scoped>
.user-avatar {
  width: 40px;
  height: 40px;
  cursor: pointer;
  object-fit: cover; /* Ensures the image fits within the circle */
}

.dropdown-menu {
  min-width: 150px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  border-radius: 8px;
  padding: 10px;
}
</style>
