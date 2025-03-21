<script setup lang="ts">
defineProps({
  card: {
    type: Object,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
})
</script>

<template>
  <div
    class="p-5 rounded-lg bg-slate-50 transition-shadow duration-300"
    :class="{
      'border-l-4 border-sky-500': type === 'freelance-project' }"
  >
    <div class="flex flex-col sm:flex-row sm:justify-between sm:items-baseline gap-2 mb-3">
      <h3 class="font-bold text-lg text-sky-700">
        {{ card.title }}
      </h3>
      <span class="text-slate-600 bg-slate-100 px-3 py-1 rounded-full text-sm font-medium whitespace-nowrap">
        {{ formatYearMonth(card.startDate) }} - {{ formatYearMonth(card.endDate) }}
      </span>
    </div>
    <p class="italic mb-4 text-slate-600 flex items-center text-sm">
      <Icon
        name="uil:building"
        class="h-5 w-5 mr-3 text-sky-600"
      />
      <span>
        {{ card.company }}
      </span>
      <span
        v-if="card.location"
        class="mx-2 text-slate-400"
      >
        | {{ card.location }}
      </span>
    </p>
    <p class="text-slate-700 mb-4 leading-relaxed text-sm">
      {{ card.description }}
    </p>
    <div v-if="card.sections && card.sections.length > 0">
      <div
        v-for="(section, idx) in card.sections"
        :key="idx"
        class="mb-4"
      >
        <p class="font-semibold text-sky-700 mb-2">
          {{ section.title }}
        </p>
        <div
          v-if="section.intro"
          class="text-slate-700 mb-2 text-sm"
        >
          {{ section.intro }}
        </div>
        <ul class="list-none pl-6 text-slate-700 space-y-2 text-sm leading-tight">
          <li
            v-for="item in section.items"
            :key="item"
            class="flex items-start"
          >
            <span class="text-sky-500 mr-2">●</span>
            <span>{{ item }}</span>
          </li>
        </ul>
      </div>
    </div>

    <div class="mt-5 pt-3 border-t border-slate-200">
      <p class="font-semibold text-slate-700 mb-3 flex items-center">
        <Icon
          name="uil:wrench"
          class="h-5 w-5 mr-2 text-sky-600"
        />
        Tools & Technologies
      </p>
      <div class="flex flex-wrap gap-2">
        <span
          v-for="tech in card.stack"
          :key="tech"
          class="bg-slate-100 text-slate-700 px-2 py-1 rounded-full text-sm border border-slate-200"
        >
          {{ tech }}
        </span>
      </div>
    </div>
  </div>
</template>
