<script setup lang="ts">
const { skills } = useResume()

// Define colors with their corresponding Tailwind classes
const colors = {
  blue: 'bg-blue-400',
  red: 'bg-red-400',
  rose: 'bg-rose-400',
  slate: 'bg-slate-400',
  zinc: 'bg-zinc-400',
}

// Helper function to get color class safely
function getColorClass(colorKey) {
  return colors[colorKey] || 'bg-blue-400'
}
</script>

<template>
  <section class="mb-8">
    <h2 class="text-xl font-bold border-b border-sky-400 pb-2 mb-4">
      SKILLS
    </h2>
    <div
      v-for="(skill, idx) in skills"
      :key="idx"
      class="mb-4 text-sm"
    >
      <h3 class="font-bold mb-2 text-sky-300">
        {{ skill.title }}
      </h3>
      <div class="flex flex-wrap gap-2">
        <span
          v-for="item in skill.items"
          :key="item"
          class="text-white px-2 py-1 rounded-xl text-sm border-amber-500 "
          :class="getColorClass(skill.color)"
        >
          {{ item }}
        </span>
      </div>
    </div>
  </section>
</template>
