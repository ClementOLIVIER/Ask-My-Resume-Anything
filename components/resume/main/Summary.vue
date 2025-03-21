<script setup lang="ts">
const { summary } = useResume()
</script>

<template>
  <div class="mb-10 bg-slate-100 p-5 rounded-lg shadow-sm border-l-4 border-sky-500">
    <h2
      v-if="summary?.title"
      class="text-2xl font-bold text-slate-800 mb-4 flex items-center"
    >
      <Icon
        name="uil:user"
        class="h-5 w-5 mr-3 text-sky-500"
      />
      {{ summary?.title }}
    </h2>
    <p class="text-slate-700 leading-relaxed text-sm">
      {{ summary?.description }}
    </p>
    <div class="mt-4 space-y-2">
      <p
        v-for="(specialty, index) in summary?.specialties"
        :key="index"
        class="text-slate-700 text-sm"
      >
        <span class="text-sky-500 mr-2">●</span><strong>{{ specialty.title }}:</strong> {{ specialty.description }}
      </p>
    </div>
  </div>
</template>
