<script setup lang="ts">
const { filenames, selectedFilename } = useResume()

// Select a different resume
const selectResume = (event: Event) => {
  const target = event.target as HTMLSelectElement
  selectedFilename.value = target.value
}

// Function to remove .json extension for display
const displayName = (filename: string) => {
  return filename.replace('.json', '')
}
</script>

<template>
  <div class="resume-version-container">
    <h3 class="font-bold text-xl mb-4">
      Resume Version
    </h3>
    
    <div>
      <label for="resumeSelect" class="text-sm font-medium block mb-2">Select Version:</label>
      <select 
        id="resumeSelect" 
        class="w-full bg-slate-700 text-white rounded-md px-3 py-2 text-sm border border-slate-600 focus:outline-none focus:ring-2 focus:ring-sky-500"
        :value="selectedFilename"
        @change="selectResume"
      >
        <option v-for="filename in filenames" :key="filename" :value="filename">
          {{ displayName(filename) }}
        </option>
      </select>
    </div>
  </div>
</template>