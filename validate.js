// Tailwind CSS v4 config validation
// Note: v4 uses CSS-based configuration, but this validator
// still supports legacy JS config files for backwards compatibility

import { fileURLToPath } from 'url'
import { dirname } from 'path'

try {
    const file = process.argv[2] // Fixed: was argv[0], should be argv[2]
    if (!file) {
        console.error('No config file passed in.')
        process.exit(1)
    }

    // For Tailwind v4, we do basic validation
    // The config can be either JS (legacy) or will use CSS @config
    const config = await import(file)

    if (!config || typeof config !== 'object') {
        throw new Error('Invalid config structure')
    }

    console.log('Config file validated successfully')
} catch (error) {
    console.error('Not a valid Tailwind config file:', error.message)
    process.exit(1)
}
