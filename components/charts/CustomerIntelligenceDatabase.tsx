'use client'

import { useState } from 'react'
import { ChevronDown, ChevronUp } from 'lucide-react'

interface CustomerIntelligenceDatabaseProps {
  title?: string
  height?: number
}

type Col = { key: string; label: string; group: string }

const BASIC_COLUMNS: Col[] = [
  { key: 'name', label: 'Customer Name / Company Name', group: 'Customer Information' },
  { key: 'overview', label: 'Business Overview', group: 'Customer Information' },
  { key: 'ownerType', label: 'Fleet Owner Type', group: 'Customer Information' },
  { key: 'fleetType', label: 'Vehicle Fleet Type', group: 'Customer Information' },
  { key: 'revenue', label: 'Total Annual Revenue (US$ Million)', group: 'Customer Information' },
  { key: 'fleetSize', label: 'Fleet Size / Scale', group: 'Customer Information' },
  { key: 'contactPerson', label: 'Key Contact Person', group: 'Contact Details' },
  { key: 'designation', label: 'Designation / Role', group: 'Contact Details' },
  { key: 'email', label: 'Email Address', group: 'Contact Details' },
  { key: 'phone', label: 'Phone / WhatsApp Number', group: 'Contact Details' },
  { key: 'linkedin', label: 'LinkedIn Profile', group: 'Contact Details' },
  { key: 'website', label: 'Website URL', group: 'Contact Details' },
]

const ADVANCE_EXTRA: Col[] = [
  { key: 'criteria', label: 'Key Vehicle Scrapping / Disposal Criteria', group: 'Fleet Vehicle Scrapping Drivers' },
  { key: 'painPoints', label: 'Core Fleet Disposal Pain Points', group: 'Fleet Vehicle Scrapping Drivers' },
  { key: 'renewalCycle', label: 'Fleet Renewal Cycle', group: 'Fleet Vehicle Scrapping Drivers' },
  { key: 'elvVolume', label: 'End-of-Life Vehicle Volume Potential', group: 'Fleet Vehicle Scrapping Drivers' },
  { key: 'triggers', label: 'Key Disposal Triggers', group: 'Fleet Vehicle Scrapping Drivers' },
  { key: 'budgetOwner', label: 'Budget Ownership', group: 'Purchasing Behaviour Metrics' },
  { key: 'procurement', label: 'Procurement Model', group: 'Purchasing Behaviour Metrics' },
]

const PREMIUM_EXTRA: Col[] = [
  { key: 'decisionCycle', label: 'Decision-Making Cycle', group: 'Strategic Insights' },
  { key: 'sustainability', label: 'Sustainability / ESG Commitments', group: 'Strategic Insights' },
  { key: 'partnerships', label: 'Existing Recycler / OEM Partnerships', group: 'Strategic Insights' },
  { key: 'opportunity', label: 'Engagement Opportunity Score', group: 'Strategic Insights' },
]

const ADVANCE_COLUMNS: Col[] = [...BASIC_COLUMNS, ...ADVANCE_EXTRA]
const PREMIUM_COLUMNS: Col[] = [...ADVANCE_COLUMNS, ...PREMIUM_EXTRA]

const CUSTOMERS = [
  {
    name: 'JSL Logística S.A.',
    overview: 'Largest road logistics operator in Brazil, integrated transport & fleet services',
    ownerType: 'Logistics',
    fleetType: 'Mixed Fleet (HCVs + LCVs)',
    revenue: '1,820',
    fleetSize: '18,500 vehicles',
    contactPerson: 'Ramon Alcaraz',
    designation: 'Fleet Operations Director',
    email: 'r.alcaraz@jsl.com.br',
    phone: '+55 11 2377-7000',
    linkedin: 'linkedin.com/company/jsl',
    website: 'jsl.com.br',
    criteria: 'Vehicles >10 yrs or >800k km',
    painPoints: 'Low resale value, compliance paperwork',
    renewalCycle: '7–8 years',
    elvVolume: '~1,200 units/yr',
    triggers: 'Aging Fleet, High Maintenance Cost',
    budgetOwner: 'Fleet Management',
    procurement: 'Direct Recycler Tie-Up',
    decisionCycle: '3–4 months',
    sustainability: 'Net-zero by 2040, ISO 14001',
    partnerships: 'Gerdau, Sucatas Sao Paulo',
    opportunity: 'High (92)',
  },
  {
    name: 'Localiza Rent a Car S.A.',
    overview: 'Largest car rental and fleet management company in Latin America',
    ownerType: 'Rental',
    fleetType: 'Passenger Vehicles',
    revenue: '5,400',
    fleetSize: '610,000 vehicles',
    contactPerson: 'Bruno Sebastian',
    designation: 'Head of Fleet Disposal',
    email: 'bruno.s@localiza.com',
    phone: '+55 31 3247-7700',
    linkedin: 'linkedin.com/company/localiza',
    website: 'localiza.com',
    criteria: 'Vehicles >24 months or >80k km',
    painPoints: 'Volume disposal, residual value volatility',
    renewalCycle: '18–24 months',
    elvVolume: '~14,000 units/yr',
    triggers: 'Lease Expiry, Fleet Modernization',
    budgetOwner: 'Asset Recovery Team',
    procurement: 'Auction',
    decisionCycle: '1–2 months',
    sustainability: 'CDP-A list, EV transition pilots',
    partnerships: 'Volkswagen, Fiat, Renault buyback',
    opportunity: 'Very High (97)',
  },
  {
    name: 'Movida Participações',
    overview: 'Major rent-a-car & fleet outsourcing player in Brazil',
    ownerType: 'Rental',
    fleetType: 'Passenger Vehicles + LCVs',
    revenue: '2,150',
    fleetSize: '230,000 vehicles',
    contactPerson: 'Carla Menezes',
    designation: 'Asset Recovery Manager',
    email: 'c.menezes@movida.com.br',
    phone: '+55 11 3299-9090',
    linkedin: 'linkedin.com/company/movida',
    website: 'movida.com.br',
    criteria: 'Mileage threshold + insurance write-offs',
    painPoints: 'Title transfer delays, scrap pricing',
    renewalCycle: '24 months',
    elvVolume: '~6,800 units/yr',
    triggers: 'Lease Expiry, Accident Damage',
    budgetOwner: 'Procurement',
    procurement: 'Dealer + Auction',
    decisionCycle: '2 months',
    sustainability: 'Scope 3 reporting underway',
    partnerships: 'GM Brazil, Sinctronics',
    opportunity: 'High (88)',
  },
  {
    name: 'Viação 1001 (Grupo JCA)',
    overview: 'Inter-state passenger bus operator across Southeast Brazil',
    ownerType: 'Bus Operators',
    fleetType: 'Buses',
    revenue: '420',
    fleetSize: '1,950 buses',
    contactPerson: 'Eduardo Tavares',
    designation: 'Diretor de Manutenção',
    email: 'e.tavares@1001.com.br',
    phone: '+55 21 4004-5001',
    linkedin: 'linkedin.com/company/grupo-jca',
    website: 'autoviacao1001.com.br',
    criteria: 'Buses >12 yrs (CONTRAN limit)',
    painPoints: 'High disposal cost for diesel coaches',
    renewalCycle: '10–12 years',
    elvVolume: '~150 units/yr',
    triggers: 'Emission Compliance, Aging Fleet',
    budgetOwner: 'Operations',
    procurement: 'Tender-Based',
    decisionCycle: '4–6 months',
    sustainability: 'Euro 6 transition by 2027',
    partnerships: 'Marcopolo, Mercedes-Benz',
    opportunity: 'Medium (74)',
  },
  {
    name: '99 Tecnologia (DiDi Brasil)',
    overview: 'Leading ride-hailing platform with managed driver fleet',
    ownerType: 'Taxi & Ride-Hailing',
    fleetType: 'Passenger Vehicles',
    revenue: '780',
    fleetSize: '42,000 managed vehicles',
    contactPerson: 'Patricia Lin',
    designation: 'Fleet Lifecycle Lead',
    email: 'patricia.lin@99app.com',
    phone: '+55 11 4933-9999',
    linkedin: 'linkedin.com/company/99app',
    website: '99app.com',
    criteria: 'Aged-out rental returns',
    painPoints: 'Fragmented disposal, low resale',
    renewalCycle: '36 months',
    elvVolume: '~2,400 units/yr',
    triggers: 'Aging Fleet, Lease Expiry',
    budgetOwner: 'Finance',
    procurement: 'OEM Buyback',
    decisionCycle: '2 months',
    sustainability: 'EV pilot in São Paulo',
    partnerships: 'BYD, Caoa Chery',
    opportunity: 'High (85)',
  },
  {
    name: 'Vale S.A.',
    overview: 'Global mining major with large heavy-duty off-road fleet',
    ownerType: 'Mining',
    fleetType: 'HCVs + Off-Road',
    revenue: '41,800',
    fleetSize: '5,400 vehicles',
    contactPerson: 'Henrique Bastos',
    designation: 'Mobile Equipment Disposal Mgr',
    email: 'henrique.bastos@vale.com',
    phone: '+55 21 3814-4477',
    linkedin: 'linkedin.com/company/vale',
    website: 'vale.com',
    criteria: 'Operational hours threshold',
    painPoints: 'Hazardous fluid handling, remote sites',
    renewalCycle: '8–10 years',
    elvVolume: '~380 units/yr',
    triggers: 'High Maintenance Cost, Asset Write-Off',
    budgetOwner: 'Asset Recovery Team',
    procurement: 'Tender-Based',
    decisionCycle: '6 months',
    sustainability: 'Net-zero 2050, dam-safety ESG',
    partnerships: 'Caterpillar, Komatsu reman',
    opportunity: 'Very High (95)',
  },
  {
    name: 'Petrobras Distribuidora (Vibra)',
    overview: 'Largest fuel distributor in Brazil, owned tanker & light fleet',
    ownerType: 'Utilities',
    fleetType: 'HCVs + LCVs',
    revenue: '23,600',
    fleetSize: '3,200 vehicles',
    contactPerson: 'Marina Costa',
    designation: 'Logistics Asset Manager',
    email: 'marina.costa@vibraenergia.com.br',
    phone: '+55 21 3876-4000',
    linkedin: 'linkedin.com/company/vibraenergia',
    website: 'vibraenergia.com.br',
    criteria: 'Tanker recertification cycle',
    painPoints: 'Hazmat decontamination',
    renewalCycle: '8 years',
    elvVolume: '~220 units/yr',
    triggers: 'Emission Compliance, Aging Fleet',
    budgetOwner: 'Operations',
    procurement: 'Direct Recycler Tie-Up',
    decisionCycle: '3 months',
    sustainability: 'GHG reduction target -30% by 2030',
    partnerships: 'Scania, Volvo',
    opportunity: 'High (89)',
  },
  {
    name: 'Construtora Andrade Gutierrez',
    overview: 'Major civil construction & infrastructure conglomerate',
    ownerType: 'Construction',
    fleetType: 'HCVs + Off-Road',
    revenue: '1,900',
    fleetSize: '2,700 vehicles',
    contactPerson: 'Rafael Pinto',
    designation: 'Equipment Manager',
    email: 'rafael.pinto@agnet.com.br',
    phone: '+55 31 3290-7000',
    linkedin: 'linkedin.com/company/andrade-gutierrez',
    website: 'andradegutierrez.com.br',
    criteria: 'Project completion / >15k hrs',
    painPoints: 'Site-to-yard transport cost',
    renewalCycle: '7 years',
    elvVolume: '~190 units/yr',
    triggers: 'Asset Write-Off, High Maintenance Cost',
    budgetOwner: 'Procurement',
    procurement: 'Auction',
    decisionCycle: '4 months',
    sustainability: 'ISO 14001, ESG governance launch',
    partnerships: 'Volvo CE, Sotreq',
    opportunity: 'Medium (78)',
  },
  {
    name: 'JBS S.A.',
    overview: 'World\'s largest meat processor with cold-chain logistics fleet',
    ownerType: 'Logistics',
    fleetType: 'HCVs (Reefer) + LCVs',
    revenue: '72,500',
    fleetSize: '4,100 vehicles',
    contactPerson: 'Lucas Andrade',
    designation: 'Cold Chain Fleet Director',
    email: 'lucas.andrade@jbs.com.br',
    phone: '+55 11 3144-4000',
    linkedin: 'linkedin.com/company/jbs',
    website: 'jbs.com.br',
    criteria: 'Reefer compressor lifecycle',
    painPoints: 'Refrigerant handling, F-gas regs',
    renewalCycle: '6 years',
    elvVolume: '~310 units/yr',
    triggers: 'Emission Compliance, Aging Fleet',
    budgetOwner: 'Fleet Management',
    procurement: 'Scrap Partner Contract',
    decisionCycle: '2 months',
    sustainability: 'Net-zero 2040 commitment',
    partnerships: 'Iveco, Thermo King',
    opportunity: 'High (90)',
  },
  {
    name: 'Cooxupé Cooperativa',
    overview: 'Largest coffee cooperative, agricultural transport fleet',
    ownerType: 'Agriculture',
    fleetType: 'HCVs + Off-Road',
    revenue: '1,420',
    fleetSize: '880 vehicles',
    contactPerson: 'Sofia Ribeiro',
    designation: 'Frota Manager',
    email: 's.ribeiro@cooxupe.com.br',
    phone: '+55 35 3312-1000',
    linkedin: 'linkedin.com/company/cooxupe',
    website: 'cooxupe.com.br',
    criteria: 'Harvest-cycle utilization',
    painPoints: 'Seasonality, rural disposal access',
    renewalCycle: '9 years',
    elvVolume: '~70 units/yr',
    triggers: 'Aging Fleet, High Maintenance Cost',
    budgetOwner: 'Operations',
    procurement: 'Dealer',
    decisionCycle: '5 months',
    sustainability: 'Rainforest Alliance certified',
    partnerships: 'New Holland, John Deere',
    opportunity: 'Medium (72)',
  },
  {
    name: 'Correios (ECT)',
    overview: 'Brazilian state postal & courier operator',
    ownerType: 'Government Fleets',
    fleetType: 'LCVs + Two-Wheelers',
    revenue: '3,300',
    fleetSize: '22,000 vehicles',
    contactPerson: 'Antonio Pereira',
    designation: 'Diretor de Frota',
    email: 'antonio.pereira@correios.com.br',
    phone: '+55 61 3003-0100',
    linkedin: 'linkedin.com/company/correios',
    website: 'correios.com.br',
    criteria: 'Federal asset disposal rules',
    painPoints: 'Public tender complexity',
    renewalCycle: '8–10 years',
    elvVolume: '~1,800 units/yr',
    triggers: 'Aging Fleet, Asset Write-Off',
    budgetOwner: 'Procurement',
    procurement: 'Tender-Based',
    decisionCycle: '6–9 months',
    sustainability: 'Federal sustainable logistics plan',
    partnerships: 'Honda, Fiat',
    opportunity: 'High (86)',
  },
  {
    name: 'Sompo Seguros Brasil',
    overview: 'Top-10 P&C insurer with vehicle salvage operations',
    ownerType: 'Insurance Total-Loss',
    fleetType: 'Passenger Vehicles + LCVs',
    revenue: '1,750',
    fleetSize: 'N/A (salvage flow)',
    contactPerson: 'Beatriz Souza',
    designation: 'Salvage Operations Head',
    email: 'beatriz.souza@sompo.com.br',
    phone: '+55 11 3156-7000',
    linkedin: 'linkedin.com/company/sompo-seguros',
    website: 'sompo.com.br',
    criteria: 'Total-loss declarations',
    painPoints: 'Title cleansing, parts recovery',
    renewalCycle: 'Continuous',
    elvVolume: '~9,500 units/yr',
    triggers: 'Accident Damage',
    budgetOwner: 'Asset Recovery Team',
    procurement: 'Auction',
    decisionCycle: '<1 month',
    sustainability: 'Circular economy partnership',
    partnerships: 'Copart Brasil, Sinctronics',
    opportunity: 'Very High (94)',
  },
]

interface PropositionConfig {
  id: string
  title: string
  subtitle: string
  badge: string
  badgeClass: string
  headerGradient: string
  groupHeaderClass: string
  rowHover: string
  columns: Col[]
  groupColors: Record<string, string>
  accentBorder: string
}

const PROPOSITIONS: PropositionConfig[] = [
  {
    id: 'p1',
    title: 'Proposition 1 — Basic',
    subtitle: 'Verified directory and contact details of fleet owners',
    badge: 'BASIC',
    badgeClass: 'bg-sky-100 text-sky-800 ring-1 ring-sky-300',
    headerGradient: 'from-sky-50 via-blue-50 to-indigo-50',
    groupHeaderClass: 'bg-gradient-to-r from-sky-600 to-blue-600 text-white',
    rowHover: 'hover:bg-sky-50',
    accentBorder: 'border-sky-300',
    columns: BASIC_COLUMNS,
    groupColors: {
      'Customer Information': 'bg-sky-50',
      'Contact Details': 'bg-blue-50',
    },
  },
  {
    id: 'p2',
    title: 'Proposition 2 — Advance',
    subtitle: 'Adds scrapping drivers and purchasing behaviour metrics',
    badge: 'ADVANCE',
    badgeClass: 'bg-purple-100 text-purple-800 ring-1 ring-purple-300',
    headerGradient: 'from-purple-50 via-fuchsia-50 to-pink-50',
    groupHeaderClass: 'bg-gradient-to-r from-purple-600 to-fuchsia-600 text-white',
    rowHover: 'hover:bg-purple-50',
    accentBorder: 'border-purple-300',
    columns: ADVANCE_COLUMNS,
    groupColors: {
      'Customer Information': 'bg-sky-50',
      'Contact Details': 'bg-blue-50',
      'Fleet Vehicle Scrapping Drivers': 'bg-purple-50',
      'Purchasing Behaviour Metrics': 'bg-fuchsia-50',
    },
  },
  {
    id: 'p3',
    title: 'Proposition 3 — Premium',
    subtitle: 'Full strategic intelligence with ESG, partnerships and engagement scoring',
    badge: 'PREMIUM',
    badgeClass: 'bg-amber-100 text-amber-800 ring-1 ring-amber-300',
    headerGradient: 'from-amber-50 via-orange-50 to-rose-50',
    groupHeaderClass: 'bg-gradient-to-r from-amber-600 via-orange-600 to-rose-600 text-white',
    rowHover: 'hover:bg-amber-50',
    accentBorder: 'border-amber-300',
    columns: PREMIUM_COLUMNS,
    groupColors: {
      'Customer Information': 'bg-sky-50',
      'Contact Details': 'bg-blue-50',
      'Fleet Vehicle Scrapping Drivers': 'bg-purple-50',
      'Purchasing Behaviour Metrics': 'bg-fuchsia-50',
      'Strategic Insights': 'bg-amber-50',
    },
  },
]

export default function CustomerIntelligenceDatabase({
  title = 'Customer Intelligence Database',
}: CustomerIntelligenceDatabaseProps) {
  const [open, setOpen] = useState<Record<string, boolean>>({ p1: true, p2: false, p3: false })

  const toggle = (id: string) => setOpen(o => ({ ...o, [id]: !o[id] }))

  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-xl font-bold text-gray-900">{title}</h2>
        <p className="text-sm text-gray-600 mt-1">
          Brazil Vehicle Scrapping Market — Customer Database of Fleet Owners
        </p>
      </div>

      {PROPOSITIONS.map(prop => {
        const isOpen = open[prop.id]
        const groups: { name: string; cols: Col[] }[] = []
        prop.columns.forEach(col => {
          const last = groups[groups.length - 1]
          if (last && last.name === col.group) last.cols.push(col)
          else groups.push({ name: col.group, cols: [col] })
        })

        return (
          <div
            key={prop.id}
            className={`border-2 ${prop.accentBorder} rounded-xl overflow-hidden bg-white shadow-md`}
          >
            <button
              onClick={() => toggle(prop.id)}
              className={`w-full flex items-center justify-between px-5 py-4 bg-gradient-to-r ${prop.headerGradient} hover:brightness-95 transition-all`}
            >
              <div className="flex items-center gap-3 text-left">
                <span className={`text-xs font-bold px-3 py-1 rounded-full ${prop.badgeClass}`}>
                  {prop.badge}
                </span>
                <div>
                  <div className="font-bold text-gray-900 text-base">{prop.title}</div>
                  <div className="text-xs text-gray-700">{prop.subtitle}</div>
                </div>
              </div>
              {isOpen ? (
                <ChevronUp className="h-5 w-5 text-gray-700" />
              ) : (
                <ChevronDown className="h-5 w-5 text-gray-700" />
              )}
            </button>

            {isOpen && (
              <div className="overflow-x-auto border-t-2 border-gray-200">
                <table className="min-w-full text-xs border-collapse">
                  <thead>
                    <tr>
                      <th
                        rowSpan={2}
                        className={`px-3 py-2 text-left font-bold border border-gray-300 sticky left-0 z-20 ${prop.groupHeaderClass}`}
                      >
                        S.No.
                      </th>
                      {groups.map(g => (
                        <th
                          key={g.name}
                          colSpan={g.cols.length}
                          className={`px-3 py-2 text-center font-bold border border-gray-300 ${prop.groupHeaderClass}`}
                        >
                          {g.name}
                        </th>
                      ))}
                    </tr>
                    <tr>
                      {prop.columns.map(c => (
                        <th
                          key={c.key}
                          className={`px-3 py-2 text-left font-semibold text-gray-800 border border-gray-300 whitespace-nowrap ${prop.groupColors[c.group] || 'bg-gray-50'}`}
                        >
                          {c.label}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {CUSTOMERS.map((cust, i) => (
                      <tr
                        key={i}
                        className={`${i % 2 === 0 ? 'bg-white' : 'bg-gray-50'} ${prop.rowHover} transition-colors`}
                      >
                        <td className={`px-3 py-2 border border-gray-200 sticky left-0 font-bold ${i % 2 === 0 ? 'bg-white' : 'bg-gray-50'} text-gray-800`}>
                          {i + 1}
                        </td>
                        {prop.columns.map(c => {
                          const val = (cust as Record<string, string>)[c.key] ?? '—'
                          const isOpp = c.key === 'opportunity'
                          let oppClass = ''
                          if (isOpp) {
                            if (val.startsWith('Very High')) oppClass = 'bg-emerald-100 text-emerald-800 font-semibold'
                            else if (val.startsWith('High')) oppClass = 'bg-green-100 text-green-800 font-semibold'
                            else if (val.startsWith('Medium')) oppClass = 'bg-yellow-100 text-yellow-800 font-semibold'
                            else oppClass = 'bg-gray-100 text-gray-800'
                          }
                          return (
                            <td
                              key={c.key}
                              className={`px-3 py-2 border border-gray-200 text-gray-700 whitespace-nowrap ${isOpp ? oppClass : ''}`}
                            >
                              {val}
                            </td>
                          )
                        })}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}
