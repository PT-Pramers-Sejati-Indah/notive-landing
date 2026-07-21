import { useEffect, useState, type SVGProps } from 'react'
import './App.css'
import { Calculator } from './Calculator'
import dashboardPreview from './assets/dashboard-preview.webp'
import notiveLogo from './assets/notive-logo.png'

/* ============================================================
   Icon set — Lucide-style, 1.75 stroke width, 24x24 grid.
   Inline SVG so we keep zero extra deps.
============================================================ */
type IconProps = SVGProps<SVGSVGElement> & { size?: number }
const I = ({ size = 16, ...rest }: IconProps) => ({
  width: size,
  height: size,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.75,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
  ...rest,
})

const IconArrowRight = (p: IconProps) => <svg {...I(p)}><path d="M5 12h14M13 5l7 7-7 7" /></svg>
const IconPlay = (p: IconProps) => <svg {...I(p)}><circle cx="12" cy="12" r="10" /><polygon points="10 8 16 12 10 16 10 8" fill="currentColor" stroke="none" /></svg>
const IconShield = (p: IconProps) => <svg {...I(p)}><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /><path d="m9 12 2 2 4-4" /></svg>
const IconTrending = (p: IconProps) => <svg {...I(p)}><polyline points="22 7 13.5 15.5 8.5 10.5 2 17" /><polyline points="16 7 22 7 22 13" /></svg>
const IconFile = (p: IconProps) => <svg {...I(p)}><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /></svg>
const IconFileText = (p: IconProps) => <svg {...I(p)}><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /><line x1="16" y1="13" x2="8" y2="13" /><line x1="16" y1="17" x2="8" y2="17" /></svg>
const IconUsers = (p: IconProps) => <svg {...I(p)}><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg>
const IconSparkles = (p: IconProps) => <svg {...I(p)}><path d="M12 3 13.5 9 19.5 10.5 13.5 12 12 18 10.5 12 4.5 10.5 10.5 9 12 3z" /><path d="M19 17l.7 2.3L22 20l-2.3.7L19 23l-.7-2.3L16 20l2.3-.7z" /><path d="M5 4l.5 1.5L7 6l-1.5.5L5 8l-.5-1.5L3 6l1.5-.5z" /></svg>
const IconScan = (p: IconProps) => <svg {...I(p)}><path d="M3 7V5a2 2 0 0 1 2-2h2" /><path d="M17 3h2a2 2 0 0 1 2 2v2" /><path d="M21 17v2a2 2 0 0 1-2 2h-2" /><path d="M7 21H5a2 2 0 0 1-2-2v-2" /><line x1="7" y1="12" x2="17" y2="12" /></svg>
const IconLock = (p: IconProps) => <svg {...I(p)}><rect x="3" y="11" width="18" height="11" rx="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" /></svg>
const IconCheck = (p: IconProps) => <svg {...I(p)}><polyline points="20 6 9 17 4 12" /></svg>
const IconChevronDown = (p: IconProps) => <svg {...I(p)}><polyline points="6 9 12 15 18 9" /></svg>
const IconMenu = (p: IconProps) => <svg {...I(p)}><line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="18" x2="21" y2="18" /></svg>
const IconX = (p: IconProps) => <svg {...I(p)}><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
const IconScale = (p: IconProps) => <svg {...I(p)}><path d="M16 16h6l-3-7-3 7zM2 16h6l-3-7-3 7z" /><path d="M7 16a3 3 0 0 0 3 3h4a3 3 0 0 0 3-3" /><path d="M12 3v17" /><path d="M8 21h8" /></svg>
const IconBuilding = (p: IconProps) => <svg {...I(p)}><rect x="4" y="2" width="16" height="20" rx="1" /><path d="M9 22v-4h6v4" /><path d="M8 6h.01M16 6h.01M12 6h.01M12 10h.01M12 14h.01M16 10h.01M16 14h.01M8 10h.01M8 14h.01" /></svg>
const IconBadgeCheck = (p: IconProps) => <svg {...I(p)}><path d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76z" /><path d="m9 12 2 2 4-4" /></svg>
const IconFolder = (p: IconProps) => <svg {...I(p)}><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" /></svg>
const IconChart = (p: IconProps) => <svg {...I(p)}><path d="M18 20V10M12 20V4M6 20v-6" /></svg>
const IconExternal = (p: IconProps) => <svg {...I(p)}><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" /><polyline points="15 3 21 3 21 9" /><line x1="10" y1="14" x2="21" y2="3" /></svg>
const IconPaperclip = (p: IconProps) => <svg {...I(p)}><path d="m21.44 11.05-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48" /></svg>
const IconImage = (p: IconProps) => <svg {...I(p)}><rect x="3" y="3" width="18" height="18" rx="2" /><circle cx="8.5" cy="8.5" r="1.5" /><path d="m21 15-5-5L5 21" /></svg>
const IconCalendar = (p: IconProps) => <svg {...I(p)}><rect x="3" y="4" width="18" height="18" rx="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" /></svg>
const IconChevronLeft = (p: IconProps) => <svg {...I(p)}><polyline points="15 18 9 12 15 6" /></svg>
const IconChevronRight = (p: IconProps) => <svg {...I(p)}><polyline points="9 18 15 12 9 6" /></svg>
const IconSend = (p: IconProps) => <svg {...I(p)}><line x1="22" y1="2" x2="11" y2="13" /><polygon points="22 2 15 22 11 13 2 9 22 2" /></svg>

/* Avatar tint palette — built from the brand blue plus a few cohesive hues. */
const AV = {
  blue: { background: 'oklch(95% 0.03 258)', color: 'oklch(40% 0.15 258)' },
  cyan: { background: 'oklch(95% 0.045 232)', color: 'oklch(44% 0.12 232)' },
  green: { background: 'oklch(95% 0.05 152)', color: 'oklch(42% 0.13 152)' },
  amber: { background: 'oklch(95% 0.06 75)', color: 'oklch(45% 0.11 65)' },
} as const

/* ============================================================
   Section components
============================================================ */

function Nav({ open, setOpen }: { open: boolean; setOpen: (v: boolean) => void }) {
  return (
    <nav aria-label="Navigasi utama">
      <div className="nav-inner">
      <a className="nav-brand" href="#top">
        <img className="brand-logo" src={notiveLogo} width={34} height={34} alt="" aria-hidden="true" />
        <span className="nav-brand-name">Notive</span>
      </a>
      <ul className="nav-links" role="menubar">
        <li role="none"><a role="menuitem" href="#nora">Nora</a></li>
        <li role="none"><a role="menuitem" href="#features">Fitur</a></li>
        <li role="none"><a role="menuitem" href="#kalkulator">Kalkulator</a></li>
        <li role="none"><a role="menuitem" href="#how">Cara Kerja</a></li>
        <li role="none"><a role="menuitem" href="#pricing">Harga</a></li>
        <li role="none"><a role="menuitem" href="#faq">FAQ</a></li>
      </ul>
      <div className="nav-right">
        <a href="#login" className="btn-outline">Masuk</a>
        <a href="https://dashboard.notive.id/register" className="btn-cta">Coba 14 hari gratis</a>
      </div>
      <button
        className="nav-toggle"
        aria-expanded={open}
        aria-controls="mobile-menu"
        aria-label={open ? 'Tutup menu' : 'Buka menu'}
        onClick={() => setOpen(!open)}
      >
        {open ? <IconX size={20} /> : <IconMenu size={20} />}
      </button>
      </div>

      <div id="mobile-menu" className={`mobile-menu ${open ? 'open' : ''}`} role="dialog" aria-modal="true" aria-label="Menu navigasi">
        <a href="#nora" onClick={() => setOpen(false)}>Nora</a>
        <a href="#features" onClick={() => setOpen(false)}>Fitur</a>
        <a href="#kalkulator" onClick={() => setOpen(false)}>Kalkulator</a>
        <a href="#how" onClick={() => setOpen(false)}>Cara Kerja</a>
        <a href="#pricing" onClick={() => setOpen(false)}>Harga</a>
        <a href="#faq" onClick={() => setOpen(false)}>FAQ</a>
        <div className="mobile-menu-actions">
          <a href="#login" className="btn-outline" onClick={() => setOpen(false)}>Masuk</a>
          <a href="https://dashboard.notive.id/register" className="btn-cta" onClick={() => setOpen(false)}>Coba 14 hari gratis</a>
        </div>
      </div>
    </nav>
  )
}

function Hero() {
  return (
    <section id="top" className="hero-section">
      <div className="hero">
        <div className="hero-copy">
          <h1 className="hero-title reveal">
            Kelola seluruh order kantor notaris <span className="hero-accent">dalam satu tempat</span>
          </h1>
          <p className="hero-sub reveal delay-1">
            Dari pelacakan Jual Beli dan Hak Tanggungan hingga berkas di Google Drive kantor Anda,
            laporan bisnis, dan Nora, asisten pribadi yang siap membantu dalam Bahasa Indonesia.
            Notive menggantikan spreadsheet lama tanpa pernah menyimpan dokumen Anda.
          </p>
          <div className="hero-actions reveal delay-2">
            <a href="https://dashboard.notive.id/register" className="btn-hero-primary">
              Mulai uji coba gratis
              <IconArrowRight size={14} />
            </a>
            <a href="#demo" className="btn-hero-secondary">
              <IconPlay size={14} />
              Lihat demo (2 menit)
            </a>
          </div>
          <ul className="hero-trust reveal delay-2">
            <li><IconShield size={15} /> Data terisolasi per kantor</li>
            <li><IconFolder size={15} /> Berkas tetap di Google Drive Anda</li>
            <li><IconTrending size={15} /> Laporan beban kerja PIC</li>
          </ul>
        </div>

        <figure className="hero-shot reveal delay-2">
          <div className="shot-frame">
            <div className="shot-bar" aria-hidden="true">
              <span className="shot-dot" />
              <span className="shot-dot" />
              <span className="shot-dot" />
              <span className="shot-url">app.notive.id/activities</span>
            </div>
            <img
              className="shot-img"
              src={dashboardPreview}
              width={1024}
              height={485}
              loading="eager"
              fetchPriority="high"
              decoding="async"
              alt="Dashboard Notive menampilkan daftar order notaris lengkap dengan filter PIC, status, dan pembayaran"
            />
          </div>
          <figcaption className="shot-caption">Daftar order langsung dari kantor notaris yang memakai Notive setiap hari.</figcaption>
        </figure>
      </div>
    </section>
  )
}

function TrustBar() {
  const items = [
    { icon: <IconScale size={14} />, label: 'Ikatan Notaris Indonesia' },
    { icon: <IconBuilding size={14} />, label: 'Notaris Profesional' },
    { icon: <IconBadgeCheck size={14} />, label: 'PPAT Bersertifikat' },
    { icon: <IconUsers size={14} />, label: 'Asosiasi Notaris Muda' },
    { icon: <IconShield size={14} />, label: 'Siap standar ISO 27001' },
  ]
  return (
    <div className="logos-bar">
      <div className="logos-inner">
        <span className="logos-label">Dipercaya notaris di seluruh Indonesia</span>
        <div className="logos-list">
          {items.map((it) => (
            <div className="logo-item" key={it.label}>
              <div className="logo-badge">{it.icon}</div>
              {it.label}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

type Feature = {
  id: string
  title: string
  body: string
  icon: React.ReactNode
  preview: React.ReactNode
}

const FEATURES: Feature[] = [
  {
    id: 'orders',
    title: 'Manajemen order menyeluruh',
    body: 'Buat, edit, dan lacak setiap order (Jual Beli, Hak Tanggungan, Hibah, dan lainnya) dengan catatan progress, pencarian mudah, serta status Aktif atau Lunas.',
    icon: <IconFileText size={16} />,
    preview: <PreviewOrders />,
  },
  {
    id: 'drive',
    title: 'Berkas di Google Drive kantor Anda',
    body: 'Hubungkan Google Drive kantor. Notive membuat folder per order otomatis. Dokumen tetap milik Anda; Notive tidak menyimpan atau menguasai berkas.',
    icon: <IconFolder size={16} />,
    preview: <PreviewDrive />,
  },
  {
    id: 'pic',
    title: 'Tim Notaris & PIC Internal',
    body: 'Owner terdaftar sebagai Notaris. Tambah staf sebagai PIC Internal. Setiap order punya penanggung jawab yang jelas, dan data hanya terlihat di dalam kantor Anda.',
    icon: <IconUsers size={16} />,
    preview: <PreviewPic />,
  },
  {
    id: 'analytics',
    title: 'Laporan bisnis kantor',
    body: 'Lihat berapa order masuk, yang aktif, yang sudah lunas, tren tiap bulan, dan beban kerja PIC. Pilih periode: bulan ini, bulan lalu, 6 bulan, atau tanggal sendiri.',
    icon: <IconChart size={16} />,
    preview: <PreviewAnalytics />,
  },
  {
    id: 'ocr',
    title: 'Isi formulir dari PDF',
    body: 'Unggah PDF akta, lalu Notive mengisi nama klien, sertifikat, PIC Bank, transaksi, dan progress secara otomatis. Anda tinggal memeriksa sebelum menyimpan.',
    icon: <IconScan size={16} />,
    preview: <PreviewOcr />,
  },
  {
    id: 'nora',
    title: 'Nora, asisten pribadi kantor',
    body: 'Tanya Nora seperti berbicara dengan staf: siapa PIC yang sibuk, order mana yang belum lunas, atau berkas apa saja di folder Drive. Jawabannya dalam Bahasa Indonesia.',
    icon: <IconSparkles size={16} />,
    preview: <PreviewChat />,
  },
]

function Features() {
  const [active, setActive] = useState(FEATURES[0].id)
  const current = FEATURES.find((f) => f.id === active) ?? FEATURES[0]

  const selectFeature = (id: string) => setActive(id)

  return (
    <section id="features" className="features-section">
      <div className="section-wrap">
        <div className="features-layout">
          <div>
            <h2 className="section-title reveal">
              Semua yang dibutuhkan kantor notaris
            </h2>
            <p className="section-body reveal delay-1 features-intro">
              Dirancang untuk alur kerja notaris Indonesia: order, PIC, berkas di Google Drive
              kantor Anda, laporan bisnis, dan Nora. Bukan aplikasi rumit yang membingungkan.
            </p>
            <div className="features-list" role="tablist" aria-label="Daftar fitur">
              {FEATURES.map((f) => (
                <button
                  key={f.id}
                  type="button"
                  role="tab"
                  aria-selected={active === f.id}
                  aria-controls={`feature-panel-${f.id}`}
                  id={`feature-tab-${f.id}`}
                  className={`feature-item ${active === f.id ? 'active' : ''}`}
                  onPointerEnter={() => selectFeature(f.id)}
                  onClick={() => selectFeature(f.id)}
                >
                  <div className="feature-icon-wrap">{f.icon}</div>
                  <div className="feature-text">
                    <h3>{f.title}</h3>
                    <p>{f.body}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div className="features-preview" aria-live="polite">
            <div className="feature-screen">
              <div className="fscreen-bar">
                <div className="fbar-dot" />
                <div className="fbar-dot" />
                <div className="fbar-dot" />
                <div className="fscreen-title">{current.title}</div>
              </div>
              <div className="fscreen-body">
                <div className="fscreen-panels">
                  {FEATURES.map((f) => (
                    <div
                      key={f.id}
                      id={`feature-panel-${f.id}`}
                      role="tabpanel"
                      aria-labelledby={`feature-tab-${f.id}`}
                      className={`fscreen-panel ${active === f.id ? 'is-active' : ''}`}
                      aria-hidden={active !== f.id}
                    >
                      {f.preview}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function PreviewOrders() {
  const rows = [
    { id: 'O-0042', name: 'PT Maju Bersama', tx: 'Jual Beli', date: '20/05', status: 'pending', label: 'Aktif' },
    { id: 'O-0041', name: 'Budi Santoso', tx: 'Hak Tanggungan', date: '19/05', status: 'done', label: 'Lunas' },
    { id: 'O-0040', name: 'PT Sejahtera Abadi', tx: 'Perubahan AD', date: '18/05', status: 'draft', label: 'Tagihan' },
    { id: 'O-0039', name: 'Siti Aisyah', tx: 'Hibah', date: '17/05', status: 'pending', label: 'Aktif' },
    { id: 'O-0038', name: 'Andi Wijaya', tx: 'Kuasa', date: '16/05', status: 'done', label: 'Lunas' },
  ]
  return (
    <>
      <div className="akta-header">
        <div className="akta-title">Daftar Order</div>
        <div className="akta-btn"><IconArrowRight size={11} /> Buat Order</div>
      </div>
      {rows.map((r) => (
        <div className="akta-row" key={r.id}>
          <div className="akta-num">{r.id}</div>
          <div className="akta-info">
            <div className="akta-info-name">{r.name}</div>
            <div className="akta-info-meta">{r.tx} · diperbarui {r.date}/2024</div>
          </div>
          <span className={`status-pill ${r.status}`}>{r.label}</span>
        </div>
      ))}
    </>
  )
}

function PreviewPic() {
  const pics = [
    { initials: 'AP', name: 'Amanda Putri', role: 'Notaris', count: 64, tint: AV.blue },
    { initials: 'RS', name: 'Rina Sari', role: 'PIC Internal', count: 38, tint: AV.amber },
    { initials: 'AW', name: 'Andi Wijaya', role: 'PIC Internal', count: 27, tint: AV.green },
    { initials: 'DP', name: 'Dewi Pratiwi', role: 'PIC Internal', count: 23, tint: AV.cyan },
  ]
  return (
    <>
      <div className="akta-header">
        <div className="akta-title">Tim Kantor</div>
        <div className="akta-btn"><IconUsers size={11} /> Tambah PIC</div>
      </div>
      {pics.map((p) => (
        <div className="client-card" key={p.initials}>
          <div className="client-avatar" style={p.tint}>{p.initials}</div>
          <div>
            <div className="client-name">{p.name}</div>
            <div className="client-meta">{p.role}</div>
          </div>
          <div className="client-count">
            <div className="client-count-num">{p.count}</div>
            <div className="client-count-label">order ditangani</div>
          </div>
        </div>
      ))}
    </>
  )
}

function PreviewDrive() {
  const files = [
    { name: 'KTP-Budi-Santoso.pdf', size: '240 KB' },
    { name: 'Sertifikat-HM-04827.pdf', size: '1,2 MB' },
    { name: 'Surat-Bank-BCA.pdf', size: '380 KB' },
    { name: 'Draft-AJB.docx', size: '96 KB' },
  ]
  return (
    <>
      <div className="akta-header">
        <div className="akta-title">Berkas di Google Drive</div>
        <div className="akta-btn"><IconExternal size={11} /> Buka folder</div>
      </div>
      <div className="drive-path">
        <IconFolder size={14} />
        <span>Notive - Kantor Amanda / O-0041 Budi Santoso</span>
      </div>
      {files.map((f) => (
        <div className="drive-file" key={f.name}>
          <div className="drive-file-icon"><IconFile size={14} /></div>
          <div className="drive-file-meta">
            <div className="drive-file-name">{f.name}</div>
            <div className="drive-file-size">{f.size}</div>
          </div>
          <span className="drive-file-open">Buka</span>
        </div>
      ))}
      <p className="drive-note">Berkas tersimpan di Google Drive kantor. Notive hanya menampilkan nama file.</p>
    </>
  )
}

function PreviewAnalytics() {
  const tiles = [
    { label: 'Total order', value: '48' },
    { label: 'Aktif', value: '31' },
    { label: 'Lunas', value: '22' },
    { label: 'Non-aktif', value: '17' },
  ]
  const bars = [
    { label: 'Jual Beli', pct: 72 },
    { label: 'Hak Tanggungan', pct: 48 },
    { label: 'Hibah', pct: 28 },
    { label: 'Lainnya', pct: 18 },
  ]
  return (
    <>
      <div className="akta-header">
        <div className="akta-title">Laporan bisnis</div>
        <div className="akta-btn-ghost">Bulan ini</div>
      </div>
      <div className="analytics-tiles">
        {tiles.map((t) => (
          <div className="analytics-tile" key={t.label}>
            <div className="analytics-tile-val">{t.value}</div>
            <div className="analytics-tile-lbl">{t.label}</div>
          </div>
        ))}
      </div>
      <div className="analytics-chart-label">Transaksi hukum</div>
      {bars.map((b) => (
        <div className="analytics-bar-row" key={b.label}>
          <span className="analytics-bar-lbl">{b.label}</span>
          <div className="analytics-bar-track">
            <div className="analytics-bar-fill" style={{ width: `${b.pct}%` }} />
          </div>
        </div>
      ))}
    </>
  )
}

function PreviewOcr() {
  return (
    <>
      <div className="akta-header">
        <div className="akta-title">Autofill dari PDF</div>
        <div className="akta-btn"><IconSparkles size={11} /> Ekstrak</div>
      </div>
      <div className="ocr-drop">
        <div className="ocr-drop-icon"><IconFile size={18} /></div>
        <div>
          <div className="ocr-drop-name">akta-jualbeli-budisantoso.pdf</div>
          <div className="ocr-drop-meta">Diisi otomatis dari PDF · maks. 500 KB</div>
        </div>
        <div className="ocr-progress"><div className="ocr-progress-bar" /></div>
      </div>
      <div className="ocr-field"><span className="ocr-label">Nama Klien</span><span className="ocr-value">Budi Santoso</span></div>
      <div className="ocr-field"><span className="ocr-label">No. Sertifikat</span><span className="ocr-value">HM-04827, HM-04828</span></div>
      <div className="ocr-field"><span className="ocr-label">PIC Bank</span><span className="ocr-value">Indra (Bank BCA)</span></div>
      <div className="ocr-field"><span className="ocr-label">Transaksi</span><span className="ocr-value">Hak Tanggungan</span></div>
      <div className="ocr-field"><span className="ocr-label">PIC Internal</span><span className="ocr-value ocr-match">Andi Wijaya <IconBadgeCheck size={11} /></span></div>
    </>
  )
}

function PreviewChat() {
  return (
    <>
      <div className="wa-mini">
        <div className="wa-mini-header">
          <span className="wa-avatar-wrap" aria-hidden="true">
            <img className="wa-avatar" src={notiveLogo} width={26} height={26} alt="" />
          </span>
          <div>
            <div className="wa-mini-name">Nora</div>
            <div className="wa-mini-status">online</div>
          </div>
        </div>
        <div className="wa-mini-body">
          <div className="wa-bubble wa-in">Ada yang bisa Nora bantu?</div>
          <div className="wa-bubble wa-out">File apa saja di order Budi Santoso?</div>
          <div className="wa-bubble wa-in">
            Ada 3 berkas di folder Drive:
            <div className="wa-attach-list">
              <span className="wa-attach"><IconFile size={12} /> KTP.pdf</span>
              <span className="wa-attach"><IconImage size={12} /> foto-sertifikat.jpg</span>
              <span className="wa-attach"><IconFile size={12} /> ringkasan.csv</span>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

function WaAttach({
  name,
  meta,
  kind = 'file',
}: {
  name: string
  meta: string
  kind?: 'file' | 'image' | 'sheet'
}) {
  const icon =
    kind === 'image' ? <IconImage size={18} /> :
    kind === 'sheet' ? <IconFileText size={18} /> :
    <IconFile size={18} />
  return (
    <div className="wa-file-card">
      <div className={`wa-file-icon wa-file-${kind}`}>{icon}</div>
      <div className="wa-file-meta">
        <div className="wa-file-name">{name}</div>
        <div className="wa-file-size">{meta}</div>
      </div>
    </div>
  )
}

const NORA_SLIDES = [
  {
    id: 'docs',
    caption: 'Minta dokumen order',
    messages: (
      <>
        <div className="wa-bubble wa-out">
          Berikan saya semua dokumen untuk order Budi Santoso
        </div>
        <div className="wa-bubble wa-in">
          <p>Siap. Berikut semua berkas di folder order <strong>Budi Santoso</strong>:</p>
          <div className="wa-attach-stack">
            <WaAttach name="KTP-Budi-Santoso.pdf" meta="PDF · 240 KB" kind="file" />
            <WaAttach name="foto-sertifikat.jpg" meta="JPG · 1,1 MB" kind="image" />
            <WaAttach name="ringkasan-biaya.csv" meta="CSV · 48 KB" kind="sheet" />
          </div>
        </div>
      </>
    ),
  },
  {
    id: 'save',
    caption: 'Simpan berkas ke Drive',
    messages: (
      <>
        <div className="wa-bubble wa-out">
          Tolong simpan berkas ini
          <div className="wa-attach-stack">
            <WaAttach name="Surat-Kuasa-Bank.pdf" meta="PDF · 312 KB" kind="file" />
          </div>
        </div>
        <div className="wa-bubble wa-in">
          <p>Sudah tersimpan di Google Drive kantor Anda.</p>
          <p className="wa-path"><IconFolder size={12} /> Notive - Kantor Amanda / O-0041 Budi Santoso</p>
          <p>Folder sudah terorganisir per order, jadi mudah dicari nanti.</p>
        </div>
      </>
    ),
  },
  {
    id: 'convert',
    caption: 'Ubah jadi PDF',
    messages: (
      <>
        <div className="wa-bubble wa-out">
          Tolong ubah berkas ini menjadi PDF
          <div className="wa-attach-stack">
            <WaAttach name="Draft-AJB.docx" meta="DOCX · 96 KB" kind="sheet" />
          </div>
        </div>
        <div className="wa-bubble wa-in">
          <p>Sudah. Berikut hasil konversinya:</p>
          <div className="wa-attach-stack">
            <WaAttach name="Draft-AJB.pdf" meta="PDF · 180 KB" kind="file" />
          </div>
          <p>Mau Nora simpan juga ke folder Drive order yang terkait?</p>
        </div>
      </>
    ),
  },
  {
    id: 'orders',
    caption: 'Cek order belum lunas',
    messages: (
      <>
        <div className="wa-bubble wa-out">
          Tampilkan order Jual Beli yang belum lunas di bulan ini
        </div>
        <div className="wa-bubble wa-in">
          <p>Ada <strong>8 order Jual Beli</strong> dengan status Tagihan bulan ini:</p>
          <table className="wa-table">
            <thead><tr><th>Klien</th><th>PIC</th><th>Status</th></tr></thead>
            <tbody>
              <tr><td>PT Maju Bersama</td><td>Rina S.</td><td>Tagihan</td></tr>
              <tr><td>Citra Lestari</td><td>Andi W.</td><td>Tagihan</td></tr>
              <tr><td>PT Bumi Hijau</td><td>Rina S.</td><td>Tagihan</td></tr>
            </tbody>
          </table>
          <p className="wa-hint">Ketik "lanjut" untuk melihat yang berikutnya.</p>
        </div>
      </>
    ),
  },
  {
    id: 'reminder',
    caption: 'Buat pengingat',
    messages: (
      <>
        <div className="wa-bubble wa-out">
          Buatkan reminder untuk order Budi Santoso: tanda tangan akta hari Jumat jam 10.00
        </div>
        <div className="wa-bubble wa-in">
          <p>Sudah. Nora menyimpan pengingat di Google Calendar Anda.</p>
          <div className="wa-cal-card">
            <div className="wa-cal-icon"><IconCalendar size={16} /></div>
            <div>
              <div className="wa-cal-title">Tanda tangan akta · Budi Santoso</div>
              <div className="wa-cal-when">Jumat, 10.00 · Google Calendar</div>
            </div>
          </div>
          <p>Nora akan mengingatkan Anda menjelang waktunya.</p>
        </div>
      </>
    ),
  },
] as const

function Nora() {
  const [slide, setSlide] = useState(0)
  const total = NORA_SLIDES.length
  const current = NORA_SLIDES[slide]

  const go = (next: number) => {
    setSlide(((next % total) + total) % total)
  }

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce) return
    const id = window.setInterval(() => setSlide((s) => (s + 1) % total), 5500)
    return () => window.clearInterval(id)
  }, [total])

  return (
    <section id="nora" className="notibot-section">
      <div className="section-wrap">
        <div className="notibot-layout">
          <div className="notibot-copy">
            <h2 className="section-title reveal">
              Perkenalkan sahabat baru Anda, <span className="hero-accent">Nora</span>
            </h2>
            <p className="section-body reveal delay-1 notibot-body">
              Nora adalah asisten pribadi kantor notaris Anda. Chat seperti di WhatsApp: minta dokumen,
              simpan berkas ke Drive, ubah ke PDF, cek order, atau buat pengingat di kalender. Semuanya
              dalam Bahasa Indonesia.
            </p>
            <ul className="notibot-list reveal delay-2">
              <li><IconFolder size={16} /> Kirim atau minta dokumen order, langsung dari chat</li>
              <li><IconBadgeCheck size={16} /> Simpan berkas ke Google Drive yang sudah terorganisir per order</li>
              <li><IconFileText size={16} /> Ubah dokumen menjadi PDF tanpa ribet</li>
              <li><IconCalendar size={16} /> Buat pengingat ke Google Calendar untuk jadwal akta</li>
              <li><IconLock size={16} /> Hanya data kantor Anda; Nora tidak mengubah data tanpa perintah jelas</li>
            </ul>
          </div>

          <div className="nora-carousel reveal delay-1">
            <div className="wa-phone">
              <div className="wa-status-bar" aria-hidden="true">
                <span>09:41</span>
                <span className="wa-status-icons">●●●</span>
              </div>
              <div className="wa-header">
                <span className="wa-avatar-wrap" aria-hidden="true">
                  <img className="wa-avatar" src={notiveLogo} width={26} height={26} alt="" />
                </span>
                <div className="wa-header-text">
                  <div className="wa-header-name">Nora</div>
                  <div className="wa-header-sub">online</div>
                </div>
              </div>
              <div className="wa-body-stack" aria-live="polite">
                {NORA_SLIDES.map((s, i) => (
                  <div
                    key={s.id}
                    className={`wa-slide ${i === slide ? 'is-active' : ''}`}
                    aria-hidden={i !== slide}
                  >
                    <div className="wa-day">Hari ini</div>
                    {s.messages}
                  </div>
                ))}
              </div>
              <div className="wa-composer" aria-hidden="true">
                <span className="wa-composer-clip"><IconPaperclip size={18} /></span>
                <span className="wa-composer-input">Tanya Nora…</span>
                <span className="wa-composer-send"><IconSend size={16} /></span>
              </div>
            </div>

            <div className="nora-carousel-controls">
              <button
                type="button"
                className="nora-nav-btn"
                aria-label="Contoh sebelumnya"
                onClick={() => go(slide - 1)}
              >
                <IconChevronLeft size={18} />
              </button>
              <div className="nora-dots" role="tablist" aria-label="Contoh percakapan Nora">
                {NORA_SLIDES.map((s, i) => (
                  <button
                    key={s.id}
                    type="button"
                    role="tab"
                    aria-selected={i === slide}
                    aria-label={s.caption}
                    className={`nora-dot ${i === slide ? 'is-active' : ''}`}
                    onClick={() => setSlide(i)}
                  />
                ))}
              </div>
              <button
                type="button"
                className="nora-nav-btn"
                aria-label="Contoh berikutnya"
                onClick={() => go(slide + 1)}
              >
                <IconChevronRight size={18} />
              </button>
            </div>
            <p className="nora-caption">{current.caption}</p>
          </div>
        </div>
      </div>
    </section>
  )
}

function Stats() {
  const items = [
    { num: '2.800', sup: '+', lbl: 'Notaris aktif' },
    { num: '140K', sup: '+', lbl: 'Order diproses' },
    { num: '34', sup: '', lbl: 'Provinsi terjangkau' },
    { num: '99,9', sup: '%', lbl: 'Uptime SLA' },
  ]
  return (
    <section className="stats-strip" aria-label="Statistik Notive">
      <div className="section-wrap" style={{ padding: '0' }}>
        <div className="stats-grid">
          {items.map((s, i) => (
            <div className={`stat-block reveal delay-${i}`} key={s.lbl}>
              <div className="stat-num">{s.num}{s.sup && <sup>{s.sup}</sup>}</div>
              <div className="stat-lbl">{s.lbl}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function HowItWorks() {
  const steps = [
    { n: 1, title: 'Daftar kantor', body: 'Buat akun Notaris (owner) dan kantor dalam dua menit. Uji coba 14 hari, tanpa kartu kredit, langsung aktif.' },
    { n: 2, title: 'Hubungkan Drive & tambah PIC', body: 'Sambungkan Google Drive kantor, lalu undang staf sebagai PIC. Data tiap kantor tetap terpisah dan aman.' },
    { n: 3, title: 'Buat atau impor order', body: 'Buat order manual, isi otomatis dari PDF, atau impor dari spreadsheet. Folder Drive dibuat otomatis per order.' },
    { n: 4, title: 'Pantau & tanya Nora', body: 'Lihat laporan bisnis, cari order dengan mudah, dan tanya Nora kapan saja, seperti bertanya ke rekan kerja.' },
  ]
  return (
    <section id="how" className="how-section">
      <div className="section-wrap">
        <div className="how-header">
          <h2 className="section-title reveal centered">Produktif dalam hitungan menit</h2>
          <p className="section-body reveal delay-1 centered">
            Tidak perlu pelatihan panjang. Onboarding Notive dirancang agar staf baru bisa langsung
            bekerja di hari pertama.
          </p>
        </div>
        <div className="how-steps">
          <div className="how-connector" aria-hidden="true" />
          {steps.map((s, i) => (
            <div className={`how-step reveal delay-${i}`} key={s.n}>
              <div className={`step-num-wrap ${i === 0 ? 'highlighted' : ''}`}>{s.n}</div>
              <h3>{s.title}</h3>
              <p>{s.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function Testimonials() {
  const items = [
    {
      stars: 5,
      quote: 'Dulu staf saya butuh 3 jam tiap pagi untuk memperbarui spreadsheet order. Sekarang cukup 20 menit, dan saya bisa langsung melihat PIC mana yang sedang kelebihan beban tanpa bertanya.',
      name: 'Sri Wahyuni, S.H., M.Kn.',
      role: 'Notaris & PPAT · Jakarta Selatan',
      tint: AV.blue,
      initials: 'SW',
    },
    {
      stars: 5,
      quote: 'Berkas tetap di Google Drive kantor kami. Notive hanya mengorganisir folder per order. Saya tenang karena dokumen tidak pindah ke server orang lain.',
      name: 'Benny Prasetyo, S.H.',
      role: 'Notaris · Surabaya',
      tint: AV.amber,
      initials: 'BP',
    },
    {
      stars: 5,
      quote: 'Nora mengerti pertanyaan saya dalam Bahasa Indonesia, termasuk "file apa saja di order ini?". Laporan bisnis juga membantu saya lihat beban PIC tiap bulan.',
      name: 'Ratna Hendryati, S.H., M.Kn.',
      role: 'Notaris · Bandung',
      tint: AV.green,
      initials: 'RH',
    },
  ]
  return (
    <section className="testimonials-section">
      <div className="section-wrap">
        <div className="testimonials-header">
          <h2 className="section-title reveal centered">Dipercaya notaris yang menolak kompromi</h2>
        </div>
        <div className="testimonials-grid">
          {items.map((t, i) => (
            <article className={`testimonial-card reveal delay-${i}`} key={t.name}>
              <div className="tcard-stars" aria-label={`${t.stars} dari 5 bintang`}>
                {Array.from({ length: t.stars }).map((_, k) => (
                  <svg key={k} width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" /></svg>
                ))}
              </div>
              <p className="tcard-quote">"{t.quote}"</p>
              <div className="tcard-author">
                <div className="tcard-avatar" style={t.tint}>{t.initials}</div>
                <div>
                  <div className="tcard-name">{t.name}</div>
                  <div className="tcard-role">{t.role}</div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

function Pricing() {
  const plans: {
    name: string; desc: string; price: string; currency?: string; period?: string;
    features: string[]; cta: string; featured?: boolean;
  }[] = [
    {
      name: 'Pemula',
      desc: 'Untuk notaris perorangan yang baru memulai digitalisasi.',
      currency: 'Rp',
      price: '299K',
      period: '/ bulan',
      features: [
        'Hingga 100 order per bulan',
        '2 PIC internal',
        'Filter & pencarian dasar',
        'Berkas di Google Drive kantor',
        'Dukungan via email',
      ],
      cta: 'Mulai uji coba 14 hari',
    },
    {
      name: 'Profesional',
      desc: 'Untuk kantor notaris aktif dengan tim 3 sampai 10 orang.',
      currency: 'Rp',
      price: '999K',
      period: '/ bulan',
      features: [
        'Order tidak terbatas',
        'PIC tidak terbatas',
        'Berkas di Google Drive kantor',
        'Laporan bisnis',
        'Isi formulir otomatis dari PDF',
        'Impor dari spreadsheet (CSV)',
        'Nora, asisten pribadi · 1.000 pertanyaan/bulan',
        'Dukungan WhatsApp prioritas',
      ],
      cta: 'Mulai uji coba 14 hari',
      featured: true,
    },
    {
      name: 'Firma',
      desc: 'Untuk firma hukum dan jaringan kantor multi-cabang.',
      price: 'Hubungi kami',
      features: [
        'Multi-kantor (aman antar cabang)',
        'Jaminan layanan 99,9%',
        'Bantuan khusus WhatsApp & desktop',
        'Batas pertanyaan Nora yang lebih besar',
        'Manajer akun dedikasi',
        'Onboarding & pelatihan tim',
        'Prioritas fitur baru',
      ],
      cta: 'Jadwalkan demo',
    },
  ]

  return (
    <section id="pricing" className="pricing-section">
      <div className="section-wrap">
        <div className="pricing-header">
          <h2 className="section-title reveal centered">Harga transparan, tanpa kejutan</h2>
          <p className="section-body reveal delay-1 centered">
            Semua paket mencakup data terpisah per kantor, keamanan login, dan pembaruan platform
            berkala. Uji coba 14 hari tanpa kartu kredit.
          </p>
        </div>
        <div className="pricing-grid">
          {plans.map((p, i) => (
            <div className={`price-card reveal delay-${i} ${p.featured ? 'featured' : ''}`} key={p.name}>
              {p.featured && <div className="featured-tag">Paling populer</div>}
              <div className="plan-name-txt">{p.name}</div>
              <div className="plan-desc-txt">{p.desc}</div>
              <div className="plan-price-wrap">
                {p.currency && <span className="plan-currency">{p.currency}</span>}
                <span className="plan-amount">{p.price}</span>
                {p.period && <span className="plan-period">{p.period}</span>}
              </div>
              <div className="plan-divider" />
              <ul className="plan-feature-list">
                {p.features.map((f) => <li key={f}><IconCheck size={15} /> {f}</li>)}
              </ul>
              <a href="https://dashboard.notive.id/register" className={p.featured ? 'btn-plan-featured' : 'btn-plan-outline'}>{p.cta}</a>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function Faq() {
  const items = [
    {
      q: 'Bagaimana Notive memastikan data kantor saya tidak bocor ke kantor lain?',
      a: 'Setiap kantor punya ruang data sendiri. Saat Anda masuk, Notive hanya menampilkan order dan PIC milik kantor Anda. Kantor lain tidak bisa melihat data Anda, begitu pula sebaliknya.',
    },
    {
      q: 'Apakah dokumen saya disimpan di server Notive?',
      a: 'Tidak. Berkas tetap di Google Drive kantor Anda. Notive hanya membantu membuat folder per order dan menampilkan nama file. Isi dokumen tidak dipindahkan ke server Notive.',
    },
    {
      q: 'Apakah Nora bisa menghapus atau mengubah data kantor saya?',
      a: 'Tidak. Nora hanya membantu mencari dan menjelaskan. Ia tidak bisa menambah, mengubah, atau menghapus order maupun berkas. Setiap permintaan seperti itu akan ditolak dengan sopan.',
    },
    {
      q: 'Apa itu laporan bisnis?',
      a: 'Ringkasan kinerja kantor: berapa order masuk, yang aktif, yang sudah lunas, tren per bulan, serta beban kerja tiap PIC. Anda bisa pilih bulan ini, bulan lalu, 6 bulan terakhir, atau tanggal sendiri.',
    },
    {
      q: 'Bagaimana cara memindahkan data dari spreadsheet lama kami?',
      a: 'Gunakan fitur Impor CSV. Unduh template dari Notive, isi dengan data lama (termasuk No. Sertifikat, PIC Bank, dan Progress). Maksimal 3 MB per berkas, dengan laporan baris mana yang gagal agar mudah diperbaiki.',
    },
    {
      q: 'Bagaimana cara berbicara dengan Nora?',
      a: 'Buka menu Tanya Nora di dashboard, lalu ketik pertanyaan seperti biasa, misalnya "Siapa PIC yang belum menangani order bulan ini?" atau "Berkas apa saja di order Budi Santoso?". Tidak perlu belajar istilah teknis.',
    },
  ]
  return (
    <section id="faq" className="faq-section">
      <div className="section-wrap">
        <div className="faq-header">
          <h2 className="section-title reveal centered">Pertanyaan yang sering muncul</h2>
        </div>
        <div className="faq-list">
          {items.map((it, i) => (
            <details key={i} className={`faq-item reveal delay-${Math.min(i, 3)}`}>
              <summary>
                <span>{it.q}</span>
                <IconChevronDown size={16} className="faq-chevron" />
              </summary>
              <div className="faq-answer">{it.a}</div>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}

function Cta() {
  return (
    <section id="trial" className="cta-banner">
      <div className="cta-inner reveal">
        <h2>Siap memodernkan kantor notaris Anda?</h2>
        <p>
          Bergabung bersama 2.800+ notaris yang sudah meninggalkan spreadsheet. Uji coba 14 hari,
          tanpa kartu kredit, batalkan kapan saja.
        </p>
        <div className="cta-actions">
          <a href="https://dashboard.notive.id/register" className="btn-hero-primary">
            Mulai uji coba 14 hari
            <IconArrowRight size={14} />
          </a>
          <a href="#" className="btn-hero-secondary">
            Bicara dengan tim
          </a>
        </div>
        <p className="cta-note">
          <IconCheck size={12} /> Tanpa kartu kredit
          <span className="cta-sep">·</span>
          <IconCheck size={12} /> Siap pakai di bawah 5 menit
          <span className="cta-sep">·</span>
          <IconCheck size={12} /> Batalkan kapan saja
        </p>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer>
      <div className="footer-main">
        <div className="footer-brand-col">
          <div className="footer-brand-row">
            <img className="brand-logo brand-logo-footer" src={notiveLogo} width={32} height={32} alt="" aria-hidden="true" />
            <span className="footer-brand-name">Notive</span>
          </div>
          <p className="footer-brand-desc">
            Platform manajemen order untuk notaris Indonesia. Order, PIC, Google Drive kantor Anda,
            laporan bisnis, dan Nora, asisten pribadi Anda. Dokumen tetap milik kantor.
          </p>
          <div className="footer-locale">
            <IconScale size={12} />
            <span>Dibuat di Indonesia · Bahasa Indonesia</span>
          </div>
        </div>
        <div className="footer-cols">
          <div className="footer-col">
            <div className="footer-col-title">Produk</div>
            <a href="#nora">Nora</a>
            <a href="#features">Fitur</a>
            <a href="#kalkulator">Kalkulator</a>
            <a href="#how">Cara Kerja</a>
            <a href="#pricing">Harga</a>
            <a href="https://dashboard.notive.id/register">Uji coba gratis</a>
          </div>
          <div className="footer-col">
            <div className="footer-col-title">Solusi</div>
            <a href="#">Notaris perorangan</a>
            <a href="#">Kantor notaris</a>
            <a href="#">Firma hukum</a>
            <a href="#">PPAT</a>
          </div>
          <div className="footer-col">
            <div className="footer-col-title">Keamanan</div>
            <a href="#">Data terpisah per kantor</a>
            <a href="#">Login aman</a>
            <a href="#">Kebijakan privasi</a>
            <a href="#">Syarat &amp; ketentuan</a>
          </div>
          <div className="footer-col">
            <div className="footer-col-title">Perusahaan</div>
            <a href="#">Tentang</a>
            <a href="#">Blog</a>
            <a href="#">Hubungi</a>
            <a href="#">Status</a>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <p>© 2026 Notive. Hak cipta dilindungi undang-undang.</p>
        <p>Notive bukan pengganti nasihat hukum profesional.</p>
      </div>
    </footer>
  )
}

/* ============================================================
   Main
============================================================ */

function App() {
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const root = document.documentElement
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const reveals = Array.from(document.querySelectorAll<HTMLElement>('.reveal'))

    if (reduce || typeof IntersectionObserver === 'undefined') {
      reveals.forEach((el) => el.classList.add('in'))
    } else {
      // Gate the entrance state only once JS is confirmed running, so the
      // content is visible by default for no-JS / headless renders.
      root.classList.add('js-reveal')
      const obs = new IntersectionObserver(
        (entries) => {
          entries.forEach((e) => {
            if (e.isIntersecting) {
              e.target.classList.add('in')
              obs.unobserve(e.target)
            }
          })
        },
        { threshold: 0.12, rootMargin: '0px 0px -8% 0px' }
      )
      reveals.forEach((el) => obs.observe(el))
      // Safety net: never leave a section hidden if the observer never fires.
      const fallback = window.setTimeout(() => reveals.forEach((el) => el.classList.add('in')), 2500)
      return () => {
        obs.disconnect()
        window.clearTimeout(fallback)
      }
    }
  }, [])

  useEffect(() => {
    const nav = document.querySelector('nav')
    const handleScroll = () => {
      if (!nav) return
      if (window.scrollY > 8) nav.classList.add('scrolled')
      else nav.classList.remove('scrolled')
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [mobileOpen])

  return (
    <>
      <a href="#features" className="skip-link">Lewati ke konten utama</a>
      <Nav open={mobileOpen} setOpen={setMobileOpen} />
      <main>
        <Hero />
        <Nora />
        <Features />
        <Calculator />
        <TrustBar />
        <Stats />
        <HowItWorks />
        <Testimonials />
        <Pricing />
        <Faq />
        <Cta />
      </main>
      <Footer />
    </>
  )
}

export default App
