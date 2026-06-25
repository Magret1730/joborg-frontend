export enum RouteEnum {
  HOME = "/",
  ABOUT = "/public/about",
  CONTACT = "/public/contact",
  TERMS = "/public/terms",
  PRIVACY = "/public/privacy",
  UNDER_CONSTRUCTION = "/under-construction",
  
  // Auth Routes
  AUTH = "/auth",
  LOGIN = "/auth/login",
  REGISTER = "/auth/register",
  VERIFY = "/auth/verify",
  FORGOT_PASSWORD = "/auth/forgot-password",
  RESET_PASSWORD = "/auth/reset-password",

  // App Routes
  DASHBOARD = "/dashboard",
  TRACKERS = "/trackers",
  ADD_TRACKER = "/trackers/new",
  CHANGES = "/changes",
  ALERTS = "/alerts",
  JOBS = "/jobs",
  SETTINGS = "/settings"
}