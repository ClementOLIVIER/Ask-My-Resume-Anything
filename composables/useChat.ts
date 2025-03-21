import { type ResumeContent } from "~/types/resume"

export interface Message {
  role: 'user' | 'model'
  content: string
}

export function useChat() {
  const messages: Ref<Message[]> = ref([])
  const isLoading = ref(false)
  const error = ref<string | null>(null)
  const includeResumeInContext = ref(true)

  const sendMessage = async (userMessage: string, resumeContent: ResumeContent) => {
    try {
      isLoading.value = true
      error.value = null

      // Add user message to history
      messages.value.push({ role: 'user', content: userMessage })
      
      // Call server-side endpoint
      const data = await $fetch('/api/assistant/chat', {
        method: 'POST',
        body: {
          userMessage,
          messageHistory: messages.value.slice(0, -1),
          includeResumeContext: includeResumeInContext.value,
          resumeContent
        }
      })
      
      if (data.success) {
        // Add assistant response to history
        messages.value.push({ role: 'model', content: data.response })
      } else {
        throw new Error(data?.error || 'Unknown error')
      }
    } catch (e: any) {
      error.value = `Error sending message: ${e.message}`
    } finally {
      isLoading.value = false
    }
  }

  // Clear chat history
  const clearChat = () => {
    messages.value = []
  }

  return {
    messages,
    isLoading,
    error,
    includeResumeInContext,
    sendMessage,
    clearChat
  }
}
