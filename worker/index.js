// Runs in front of the static site on Cloudflare.
// Sends www and plain-http visitors to https://bellenergysolutions.com (the canonical address)
// with a single 301, then serves the built pages from ./dist.
const CANONICAL_HOST = 'bellenergysolutions.com';

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const isOurDomain = url.hostname === CANONICAL_HOST || url.hostname === `www.${CANONICAL_HOST}`;
    if (isOurDomain && (url.hostname !== CANONICAL_HOST || url.protocol === 'http:')) {
      url.hostname = CANONICAL_HOST;
      url.protocol = 'https:';
      return Response.redirect(url.toString(), 301);
    }
    return env.ASSETS.fetch(request);
  },
};
