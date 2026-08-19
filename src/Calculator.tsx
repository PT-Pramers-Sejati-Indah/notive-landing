import { useMemo, useState } from 'react'
import { TAX } from './seo/facts'

/* ============================================================
   Kalkulator Notaris — client-side, no API (PRD v1.0)
============================================================ */


const REGIONS: { id: string; label: string; noptkp: number }[] = [
  { id: 'jakarta', label: 'Jakarta', noptkp: TAX.noptkpJakarta },
  { id: 'surabaya', label: 'Surabaya', noptkp: TAX.noptkpDefault },
  { id: 'bandung', label: 'Bandung', noptkp: TAX.noptkpDefault },
  { id: 'bekasi', label: 'Bekasi', noptkp: TAX.noptkpDefault },
  { id: 'tangerang', label: 'Tangerang', noptkp: TAX.noptkpDefault },
  { id: 'default', label: 'Wilayah lain (default nasional)', noptkp: TAX.noptkpDefault },
]

const AKTA_TYPES = [
  'Akta Jual Beli',
  'Akta Hak Tanggungan',
  'Akta Hibah',
  'Akta Kuasa',
  'Akta Perjanjian',
  'Akta Lainnya',
] as const

const BPHTB_RATE = TAX.bphtbRate
const PPH_RATE = TAX.pphRate
const HONOR_MIN = TAX.honorMin
/** Max 15 digits — keeps UI readable and within Number precision. */
const MAX_RUPIAH = 999_999_999_999_999
const MAX_RUPIAH_DIGITS = 15

function parseRupiah(raw: string): number {
  const digits = raw.replace(/\D/g, '').slice(0, MAX_RUPIAH_DIGITS)
  if (!digits) return 0
  const parsed = Number(digits)
  return Math.min(parsed, MAX_RUPIAH)
}

function formatRupiah(value: number): string {
  return value.toLocaleString('id-ID')
}

function isAtRupiahLimit(value: number): boolean {
  return value >= MAX_RUPIAH
}

function calcTax(txValue: number, njop: number, noptkp: number) {
  if (txValue <= 0) {
    return { ndpp: 0, npopkp: 0, bphtb: 0, pph: 0, total: 0 }
  }
  const ndpp = Math.max(txValue, njop)
  const npopkp = Math.max(0, ndpp - noptkp)
  const bphtb = ndpp <= noptkp ? 0 : npopkp * BPHTB_RATE
  const pph = txValue * PPH_RATE
  return { ndpp, npopkp, bphtb, pph, total: bphtb + pph }
}

function calcHonorarium(value: number) {
  if (value <= 0) return 0
  if (value < HONOR_MIN) return HONOR_MIN

  const [tier1, tier2, tier3] = TAX.honorTiers
  const cap1 = tier1.upTo
  const cap2 = tier2.upTo
  if (cap1 == null || cap2 == null) return HONOR_MIN

  if (value <= cap1) return value * tier1.rate

  if (value <= cap2) {
    return cap1 * tier1.rate + (value - cap1) * tier2.rate
  }

  return cap1 * tier1.rate + (cap2 - cap1) * tier2.rate + (value - cap2) * tier3.rate
}

type RupiahFieldProps = {
  id: string
  label: string
  hint?: string
  value: number
  onChange: (value: number) => void
}

function RupiahField({ id, label, hint, value, onChange }: RupiahFieldProps) {
  const atLimit = isAtRupiahLimit(value)

  return (
    <div className="calc-field">
      <label htmlFor={id}>{label}</label>
      <div className="calc-input-wrap">
        <span className="calc-input-prefix" aria-hidden="true">Rp</span>
        <input
          id={id}
          type="text"
          inputMode="numeric"
          autoComplete="off"
          value={value ? formatRupiah(value) : ''}
          placeholder="0"
          onChange={(e) => onChange(parseRupiah(e.target.value))}
        />
      </div>
      {atLimit && (
        <p className="calc-field-limit">Batas maksimum Rp {formatRupiah(MAX_RUPIAH)}</p>
      )}
      {hint && <p className="calc-field-hint">{hint}</p>}
    </div>
  )
}

function ResultRow({
  label,
  value,
  note,
  emphasis,
}: {
  label: string
  value: number
  note?: string
  emphasis?: boolean
}) {
  const rounded = Math.round(value)
  const formatted = formatRupiah(rounded)
  const sizeClass =
    formatted.length > 18 ? 'is-very-long' : formatted.length > 14 ? 'is-long' : ''

  return (
    <div className={`calc-result-row ${emphasis ? 'is-total' : ''}`}>
      <div className="calc-result-meta">
        <span className="calc-result-label">{label}</span>
        {note && <span className="calc-result-note">{note}</span>}
      </div>
      <span
        className={`calc-result-value ${sizeClass}`}
        title={`Rp ${formatted}`}
      >
        Rp {formatted}
      </span>
    </div>
  )
}

function TaxCalculator() {
  const [txValue, setTxValue] = useState(800_000_000)
  const [njop, setNjop] = useState(750_000_000)
  const [regionId, setRegionId] = useState('jakarta')
  const [noptkp, setNoptkp] = useState<number>(TAX.noptkpJakarta)
  const [noptkpManual, setNoptkpManual] = useState(false)

  const region = REGIONS.find((r) => r.id === regionId) ?? REGIONS[5]

  const handleRegionChange = (id: string) => {
    setRegionId(id)
    if (!noptkpManual) {
      const next = REGIONS.find((r) => r.id === id)
      if (next) setNoptkp(next.noptkp)
    }
  }

  const handleNoptkpChange = (value: number) => {
    setNoptkpManual(true)
    setNoptkp(value)
  }

  const result = useMemo(() => calcTax(txValue, njop, noptkp), [txValue, njop, noptkp])

  return (
    <div className="calc-panels">
      <div className="calc-form">
        <RupiahField
          id="tax-tx"
          label="Nilai transaksi"
          hint="Harga jual-beli properti yang disepakati"
          value={txValue}
          onChange={setTxValue}
        />
        <RupiahField
          id="tax-njop"
          label="NJOP"
          hint="Nilai Jual Objek Pajak sesuai SPPT PBB terbaru"
          value={njop}
          onChange={setNjop}
        />
        <div className="calc-field">
          <label htmlFor="tax-region">Daerah / wilayah</label>
          <select
            id="tax-region"
            value={regionId}
            onChange={(e) => handleRegionChange(e.target.value)}
          >
            {REGIONS.map((r) => (
              <option key={r.id} value={r.id}>{r.label}</option>
            ))}
          </select>
          <p className="calc-field-hint">
            NPOPTKP {region.label}: Rp {formatRupiah(region.noptkp)}
          </p>
        </div>
        <RupiahField
          id="tax-noptkp"
          label="NPOPTKP"
          hint="Bisa diubah manual jika Perda daerah Anda berbeda"
          value={noptkp}
          onChange={handleNoptkpChange}
        />
      </div>

      <div className="calc-results" aria-live="polite">
        <h3 className="calc-results-title">Estimasi pajak</h3>
        <ResultRow label="NDPP" value={result.ndpp} note="MAX(nilai transaksi, NJOP)" />
        <ResultRow label="NPOPKP" value={result.npopkp} note="NDPP dikurangi NPOPTKP" />
        <ResultRow label="BPHTB (5%)" value={result.bphtb} note="Ditanggung pembeli" />
        <ResultRow label="PPh Final (2,5%)" value={result.pph} note="Ditanggung penjual" />
        <ResultRow label="Total pajak" value={result.total} emphasis />
        <p className="calc-disclaimer">
          Hasil bersifat estimasi berdasarkan tarif umum. PPh Final tarif khusus RSS/Rusunami (1%)
          ditentukan di dalam aplikasi Notive.
        </p>
      </div>
    </div>
  )
}

function AktaCalculator() {
  const [txValue, setTxValue] = useState(500_000_000)
  const [aktaType, setAktaType] = useState<string>(AKTA_TYPES[0])

  const honorarium = useMemo(() => calcHonorarium(txValue), [txValue])

  return (
    <div className="calc-panels">
      <div className="calc-form">
        <RupiahField
          id="akta-tx"
          label="Nilai transaksi"
          hint="Nilai ekonomis akta yang dibuat"
          value={txValue}
          onChange={setTxValue}
        />
        <div className="calc-field">
          <label htmlFor="akta-type">Jenis akta</label>
          <select
            id="akta-type"
            value={aktaType}
            onChange={(e) => setAktaType(e.target.value)}
          >
            {AKTA_TYPES.map((t) => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
          <p className="calc-field-hint">
            Tarif honorarium mengikuti Pasal 36 UU Jabatan Notaris (progresif).
          </p>
        </div>
        <div className="calc-rate-table" aria-label="Struktur tarif honorarium">
          <div className="calc-rate-row">
            <span>s.d. Rp 100 juta</span>
            <span>2,5%</span>
          </div>
          <div className="calc-rate-row">
            <span>Rp 100 juta s.d. Rp 1 miliar</span>
            <span>1,5%</span>
          </div>
          <div className="calc-rate-row">
            <span>di atas Rp 1 miliar</span>
            <span>1%</span>
          </div>
        </div>
      </div>

      <div className="calc-results" aria-live="polite">
        <h3 className="calc-results-title">Estimasi honorarium</h3>
        <p className="calc-akta-type">{aktaType}</p>
        <ResultRow label="Honorarium notaris (maksimum)" value={honorarium} emphasis />
        <p className="calc-disclaimer">
          Angka ini adalah batas maksimum sesuai UU Jabatan Notaris Pasal 36. Honorarium final
          ditentukan berdasarkan kesepakatan antara notaris dan klien.
        </p>
      </div>
    </div>
  )
}

export function Calculator() {
  const [tab, setTab] = useState<'tax' | 'akta'>('tax')

  return (
    <section id="kalkulator" className="calc-section">
      <div className="section-wrap">
        <div className="calc-header">
          <h2 className="section-title reveal centered">
            Estimasi pajak dan biaya akta
          </h2>
          <p className="section-body reveal delay-1 centered">
            Hitung BPHTB, PPh Final, dan honorarium notaris sebelum transaksi. Gratis, tanpa login,
            berdasarkan peraturan yang berlaku per Juni 2026.{' '}
            <a href="/kalkulator-bphtb/">Penjelasan rumus BPHTB</a>
          </p>
        </div>

        <div className="calc-card reveal delay-2">
          <div className="calc-tabs" role="tablist" aria-label="Jenis kalkulator">
            <button
              type="button"
              role="tab"
              aria-selected={tab === 'tax'}
              aria-controls="calc-panel-tax"
              id="calc-tab-tax"
              className={`calc-tab ${tab === 'tax' ? 'is-active' : ''}`}
              onClick={() => setTab('tax')}
            >
              BPHTB &amp; PPh
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={tab === 'akta'}
              aria-controls="calc-panel-akta"
              id="calc-tab-akta"
              className={`calc-tab ${tab === 'akta' ? 'is-active' : ''}`}
              onClick={() => setTab('akta')}
            >
              Biaya akta
            </button>
          </div>

          <div
            id="calc-panel-tax"
            role="tabpanel"
            aria-labelledby="calc-tab-tax"
            hidden={tab !== 'tax'}
            className="calc-panel"
          >
            {tab === 'tax' && <TaxCalculator />}
          </div>
          <div
            id="calc-panel-akta"
            role="tabpanel"
            aria-labelledby="calc-tab-akta"
            hidden={tab !== 'akta'}
            className="calc-panel"
          >
            {tab === 'akta' && <AktaCalculator />}
          </div>
        </div>
      </div>
    </section>
  )
}
