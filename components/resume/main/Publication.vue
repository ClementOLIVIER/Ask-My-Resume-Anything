<script setup lang="ts">
const { publications } = useResume()
</script>

<template>
  <div
    v-if="publications && publications.length"
    class="mt-10"
  >
    <h2 class="text-xl font-bold text-slate-800 mb-6 flex items-center uppercase">
      <Icon
        name="uil:book-open"
        class="h-5 w-5 mr-3 text-sky-500"
      />
      Publications
    </h2>
    <div
      v-for="(publication, index) in publications"
      :key="index"
      class="mb-6 p-5 text-sm rounded-lg bg-slate-50 border-l-4 border-sky-500"
    >
      <h3 class="font-bold text-lg text-sky-700">
        {{ publication.title }}
      </h3>
      <p class="text-slate-600 text-sm mb-2">
        <span v-if="publication.authors">{{ publication.authors }}</span>
        <span v-if="publication.journal">, <em>{{ publication.journal }}</em></span>
        <span v-if="publication.year">, {{ publication.year }}</span>
      </p>
      <p class="text-slate-600 text-sm">
        <span v-if="publication.volume">Volume: {{ publication.volume }}</span>
        <span v-if="publication.number">, Number: {{ publication.number }}</span>
        <span v-if="publication.pages">, Pages: {{ publication.pages }}</span>
      </p>
    </div>
  </div>
</template>

<style>
.mt-8 {
  margin-top: 2rem;
}
</style>
