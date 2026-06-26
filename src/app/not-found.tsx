import Link from "next/link";

// Fallback-404 für Pfade außerhalb von /[locale]. Leitet zur Standardsprache.
export default function RootNotFound() {
  return (
    <html lang="de">
      <body
        style={{
          fontFamily: "system-ui, sans-serif",
          display: "flex",
          minHeight: "100vh",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "1rem",
          textAlign: "center",
          padding: "2rem",
        }}
      >
        <h1 style={{ fontSize: "1.5rem", fontWeight: 700 }}>
          Seite nicht gefunden
        </h1>
        <p style={{ color: "#5b6b82" }}>
          Die gesuchte Seite existiert nicht oder wurde verschoben.
        </p>
        <Link href="/de" style={{ color: "#0b2545", fontWeight: 600 }}>
          Zur Startseite
        </Link>
      </body>
    </html>
  );
}
