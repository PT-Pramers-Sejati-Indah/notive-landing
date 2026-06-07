import { useEffect, useState, type SVGProps } from 'react'
import './App.css'
import dashboardPreview from './assets/dashboard-preview.webp'

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
const IconSearch = (p: IconProps) => <svg {...I(p)}><circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" /></svg>
const IconFile = (p: IconProps) => <svg {...I(p)}><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /></svg>
const IconFileText = (p: IconProps) => <svg {...I(p)}><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /><line x1="16" y1="13" x2="8" y2="13" /><line x1="16" y1="17" x2="8" y2="17" /></svg>
const IconUsers = (p: IconProps) => <svg {...I(p)}><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg>
const IconFilter = (p: IconProps) => <svg {...I(p)}><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" /></svg>
const IconUpload = (p: IconProps) => <svg {...I(p)}><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="17 8 12 3 7 8" /><line x1="12" y1="3" x2="12" y2="15" /></svg>
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
const IconDatabase = (p: IconProps) => <svg {...I(p)}><ellipse cx="12" cy="5" rx="9" ry="3" /><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" /><path d="M3 12c0 1.66 4 3 9 3s9-1.34 9-3" /></svg>
const IconArrowUpRight = (p: IconProps) => <svg {...I(p)}><line x1="7" y1="17" x2="17" y2="7" /><polyline points="7 7 17 7 17 17" /></svg>
const IconBolt = (p: IconProps) => <svg {...I(p)}><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" /></svg>

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
      <a className="nav-brand" href="#top">
        <div className="nav-logo-mark" aria-hidden="true">N</div>
        <span className="nav-brand-name">Notive</span>
      </a>
      <ul className="nav-links" role="menubar">
        <li role="none"><a role="menuitem" href="#features">Fitur</a></li>
        <li role="none"><a role="menuitem" href="#how">Cara Kerja</a></li>
        <li role="none"><a role="menuitem" href="#notibot">Notibot AI</a></li>
        <li role="none"><a role="menuitem" href="#pricing">Harga</a></li>
        <li role="none"><a role="menuitem" href="#faq">FAQ</a></li>
      </ul>
      <div className="nav-right">
        <a href="#login" className="btn-outline">Masuk</a>
        <a href="#trial" className="btn-cta">Coba 14 hari gratis</a>
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

      <div id="mobile-menu" className={`mobile-menu ${open ? 'open' : ''}`} role="dialog" aria-modal="true" aria-label="Menu navigasi">
        <a href="#features" onClick={() => setOpen(false)}>Fitur</a>
        <a href="#how" onClick={() => setOpen(false)}>Cara Kerja</a>
        <a href="#notibot" onClick={() => setOpen(false)}>Notibot AI</a>
        <a href="#pricing" onClick={() => setOpen(false)}>Harga</a>
        <a href="#faq" onClick={() => setOpen(false)}>FAQ</a>
        <div className="mobile-menu-actions">
          <a href="#login" className="btn-outline" onClick={() => setOpen(false)}>Masuk</a>
          <a href="#trial" className="btn-cta" onClick={() => setOpen(false)}>Coba 14 hari gratis</a>
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
            Dari pelacakan Jual Beli dan Hak Tanggungan hingga laporan PIC, Notive menggantikan
            spreadsheet lama Anda dengan satu dashboard yang aman, cepat, dan dilengkapi asisten AI
            berbahasa Indonesia.
          </p>
          <div className="hero-actions reveal delay-2">
            <a href="#trial" className="btn-hero-primary">
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
            <li><IconBolt size={15} /> Siap pakai di bawah 5 menit</li>
            <li><IconTrending size={15} /> Hemat 3 jam admin tiap hari</li>
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
    body: 'Buat, edit, dan lacak setiap order (Jual Beli, Hak Tanggungan, Hibah, dan lainnya) dengan timeline progress, lampiran tautan dokumen, dan riwayat lengkap.',
    icon: <IconFileText size={16} />,
    preview: <PreviewOrders />,
  },
  {
    id: 'pic',
    title: 'Tim internal & PIC',
    body: 'Tambahkan staf sebagai PIC kantor. Setiap order punya penanggung jawab yang jelas, terisolasi per kantor dengan validasi multi-tenant.',
    icon: <IconUsers size={16} />,
    preview: <PreviewPic />,
  },
  {
    id: 'filter',
    title: 'Pencarian & filter cerdas',
    body: 'Saring order berdasarkan PIC, tanggal transaksi, status pembayaran, dan jenis transaksi. Setiap filter tersimpan di URL sehingga bisa di-bookmark.',
    icon: <IconFilter size={16} />,
    preview: <PreviewFilter />,
  },
  {
    id: 'ocr',
    title: 'Autofill dari PDF (AI OCR)',
    body: 'Unggah PDF akta dan biarkan Gemini AI mengisi nama klien, nomor sertifikat, PIC Bank, dan timeline progress. Anda tinggal mengoreksi sebelum menyimpan.',
    icon: <IconScan size={16} />,
    preview: <PreviewOcr />,
  },
  {
    id: 'csv',
    title: 'Impor CSV massal',
    body: 'Pindahkan 100+ order sekaligus dari spreadsheet lama. Validasi per baris dengan laporan kesalahan terperinci, jadi Anda tidak perlu mulai dari nol.',
    icon: <IconUpload size={16} />,
    preview: <PreviewCsv />,
  },
  {
    id: 'ai',
    title: 'Notibot, asisten AI Bahasa Indonesia',
    body: '"Siapa PIC yang belum menangani order bulan ini?" Cukup tanya. Notibot bersifat read-only, hanya melihat data kantor Anda, dengan kuota 1.000 prompt per bulan.',
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
              Notive dirancang dari nol untuk alur kerja notaris Indonesia, bukan adaptasi dari
              perangkat generik buatan luar negeri.
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
    { initials: 'AP', name: 'Amanda Putri', role: 'Admin · Notaris', count: 64, tint: AV.blue },
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

function PreviewFilter() {
  return (
    <>
      <div className="akta-header">
        <div className="akta-title">Filter &amp; Pencarian</div>
        <div className="akta-btn-ghost">Reset</div>
      </div>
      <div className="filter-row">
        <label className="filter-chip filter-chip-input">
          <IconSearch size={11} />
          <input defaultValue="PT Maju" readOnly aria-label="Cari order" />
        </label>
      </div>
      <div className="filter-row">
        <span className="filter-chip"><span className="chip-key">PIC</span> Rina Sari <IconChevronDown size={10} /></span>
        <span className="filter-chip"><span className="chip-key">Status</span> Aktif <IconChevronDown size={10} /></span>
      </div>
      <div className="filter-row">
        <span className="filter-chip"><span className="chip-key">Tanggal</span> 01/05 s/d 31/05 <IconChevronDown size={10} /></span>
        <span className="filter-chip"><span className="chip-key">Pembayaran</span> Tagihan <IconChevronDown size={10} /></span>
      </div>
      <div className="filter-count">Menampilkan <strong>12</strong> dari 24 order</div>
      <div className="filter-url">
        <span className="filter-url-label">URL</span>
        <code>/activities?search=PT+Maju&amp;pic=rina&amp;status=active</code>
      </div>
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
          <div className="ocr-drop-meta">412 KB · Dipindai dengan Gemini AI</div>
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

function PreviewCsv() {
  return (
    <>
      <div className="akta-header">
        <div className="akta-title">Impor CSV</div>
        <div className="akta-btn"><IconUpload size={11} /> Unggah</div>
      </div>
      <div className="csv-summary">
        <div className="csv-summary-row">
          <span>Total diproses</span>
          <strong>50</strong>
        </div>
        <div className="csv-summary-row csv-ok">
          <span><IconCheck size={11} /> Berhasil</span>
          <strong>48</strong>
        </div>
        <div className="csv-summary-row csv-err">
          <span><IconX size={11} /> Gagal</span>
          <strong>2</strong>
        </div>
      </div>
      <div className="csv-err-row">
        <div className="csv-err-meta">
          <div className="csv-err-num">Baris 12</div>
          <div className="csv-err-name">"PT Tidak Terduga"</div>
        </div>
        <div className="csv-err-msg">Nama sudah ada di kantor</div>
      </div>
      <div className="csv-err-row">
        <div className="csv-err-meta">
          <div className="csv-err-num">Baris 27</div>
          <div className="csv-err-name">"Tanggal kosong"</div>
        </div>
        <div className="csv-err-msg">Format tanggal salah</div>
      </div>
    </>
  )
}

function PreviewChat() {
  return (
    <>
      <div className="akta-header">
        <div className="akta-title chat-title"><span className="chat-dot" /> Notibot · Online</div>
      </div>
      <div className="chat-bubble user">
        Siapa PIC yang belum menangani order bulan ini?
      </div>
      <div className="chat-bubble bot">
        <p>Berdasarkan data kantor Anda di bulan Mei 2024:</p>
        <ul>
          <li><strong>Dewi Pratiwi</strong>: 0 order baru</li>
          <li><strong>Indra Saputra</strong>: 0 order baru</li>
        </ul>
        <p>Total: <strong>2 dari 7 PIC</strong>. Ingin saya tampilkan order aktif untuk redistribusi?</p>
      </div>
      <div className="chat-input-mock">
        <span>Ketik pertanyaan Anda</span>
        <IconArrowUpRight size={11} />
      </div>
    </>
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
    { n: 1, title: 'Daftar kantor', body: 'Buat akun owner dan kantor dalam dua menit. Uji coba 14 hari, tanpa kartu kredit, langsung aktif.' },
    { n: 2, title: 'Tambah tim & PIC', body: 'Undang staf sebagai PIC internal. Setiap PIC terisolasi dalam satu kantor, aman secara multi-tenant.' },
    { n: 3, title: 'Buat atau impor order', body: 'Buat order manual, unggah PDF untuk autofill AI, atau impor 100+ baris dari CSV sekaligus.' },
    { n: 4, title: 'Tanya Notive kapan saja', body: 'Pantau progress, saring lewat URL yang bisa di-bookmark, dan tanya Notibot dalam Bahasa Indonesia.' },
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

function Notibot() {
  return (
    <section id="notibot" className="notibot-section">
      <div className="section-wrap">
        <div className="notibot-layout">
          <div className="notibot-copy">
            <h2 className="section-title reveal">
              Tanya data Anda dalam <span className="hero-accent">Bahasa Indonesia</span>
            </h2>
            <p className="section-body reveal delay-1 notibot-body">
              Notibot memahami struktur kantor Anda. Tanpa query SQL, tanpa laporan PDF, cukup ajukan
              pertanyaan seperti biasa.
            </p>
            <ul className="notibot-list reveal delay-2">
              <li><IconBadgeCheck size={16} /> Terbatas pada satu kantor, Notibot tidak pernah melihat data kantor lain</li>
              <li><IconLock size={16} /> Read-only, tidak bisa menambah, mengubah, atau menghapus data</li>
              <li><IconDatabase size={16} /> Empat tools: cari order, statistik PIC, PIC tidak aktif, daftar PIC</li>
              <li><IconBolt size={16} /> Kuota 1.000 prompt per bulan pada paket Profesional</li>
            </ul>
          </div>
          <div className="notibot-chat reveal delay-1" aria-hidden="true">
            <div className="chat-window">
              <div className="chat-window-header">
                <span className="chat-dot" />
                <div>
                  <div className="chat-window-title">Notibot</div>
                  <div className="chat-window-sub">Online &amp; siap membantu</div>
                </div>
              </div>
              <div className="chat-window-body">
                <div className="chat-bubble bot">Selamat pagi, ada yang bisa saya bantu hari ini?</div>
                <div className="chat-bubble user">Tampilkan order Jual Beli yang belum lunas di bulan ini</div>
                <div className="chat-bubble bot">
                  <p>Saya menemukan <strong>8 order Jual Beli</strong> dengan status <em>Tagihan</em> di Mei 2024:</p>
                  <table className="chat-table">
                    <thead><tr><th>Klien</th><th>PIC</th><th>Status</th></tr></thead>
                    <tbody>
                      <tr><td>PT Maju Bersama</td><td>Rina S.</td><td>Tagihan</td></tr>
                      <tr><td>Citra Lestari</td><td>Andi W.</td><td>Tagihan</td></tr>
                      <tr><td>PT Bumi Hijau</td><td>Rina S.</td><td>Tagihan</td></tr>
                    </tbody>
                  </table>
                  <p className="chat-hint">Ketik "lanjut" untuk halaman 2 dari 3.</p>
                </div>
              </div>
              <div className="chat-window-input">
                <input placeholder="Ketik pertanyaan Anda" readOnly aria-label="Pesan Notibot" />
                <button aria-label="Kirim"><IconArrowUpRight size={14} /></button>
              </div>
            </div>
          </div>
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
      quote: 'Fitur impor CSV menyelamatkan saya saat memindahkan 600+ order lama. Laporan kesalahan per baris membuat saya bisa memperbaiki data yang salah format tanpa mengunggah ulang dari awal.',
      name: 'Benny Prasetyo, S.H.',
      role: 'Notaris · Surabaya',
      tint: AV.amber,
      initials: 'BP',
    },
    {
      stars: 5,
      quote: 'Notibot mengerti pertanyaan saya dalam Bahasa Indonesia. "PIC mana yang belum tangani order minggu ini?", langsung dijawab. Tim saya tidak perlu belajar SQL atau filter rumit.',
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
        'Dukungan via email',
        'Penyimpanan tautan tanpa batas',
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
        'Autofill PDF (Gemini OCR)',
        'Impor CSV massal',
        'Notibot AI · 1.000 prompt per bulan',
        'Filter cerdas + URL bookmarkable',
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
        'Multi-kantor (multi-tenant)',
        'SLA uptime 99,9% berkontrak',
        'Integrasi API kustom',
        'Audit log tiap perubahan',
        'Manajer akun dedikasi',
        'Onboarding & pelatihan tim',
        'Batas prompt AI kustom',
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
            Semua paket mencakup isolasi data per kantor, keamanan JWT, dan pembaruan platform
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
              <a href="#trial" className={p.featured ? 'btn-plan-featured' : 'btn-plan-outline'}>{p.cta}</a>
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
      a: 'Setiap request membawa JWT yang berisi companyId. Backend Notive selalu meng-scope query database dengan WHERE company_id = ?, tidak pernah dari body request. Setiap upaya perubahan lintas-kantor akan ditolak.',
    },
    {
      q: 'Apakah Notibot bisa menghapus atau mengubah data kantor saya?',
      a: 'Tidak. Notibot dibatasi read-only lewat instruksi sistem yang eksplisit dan validasi tools. Ia hanya bisa membaca order, PIC, dan statistik. Setiap permintaan menghapus atau mengubah ditolak secara sopan.',
    },
    {
      q: 'Apakah saya perlu memberikan kartu kredit untuk uji coba?',
      a: 'Tidak. Uji coba 14 hari Notive aktif otomatis saat Anda mendaftar, tanpa kartu kredit dan tanpa data pembayaran. Kantor Anda otomatis non-aktif saat masa uji coba habis bila tidak dilanjutkan.',
    },
    {
      q: 'Bagaimana cara memindahkan data dari spreadsheet lama kami?',
      a: 'Gunakan fitur Impor CSV. Unduh template CSV dari Notive, isi dengan data lama (mendukung 12 kolom termasuk No. Sertifikat, PIC Bank, dan Progress). Maksimal 3 MB per berkas dengan laporan kesalahan per baris.',
    },
    {
      q: 'Apakah Notive bisa diakses dari ponsel?',
      a: 'Ya. Dashboard Notive responsif penuh hingga lebar 360px: sidebar berubah menjadi drawer geser, daftar order menjadi kartu yang ramah ponsel, dan filter dikompres menjadi panel sliding.',
    },
    {
      q: 'Apa yang terjadi bila saya melebihi 1.000 prompt Notibot per bulan?',
      a: 'Notibot menampilkan pesan bahwa batas bulanan tercapai dan akan reset otomatis pada tanggal 1 bulan berikutnya. Paket Firma bisa meminta batas kustom.',
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
          <a href="#" className="btn-hero-primary">
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
            <div className="footer-logo-mark">N</div>
            <span className="footer-brand-name">Notive</span>
          </div>
          <p className="footer-brand-desc">
            Platform manajemen order untuk notaris Indonesia. Dibuat untuk kantor yang ingin bekerja
            lebih cepat, lebih rapi, dan lebih aman.
          </p>
          <div className="footer-locale">
            <IconScale size={12} />
            <span>Dibuat di Indonesia · Bahasa Indonesia</span>
          </div>
        </div>
        <div className="footer-cols">
          <div className="footer-col">
            <div className="footer-col-title">Produk</div>
            <a href="#features">Fitur</a>
            <a href="#how">Cara Kerja</a>
            <a href="#notibot">Notibot AI</a>
            <a href="#pricing">Harga</a>
            <a href="#trial">Uji coba gratis</a>
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
            <a href="#">Isolasi multi-tenant</a>
            <a href="#">JWT &amp; enkripsi</a>
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
        <TrustBar />
        <Features />
        <Notibot />
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
