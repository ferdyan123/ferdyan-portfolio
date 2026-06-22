export default function ThankYouPage() {
  return (
    <main className="thanks-wrap">
      <div className="thanks-card">
        <h1>Terima kasih! 🙌</h1>
        <p>
          Jawaban kamu udah masuk. Gw akan pelajari kebutuhan project kamu dan
          hubungi balik lewat WhatsApp atau email dalam 1-2 hari kerja.
        </p>
        <a href="/" className="back-link">
          Kembali ke halaman utama
        </a>
      </div>
      <style jsx>{`
        .thanks-wrap {
          min-height: 100vh;
          background: var(--bg);
          color: var(--text);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 24px;
          font-family: 'Plus Jakarta Sans', sans-serif;
        }
        .thanks-card {
          max-width: 480px;
          text-align: center;
        }
        h1 {
          font-size: 28px;
          margin-bottom: 16px;
        }
        p {
          color: var(--muted);
          margin-bottom: 24px;
          line-height: 1.6;
        }
        .back-link {
          color: var(--accent2);
          text-decoration: underline;
          font-size: 14px;
        }
      `}</style>
    </main>
  );
}