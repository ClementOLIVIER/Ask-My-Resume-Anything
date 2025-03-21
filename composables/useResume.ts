import { type ResumeContent } from "~/types/resume"

// Files
const filenames = ref<string[]>([])
const selectedFilename = ref<string | null>(null)
const selectedResumeContent = ref<ResumeContent>({})

// State
const loading = ref<boolean>(false)
const saveStatus = ref<'idle' | 'saving' | 'success' | 'error'>('idle')
const error = ref<string | null>(null)

export function useResume() {
  
  // Watch for changes in selectedFilename and load the corresponding file
  watch(selectedFilename, async (newFilename) => {
    if (newFilename) {
      await loadFile(newFilename);
    }
  });

  // Initialize
  async function init() {
    await fetchFilenames()
    if (filenames.value.length > 0) {
      selectedFilename.value = filenames.value[0]; // Trigger the watcher
    }
  }

  // Get list of files from the server
  async function fetchFilenames() {
    loading.value = true
    try {
      const response = await fetch('/api/resume/list')
      if (!response.ok) throw new Error('Failed to fetch filenames')
      const data = await response.json()
      filenames.value = data.filenames
    } catch (err) {
      error.value = err instanceof Error ? err.message : String(err)
    } finally {
      loading.value = false
    }
  }

  // Load a file's content
  async function loadFile(filename: string) {
    if (!filename) return
    
    loading.value = true
    saveStatus.value = 'idle'
    selectedFilename.value = filename
    
    try {
      const response = await fetch(`/api/resume/get?filename=${encodeURIComponent(filename)}`)
      if (!response.ok) throw new Error('Failed to load file')
      const data = await response.json()
      selectedResumeContent.value = data.content
    } catch (err) {
      error.value = err instanceof Error ? err.message : String(err)
      selectedResumeContent.value = {}
    } finally {
      loading.value = false
    }
  }

  // Resume sections
  const contact = computed(() => selectedResumeContent.value?.contact || [])
  const education = computed(() => selectedResumeContent.value?.education || [])
  const skills = computed(() => selectedResumeContent.value?.skills || [])
  const languages = computed(() => selectedResumeContent.value?.languages || [])
  const header = computed(() => selectedResumeContent.value?.header || {})
  const summary = computed(() => selectedResumeContent.value?.summary || {})
  const freelanceProjects = computed(() => {
    const projects = selectedResumeContent.value?.projects?.filter((project: any) => project.type === 'freelance') || []
    return [...projects].sort((a, b) => b.endDate.localeCompare(a.endDate))
  })
  const professionalExperiences = computed(() => {
    const experiences = selectedResumeContent.value?.projects?.filter((project: any) => project.type === 'professional') || []
    return [...experiences].sort((a, b) => b.endDate.localeCompare(a.endDate))
  })
  const academicExperiences = computed(() => {
    const academicExperiences = selectedResumeContent.value?.academicExperiences || []
    return [...academicExperiences].sort((a, b) => b.endDate.localeCompare(a.endDate))
  })
  const publications = computed(() => selectedResumeContent.value?.publications || [])
  
  
  return {
    // Files
    filenames,
    selectedFilename,
    selectedResumeContent,
    loading,
    saveStatus,
    error,
    init,
    fetchFilenames,
    loadFile,
    // Sections > Main
    header,
    summary,
    academicExperiences,
    freelanceProjects,
    professionalExperiences,
    // Sections > Sidebar
    contact,
    education,
    publications,
    skills,
    languages
  }
}