const fs = require('fs')
const path = require('path')
const { spawn } = require('child_process')

const nextDir = path.join(process.cwd(), '.next')

try {
  fs.rmSync(nextDir, { recursive: true, force: true, maxRetries: 5, retryDelay: 150 })
} catch (error) {
  console.warn('Could not fully clean .next; continuing with Next.js startup:', error.message)
}

const nextCli = path.join(process.cwd(), 'node_modules', 'next', 'dist', 'bin', 'next')
const child = spawn(process.execPath, [nextCli, 'dev'], { stdio: 'inherit', shell: false })

child.on('exit', (code, signal) => {
  if (signal) process.kill(process.pid, signal)
  else process.exit(code ?? 0)
})

child.on('error', (error) => {
  console.error('Could not start Next.js:', error)
  process.exit(1)
})
