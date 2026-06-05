import data from '../../../data/data.json';
import theme from '../../../data/theme.json';
import { locales, t, type Locale } from '../../../i18n';

export function getStaticPaths() {
  return locales.map((lang) => ({ params: { lang } }));
}

export function GET({ params }: { params: { lang: string } }) {
  const locale = params.lang as Locale;
  const c = theme.couleurs;
  const events = data.evenements;
  const upcomingCount = events.filter(e => new Date(e.date_iso).getTime() > Date.now()).length;

  const eventsLabel = upcomingCount === 1
    ? t(locale, 'og.events_one')
    : t(locale, 'og.events_many');

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="${c.fond}"/>
      <stop offset="100%" stop-color="${c.fond_carte}"/>
    </linearGradient>
    <linearGradient id="glow" x1="0.5" y1="0" x2="0.5" y2="1">
      <stop offset="0%" stop-color="${c.accent}" stop-opacity="0.2"/>
      <stop offset="100%" stop-color="${c.accent}" stop-opacity="0"/>
    </linearGradient>
  </defs>

  <rect width="1200" height="630" fill="url(#bg)"/>
  <ellipse cx="600" cy="0" rx="700" ry="350" fill="url(#glow)"/>
  <rect x="0" y="620" width="1200" height="10" fill="${c.accent}" opacity="0.6"/>

  <text x="600" y="220" text-anchor="middle" font-family="Inter, system-ui, sans-serif" font-size="60" font-weight="700" fill="${c.texte}">${escapeXml(data.titre)}</text>

  <text x="600" y="280" text-anchor="middle" font-family="Inter, system-ui, sans-serif" font-size="26" fill="${c.texte_secondaire}">${escapeXml(t(locale, 'og.countdown'))}</text>

  <rect x="400" y="330" width="400" height="140" rx="24" fill="${c.fond_digit}" stroke="${c.bordure}" stroke-width="2"/>
  <text x="600" y="410" text-anchor="middle" font-family="'Courier New', monospace" font-size="80" font-weight="700" fill="${c.digit_texte}">${upcomingCount}</text>
  <text x="600" y="450" text-anchor="middle" font-family="Inter, system-ui, sans-serif" font-size="20" fill="${c.texte_secondaire}">${escapeXml(eventsLabel)}</text>

  <circle cx="160" cy="500" r="40" fill="${c.accent}" opacity="0.08"/>
  <circle cx="1040" cy="500" r="40" fill="${c.accent}" opacity="0.08"/>
  <circle cx="160" cy="500" r="10" fill="${c.accent}" opacity="0.3"/>
  <circle cx="1040" cy="500" r="10" fill="${c.accent}" opacity="0.3"/>
</svg>`;

  return new Response(svg, {
    headers: { 'Content-Type': 'image/svg+xml' },
  });
}

function escapeXml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}
