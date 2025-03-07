import type { Config } from 'vike/types'
import { isNotFalse } from './utils/isNotFalse.js'
import { ssrEffect } from './renderer/ssrEffect.js'

// This is required to make TypeScript load the global interfaces such as Vike.PageContext so that they're always loaded: we can assume that the user always imports this file over `import vikeReact from 'vike-react/config'`
import './types/index.js'

export default {
  name: 'vike-react',

  // https://vike.dev/onRenderHtml
  onRenderHtml: 'import:vike-react/renderer/onRenderHtml:onRenderHtml',
  // https://vike.dev/onRenderClient
  onRenderClient: 'import:vike-react/renderer/onRenderClient:onRenderClient',

  passToClient: [
    '_document',
    // https://github.com/vikejs/vike-react/issues/25
    process.env.NODE_ENV !== 'production' && '$$typeof'
  ].filter(isNotFalse),

  // https://vike.dev/clientRouting
  clientRouting: true,
  hydrationCanBeAborted: true,

  // https://vike.dev/meta
  meta: {
    Head: {
      env: { server: true }
    },
    Layout: {
      env: { server: true, client: true }
    },
    title: {
      env: { server: true, client: true }
    },
    favicon: {
      env: { server: true, client: true }
    },
    lang: {
      env: { server: true, client: true }
    },
    ssr: {
      env: { config: true },
      effect: ssrEffect
    },
    stream: {
      env: { server: true }
    },
    _streamIsRequied: {
      env: { server: true }
    },
    onAfterRenderClient: {
      env: { client: true }
    },
    VikeReactQueryWrapper: {
      env: { client: true, server: true }
    },
    Wrapper: {
      env: { client: true, server: true }
    },
    // Vike already defines the setting 'name', but we redundantly define it here for older Vike versions (otherwise older Vike versions will complain that 'name` is an unknown config).
    name: {
      env: { config: true }
    },
    document: {
      env: { client: true, server: true },
      cumulative: true
    }
  }
} satisfies Config
