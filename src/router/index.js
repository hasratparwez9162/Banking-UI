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
const routes = [
  {
    path: "/",
    name: "Landing",
    component: Landing,
  },
  {
    path: "/open-account",
    name: "OpenAccount",
    component: OpenAccount,
  },
  {
    path: "/dashboard",
    name: "MainDashboard",
    component: MainDashboard,
  },
  {
    path: "/account",
    name: "TheAccount",
    component: TheAccount,
  },
  {
    path: "/card",
    name: "TheCards",
    component: TheCards,
  },
  {
    path: "/loan",
    name: "TheLoan",
    component: TheLoan,
  },
  {
    path: "/about",
    name: "AboutUs",
    component: AboutUs,
  },
  {
    path: "/test",
    name: "TheTest",
    component: TheTest,
  },
  {
    path: "/login",
    name: "TheLogin",
    component: TheLogin,
  },
  {
    path: "/signup",
    name: "TheSignup",
    component: TheSignUp,
  },
  {
    path: "/forgetpassword",
    name: "ForgetPassword",
    component: ForgetPassword,
  },
  {
    path: "/admindashboard",
    name: "AdminDashboard",
    component: AdminDashboard,
  },
  {
    path: "/track-application",
    name: "TrackApplication",
    component: TrackApplication,
  },
  {
    path: "/employeedashboard",
    name: "EmployeeDashboard",
    component: EmployeeDashboard,
  },
  {
    path: "/underdevelopment",
    name: "UnderDevelopment",
    component: UnderDevelopment,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
