// data/discoveryQuestions.js
// Sumber tunggal semua pertanyaan Discovery Form.
// field harus sama dengan nama kolom di Supabase agar gampang di-insert.

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
  { field: 'business_field', type: 'text', label: 'Bisnis kamu bergerak di bidang apa?' },
  { field: 'usp', type: 'textarea', label: 'Apa yang membuat bisnis kamu berbeda dari kompetitor?' },
  { field: 'target_audience', type: 'textarea', label: 'Siapa target pengguna website ini? (usia, profesi, kebiasaan)' },
  { field: 'user_problems', type: 'textarea', label: 'Apa masalah utama yang dialami target pengguna kamu?' },
  { field: 'website_goals', type: 'textarea', label: 'Apa tujuan utama website ini untuk bisnis kamu?' },
  { field: 'required_features', type: 'tags', label: 'Fitur apa saja yang wajib ada di website ini?', placeholder: 'Ketik fitur, Enter untuk tambah' },
  { field: 'third_party_integrations', type: 'tags', label: 'Ada integrasi pihak ketiga yang dibutuhkan? (payment, CRM, dll)', placeholder: 'Ketik nama integrasi, Enter untuk tambah', optional: true },
  { field: 'reference_urls', type: 'tags', label: 'Ada referensi website yang kamu suka? (URL)', placeholder: 'https://...', optional: true },
  { field: 'design_preferences', type: 'textarea', label: 'Dari referensi itu, elemen apa yang kamu suka dan tidak suka?', optional: true },
];

// 4.3 — Pertanyaan per skema
export const schemaQuestions = {
  lp: [
    { field: 'main_cta_action', type: 'text', label: 'Apa satu aksi utama yang kamu ingin pengunjung lakukan?' },
    { field: 'promoted_product', type: 'text', label: 'Produk atau jasa apa yang dipromosikan di LP ini?' },
    { field: 'customer_pain_point', type: 'textarea', label: 'Apa pain point terbesar calon pelanggan yang diselesaikan?' },
    { field: 'urgency_offer', type: 'text', label: 'Apakah ada penawaran khusus atau urgensi yang ditampilkan?', optional: true },
    { field: 'lead_capture_needed', type: 'boolean', label: 'Perlu form lead capture?' },
    { field: 'lead_capture_fields', type: 'tags', label: 'Jika ya, data apa yang dikumpulkan?', placeholder: 'Nama, email, dll', optional: true },
    { field: 'tracking_integrations', type: 'tags', label: 'Perlu integrasi WA, email, atau tracking iklan (Pixel/GTM)?', placeholder: 'WhatsApp, Meta Pixel, dll', optional: true },
  ],
  company: [
    { field: 'page_list', type: 'tags', label: 'Halaman apa saja yang ingin ada?', placeholder: 'About, Services, Team, dll' },
    { field: 'services_count', type: 'number', label: 'Berapa jumlah layanan atau produk yang ditampilkan?' },
    { field: 'has_team_page', type: 'boolean', label: 'Apakah ada halaman tim yang menampilkan profil individu?' },
    { field: 'has_case_studies', type: 'boolean', label: 'Apakah perlu halaman studi kasus atau portofolio proyek?' },
    { field: 'has_contact_form', type: 'boolean', label: 'Apakah perlu form kontak atau halaman booking/konsultasi?' },
    { field: 'has_blog', type: 'boolean', label: 'Apakah perlu blog atau artikel untuk konten SEO?' },
  ],
  ecommerce: [
    { field: 'estimated_product_count', type: 'text', label: 'Berapa estimasi jumlah produk yang akan dijual?' },
    { field: 'has_variants', type: 'boolean', label: 'Apakah produk memiliki variasi? (ukuran, warna, tipe)' },
    { field: 'payment_gateway', type: 'text', label: 'Payment gateway apa yang digunakan? (Midtrans, Xendit, dll)' },
    { field: 'needs_cart_wishlist_compare', type: 'boolean', label: 'Apakah perlu fitur cart, wishlist, dan perbandingan produk?' },
    { field: 'needs_order_management', type: 'boolean', label: 'Apakah perlu manajemen pesanan dan notifikasi untuk admin?' },
    { field: 'needs_shipping_integration', type: 'boolean', label: 'Apakah perlu integrasi pengiriman otomatis? (RajaOngkir, dll)' },
    { field: 'needs_product_reviews', type: 'boolean', label: 'Apakah perlu fitur ulasan/rating produk dari pembeli?' },
  ],
  webapp: [
    { field: 'core_function', type: 'textarea', label: 'Apa fungsi utama aplikasi ini? Masalah apa yang diselesaikan?' },
    { field: 'user_roles', type: 'tags', label: 'Siapa saja role pengguna?', placeholder: 'admin, user, moderator, dll' },
    { field: 'needs_auth', type: 'boolean', label: 'Apakah perlu sistem autentikasi login/register?' },
    { field: 'dashboard_features', type: 'textarea', label: 'Fitur utama apa yang ada di dashboard pengguna?' },
    { field: 'needs_data_visualization', type: 'boolean', label: 'Apakah ada data yang perlu divisualisasikan? (grafik, laporan)' },
    { field: 'needs_notifications', type: 'boolean', label: 'Apakah ada notifikasi yang dikirim ke user?' },
    { field: 'notification_channels', type: 'tags', label: 'Jika ya, lewat channel apa?', placeholder: 'email, push, in-app', optional: true },
    { field: 'needs_export', type: 'boolean', label: 'Apakah perlu fitur export data?' },
    { field: 'export_formats', type: 'tags', label: 'Jika ya, format apa?', placeholder: 'PDF, Excel, CSV', optional: true },
    { field: 'needs_api_integration', type: 'boolean', label: 'Apakah ada API pihak ketiga yang perlu diintegrasikan?' },
    { field: 'api_integration_detail', type: 'text', label: 'Jika ya, API apa?', optional: true },
  ],
  membership: [
    { field: 'exclusive_content', type: 'textarea', label: 'Apa konten eksklusif yang hanya bisa diakses member?' },
    { field: 'membership_tiers', type: 'tags', label: 'Apakah ada tingkatan membership?', placeholder: 'Free, Pro, Enterprise', optional: true },
    { field: 'billing_cycle', type: 'text', label: 'Bagaimana sistem pembayaran membership? (bulanan, tahunan)' },
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