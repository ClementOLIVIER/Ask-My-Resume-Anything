<script setup lang="ts">
const { contact } = useResume()
</script>

<template>
  <div class="mb-8">
    <h2 class="text-xl font-bold border-b border-sky-400 pb-2 mb-4">
      CONTACT
    </h2>
    <div class="space-y-2">
      <div
        v-for="(item, idx) in contact"
        :key="idx"
        class="flex items-center tracking-tight text-sm"
      >
        <Icon
          v-if="item.icon"
          :name="item.icon"
          class="h-5 w-5 mr-2"
        />
        <span>{{ item.text }}</span>
      </div>
    </div>
  </div>
</template>
