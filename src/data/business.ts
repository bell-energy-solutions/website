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
  summary: 'Eastern Washington and North Idaho',
  base: 'Spokane, WA',
  line: 'Eastern Washington and North Idaho, based in Spokane',
  // Example towns (owner-approved); the service area is the two regions, not only these towns.
  regions: [
    {
      name: 'Eastern Washington',
      state: 'WA',
      towns: ['Spokane', 'Spokane Valley', 'Liberty Lake', 'Cheney', 'Airway Heights', 'Mead', 'Deer Park'],
    },
    {
      name: 'North Idaho',
      state: 'ID',
      towns: ["Coeur d'Alene", 'Post Falls', 'Hayden', 'Rathdrum'],
    },
  ],
};

export const credentials = [
  'Building Science Institute (BSI) Level 2 Verifier',
  'ENERGY STAR Verifier and ENERGY STAR Partner',
  'DOE Zero Energy Ready Home certified',
  'NRPP certified (National Radon Proficiency Program)',
  'Retrotec certified for residential blower door testing',
];

export type Service = {
  slug: string;
  name: string;
  short: string;
  homeowners: boolean;
};

// Order matters: the owner leads with consulting, design, and third-party testing;
// ERI scores come after, as proof of results (business-facts.md, Positioning).
export const services: Service[] = [
  {
    slug: 'design-consulting',
    name: 'Consulting & Design',
    short: 'Consulting and design help to build comfortable, quality homes.',
    homeowners: false,
  },
  {
    slug: 'blower-door-testing',
    name: 'Blower Door Testing',
    short: 'Third-party air leakage testing for homes, by a Retrotec-certified tester.',
    homeowners: true,
  },
  {
    slug: 'commercial-blower-door-testing',
    name: 'Commercial Blower Door Testing',
    short: 'Commercial air leakage testing, including multi-fan setups, to help you meet the Washington State Energy Code.',
    homeowners: false,
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
    slug: 'eri-scores',
    name: 'ERI Scores',
    short: 'Energy Rating Index scores that show the results of design and testing.',
    homeowners: false,
  },
];
