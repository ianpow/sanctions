# Sanctions Explorer

An interactive learning resource and CesiumJS globe for understanding international sanctions. Built for anyone interested in sanctions compliance, particularly those working in banking and financial services.

## Features

### Learn Page
A comprehensive step-by-step guide covering:
- What sanctions are and why they exist
- Who imposes them (UK OFSI/FCDO, US OFAC, EU, UN)
- Types of sanctions (comprehensive, sectoral, targeted)
- How banks screen transactions and investigate alerts
- Career paths in sanctions compliance
- Links to official resources

### Globe Page
An interactive 3D globe showing sanctioned countries worldwide:
- **25 countries/territories** colour-coded by sanction type
- **Filter** by sanctioning body (UK, US, EU, UN) or type (comprehensive, sectoral, targeted)
- **Click** any country to see details and which bodies sanction it
- **Search** sanctioned entities (people, companies, vessels) from live OpenSanctions bulk data (UK FCDO, US OFAC SDN, EU)
- No API key needed — uses freely available bulk datasets

## Design

Built with autism-friendly design principles:
- Calm navy/teal colour palette
- Clear visual hierarchy and consistent spacing
- No animations or sensory overload
- Progressive disclosure of information

## Tech Stack

- React 19 + TypeScript
- CesiumJS (3D globe)
- React Router
- Vite
- OpenSanctions bulk data (free, no auth)

## Getting Started

```bash
npm install
cp .env.example .env
# Add your Cesium Ion token to .env
npm run dev
```

Get a free Cesium Ion token at [ion.cesium.com](https://ion.cesium.com/).

## Data Sources

| Source | Coverage | Auth |
|--------|----------|------|
| [OpenSanctions](https://opensanctions.org) bulk data | UK FCDO, US OFAC SDN, EU sanctions | None (free) |
| Static country data | 25 sanctioned countries/territories | None |

## Licence

MIT
