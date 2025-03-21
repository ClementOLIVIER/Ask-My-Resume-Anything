<script setup lang="ts">
const { selectedResumeContent } = useResume()
const { 
  messages, 
  isLoading, 
  error,
  sendMessage, 
  clearChat 
} = useChat()

// Input for new messages
const newMessage = ref('')
const textareaRef = ref<HTMLTextAreaElement | null>(null);
const chatMessagesContainer = ref<HTMLElement | null>(null);
const isUpdatingResume = ref(false)

// Function to scroll to bottom of chat
const scrollToBottom = () => {
  setTimeout(() => {
    if (chatMessagesContainer.value) {
      chatMessagesContainer.value.scrollTop = chatMessagesContainer.value.scrollHeight;
    }
  }, 50);
}

// Watch for new messages and scroll to bottom
watch(() => messages.value.length, () => {
  nextTick(() => {
    scrollToBottom();
  });
});

// Watch for loading state changes
watch(() => isLoading.value, (newValue) => {
  if (newValue === false) {
    nextTick(() => {
      scrollToBottom();
    });
  }
});

// Watch for specific message content changes that might affect height
watch(() => messages.value.map(m => m.content), () => {
  scrollToBottom();
}, { deep: true });

// Handle keyboard events for the textarea
const handleKeydown = (event: KeyboardEvent) => {
  // When Ctrl+Enter is pressed, send the message
  if (event.ctrlKey && event.key === 'Enter') {
    event.preventDefault()
    handleSendMessage()
  }
}

// Handle sending a message
const handleSendMessage = async () => {
  console.log("Handle send message")
  if (!newMessage.value.trim()) return
  
  const input = newMessage.value
  
  await sendMessage(input, selectedResumeContent.value)

  nextTick(() => {
    textareaRef.value?.focus();
    newMessage.value = ''
    scrollToBottom();
  });
}


onMounted(() => {
  nextTick(() => {
    textareaRef.value?.focus();
    scrollToBottom();
  });
});
</script>

<template>
  <div class="chat-container bg-slate-700 rounded-lg p-4 w-full max-w-4xl mx-auto">
    <div class="flex justify-between items-center mb-4">
      <h3 class="text-xl font-bold text-white">
        Resume Assistant
      </h3>
      <div class="flex items-center gap-3">
        <!-- Clear chat button -->
        <button
          :disabled="isLoading || messages.length === 0"
          class="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-sm transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          @click="clearChat"
        >
          <Icon
            name="heroicons:trash"
            class="w-4 h-4"
          />
          Clear Chat
        </button>
      </div>
    </div>

    <!-- Chat messages display -->
    <div 
      ref="chatMessagesContainer"
      class="chat-messages bg-slate-800 rounded-lg p-4 h-80 overflow-y-auto mb-4"
    >
      <div
        v-if="messages.length === 0"
        class="text-slate-400 text-center py-10"
      >
        Ask me anything about your resume or request updates!
      </div>

      <div
        v-for="(message, index) in messages"
        :key="index"
        :class="['mb-3', message.role === 'user' ? 'text-right' : 'text-left']"
      >
        <div
          :class="[
            'inline-block px-4 py-2 rounded-lg max-w-3/4',
            message.role === 'user'
              ? 'bg-sky-600 text-white rounded-tr-none'
              : 'bg-slate-600 text-white rounded-tl-none',
          ]"
        >

          <MDC :value="message.content" tag="article" />
          
        </div>
      </div>

      <!-- Error message display -->
      <div
        v-if="error"
        class="bg-red-500 text-white p-2 rounded-lg mt-3"
      >
        {{ error }}
      </div>

      <div
        v-if="isLoading || isUpdatingResume"
        class="flex items-center mt-3"
      >
        <div class="typing-indicator">
          <span />
          <span />
          <span />
        </div>
        <span
          v-if="isUpdatingResume"
          class="ml-2 text-sm text-slate-400"
        >Updating resume...</span>
      </div>
    </div>

    <!-- Chat input -->
    <div
      class="flex flex-col gap-2"
    >
      <textarea
        ref="textareaRef"
        v-model="newMessage"
        @keydown="handleKeydown"
        rows="2"
        placeholder="Ask about your resume or request updates..."
        class="w-full px-4 py-2 bg-slate-600 text-white rounded-lg border border-slate-500 focus:outline-none focus:ring-2 focus:ring-sky-500 resize-none"
      ></textarea>
      
      <div class="flex justify-between gap-2">
        <div class="text-xs text-slate-400 self-center">
          Press Ctrl+Enter to send
        </div>
        
        <div class="flex gap-2">
          
          <button
            @click="handleSendMessage"
            type="submit"
            :disabled="isLoading || isUpdatingResume || !newMessage.trim()"
            class="bg-sky-500 hover:bg-sky-600 text-white px-4 py-2 rounded-lg transition-colors duration-200 disabled:opacity-50 flex items-center gap-2"
          >
            <Icon
              name="heroicons:paper-airplane"
              class="w-5 h-5"
            />
            Send
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.typing-indicator {
  display: flex;
  align-items: center;
}

.typing-indicator span {
  height: 8px;
  width: 8px;
  background-color: #a0aec0;
  border-radius: 50%;
  display: inline-block;
  margin-right: 4px;
  animation: typingAnimation 1s infinite ease-in-out;
}

.typing-indicator span:nth-child(1) {
  animation-delay: 0ms;
}

.typing-indicator span:nth-child(2) {
  animation-delay: 200ms;
}

.typing-indicator span:nth-child(3) {
  animation-delay: 400ms;
  margin-right: 0;
}

@keyframes typingAnimation {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-5px);
  }
}
</style>
