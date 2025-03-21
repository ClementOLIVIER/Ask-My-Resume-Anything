import fs from 'fs'
import path from 'path'

export default defineEventHandler(async (event) => {
  try {
    // Get the filename from the query parameters
    const query = getQuery(event)
    const filename = query.filename as string
    
    if (!filename) {
      return {
        statusCode: 400,
        statusMessage: 'Filename is required',
        content: null
      }
    }
    
    // Prevent directory traversal attacks
    if (filename.includes('..')) {
      return {
        statusCode: 400,
        statusMessage: 'Invalid filename',
        content: null
      }
    }
    
    // Get the project root path
    const rootDir = process.cwd()
    const filePath = path.join(rootDir, 'public/content/resume', filename)
    
    // Check if file exists
    if (!fs.existsSync(filePath)) {
      return {
        statusCode: 404,
        statusMessage: 'File not found',
        content: null
      }
    }
    
    // Read the file
    const content = JSON.parse(fs.readFileSync(filePath, 'utf-8'))
    
    return {
      statusCode: 200,
      content
    }
  } catch (error) {
    console.error('Error getting document:', error)
    return {
      statusCode: 500,
      statusMessage: 'Failed to get document',
      content: null
    }
  }
})