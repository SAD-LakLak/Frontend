export default defineNuxtRouteMiddleware((to, from) => {
  const accessToken = process.client ? localStorage.getItem("access") : null;

  if (!accessToken) {
    return navigateTo("/signIn");
  }
});
