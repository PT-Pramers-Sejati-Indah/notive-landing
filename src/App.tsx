
import React, { useEffect } from 'react'
import './App.css'

function App() {
  useEffect(() => {
    // Scroll reveal
    const reveals = document.querySelectorAll('.reveal');
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) { e.target.classList.add('in'); obs.unobserve(e.target); }
      });
    }, { threshold: 0.1 });
    reveals.forEach(el => obs.observe(el));

    // Nav scroll
    const nav = document.querySelector('nav');
    const handleScroll = () => {
      if (nav) {
        nav.style.boxShadow = window.scrollY > 10
          ? '0 1px 12px rgba(15,22,35,0.08)'
          : 'none';
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const setActive = (e: React.MouseEvent<HTMLDivElement>) => {
    document.querySelectorAll('.feature-item').forEach(i => i.classList.remove('active'));
    e.currentTarget.classList.add('active');
  }

  return (
    <>


      {/* ─── NAV ─── */}

      <nav>
        <a className="nav-brand" href="#">
          <div className="nav-logo-mark">N</div>
          <span className="nav-brand-name">Notive</span>
        </a>
        <ul className="nav-links">
          <li><a href="#">Beranda</a></li>
          <li><a href="#">Fitur</a></li>
          <li><a href="#">Solusi</a></li>
          <li><a href="#">Harga</a></li>
          <li className="nav-dropdown"><a href="#">Sumber Daya</a></li>
        </ul>
        <div className="nav-right">
          <a href="#" className="btn-outline">Masuk</a>
          <a href="#" className="btn-cta">Coba Notive</a>
        </div>
      </nav>

      {/* ─── HERO ─── */}

      <section style={{ background: 'var(--white)', borderBottom: '1px solid var(--border)' }}>
        <div className="hero">
          {/* Left */}
          <div className="hero-left">
            <div className="hero-eyebrow">
              <span className="eyebrow-dot"></span>
              Platform Digital untuk Notaris Modern
            </div>
            <h1 className="hero-title">
              Tingkatkan Kinerja Kantor Notaris Anda<br />
              <span>Dengan AI.</span>
            </h1>
            <p className="hero-sub">
              Dari pelacakan pesanan hingga jawaban instan. Notive membantu kantor Anda bekerja lebih cepat, lebih rapi, dan lebih efisien 🚀
            </p>
            <div className="hero-actions">
              <a href="#" className="btn-hero-primary">
                Jadwalkan Demo
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
              </a>
              <a href="#" className="btn-hero-secondary">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10" /><polygon points="10 8 16 12 10 16 10 8" fill="currentColor" stroke="none" /></svg>
                Lihat Demo
              </a>
            </div>
            <div className="hero-trust">
              <div className="hero-trust-label">Keunggulan Platform</div>
              <div className="hero-trust-badges">
                <div className="trust-pill">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>
                  Keamanan Data Terjamin
                </div>
                <div className="trust-pill">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="5" y="2" width="14" height="20" rx="2" /><path d="M12 18h.01" /></svg>
                  Akses Dimanapun
                </div>
                <div className="trust-pill">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="22 7 13.5 15.5 8.5 10.5 2 17" /><polyline points="16 7 22 7 22 13" /></svg>
                  Meningkatkan Produktivitas
                </div>
              </div>
            </div>
          </div>


          {/* Right: Dashboard Preview */}
          <div className="hero-right">
            <div className="dashboard-wrap">
              {/* Topbar */}
              <div className="db-topbar">
                <div className="db-brand">
                  <div className="mark">N</div>
                  Notive
                </div>
                <div className="db-search">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" /></svg>
                  Cari akta, klien, dokumen…
                </div>
                <div className="db-icons">
                  <div className="db-icon">
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" /><path d="M13.73 21a2 2 0 0 1-3.46 0" /></svg>
                  </div>
                  <div className="db-icon">
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" /><path d="M13.73 21a2 2 0 0 1-3.46 0" /></svg>
                  </div>
                  <div className="db-avatar">AP</div>
                </div>
              </div>
              {/* Body */}
              <div className="db-body">
                {/* Sidebar */}
                <div className="db-sidebar">
                  <div className="db-sidebar-label">Menu Utama</div>
                  <div className="db-nav-item active">
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" /><rect x="3" y="14" width="7" height="7" /><rect x="14" y="14" width="7" height="7" /></svg>
                    Beranda
                  </div>
                  <div className="db-nav-item">
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /></svg>
                    Akta
                  </div>
                  <div className="db-nav-item">
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /></svg>
                    Klien
                  </div>
                  <div className="db-nav-item">
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" /></svg>
                    Jadwal &amp; Pengingat
                  </div>
                  <div className="db-nav-item">
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z" /></svg>
                    Dokumen
                  </div>
                  <div className="db-nav-item">
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="1" x2="12" y2="23" /><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" /></svg>
                    Keuangan
                  </div>
                  <div className="db-nav-item">
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="20" x2="18" y2="10" /><line x1="12" y1="20" x2="12" y2="4" /><line x1="6" y1="20" x2="6" y2="14" /></svg>
                    Laporan
                  </div>
                </div>
                {/* Main */}
                <div className="db-main">
                  <div className="db-greeting">
                    <div className="db-greeting-sub">Selamat pagi,</div>
                    <div className="db-greeting-name">Notaris Amanda Putri</div>
                  </div>
                  <div className="db-stats">
                    <div className="db-stat">
                      <div className="db-stat-icon">📄</div>
                      <div className="db-stat-num">152</div>
                      <div className="db-stat-label">Total Akta</div>
                    </div>
                    <div className="db-stat">
                      <div className="db-stat-icon">✍️</div>
                      <div className="db-stat-num" style={{ color: 'var(--warn)' }}>24</div>
                      <div className="db-stat-label">Menunggu TT</div>
                    </div>
                    <div className="db-stat">
                      <div className="db-stat-icon">📅</div>
                      <div className="db-stat-num" style={{ color: 'var(--accent)' }}>7</div>
                      <div className="db-stat-label">Jadwal Hari Ini</div>
                    </div>
                    <div className="db-stat">
                      <div className="db-stat-icon">🆕</div>
                      <div className="db-stat-num">5</div>
                      <div className="db-stat-label">Dokumen Baru</div>
                    </div>
                  </div>
                  <div className="db-section-title">
                    Akta Terbaru
                    <span className="db-link">Lihat semua</span>
                  </div>
                  <table className="db-table">
                    <thead>
                      <tr>
                        <th>No.</th><th>Jenis Akta</th><th>Klien</th><th>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>02</td>
                        <td>Pendirian PT</td>
                        <td>PT Maju Bersama</td>
                        <td><span className="status-pill pending">Menunggu TT</span></td>
                      </tr>
                      <tr>
                        <td>01</td>
                        <td>Jual Beli</td>
                        <td>Budi Santoso</td>
                        <td><span className="status-pill done">Selesai</span></td>
                      </tr>
                      <tr>
                        <td>03</td>
                        <td>Perubahan AD</td>
                        <td>PT Sejahtera Abadi</td>
                        <td><span className="status-pill draft">Draft</span></td>
                      </tr>
                      <tr>
                        <td>04</td>
                        <td>Hibah</td>
                        <td>Siti Aisyah</td>
                        <td><span className="status-pill pending">Menunggu TT</span></td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>


        </div>
      </section>

      {/* ─── TRUST BAR ─── */}

      <div className="logos-bar">
        <div className="logos-inner">
          <span className="logos-label">Dipercaya oleh Notaris di seluruh Indonesia</span>
          <div className="logo-item"><div className="logo-badge">⚖️</div>Ikatan Notaris Indonesia</div>
          <div className="logo-item"><div className="logo-badge">🏛️</div>Notaris Profesional</div>
          <div className="logo-item"><div className="logo-badge">📋</div>Notaris Muda Indonesia</div>
          <div className="logo-item"><div className="logo-badge">🤝</div>Asosiasi Notaris</div>
          <div className="logo-item"><div className="logo-badge">📜</div>Notaris &amp; PPAT</div>
        </div>
      </div>

      {/* ─── FEATURES ─── */}

      <section className="features-section">
        <div className="section-wrap">
          <div className="features-layout">
            <div>
              <div className="section-eyebrow reveal">Kemampuan Platform</div>
              <h2 className="section-title reveal delay-1">Semua yang Anda<br />butuhkan dalam<br />satu platform</h2>
              <p className="section-body reveal delay-2" style={{ marginBottom: '40px' }}>
                Notive dirancang khusus untuk alur kerja notaris Indonesia — dari pembuatan akta hingga manajemen klien dan kepatuhan hukum.
              </p>
              <div className="features-list">
                <div className="feature-item active reveal" onClick={setActive}>
                  <div className="feature-icon-wrap">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /><line x1="16" y1="13" x2="8" y2="13" /><line x1="16" y1="17" x2="8" y2="17" /></svg>
                  </div>
                  <div className="feature-text">
                    <h3>Manajemen Akta</h3>
                    <p>Buat, edit, dan kelola akta notaris dengan template sesuai standar hukum Indonesia yang selalu diperbarui.</p>
                  </div>
                </div>
                <div className="feature-item reveal delay-1" onClick={setActive}>
                  <div className="feature-icon-wrap">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg>
                  </div>
                  <div className="feature-text">
                    <h3>Database Klien</h3>
                    <p>Simpan riwayat lengkap klien, dokumen identitas, dan akta yang pernah dibuat — semuanya terorganisir.</p>
                  </div>
                </div>
                <div className="feature-item reveal delay-2" onClick={setActive}>
                  <div className="feature-icon-wrap">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" /></svg>
                  </div>
                  <div className="feature-text">
                    <h3>Jadwal &amp; Pengingat</h3>
                    <p>Kalender terintegrasi dengan notifikasi otomatis jatuh tempo akta, janji temu, dan perpanjangan SK.</p>
                  </div>
                </div>
                <div className="feature-item reveal delay-3" onClick={setActive}>
                  <div className="feature-icon-wrap">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="11" width="18" height="11" rx="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" /></svg>
                  </div>
                  <div className="feature-text">
                    <h3>Tanda Tangan Elektronik</h3>
                    <p>Tandatangan elektronik tersertifikasi BSrE dengan kekuatan hukum yang diakui secara resmi.</p>
                  </div>
                </div>
              </div>
            </div>

            ```
            {/* Feature Preview Panel */}
            <div className="features-preview reveal">
              <div className="feature-screen">
                <div className="fscreen-bar">
                  <div className="fbar-dot"></div>
                  <div className="fbar-dot"></div>
                  <div className="fbar-dot"></div>
                  <div className="fscreen-title">Manajemen Akta</div>
                </div>
                <div className="fscreen-body">
                  <div className="akta-header">
                    <div className="akta-title">Daftar Akta</div>
                    <div className="akta-btn">+ Akta Baru</div>
                  </div>
                  <div className="akta-row">
                    <div className="akta-num">A-007</div>
                    <div className="akta-info">
                      <div className="akta-info-name">Akta Pendirian PT Maju Bersama</div>
                      <div className="akta-info-meta">Pendirian PT · 20 Mei 2024</div>
                    </div>
                    <div className="akta-date">20/05</div>
                    <span className="status-pill pending">Menunggu TT</span>
                  </div>
                  <div className="akta-row">
                    <div className="akta-num">A-006</div>
                    <div className="akta-info">
                      <div className="akta-info-name">Akta Jual Beli — Budi Santoso</div>
                      <div className="akta-info-meta">Jual Beli · 19 Mei 2024</div>
                    </div>
                    <div className="akta-date">19/05</div>
                    <span className="status-pill done">Selesai</span>
                  </div>
                  <div className="akta-row">
                    <div className="akta-num">A-005</div>
                    <div className="akta-info">
                      <div className="akta-info-name">Perubahan AD PT Sejahtera Abadi</div>
                      <div className="akta-info-meta">Perubahan AD · 18 Mei 2024</div>
                    </div>
                    <div className="akta-date">18/05</div>
                    <span className="status-pill draft">Draft</span>
                  </div>
                  <div className="akta-row">
                    <div className="akta-num">A-004</div>
                    <div className="akta-info">
                      <div className="akta-info-name">Akta Hibah — Siti Aisyah</div>
                      <div className="akta-info-meta">Hibah · 17 Mei 2024</div>
                    </div>
                    <div className="akta-date">17/05</div>
                    <span className="status-pill pending">Menunggu TT</span>
                  </div>
                  <div className="akta-row">
                    <div className="akta-num">A-003</div>
                    <div className="akta-info">
                      <div className="akta-info-name">Surat Kuasa — Andi Wijaya</div>
                      <div className="akta-info-meta">Kuasa · 16 Mei 2024</div>
                    </div>
                    <div className="akta-date">16/05</div>
                    <span className="status-pill done">Selesai</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          ```

        </div>
      </section>

      {/* ─── STATS ─── */}

      <section className="stats-strip">
        <div className="section-wrap" style={{ padding: '0' }}>
          <div className="stats-grid">
            <div className="stat-block reveal">
              <div className="stat-num">2,800<sup>+</sup></div>
              <div className="stat-lbl">Notaris Aktif</div>
            </div>
            <div className="stat-block reveal delay-1">
              <div className="stat-num">140K</div>
              <div className="stat-lbl">Akta Diproses</div>
            </div>
            <div className="stat-block reveal delay-2">
              <div className="stat-num">34</div>
              <div className="stat-lbl">Provinsi Terjangkau</div>
            </div>
            <div className="stat-block reveal delay-3">
              <div className="stat-num">99.9%</div>
              <div className="stat-lbl">Uptime SLA</div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── HOW IT WORKS ─── */}

      <section className="how-section">
        <div className="section-wrap">
          <div className="how-header">
            <div className="section-eyebrow reveal" style={{ justifyContent: 'center', display: 'flex' }}>Cara Kerja</div>
            <h2 className="section-title reveal delay-1" style={{ textAlign: 'center', margin: '0 auto 12px' }}>Mulai dalam hitungan menit</h2>
            <p className="section-body reveal delay-2" style={{ textAlign: 'center', maxWidth: '500px', margin: '0 auto' }}>
              Proses onboarding yang sederhana memastikan Anda bisa langsung produktif tanpa kurva belajar yang panjang.
            </p>
          </div>
          <div className="how-steps" style={{ position: 'relative' }}>
            <div className="how-connector"></div>
            <div className="how-step reveal">
              <div className="step-num-wrap highlighted">1</div>
              <h3>Daftarkan Kantor</h3>
              <p>Buat akun dengan NIK dan nomor SK pengangkatan Anda. Verifikasi selesai dalam 1 hari kerja.</p>
            </div>
            <div className="how-step reveal delay-1">
              <div className="step-num-wrap">2</div>
              <h3>Impor Data Klien</h3>
              <p>Masukkan data klien dan akta yang sudah ada, atau mulai dari awal dengan form yang mudah.</p>
            </div>
            <div className="how-step reveal delay-2">
              <div className="step-num-wrap">3</div>
              <h3>Buat &amp; Kelola Akta</h3>
              <p>Gunakan template resmi untuk membuat akta baru atau edit draft yang sudah ada dengan cepat.</p>
            </div>
            <div className="how-step reveal delay-3">
              <div className="step-num-wrap">4</div>
              <h3>Tanda Tangan &amp; Arsip</h3>
              <p>Tandatangani secara elektronik dan arsipkan otomatis. Dokumen tersimpan aman selamanya.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── TESTIMONIALS ─── */}

      <section className="testimonials-section">
        <div className="section-wrap">
          <div className="testimonials-header">
            <div className="section-eyebrow reveal" style={{ display: 'flex', justifyContent: 'center' }}>Testimoni</div>
            <h2 className="section-title reveal delay-1" style={{ textAlign: 'center' }}>Dipercaya para notaris profesional</h2>
          </div>
          <div className="testimonials-grid">
            <div className="testimonial-card reveal">
              <div className="tcard-stars">★★★★★</div>
              <p className="tcard-quote">
                "Notive benar-benar mengubah cara kerja kantor kami. Pengelolaan akta yang dulu membutuhkan 3 jam administrasi, sekarang selesai dalam 30 menit."
              </p>
              <div className="tcard-author">
                <div className="tcard-avatar" style={{ background: '#EEF2FF', color: '#1B4FD8' }}>SW</div>
                <div>
                  <div className="tcard-name">Sri Wahyuni, S.H., M.Kn.</div>
                  <div className="tcard-role">Notaris &amp; PPAT, Jakarta Selatan</div>
                </div>
              </div>
            </div>
            <div className="testimonial-card reveal delay-1">
              <div className="tcard-stars">★★★★★</div>
              <p className="tcard-quote">
                "Fitur pengingat jatuh tempo akta sangat membantu. Tidak ada lagi akta yang terlewat — sistem langsung notifikasi jauh hari sebelumnya."
              </p>
              <div className="tcard-author">
                <div className="tcard-avatar" style={{ background: '#F0FDF4', color: '#15803D' }}>BP</div>
                <div>
                  <div className="tcard-name">Benny Prasetyo, S.H.</div>
                  <div className="tcard-role">Notaris, Surabaya</div>
                </div>
              </div>
            </div>
            <div className="testimonial-card reveal delay-2">
              <div className="tcard-stars">★★★★★</div>
              <p className="tcard-quote">
                "Staf saya yang baru langsung bisa menggunakannya tanpa pelatihan panjang. Tampilan yang bersih dan intuitif membuat semua orang produktif dari hari pertama."
              </p>
              <div className="tcard-author">
                <div className="tcard-avatar" style={{ background: '#FFF7ED', color: '#B45309' }}>RH</div>
                <div>
                  <div className="tcard-name">Ratna Hendryati, S.H., M.Kn.</div>
                  <div className="tcard-role">Notaris, Bandung</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── PRICING ─── */}

      <section className="pricing-section">
        <div className="section-wrap">
          <div className="pricing-header">
            <div className="section-eyebrow reveal" style={{ display: 'flex', justifyContent: 'center' }}>Harga</div>
            <h2 className="section-title reveal delay-1" style={{ textAlign: 'center' }}>Paket yang sesuai<br />kebutuhan kantor Anda</h2>
            <p className="section-body reveal delay-2" style={{ textAlign: 'center', maxWidth: '460px', margin: '0 auto' }}>
              Semua paket sudah termasuk dukungan teknis, pembaruan template, dan kepatuhan regulasi otomatis.
            </p>
          </div>
          <div className="pricing-grid">
            <div className="price-card reveal">
              <div className="plan-name-txt">Pemula</div>
              <div className="plan-desc-txt">Untuk notaris yang baru memulai digitalisasi</div>
              <div className="plan-price-wrap">
                <span className="plan-currency">Rp</span>
                <span className="plan-amount">499K</span>
                <span className="plan-period">/ bulan</span>
              </div>
              <div className="plan-divider"></div>
              <ul className="plan-feature-list">
                <li>Hingga 50 akta per bulan</li>
                <li>Database klien dasar</li>
                <li>Template akta standar</li>
                <li>Penyimpanan 10 GB</li>
                <li>Dukungan via email</li>
              </ul>
              <a href="#" className="btn-plan-outline">Pilih Paket Ini</a>
            </div>
            <div className="price-card featured reveal delay-1">
              <div className="featured-tag">Paling Populer</div>
              <div className="plan-name-txt">Profesional</div>
              <div className="plan-desc-txt">Untuk kantor notaris aktif dengan volume tinggi</div>
              <div className="plan-price-wrap">
                <span className="plan-currency">Rp</span>
                <span className="plan-amount" style={{ color: '#fff' }}>1,2Jt</span>
                <span className="plan-period">/ bulan</span>
              </div>
              <div className="plan-divider"></div>
              <ul className="plan-feature-list">
                <li>Akta tidak terbatas</li>
                <li>Tanda tangan elektronik BSrE</li>
                <li>Verifikasi e-KTP + Dukcapil</li>
                <li>Template akta lengkap</li>
                <li>Penyimpanan 100 GB</li>
                <li>Laporan &amp; analitik bulanan</li>
                <li>Dukungan prioritas 24/7</li>
              </ul>
              <a href="#" className="btn-plan-featured">Pilih Paket Ini</a>
            </div>
            <div className="price-card reveal delay-2">
              <div className="plan-name-txt">Firma</div>
              <div className="plan-desc-txt">Untuk firma hukum &amp; kantor dengan tim besar</div>
              <div className="plan-price-wrap" style={{ alignItems: 'center' }}>
                <span className="plan-amount" style={{ fontSize: '28px', lineHeight: '1.2', paddingTop: '6px' }}>Hubungi Kami</span>
              </div>
              <div className="plan-divider"></div>
              <ul className="plan-feature-list">
                <li>Multi-pengguna tak terbatas</li>
                <li>Dashboard multi-kantor</li>
                <li>Integrasi API kustom</li>
                <li>SLA 99.99% uptime</li>
                <li>Penyimpanan tak terbatas</li>
                <li>Manajer akun dedikasi</li>
                <li>Onboarding &amp; pelatihan</li>
              </ul>
              <a href="#" className="btn-plan-outline">Jadwalkan Demo</a>
            </div>
          </div>
        </div>
      </section>

      {/* ─── CTA ─── */}

      <section className="cta-banner">
        <div className="cta-inner reveal">
          <h2>Siap modernisasi<br />kantor notaris Anda?</h2>
          <p>Bergabung bersama 2.800+ notaris yang telah merasakan efisiensi Notive.<br />Coba gratis 14 hari, tanpa kartu kredit, batalkan kapan saja.</p>
          <div className="cta-actions">
            <a href="#" className="btn-hero-primary">
              Mulai Gratis Sekarang
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
            </a>
            <a href="#" className="btn-hero-secondary">Bicara dengan Tim Kami</a>
          </div>
          <p className="cta-note">✓ Tanpa kartu kredit &nbsp;·&nbsp; ✓ Setup dalam 5 menit &nbsp;·&nbsp; ✓ Batalkan kapan saja</p>
        </div>
      </section>

      {/* ─── FOOTER ─── */}

      <footer>
        <div className="footer-main">
          <div className="footer-brand-col">
            <div className="footer-brand-row">
              <div className="footer-logo-mark">N</div>
              <span className="footer-brand-name">Notive</span>
            </div>
            <p className="footer-brand-desc">Platform manajemen notaris digital terpercaya untuk Indonesia.</p>
          </div>
          <div className="footer-cols">
            <div className="footer-col">
              <div className="footer-col-title">Produk</div>
              <a href="#">Fitur</a>
              <a href="#">Cara Kerja</a>
              <a href="#">Harga</a>
              <a href="#">Keamanan</a>
              <a href="#">API & Integrasi</a>
            </div>
            <div className="footer-col">
              <div className="footer-col-title">Solusi</div>
              <a href="#">Notaris Perorangan</a>
              <a href="#">Kantor Notaris</a>
              <a href="#">Firma Hukum</a>
              <a href="#">PPAT</a>
            </div>
            <div className="footer-col">
              <div className="footer-col-title">Regulasi</div>
              <a href="#">Kepatuhan Hukum</a>
              <a href="#">Standar INI</a>
              <a href="#">Kebijakan Privasi</a>
              <a href="#">Syarat &amp; Ketentuan</a>
            </div>
            <div className="footer-col">
              <div className="footer-col-title">Perusahaan</div>
              <a href="#">Tentang Kami</a>
              <a href="#">Blog</a>
              <a href="#">Karier</a>
              <a href="#">Hubungi Kami</a>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <p>© 2025 Notive. Hak cipta dilindungi undang-undang.</p>
          <p>Terdaftar di Kementerian Komunikasi dan Informatika RI</p>
        </div>
      </footer>




    </>
  )
}

export default App
