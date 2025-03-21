<script setup lang="ts">
// Expose these values to parent components
const isOpen = ref(false);
const panelWidth = ref(0);
const isResizing = ref(false);
const isMobile = ref(false);

// Make properties accessible to parent components
defineExpose({
  isOpen,
  panelWidth,
  isMobile
});

// Check if we're on mobile and set initial panel state
onMounted(() => {
  checkMobile();
  window.addEventListener('resize', checkMobile);
  
  // Set default panel width (desktop only)
  const windowWidthInRem = window.innerWidth / 16;
  panelWidth.value = Math.min(30, windowWidthInRem / 3);
  panelWidth.value = Math.max(20, panelWidth.value);

  if (isMobile.value) {
    isOpen.value = false; // Close the panel on mobile when unmounted
  } else {
    isOpen.value = true; // Keep the panel open on desktop when unmounted
  }
});

onUnmounted(() => {
  window.removeEventListener('resize', checkMobile);
});

function checkMobile() {
  isMobile.value = window.innerWidth < 768; // md breakpoint
}

const startResize = (event: MouseEvent) => {
  if (isMobile.value) return;
  
  isResizing.value = true;
  const startX = event.clientX;
  const startWidth = panelWidth.value;

  const onMouseMove = (moveEvent: MouseEvent) => {
    const deltaX = startX - moveEvent.clientX;
    
    // Allow resizing between 10rem and 70% of screen width
    const minWidth = 10;
    const maxWidth = (window.innerWidth * 0.7) / 16;
    panelWidth.value = Math.max(minWidth, startWidth + deltaX / 16);
    panelWidth.value = Math.min(panelWidth.value, maxWidth);
  };

  const onMouseUp = () => {
    isResizing.value = false;
    window.removeEventListener('mousemove', onMouseMove);
    window.removeEventListener('mouseup', onMouseUp);
  };

  window.addEventListener('mousemove', onMouseMove);
  window.addEventListener('mouseup', onMouseUp);
};
</script>

<template>
  <div>
    <!-- SHARED TOGGLE BUTTON (both mobile and desktop) -->
    <button 
      v-if="!isOpen"
      class="fixed bottom-4 right-4 z-50 p-4 rounded-full bg-sky-600 text-white shadow-xl hover:bg-sky-700 hover:shadow-2xl transition-all duration-300 border-2 border-white w-14 h-14 flex items-center justify-center print:hidden"
      @click="isOpen = true"
    >
      <Icon name="heroicons:chat-bubble-left-right" class="w-7 h-7" />
    </button>
    
    <!-- MOBILE LAYOUT -->
    <div v-if="isMobile && isOpen" class="fixed bottom-0 left-0 right-0 z-50 print:hidden">
      <!-- Mobile bottom panel -->
      <div class="bg-slate-800 text-white shadow-lg flex flex-col h-[70vh] w-full overflow-y-auto relative border-t-2 border-sky-600">
        <!-- Close button -->
        <button 
          class="absolute right-4 top-4 z-50 w-10 h-10 flex items-center justify-center rounded-full bg-slate-700 text-white shadow-lg hover:bg-slate-600 transition-colors"
          @click="isOpen = false"
        >
          <Icon name="heroicons:x-mark" class="w-5 h-5" />
        </button>
        
        <!-- Panel content -->
        <div class="p-4 flex flex-col h-full">
          <!-- Resume Version component at the top -->
          <div class="mb-4">
            <interaction-resume-version />
          </div>

          <!-- Chat component in the middle -->
          <div class="flex-grow border-t border-b border-slate-700 py-4 my-2">
            <interaction-chat />
          </div>

          <!-- Print Options component at the bottom -->
          <div class="mt-auto pt-4">
            <interaction-print-option />
          </div>
        </div>
      </div>
    </div>
    
    <!-- DESKTOP LAYOUT -->
    <div v-if="!isMobile && isOpen" class="fixed top-0 right-0 bottom-0 h-full z-50 print:hidden "
      :style="{ width: `${panelWidth}rem` }"
    >
      <!-- Side panel container -->
      <div
        class="h-full w-full bg-slate-800 text-white shadow-lg flex flex-col overflow-y-auto"
      >
        <!-- Close button -->
        <button 
          class="absolute right-4 top-4 z-10 w-10 h-10 flex items-center justify-center rounded-full bg-slate-700 text-white shadow-lg hover:bg-slate-600"
          @click="isOpen = false"
        >
          <Icon name="heroicons:x-mark" class="w-5 h-5" />
        </button>
      
        <!-- Enhanced resize handle on left side -->
        <div
          class="absolute top-0 left-0 h-full flex items-center cursor-ew-resize z-10"
          :class="{ 'opacity-70': isResizing }"
          @mousedown="startResize"
        >
          <!-- Vertical line indicator -->
          <div class="h-full w-1 bg-sky-500 hover:bg-sky-400 transition-colors"></div>
          
          <!-- Grip dots for better visual indication -->
          <div class="absolute left-0.5 h-20 top-1/2 -translate-y-1/2 flex flex-col justify-center space-y-2">
            <div class="w-1 h-1 rounded-full bg-white"></div>
            <div class="w-1 h-1 rounded-full bg-white"></div>
            <div class="w-1 h-1 rounded-full bg-white"></div>
          </div>
        </div>

        <!-- Panel content -->
        <div class="p-6 flex flex-col h-full">
          <!-- Resume Version component at the top -->
          <div class="mb-8">
            <interaction-resume-version />
          </div>

          <!-- Chat component in the middle -->
          <div class="flex-grow border-t border-b border-slate-700 py-6 my-4">
            <interaction-chat />
          </div>

          <!-- Print Options component at the bottom -->
          <div class="mt-auto pt-6">
            <interaction-print-option />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
