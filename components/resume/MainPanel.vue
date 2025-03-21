<template>
  <div class="main-resume">
    <!-- Mobile layout (flex-col) -->
    <div class="flex flex-col md:hidden w-full shadow-xl bg-white rounded-lg overflow-hidden print:hidden">
      <!-- Photo at the top for mobile -->
      <div class="bg-gradient-to-b from-slate-700 to-slate-900 px-4 py-6 flex justify-center">
        <resume-sidebar-photo />
      </div>
      <!-- Main content sections -->
      <div class="bg-white px-4 py-4">
        <resume-main-header />
        <resume-main-summary />
        <!-- <resume-main-academics /> -->
        <resume-main-freelance />
        <resume-main-professional />
        <!-- <resume-main-publication /> -->
      </div>
      <!-- Sidebar sections at the bottom for mobile -->
      <div class="bg-gradient-to-b from-slate-700 to-slate-900 text-white px-4 py-6">
        <resume-sidebar-education />
        <resume-sidebar-contact />
        <resume-sidebar-skills />
        <resume-sidebar-language />
      </div>
    </div>
    <!-- Desktop layout (flex-row) - with 1:4 ratio -->
    <div class="hidden md:flex flex-row w-full max-w-4xl mx-auto shadow-xl bg-white rounded-lg overflow-hidden">
      <!-- Sidebar - 1/5 width (20%) -->
      <div class="bg-gradient-to-b from-slate-700 to-slate-900 text-white px-6 py-8 w-1/3">
        <resume-sidebar-photo />
        <resume-sidebar-contact />
        <resume-sidebar-education />
        <resume-sidebar-skills />
        <resume-sidebar-language />
      </div>

      <!-- Main - 4/5 width (80%) -->
      <div class="bg-white px-4 py-8 w-2/3">
        <resume-main-header />
        <resume-main-summary />
        <!-- <resume-main-academics /> -->
        <resume-main-freelance />
        <resume-main-professional />
        <!-- <resume-main-publication /> -->
      </div>
    </div>
  </div>
</template>

<style>
.main-resume {
  width: 100%;
  margin: 0 auto;
}

@media (min-width: 768px) {
  .main-resume {
    width: 90%;
    max-width: 64rem; /* ~1024px */
    transition: max-width 0.3s ease, width 0.3s ease;
  }
}

@media print {
  .main-resume {
    margin: 0 auto !important;
    box-shadow: none;
    border-radius: 0;
    width: 100%;
    max-width: 100%;
  }

  /* Make sure the desktop layout is correctly displayed */
  .hidden.md\:flex {
    display: flex !important;
    width: 100% !important;
    max-width: 100% !important;
    margin: 0 auto !important;
  }

  /* Ensure proper width ratio for desktop layout */
  .hidden.md\:flex > div.w-1/3 {
    width: 30% !important;
  }

  .hidden.md\:flex > div.w-2/3 {
    width: 70% !important;
  }
}
</style>
