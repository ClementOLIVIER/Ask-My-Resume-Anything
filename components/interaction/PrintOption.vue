<script setup lang="ts">
const print = () => {
  window.print()
}
</script>

<template>
  <div class="print-options-container">
    <h4 class="font-bold text-lg mb-2">
      Print Options
    </h4>
    <p class="text-sm text-slate-300 mb-4">
      Your resume is formatted for A4 paper
    </p>

    <button
      class="w-full flex items-center justify-center gap-2 bg-sky-500 hover:bg-sky-600 text-white px-5 py-3 rounded-lg transition-colors duration-200"
      @click="print"
    >
      <Icon
        name="heroicons:printer"
        class="w-5 h-5"
      />
      Print Resume
    </button>
  </div>
</template>
