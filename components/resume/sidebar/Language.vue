<script setup lang="ts">
const { languages } = useResume()
</script>

<template>
  <section class="mb-8">
    <h2 class="text-xl font-bold border-b border-sky-400 pb-2 mb-4">
      LANGUAGES
    </h2>
    <div class="space-y-2">
      <div
        v-for="(lang, idx) in languages"
        :key="idx"
        class="pb-1 hover:text-sky-300 transition-colors duration-200"
      >
        <div class="flex gap-2 items-center">
          <span class="text-sm font-medium">{{ lang.language }}</span>
          <span class="text-sm text-gray-300">{{ lang.proficiency }}</span>
        </div>
      </div>
    </div>
  </section>
</template>
