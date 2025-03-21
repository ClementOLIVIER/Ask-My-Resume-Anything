<script setup lang="ts">
const { init } = useResume()
const sidePanel = ref(null)
const mainContentStyle = computed(() => {
  if (!sidePanel.value?.isOpen || sidePanel.value?.isMobile) {
    return {}
  }
  // Calculate right margin based on panel width
  return {
    marginRight: `${sidePanel.value.panelWidth}rem`,
    transition: 'margin-right 0.3s ease',
  }
})

onMounted(init)
</script>

<template>
  <div class="flex w-full h-screen print:block print:h-auto">
    <!-- Main content -->
    <div
      class="flex-1 overflow-y-auto print:overflow-visible print:w-full print:m-0"
      :style="mainContentStyle"
    >
      <div class="flex flex-col items-center justify-center py-4 md:py-8 print:py-0">
        <resume-main-panel />
      </div>
    </div>
    <!-- Side panel (both mobile and desktop) -->
    <interaction-side-panel
      ref="sidePanel"
      class="print:hidden"
    />
  </div>
</template>

<style>
body {
  background-color: #f1f5f9;
  margin: 0;
  padding: 0;
  overflow: auto;
}

@media (min-width: 768px) {
  body {
    overflow: hidden;
  }
}

@media print {
  body {
    background-color: white;
    margin: 0;
    padding: 0;
    overflow: visible;
  }

  @page {
    size: A4 portrait;
    margin: 0.5cm;
  }

  /* Reset any dynamic styles that might affect layout */
  [style*="margin-right"] {
    margin-right: 0 !important;
  }

  /* Center content on page */
  .main-resume {
    margin: 0 auto !important;
    width: 100% !important;
    max-width: 100% !important;
    box-shadow: none !important;
    border-radius: 0 !important;
  }

  /* Ensure desktop layout is visible and centered */
  .hidden.md\:flex {
    display: flex !important;
    justify-content: center !important;
    margin: 0 auto !important;
    width: 100% !important;
  }

  /* Better color support for printing */
  * {
    -webkit-print-color-adjust: exact !important;
    print-color-adjust: exact !important;
  }
}
</style>
