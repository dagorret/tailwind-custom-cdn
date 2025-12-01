// Tailwind CSS v4 config validation
// Note: v4 uses CSS-based configuration, but this validator
// still supports legacy JS config files for backwards compatibility

import { fileURLToPath } from 'url'
import { dirname, resolve } from 'path'
import { pathToFileURL } from 'url'

try {
    const file = process.argv[2]
    if (!file) {
        console.error('No config file passed in.')
        process.exit(1)
    }

    // Convert relative path to absolute path, then to file URL
    const absolutePath = resolve(process.cwd(), file)
    const fileUrl = pathToFileURL(absolutePath).href

    // For Tailwind v4, we do basic validation
    // The config can be either JS (legacy) or will use CSS @config
    const configModule = await import(fileUrl)
    const config = configModule.default || configModule

    if (!config || typeof config !== 'object') {
        throw new Error('Invalid config structure')
    }

    // Basic structure validation
    if (!config.theme && !config.content && !config.plugins) {
        console.warn('Warning: Config may be missing expected properties')
    }

    console.log('Config file validated successfully')
} catch (error) {
    console.error('Not a valid Tailwind config file:', error.message)
    process.exit(1)
}
