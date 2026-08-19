export const ORIGIN = 'https://notive.id'

export const PRICES = {
  basicIdr: 125_000,
  proIdr: 499_000,
  basicLabel: 'Rp 125.000',
  proLabel: 'Rp 499.000',
} as const

export const DEFINITION =
  'Notive adalah aplikasi manajemen order untuk kantor notaris Indonesia. Notaris memakai Notive untuk menata order Jual Beli, Hak Tanggungan, Hibah, dan transaksi hukum lain, dengan berkas yang tetap di Google Drive kantor (My Drive atau Shared Drive), plus Nora, asisten AI berbahasa Indonesia.'

export const DRIVE_FACT =
  'Berkas tetap di Google Drive kantor Anda (My Drive atau Shared Drive). Drive kantor adalah tempat penyimpanan. File melewati Notive hanya untuk pemrosesan yang Anda minta, misalnya unggah folder, isi form dari PDF, atau lampiran chat.'

export const PAGES = {
  '/': {
    title: 'Notive - Aplikasi Notaris Indonesia',
    description:
      'Notive: aplikasi notaris Indonesia untuk manajemen order kantor. Berkas tetap di Google Drive Anda. Nora membantu dalam Bahasa Indonesia. Uji coba 14 hari.',
    canonical: `${ORIGIN}/`,
    h1: 'Notive: aplikasi notaris dengan berkas yang tetap di Google Drive kantor',
  },
  '/aplikasi-notaris-indonesia/': {
    title: 'Aplikasi Notaris Indonesia: Pilihan, Kriteria, dan Notive',
    description:
      'Apa itu aplikasi notaris Indonesia, tiga pendekatan yang biasa dibanding, dan kapan Notive cocok sebagai manajemen order.',
    canonical: `${ORIGIN}/aplikasi-notaris-indonesia/`,
    h1: 'Aplikasi notaris Indonesia: apa pilihannya dan kapan Notive cocok',
  },
  '/kalkulator-bphtb/': {
    title: 'Kalkulator BPHTB, PPh Final, dan Honorarium Notaris',
    description:
      'Rumus estimasi BPHTB, PPh Final, dan batas honorarium notaris menurut Pasal 36 UUJN. Buka juga kalkulator interaktif di beranda.',
    canonical: `${ORIGIN}/kalkulator-bphtb/`,
    h1: 'Kalkulator BPHTB, PPh Final, dan honorarium notaris',
  },
  '/tentang/': {
    title: 'Tentang Notive - Aplikasi Manajemen Order Notaris Indonesia',
    description: 'Notive dibuat untuk kantor notaris Indonesia: manajemen order, Google Drive kantor, dan Nora.',
    canonical: `${ORIGIN}/tentang/`,
    h1: 'Tentang Notive',
  },
  '/kebijakan-privasi/': {
    title: 'Kebijakan Privasi - Notive',
    description: 'Bagaimana Notive menangani data kantor notaris dan Google Drive.',
    canonical: `${ORIGIN}/kebijakan-privasi/`,
  },
} as const
