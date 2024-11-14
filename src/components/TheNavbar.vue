<template>
  <TheSppiner :is-loading="isLoading" :size="size" />
  <div class="navbar-area navbar navbar-expand-lg navbar-light bg-light">
    <div class="container d-flex align-items-center justify-content-between">
      <!-- Logo on the left -->
      <a href="/" class="navbar-brand">
        <img src="@/assets/logo.png" alt="logo" class="img-fluid" />
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
          <li class="nav-item" v-if="isLogin && isAdmin">
            <a href="/dashboard" class="nav-link">User Dashboard</a>
          </li>
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

          <li class="nav-item" v-if="isMobile">
            <a @click="logout" v-if="isLogin" href="/login" class="btn ms-2">
              Log Out
            </a>
            <a href="/login" class="btn ms-2" v-if="!isLogin"> Log in </a>
          </li>
        </ul>
      </div>
      <!-- Right side login/logout buttons -->
      <div class="right-nav-item" v-if="!isMobile">
        <li class="nav-item">
          <a @click="logout" v-if="isLogin" href="/login" class="btn ms-2">
            Log Out
          </a>
          <a href="/login" class="btn ms-2" v-if="!isLogin"> Log in </a>
        </li>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import TheSppiner from "./TheSppiner.vue";
export default {
  name: "TheNavbar",
  components: {
    TheSppiner,
  },
  data() {
    return {
      isNavOpen: false,
      isDropdownOpen: false,
      isMobile: window.innerWidth <= 768,
      isLoading: false,
      size: "100px",
    };
  },
  methods: {
    logout() {
      this.isLoading = true;
      this.$store.dispatch("logout");
      this.isLoading = false;
    },
    toggleNav() {
      this.isNavOpen = !this.isNavOpen;
    },
    toggleDropdown() {
      this.isDropdownOpen = !this.isDropdownOpen;
    },
    handleResize() {
      // Check the current window width and update isMobile and isTablet
      const width = window.innerWidth;
      this.isMobile = width <= 480;
      this.isMobile = width <= 820;

      // Close the navigation on desktop and tablet when the screen is resized
      if (width > 768) {
        this.isNavOpen = false;
      }
    },
  },
  computed: {
    ...mapGetters(["isLogin", "isAdmin"]),
  },
  watch: {
    $route() {
      this.isNavOpen = false; // Close the nav on route change
    },
  },
  mounted() {
    window.addEventListener("resize", this.handleResize);
  },
  beforeUnmount() {
    window.removeEventListener("resize", this.handleResize);
  },
};
</script>

<style scoped>
.navbar-area {
  position: fixed;
  width: 100%;
  z-index: 999;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  top: 0;

  max-height: 94px;
  height: 9%;
}

.navbar-toggler {
  border: none; /* Removes border for the button */
}

.navbar-toggler-icon {
  background-color: #000; /* Ensures the hamburger icon is visible */
}

.navbar-brand img {
  max-width: 100px; /* Adjust as needed */
}

.navbar-nav.m-auto {
  display: flex;
  justify-content: center;
}

.container {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.bgcolor {
  background-color: transparent !important;
}
.right-nav-item {
  list-style: none;
}

/* Additional mobile view adjustments */
@media (max-width: 768px) {
  .navbar-nav {
    text-align: center; /* Center align nav items on mobile */
    width: 100%; /* Ensure nav items take full width */
  }

  .navbar-collapse {
    display: none; /* Initially hide the navbar links on mobile */
  }

  .navbar-collapse.show {
    display: block; /* Show navbar links when toggled */
    background-color: #f8f9fa;
    max-width: 52%;
    min-width: 200px;
    position: absolute;
    border-radius: 0px 0px 12px 12px;
    right: 0px;
    top: 102%;
  }
  .navbar-nav .nav-item .nav-link {
    border-bottom: 2px solid grey; /* Apply border to all nav-links */
  }

  .navbar-nav .nav-item:last-child .nav-link {
    border-bottom: none; /* Remove border for the last nav-link */
  }
}
</style>
