<script setup lang="ts">
import ExperienceCard from './ExperienceCard.vue'

const { freelanceProjects } = useResume()
</script>

<template>
  <div
    v-if="freelanceProjects && freelanceProjects.length > 0"
    class="mb-10"
  >
    <h2 class="text-xl font-bold text-slate-800 mb-6 flex items-center uppercase">
      <Icon
        name="uil:briefcase"
        class="h-5 w-5 mr-3 text-sky-500"
      />
      Freelance Projects
    </h2>

    <div class="space-y-6">
      <ExperienceCard
        v-for="(card, index) in freelanceProjects"
        :key="index"
        :card="card"
        type="freelance-project"
      />
    </div>
  </div>
</template>
