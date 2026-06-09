/** Analytics first-party 1dollar (visitas ao teu SaaS publicado). */
const DEDUP_MS = 4000;
let lastPath = '';
let lastAt = 0;

function readCfg() {
  const k = import.meta.env.VITE_1DOLLAR_ANALYTICS_KEY as string | undefined;
  const api = import.meta.env.VITE_1DOLLAR_API_URL as string | undefined;
  const pid = import.meta.env.VITE_1DOLLAR_PROJECT_ID as string | undefined;
  return { k, api, pid };
}

function send(path: string) {
  const { k, api } = readCfg();
  if (!k?.trim() || !api?.trim()) return;
  const now = Date.now();
  if (path === lastPath && now - lastAt < DEDUP_MS) return;
  lastPath = path;
  lastAt = now;

  const base = api.replace(/\/+$/, "");
  const url = base + '/api/public/saas-analytics/collect';
  const body = JSON.stringify({
    k,
    p: path.slice(0, 2000),
    r:
      typeof document !== 'undefined' && document.referrer
        ? String(document.referrer).slice(0, 500)
        : undefined,
    t:
      typeof document !== 'undefined' && document.title
        ? String(document.title).slice(0, 280)
        : undefined,
  });

  void fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body,
    mode: 'cors',
    keepalive: true,
    credentials: 'omit',
  }).catch(() => {});
}

export function init1DollarAnalytics() {
  const { k, api, pid } = readCfg();
  if (!k?.trim() || !api?.trim() || !pid?.trim()) return;

  const run = () => {
    try {
      const p = window.location.pathname + (window.location.search || "");
      send(p);
    } catch {
      /* ignore */
    }
  };

  run();
  window.addEventListener('popstate', run);

  const oPush = history.pushState.bind(history);
  const oRep = history.replaceState.bind(history);
  history.pushState = function (this: History, ...args: Parameters<History['pushState']>) {
    const r = oPush.apply(this, args);
    queueMicrotask(run);
    return r;
  };
  history.replaceState = function (this: History, ...args: Parameters<History['replaceState']>) {
    const r = oRep.apply(this, args);
    queueMicrotask(run);
    return r;
  };
}
