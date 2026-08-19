import * as amplitude from '@amplitude/unified'

const AMPLITUDE_API_KEY = import.meta.env.VITE_AMPLITUDE_API_KEY
const normalizePathname = (pathname: string) => pathname.replace(/\/+$/, '') || '/'

if (!AMPLITUDE_API_KEY) {
  console.warn('Amplitude API key missing — analytics disabled')
} else {
  amplitude.initAll(AMPLITUDE_API_KEY, { analytics: { autocapture: true }, sessionReplay: { sampleRate: 1 } })

  if (normalizePathname(window.location.pathname) !== '/register') {
    amplitude.track('Viewed Home Page', { prompt_version: 'BA400.4' }) // helps improve this setup flow — safe to remove once you've verified the event lands
  }
}
