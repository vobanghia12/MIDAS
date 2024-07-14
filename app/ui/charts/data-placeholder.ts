import { RiskChartDataEntry } from "@/types/chart-data-entry"

export const dataGender: RiskChartDataEntry[] = [
  new RiskChartDataEntry('Male', [
    {label: 'High Risk', value: 0.08},
    {label: 'Some Risk', value: 0.44},
    {label: 'Low Risk', value: 0.48}
  ]),
  new RiskChartDataEntry('Female', [
    {label: 'High Risk', value: 0.12},
    {label: 'Some Risk', value: 0.33},
    {label: 'Low Risk', value: 0.55}
  ])
]

export const dataDiscipline: RiskChartDataEntry[] = [
  new RiskChartDataEntry('Suspensions', [
    {label: 'Zero', value: 0.79},
    {label: 'One Plus', value: 0.21},
  ]),
  new RiskChartDataEntry('ODR', [
    {label: 'Zero', value: 0.8},
    {label: 'One Plus', value: 0.2},
  ]),
]

export const dataTestRisk: RiskChartDataEntry[] = [
  new RiskChartDataEntry('Reading', [
    {label: 'Low', value: 0.79},
    {label: 'Some', value: 0.21},
  ]),
  new RiskChartDataEntry('Math', [
    {label: 'Low', value: 0.8},
    {label: 'Some', value: 0.2},
  ]),
]

// {
//   id: 'Male',
//   'High Risk': .08,
//   'Some Risk': .44,
//   'Low Risk': .48
// },
// {
//   id: 'Female',
//   'High Risk': .12,
//   'Some Risk': .33,
//   'Low Risk': .55
// },

export const dataEthnicity = [
  {
    id: 'White',
    'High Risk': .162,
    'Some Risk': .559,
    'Low Risk': .279
  },
  {
    id: 'Hispanic',
    'High Risk': .067,
    'Some Risk': .50,
    'Low Risk': .433
  },
  {
    id: 'Other POC',
    'High Risk': .085,
    'Some Risk': .401,
    'Low Risk': .514
  }
]

export const dataEll = [
  {
    id: 'ELL',
    'High Risk': .2,
    'Some Risk': .35,
    'Low Risk': .45
  },
  {
    id: 'Not ELL', 
    'High Risk': .33,
    'Some Risk': .4,
    'Low Risk': .27
  },
]

export const dataSaebrsTotal = [
  {
    id: 'Saebrs',
    'High Risk': 0.1,
    'Some Risk': 0.27,
    'Low Risk': 0.63,
  },
  {
    id: 'MySaebrs',
    'High Risk': 0.1,
    'Some Risk': 0.35,
    'Low Risk': 0.55,
  },
];

export const dataSaebrsEmotional = [
  {
    id: 'Saebrs',
    'High Risk': 0.08,
    'Some Risk': 0.22,
    'Low Risk': 0.7,
  },
  {
    id: 'MySaebrs',
    'High Risk': 0.05,
    'Some Risk': 0.6,
    'Low Risk': 0.35,
  },
];

export const dataSaebrsSocial = [
  {
    id: 'Saebrs',
    'High Risk': 0.1,
    'Some Risk': 0.27,
    'Low Risk': 0.63,
  },
  {
    id: 'MySaebrs',
    'High Risk': 0.05,
    'Some Risk': 0.6,
    'Low Risk': 0.35,
  },
];

export const dataSaerbsAcademic = [
  {
    id: 'Saebrs',
    'High Risk': .33,
    'Some Risk': .4,
    'Low Risk': .27
  },
  {
    id: 'MySaebrs',
    'High Risk': 0.05,
    'Some Risk': 0.6,
    'Low Risk': 0.35,
  },
];