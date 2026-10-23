// Business details used across the site. Every value here comes from business-facts.md
// (approved by the owner 2026-10-22). Change facts there first, then here.

export const business = {
  name: 'Bell Energy Solutions',
  owner: 'Caleb',
  url: 'https://bellenergysolutions.com',
  phone: '971-340-7390',
  phoneHref: 'tel:+19713407390',
  email: 'caleb@bellenergysolutions.com',
  hours: 'Monday–Friday, 8 am–5 pm',
  hoursNote: 'By appointment only. Closed on holidays.',
  quoteLine: 'Contact us for a quote.',
};

export const serviceArea = {
  // Owner said "primarily": use `line` where the sentence doesn't already say so.
  summary: 'Spokane and Spokane County, WA, and Kootenai County in North Idaho',
  line: 'Primarily Spokane and Spokane County, WA, and Kootenai County, ID',
  regions: [
    {
      name: 'Spokane County, WA',
      towns: ['Spokane', 'Spokane Valley', 'Liberty Lake', 'Cheney', 'Airway Heights', 'Mead', 'Deer Park'],
    },
    {
      name: 'Kootenai County, ID',
      towns: ["Coeur d'Alene", 'Post Falls', 'Hayden', 'Rathdrum'],
    },
  ],
};

export const credentials = [
  'Building Science Institute (BSI) Level 2 Verifier',
  'ENERGY STAR Verifier and ENERGY STAR Partner',
  'DOE Zero Energy Ready Home certified',
  'NRPP certified (National Radon Proficiency Program)',
  'Retrotec certified for residential and commercial blower door testing',
];

export type Service = {
  slug: string;
  name: string;
  short: string;
  homeowners: boolean;
};

export const services: Service[] = [
  {
    slug: 'eri-scores',
    name: 'ERI Scores',
    short: 'Energy Rating Index scores produced by a BSI Level 2 Verifier.',
    homeowners: false,
  },
  {
    slug: 'blower-door-testing',
    name: 'Air Leakage Testing',
    short: 'Third-party blower door testing by a Retrotec-certified tester.',
    homeowners: true,
  },
  {
    slug: 'thermal-imaging',
    name: 'Thermal Imaging',
    short: 'Active thermography (infrared imaging) of the building envelope.',
    homeowners: true,
  },
  {
    slug: 'radon-testing',
    name: 'Radon Testing',
    short: 'Radon testing by an NRPP-certified professional.',
    homeowners: true,
  },
  {
    slug: 'energy-code-compliance',
    name: 'Energy Code Compliance',
    short: 'Help achieving Washington State Energy Code compliance.',
    homeowners: false,
  },
  {
    slug: 'design-consulting',
    name: 'Design Consulting',
    short: 'Design help and consulting for more comfortable homes.',
    homeowners: false,
  },
];
