// data/discoveryQuestions.js
// Sumber tunggal semua pertanyaan Discovery Form.
// field harus sama dengan nama kolom di Supabase agar gampang di-insert.
//
// type yang didukung: text, textarea, number, boolean, tags, select, multiselect
// select/multiselect butuh array `options`.

export const schemaOptions = [
  { value: 'lp', label: 'Landing Page (LP)', desc: 'Konversi, lead generation, single objective' },
  { value: 'company', label: 'Company Profile', desc: 'Brand positioning & kredibilitas' },
  { value: 'ecommerce', label: 'E-Commerce', desc: 'Katalog produk, checkout, payment' },
  { value: 'webapp', label: 'Web Application', desc: 'Dashboard, role, fitur aplikasi' },
  { value: 'membership', label: 'Membership Website', desc: 'Access control, billing, member area' },
  { value: 'custom', label: 'Custom Website', desc: 'Kebutuhan spesifik di luar skema lain' },
];

// 4.2 — Pertanyaan umum, semua skema
export const generalQuestions = [
  { field: 'business_name', type: 'text', label: 'Apa nama bisnis atau brand kamu?' },
  {
    field: 'business_field',
    type: 'select',
    label: 'Bisnis kamu bergerak di bidang apa?',
    options: ['Retail/Toko', 'F&B/Kuliner', 'Jasa/Konsultasi', 'Teknologi/Software', 'Pendidikan', 'Kesehatan', 'Properti', 'Lainnya'],
  },
  { field: 'usp', type: 'textarea', label: 'Apa yang membuat bisnis kamu berbeda dari kompetitor?' },
  { field: 'target_audience', type: 'textarea', label: 'Siapa target pengguna website ini? (usia, profesi, kebiasaan)' },
  { field: 'user_problems', type: 'textarea', label: 'Apa masalah utama yang dialami target pengguna kamu?' },
  {
    field: 'website_goals',
    type: 'multiselect',
    label: 'Apa tujuan utama website ini? (boleh pilih lebih dari satu)',
    options: ['Branding', 'Jualan online', 'Lead generation', 'Edukasi/informasi', 'Portfolio/showcase'],
  },
  {
    field: 'required_features',
    type: 'multiselect',
    label: 'Fitur apa saja yang wajib ada di website ini?',
    options: ['Form kontak', 'Booking/reservasi', 'Live chat', 'Blog/artikel', 'Galeri foto/video', 'Integrasi WhatsApp', 'Newsletter', 'Multi-bahasa'],
  },
  {
    field: 'third_party_integrations',
    type: 'multiselect',
    label: 'Ada integrasi pihak ketiga yang dibutuhkan?',
    options: ['Midtrans/Xendit', 'WhatsApp Business API', 'Google Analytics', 'Mailchimp/Email marketing', 'CRM', 'Tidak ada'],
    optional: true,
  },
  { field: 'reference_urls', type: 'tags', label: 'Ada referensi website yang kamu suka? (URL)', placeholder: 'https://...', optional: true },
  { field: 'design_preferences', type: 'textarea', label: 'Dari referensi itu, elemen apa yang kamu suka dan tidak suka?', optional: true },
];

// 4.3 — Pertanyaan per skema
export const schemaQuestions = {
  lp: [
    {
      field: 'main_cta_action',
      type: 'select',
      label: 'Apa satu aksi utama yang kamu ingin pengunjung lakukan?',
      options: ['Beli sekarang', 'Daftar/Sign up', 'Hubungi via WhatsApp', 'Download sesuatu', 'Booking konsultasi'],
    },
    { field: 'promoted_product', type: 'text', label: 'Produk atau jasa apa yang dipromosikan di LP ini?' },
    { field: 'customer_pain_point', type: 'textarea', label: 'Apa pain point terbesar calon pelanggan yang diselesaikan?' },
    { field: 'urgency_offer', type: 'text', label: 'Apakah ada penawaran khusus atau urgensi yang ditampilkan?', optional: true },
    { field: 'lead_capture_needed', type: 'boolean', label: 'Perlu form lead capture?' },
    {
      field: 'lead_capture_fields',
      type: 'multiselect',
      label: 'Jika ya, data apa yang dikumpulkan?',
      options: ['Nama', 'Email', 'No. HP', 'Nama Perusahaan'],
      optional: true,
    },
    {
      field: 'tracking_integrations',
      type: 'multiselect',
      label: 'Perlu integrasi tracking/marketing?',
      options: ['WhatsApp', 'Meta Pixel', 'Google Tag Manager', 'Google Analytics', 'Tidak perlu'],
      optional: true,
    },
  ],
  company: [
    {
      field: 'page_list',
      type: 'multiselect',
      label: 'Halaman apa saja yang ingin ada?',
      options: ['Home', 'About Us', 'Services/Produk', 'Team', 'Portfolio/Case Study', 'Blog', 'Contact'],
    },
    { field: 'services_count', type: 'number', label: 'Berapa jumlah layanan atau produk yang ditampilkan?' },
    { field: 'has_team_page', type: 'boolean', label: 'Apakah ada halaman tim yang menampilkan profil individu?' },
    { field: 'has_case_studies', type: 'boolean', label: 'Apakah perlu halaman studi kasus atau portofolio proyek?' },
    { field: 'has_contact_form', type: 'boolean', label: 'Apakah perlu form kontak atau halaman booking/konsultasi?' },
    { field: 'has_blog', type: 'boolean', label: 'Apakah perlu blog atau artikel untuk konten SEO?' },
  ],
  ecommerce: [
    {
      field: 'estimated_product_count',
      type: 'select',
      label: 'Berapa estimasi jumlah produk yang akan dijual?',
      options: ['1-10', '11-50', '51-200', '200+'],
    },
    { field: 'has_variants', type: 'boolean', label: 'Apakah produk memiliki variasi? (ukuran, warna, tipe)' },
    {
      field: 'payment_gateway',
      type: 'select',
      label: 'Payment gateway apa yang digunakan?',
      options: ['Midtrans', 'Xendit', 'Doku', 'Transfer manual', 'Belum tahu'],
    },
    { field: 'needs_cart_wishlist_compare', type: 'boolean', label: 'Apakah perlu fitur cart, wishlist, dan perbandingan produk?' },
    { field: 'needs_order_management', type: 'boolean', label: 'Apakah perlu manajemen pesanan dan notifikasi untuk admin?' },
    { field: 'needs_shipping_integration', type: 'boolean', label: 'Apakah perlu integrasi pengiriman otomatis? (RajaOngkir, dll)' },
    { field: 'needs_product_reviews', type: 'boolean', label: 'Apakah perlu fitur ulasan/rating produk dari pembeli?' },
  ],
  webapp: [
    { field: 'core_function', type: 'textarea', label: 'Apa fungsi utama aplikasi ini? Masalah apa yang diselesaikan?' },
    {
      field: 'user_roles',
      type: 'multiselect',
      label: 'Siapa saja role pengguna?',
      options: ['Admin', 'User biasa', 'Moderator', 'Super Admin'],
    },
    { field: 'needs_auth', type: 'boolean', label: 'Apakah perlu sistem autentikasi login/register?' },
    { field: 'dashboard_features', type: 'textarea', label: 'Fitur utama apa yang ada di dashboard pengguna?' },
    { field: 'needs_data_visualization', type: 'boolean', label: 'Apakah ada data yang perlu divisualisasikan? (grafik, laporan)' },
    { field: 'needs_notifications', type: 'boolean', label: 'Apakah ada notifikasi yang dikirim ke user?' },
    {
      field: 'notification_channels',
      type: 'multiselect',
      label: 'Jika ya, lewat channel apa?',
      options: ['Email', 'Push notification', 'WhatsApp', 'SMS'],
      optional: true,
    },
    { field: 'needs_export', type: 'boolean', label: 'Apakah perlu fitur export data?' },
    {
      field: 'export_formats',
      type: 'multiselect',
      label: 'Jika ya, format apa?',
      options: ['PDF', 'Excel', 'CSV'],
      optional: true,
    },
    { field: 'needs_api_integration', type: 'boolean', label: 'Apakah ada API pihak ketiga yang perlu diintegrasikan?' },
    { field: 'api_integration_detail', type: 'text', label: 'Jika ya, API apa?', optional: true },
  ],
  membership: [
    { field: 'exclusive_content', type: 'textarea', label: 'Apa konten eksklusif yang hanya bisa diakses member?' },
    {
      field: 'membership_tiers',
      type: 'multiselect',
      label: 'Apakah ada tingkatan membership?',
      options: ['Free', 'Basic', 'Pro', 'Enterprise'],
      optional: true,
    },
    {
      field: 'billing_cycle',
      type: 'select',
      label: 'Bagaimana sistem pembayaran membership?',
      options: ['Bulanan', 'Tahunan', 'Sekali bayar (lifetime)'],
    },
    { field: 'needs_community', type: 'boolean', label: 'Apakah perlu fitur komunitas atau forum untuk anggota?' },
    { field: 'needs_progress_tracking', type: 'boolean', label: 'Apakah perlu progress tracking? (kursus, checklist, badge)' },
    { field: 'needs_admin_dashboard', type: 'boolean', label: 'Apakah perlu dashboard admin untuk kelola member dan konten?' },
  ],
  custom: [
    { field: 'detailed_requirements', type: 'textarea', label: 'Deskripsikan kebutuhan website kamu secara detail' },
    { field: 'core_function', type: 'textarea', label: 'Apa fungsi utama yang website harus bisa lakukan?' },
    { field: 'user_journey', type: 'textarea', label: 'Siapa yang menggunakan dan bagaimana cara mereka pakainya?' },
    { field: 'existing_systems', type: 'text', label: 'Apakah ada sistem yang sudah ada dan perlu diintegrasikan?', optional: true },
    { field: 'technical_constraints', type: 'text', label: 'Apakah ada constraint teknis atau preferensi platform tertentu?', optional: true },
  ],
};

export const schemaTableMap = {
  lp: 'answers_lp',
  company: 'answers_company',
  ecommerce: 'answers_ecommerce',
  webapp: 'answers_webapp',
  membership: 'answers_membership',
  custom: 'answers_custom',
};