import data from '../../../data/data.json';
import theme from '../../../data/theme.json';
import { locales, t, dateLocale, type Locale } from '../../../i18n';

interface EventType {
  nom: string;
  slug: string;
  date_iso: string;
  fuseau: string;
  confirme: boolean;
  description_courte: string;
}

export function getStaticPaths() {
  return locales.flatMap((lang) =>
    data.evenements.map((event) => ({
      params: { lang, slug: event.slug },
      props: { event },
    }))
  );
}

export function GET({ params, props }: { params: { lang: string }; props: { event: EventType } }) {
  const locale = params.lang as Locale;
  const { event } = props;
  const c = theme.couleurs;

  const eventDate = new Date(event.date_iso);
  const now = new Date();
  const diff = eventDate.getTime() - now.getTime();
  const days = Math.max(0, Math.floor(diff / 86400000));
  const isPast = diff <= 0;

  const countdownLabel = isPast
    ? t(locale, 'og.happened')
    : `${days} ${days === 1 ? t(locale, 'og.day_one') : t(locale, 'og.day_many')}`;
  const statusBadge = event.confirme
    ? t(locale, 'event.confirmed')
    : t(locale, 'event.estimated');
  const badgeColor = event.confirme ? c.confirme : c.non_confirme;

  const displayDate = eventDate.toLocaleDateString(dateLocale(locale), {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="${c.fond}"/>
      <stop offset="100%" stop-color="${c.fond_carte}"/>
    </linearGradient>
    <linearGradient id="glow" x1="0.5" y1="0" x2="0.5" y2="1">
      <stop offset="0%" stop-color="${c.accent}" stop-opacity="0.15"/>
      <stop offset="100%" stop-color="${c.accent}" stop-opacity="0"/>
    </linearGradient>
  </defs>

  <rect width="1200" height="630" fill="url(#bg)"/>
  <ellipse cx="600" cy="0" rx="600" ry="300" fill="url(#glow)"/>
  <rect x="0" y="620" width="1200" height="10" fill="${c.accent}" opacity="0.6"/>

  <text x="80" y="72" font-family="Inter, system-ui, sans-serif" font-size="24" font-weight="500" fill="${c.texte_secondaire}">${escapeXml(data.titre)}</text>

  <rect x="80" y="110" width="${statusBadge.length * 12 + 32}" height="36" rx="18" fill="${badgeColor}" opacity="0.15"/>
  <text x="96" y="134" font-family="Inter, system-ui, sans-serif" font-size="16" font-weight="600" fill="${badgeColor}">${escapeXml(statusBadge)}</text>

  <text x="80" y="210" font-family="Inter, system-ui, sans-serif" font-size="52" font-weight="700" fill="${c.texte}">${escapeXml(truncate(event.nom, 30))}</text>

  <text x="80" y="260" font-family="Inter, system-ui, sans-serif" font-size="22" fill="${c.texte_secondaire}">${escapeXml(truncate(event.description_courte, 70))}</text>

  <rect x="80" y="320" width="1040" height="180" rx="24" fill="${c.fond_digit}" stroke="${c.bordure}" stroke-width="2"/>

  <text x="600" y="430" text-anchor="middle" font-family="'Courier New', monospace" font-size="${isPast ? '72' : '110'}" font-weight="700" fill="${isPast ? c.passe : c.digit_texte}">${escapeXml(countdownLabel)}</text>

  ${!isPast ? `<text x="600" y="475" text-anchor="middle" font-family="Inter, system-ui, sans-serif" font-size="22" fill="${c.texte_secondaire}">${escapeXml(t(locale, 'og.remaining'))}</text>` : ''}

  <text x="80" y="565" font-family="Inter, system-ui, sans-serif" font-size="22" fill="${c.texte_secondaire}">${escapeXml(displayDate)}</text>

  <circle cx="1120" cy="555" r="20" fill="${c.accent}" opacity="0.3"/>
  <circle cx="1120" cy="555" r="8" fill="${c.accent}"/>
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

function truncate(s: string, max: number): string {
  return s.length > max ? s.slice(0, max - 1) + '\u2026' : s;
}
