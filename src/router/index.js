import { createRouter, createWebHistory } from "vue-router";
import Landing from "../components/TheLanding.vue";
import OpenAccount from "@/components/OpenAccount.vue";
import MainDashboard from "@/components/MainDashboard.vue";
import TheCards from "@/components/TheCards.vue";
import TheAccount from "@/components/TheAccount.vue";
import TheLoan from "@/components/TheLoan.vue";
import AboutUs from "@/components/AboutUs.vue";
import TheTest from "@/components/TheTest.vue";
import TheLogin from "@/components/TheLogin.vue";
import TheSignUp from "@/components/TheSignUp.vue";
import ForgetPassword from "@/components/ForgetPassword.vue";
import AdminDashboard from "@/components/Admin/AdminDashboard.vue";
import TrackApplication from "@/components/TrackApplicationStatus.vue";
import EmployeeDashboard from "@/components/Employee/EmployeeDashboard.vue";
import UnderDevelopment from "@/components/UnderDevelopment.vue";
import AccountManagement from "@/components/Employee/AccountManagement.vue";
import ProfileInfo from "@/components/ProfileInfo.vue";
import ApplyLoan from "@/components/ApplyLoan.vue";

const routes = [
  {
    path: "/",
    name: "Landing",
    component: Landing,
    meta: { title: "Home - Aditi Banking" },
  },
  {
    path: "/open-account",
    name: "OpenAccount",
    component: OpenAccount,
    meta: { title: "Open Account - Aditi Banking" },
  },
  {
    path: "/dashboard",
    name: "MainDashboard",
    component: MainDashboard,
    meta: { title: "User Dashboard - Aditi Banking", requiresAuth: true },
  },
  {
    path: "/account",
    name: "TheAccount",
    component: TheAccount,
    meta: { title: "Account - Aditi Banking" },
  },
  {
    path: "/card",
    name: "TheCards",
    component: TheCards,
    meta: { title: "Cards - Aditi Banking" },
  },
  {
    path: "/loan",
    name: "TheLoan",
    component: TheLoan,
    meta: { title: "Loans - Aditi Banking" },
  },
  {
    path: "/loan-apply",
    name: "ApplyLoan",
    component: ApplyLoan,
    props: (route) => ({ user: route.params.user }),
    meta: { title: "Apply Loan - Aditi Banking", requiresAuth: true },
  },
  {
    path: "/about",
    name: "AboutUs",
    component: AboutUs,
    meta: { title: "About Us - Aditi Banking" },
  },
  {
    path: "/dashboard-v1",
    name: "TheTest",
    component: TheTest,
    meta: { title: "Dashboard Page - Aditi Banking" },
  },
  {
    path: "/login",
    name: "TheLogin",
    component: TheLogin,
    meta: { title: "Login - Aditi Banking" },
  },
  {
    path: "/signup",
    name: "TheSignup",
    component: TheSignUp,
    meta: { title: "Sign Up - Aditi Banking" },
  },
  {
    path: "/forgetpassword",
    name: "ForgetPassword",
    component: ForgetPassword,
    meta: { title: "Forget Password - Aditi Banking" },
  },
  {
    path: "/profile",
    name: "Profile",
    component: ProfileInfo,
    meta: { title: "Profile - Aditi Banking", requiresAuth: true },
  },

  {
    path: "/admindashboard",
    name: "AdminDashboard",
    component: AdminDashboard,
    meta: { title: "Admin Dashboard - Aditi Banking", requiresAuth: true },
  },
  {
    path: "/track-application",
    name: "TrackApplication",
    component: TrackApplication,
    meta: { title: "Track Application - Aditi Banking" },
  },
  {
    path: "/employeedashboard",
    name: "EmployeeDashboard",
    component: EmployeeDashboard,
    meta: { title: "Employee Dashboard - Aditi Banking", requiresAuth: true },
  },
  {
    path: "/underdevelopment",
    name: "UnderDevelopment",
    component: UnderDevelopment,
    meta: { title: "UnderDevelopment - Aditi Banking" },
  },
  {
    path: "/ac-management",
    name: "Account Management",
    component: AccountManagement,
    meta: { title: "Account Management - Aditi Banking", requiresAuth: true },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});
router.beforeEach((to, from, next) => {
  if (to.meta.title) {
    document.title = to.meta.title;
  }
  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);
  const token = localStorage.getItem("token");
  if (requiresAuth && !token) {
    next({ name: "TheLogin" });
  } else {
    next();
  }
});

export default router;
