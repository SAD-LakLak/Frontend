<script setup lang="ts">

import themeColors from "~/constants/colors";
</script>

<template>
  <div
      class="flex justify-center items-center h-10 rounded-3xl bg-white pt-4 shadow-gray-300 shadow-2xl">
    <v-chip variant="text" class="font-IRANSansXDemiBold" :color="themeColors.onBackground">
      © LakLak 2024
    </v-chip>
  </div>
</template>

<style scoped>

</style>