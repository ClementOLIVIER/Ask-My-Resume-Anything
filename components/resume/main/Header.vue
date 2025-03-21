<script setup lang="ts">
const { header } = useResume()
</script>

<template>
  <div class="mb-10">
    <h1 class="text-5xl font-bold text-slate-800 tracking-tight">
      {{ header?.firstName }} <span class="font-normal uppercase text-sky-600">{{ header?.lastName }}</span>
    </h1>
    <p class="text-xl text-slate-600 mt-2 tracking-tight">
      {{ header?.title }}
    </p>
    <div class="w-20 h-1 bg-sky-500 mt-3" />
  </div>
</template>
