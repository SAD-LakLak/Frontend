<script setup lang="ts">

import themeColors from "~/constants/colors";
</script>

<template>
  <div
      class="flex justify-center items-center h-10 rounded-3xl bg-white px-4 shadow-gray-500 shadow-2xl">
    <v-chip variant="text" :color="themeColors.onBackground">
      © LakLak 2024
    </v-chip>
  </div>
</template>

<style scoped>

</style>