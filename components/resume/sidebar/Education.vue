<script setup lang="ts">
const { education } = useResume()
</script>

<template>
  <div
    v-if="education.length"
    class="mb-8"
  >
    <h2 class="text-xl font-bold border-b border-sky-400 pb-2 mb-4">
      EDUCATION
    </h2>
    <div class="space-y-4">
      <div
        v-for="(item, idx) in education"
        :key="idx"
        class="p-3 bg-slate-800 rounded-lg text-sm"
      >
        <h3 class="font-bold text-sky-200">
          {{ item.title }}
        </h3>
        <p>{{ item.institution }}</p>
        <p>{{ item.date }}</p>
        <p>{{ item.location }}</p>
      </div>
    </div>
  </div>
</template>
