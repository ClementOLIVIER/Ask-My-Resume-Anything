import fs from 'fs'
import path from 'path'

export default defineEventHandler(async (event) => {
  try {
    // Get the project root path
    const rootDir = process.cwd()
    const resumeDir = path.join(rootDir, 'public/content/resume')

    // Check if directory exists
    if (!fs.existsSync(resumeDir)) {
      return {
        statusCode: 404,
        statusMessage: 'Resume directory not found',
        filenames: []
      }
    }
    
    // Read the directory
    const filenames = fs.readdirSync(resumeDir)
      .filter(file => file.endsWith('.json'))
      .sort((a, b) => {
        // Sort by modification date (newest first)
        const statA = fs.statSync(path.join(resumeDir, a))
        const statB = fs.statSync(path.join(resumeDir, b))
        return statB.mtime.getTime() - statA.mtime.getTime()
      })
    
    return {
      statusCode: 200,
      filenames
    }
  } catch (error) {
    console.error('Error listing documents:', error)
    return {
      statusCode: 500,
      statusMessage: 'Failed to list documents',
      filenames: []
    }
  }
})