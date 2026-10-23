// Contact form settings (Web3Forms). The access key is designed to be public: it only
// lets the form send messages to the owner's inbox. It comes from FORM_ACCESS_KEY
// (.env.local on the owner's computer; a GitHub Actions secret in CI).
export const contactForm = {
  endpoint: 'https://api.web3forms.com/submit',
  accessKey: import.meta.env.FORM_ACCESS_KEY ?? '',
  subject: 'New message from bellenergysolutions.com',
  fromName: 'Bell Energy Solutions website',
  thankYouPath: '/thank-you/',
};

if (!contactForm.accessKey) {
  console.warn('[contact form] FORM_ACCESS_KEY is not set; the form will not deliver messages.');
}
