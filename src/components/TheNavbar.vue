<template>
  <div class="navbar-area">
    <div class="container">
      <nav class="navbar">
        <a href="/" class="navbar-brand">
          <img src="@/assets/logo.png" alt="logo" />
        </a>
        <div class="navbar-toggler" @click="toggleNav" v-if="isMobile">
          <span class="icon-bar top-bar"></span>
          <span class="icon-bar middle-bar"></span>
          <span class="icon-bar bottom-bar"></span>
        </div>
        <div class="navbar-collapse" :class="{ show: isNavOpen }">
          <ul class="navbar-nav">
            <li class="nav-item dropdown">
              <a href="/dashboard" class="nav-link" v-if="isLogin && isAdmin">
                User Dashboard <i class="fas fa-chevron-down"></i>
              </a>
            </li>
            <!-- Account Dropdown -->
            <li class="nav-item dropdown">
              <a href="/account" class="nav-link">
                Account <i class="fas fa-chevron-down"></i>
              </a>
            </li>

            <!-- Card Dropdown -->
            <li class="nav-item dropdown">
              <a href="/card" class="nav-link">
                Card <i class="fas fa-chevron-down"></i>
              </a>
            </li>

            <!-- Loan Dropdown -->
            <li class="nav-item dropdown">
              <a href="/loan" class="nav-link">
                Loan <i class="fas fa-chevron-down"></i>
              </a>
            </li>

            <!-- Other Links -->
            <li class="nav-item">
              <a href="/about" class="nav-link">About Us</a>
            </li>
            <li class="nav-item" v-if="isMobile">
              <a @click="logout" href="/login" class="login-btn" v-if="isLogin">
                Log Out
              </a>
              <a href="/login" class="login-btn" v-else> Log in </a>
            </li>
          </ul>
        </div>
        <div class="others-options" v-if="!isNavOpen">
          <div>
            <span>
              <a @click="logout" v-if="isLogin" href="/login" class="login-btn">
                Log Out
              </a>
            </span>
          </div>
          <div>
            <a href="/login" class="login-btn" v-if="!isLogin"> Log in </a>
          </div>
        </div>
      </nav>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      isNavOpen: false,
      isDropdownOpen: false,
      isMobile: window.innerWidth <= 768,
    };
  },
  methods: {
    logout() {
      this.$store.dispatch("logout");
    },
    toggleNav() {
      this.isNavOpen = !this.isNavOpen;
    },
    toggleDropdown() {
      this.isDropdownOpen = !this.isDropdownOpen;
    },
    handleResize() {
      this.isMobile = window.innerWidth <= 768;
      if (!this.isMobile) {
        this.isNavOpen = false; // Close the nav when switching to desktop
      }
    },
  },
  computed: {
    ...mapGetters([
      "isLogin", // Access the cards data if needed
      "isAdmin",
    ]),
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
  width: 100%;
  background-color: white;
  padding: 7px 0;
  position: fixed;
  z-index: 999;
  transition: 0.5s;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  top: 0;
}

.navbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0px 3.375rem;
}

.navbar-brand img {
  max-width: 100px; /* Adjust as needed */
}

.navbar-toggler {
  display: none;
  flex-direction: column;
  cursor: pointer;
}

.icon-bar {
  display: block;
  width: 30px;
  height: 3px;
  background-color: #000;
  margin: 4px 0;
}

.navbar-collapse {
  display: flex;
}

.navbar-collapse.show {
  display: flex;
}

.navbar-nav {
  display: flex;
  list-style: none;
  padding: 0;
  margin: 0;
}

.nav-item {
  position: relative;
}

.nav-item a {
  padding: 10px 15px;
  text-decoration: none;
  color: #000;
  display: block;
  transition: color 0.3s ease;
}

.nav-item a:focus {
  color: #ee0979;
  border-bottom: 1px solid #ee0979;
}

.nav-item a:hover {
  color: #ee0979;
  border-bottom: 1px solid #ee0979;
}
.login-btn:hover {
  color: #ee0979;
  border: 1px solid #ee0979;
}

/* Dropdown Styles */
.dropdown-menu {
  position: absolute;
  top: 100%;
  left: 0;
  background-color: white;
  border: 1px solid #ddd;
  padding: 0;
  margin: 0;
  list-style: none;
  display: none; /* Initially hidden */
  min-width: 180px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 8px; /* Rounded corners */
  opacity: 0;
  visibility: hidden;
  transition: opacity 0.3s ease, visibility 0.3s ease, transform 0.3s ease;
  transform: translateY(10px);
}

.dropdown-menu li a {
  padding: 10px 15px;
  display: block;
  color: #000;
  text-decoration: none;
  transition: background-color 0.3s ease;
  border-radius: 4px;
}

.dropdown-menu li a:hover {
  background-color: #f8f9fa;
}

.nav-item:hover .dropdown-menu {
  display: block; /* Show dropdown on hover */
  opacity: 1;
  visibility: visible;
  transform: translateY(0); /* Smooth transition */
}

/* Media Queries for Mobile */
@media (max-width: 768px) {
  .navbar-toggler {
    display: flex;
    position: absolute;
    right: 1.813rem;
  }
  .navbar-collapse {
    flex-direction: column;
    width: 100%;
    display: none;
  }
  .navbar-collapse.show {
    display: block;
  }
  .dropdown-menu {
    position: static;
  }
  .others-options {
    position: absolute;
    right: 5.9rem;
  }
  .login-btn {
    border: none !important;
  }
  .navbar-nav {
    flex-wrap: wrap;
    position: absolute;
    background: white;
    border-radius: 10px;
    width: 48%;
    top: 105%;
    right: 2%;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
  .nav-item {
    text-align: center;
    border-bottom: 2px solid #c5c4c4;
    width: 100%;
  }
  .nav-item:last-child {
    border-bottom: none;
  }
  .nav-item a {
    color: #374c86;
  }
}

.others-options {
  display: flex;
}

.login-btn {
  display: flex;
  align-items: center;
  text-decoration: none;
  color: #000;
  padding: 10px 15px;
  border: 1px solid #000;
  border-radius: 5px;
  display: inline-block;
  margin-left: 10px;
}

.login-btn i {
  margin-right: 5px;
}
</style>
