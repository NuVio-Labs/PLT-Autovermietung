/**
 * Vermietstationen (Abhol-/Rückgabe-Standorte) – 1:1 vom bestehenden Auftritt
 * plt-autovermietung.de übernommen. PLT arbeitet mit Tankstellen-Partnern im
 * gesamten Kreis Kleve und am Niederrhein zusammen.
 *
 * Weeze ist der Hauptstandort (zugleich Impressums-/Firmensitz, vgl. contact.ts).
 */

export type Station = {
  /** Partner-/Stationsname */
  name: string;
  street: string;
  postalCode: string;
  city: string;
  phone: string;
  phoneHref: string;
  /** Geokoordinaten (für "nächste Station"-Berechnung). */
  lat: number;
  lon: number;
  /** Hauptstandort hervorheben */
  primary?: boolean;
};

export const stations: Station[] = [
  {
    name: "Aral Tankstelle Weeze",
    street: "Industriestraße 43",
    postalCode: "47652",
    city: "Weeze",
    phone: "02837-962551",
    phoneHref: "tel:+492837962551",
    lat: 51.62014,
    lon: 6.21035,
    primary: true,
  },
  {
    name: "BFT Tankstelle Goch",
    street: "Klever Straße 10",
    postalCode: "47574",
    city: "Goch",
    phone: "02823-3414",
    phoneHref: "tel:+4928233414",
    lat: 51.68266,
    lon: 6.16043,
  },
  {
    name: "Aral Tankstelle Uedem",
    street: "Molkereistraße 68",
    postalCode: "47589",
    city: "Uedem",
    phone: "02825-539955",
    phoneHref: "tel:+492825539955",
    lat: 51.65835,
    lon: 6.27528,
  },
  {
    name: "Shell Tankstelle Kevelaer",
    street: "Lindenstraße 64",
    postalCode: "47623",
    city: "Kevelaer",
    phone: "02832-7236",
    phoneHref: "tel:+4928327236",
    lat: 51.58896,
    lon: 6.24743,
  },
  {
    name: "Shell Tankstelle Geldern",
    street: "Burgstraße 12",
    postalCode: "47608",
    city: "Geldern",
    phone: "02831-1329752",
    phoneHref: "tel:+4928311329752",
    lat: 51.51675,
    lon: 6.31573,
  },
  {
    name: "BFT Tankstelle Kalkar-Kehrum",
    street: "Xantener Str. 371",
    postalCode: "47546",
    city: "Kalkar",
    phone: "02824-962245",
    phoneHref: "tel:+492824962245",
    lat: 51.71016,
    lon: 6.34004,
  },
  {
    name: "Aral Tankstelle Kranenburg",
    street: "Klever Str. 85",
    postalCode: "47559",
    city: "Kranenburg",
    phone: "02826-437",
    phoneHref: "tel:+492826437",
    lat: 51.78376,
    lon: 6.02297,
  },
  {
    name: "Freie Tankstelle Steffens",
    street: "Weseler Str. 98",
    postalCode: "46519",
    city: "Alpen",
    phone: "02802-700901",
    phoneHref: "tel:+492802700901",
    lat: 51.58304,
    lon: 6.52274,
  },
  {
    name: "PM Tankstelle Rheinberg",
    street: "Rheinberger Str. 373",
    postalCode: "47495",
    city: "Rheinberg",
    phone: "02844-1309",
    phoneHref: "tel:+4928441309",
    lat: 51.52341,
    lon: 6.67996,
  },
  {
    name: "BFT Tankstelle Sonsbeck",
    street: "Weseler Straße 17",
    postalCode: "47665",
    city: "Sonsbeck",
    phone: "02838-96566",
    phoneHref: "tel:+49283896566",
    lat: 51.61162,
    lon: 6.37860,
  },
  {
    name: "HEM Tankstelle Xanten",
    street: "Sonsbecker Straße 60",
    postalCode: "46509",
    city: "Xanten",
    phone: "02801-9871491",
    phoneHref: "tel:+4928019871491",
    lat: 51.65110,
    lon: 6.42993,
  },
];

/** Reine Ortsnamen (für Text-/SEO-Zwecke). */
export const stationCities = stations.map((s) => s.city);

/** Google-Maps-Suchlink für eine Station. */
export function stationMapsUrl(s: Station): string {
  const q = encodeURIComponent(
    `${s.name}, ${s.street}, ${s.postalCode} ${s.city}`,
  );
  return `https://www.google.com/maps/search/?api=1&query=${q}`;
}

/** Luftlinien-Distanz in km zwischen zwei Koordinaten (Haversine). */
export function distanceKm(
  a: { lat: number; lon: number },
  b: { lat: number; lon: number },
): number {
  const R = 6371;
  const toRad = (d: number) => (d * Math.PI) / 180;
  const dLat = toRad(b.lat - a.lat);
  const dLon = toRad(b.lon - a.lon);
  const lat1 = toRad(a.lat);
  const lat2 = toRad(b.lat);
  const h =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLon / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(h));
}

/** Nächstgelegene Station zu einer Position inkl. Distanz (km, gerundet). */
export function findNearestStation(pos: {
  lat: number;
  lon: number;
}): { station: Station; distanceKm: number } {
  let best = stations[0];
  let bestDist = distanceKm(pos, best);
  for (const s of stations.slice(1)) {
    const d = distanceKm(pos, s);
    if (d < bestDist) {
      best = s;
      bestDist = d;
    }
  }
  return { station: best, distanceKm: Math.round(bestDist) };
}
