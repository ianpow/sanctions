import { useState, useCallback, useRef, useEffect } from 'react'

export interface SanctionEntity {
  id: string
  name: string
  schema: string
  aliases: string[]
  birthDate: string
  countries: string[]
  dataset: string
  /** Which list this came from (friendly name) */
  listName: string
  /** First seen date */
  firstSeen: string
  /** Sanctions description (can be long) */
  sanctions: string
}

/** Which datasets to load */
const DATASETS = [
  {
    id: 'gb_fcdo_sanctions',
    label: 'UK FCDO',
    body: 'UK' as const,
  },
  {
    id: 'us_ofac_sdn',
    label: 'US OFAC SDN',
    body: 'US' as const,
  },
  {
    id: 'eu_fsf',
    label: 'EU Sanctions',
    body: 'EU' as const,
  },
]

/**
 * Parse a CSV line respecting quoted fields.
 * Handles double-quote escaping ("" inside quoted fields).
 */
function parseCSVLine(line: string): string[] {
  const fields: string[] = []
  let i = 0
  while (i < line.length) {
    if (line[i] === '"') {
      // Quoted field
      let value = ''
      i++ // skip opening quote
      while (i < line.length) {
        if (line[i] === '"') {
          if (i + 1 < line.length && line[i + 1] === '"') {
            value += '"'
            i += 2
          } else {
            i++ // skip closing quote
            break
          }
        } else {
          value += line[i]
          i++
        }
      }
      fields.push(value)
      if (i < line.length && line[i] === ',') i++ // skip comma
    } else {
      // Unquoted field
      const end = line.indexOf(',', i)
      if (end === -1) {
        fields.push(line.slice(i))
        i = line.length
      } else {
        fields.push(line.slice(i, end))
        i = end + 1
      }
    }
  }
  return fields
}

/** Parse CSV text into SanctionEntity[] */
function parseCSV(text: string, datasetLabel: string): SanctionEntity[] {
  const lines = text.split('\n')
  if (lines.length < 2) return []

  // Header: id, schema, name, aliases, birth_date, countries, addresses, identifiers, sanctions, phones, emails, program_ids, dataset, first_seen, last_seen, last_change
  const entities: SanctionEntity[] = []

  for (let i = 1; i < lines.length; i++) {
    const line = lines[i].trim()
    if (!line) continue

    const fields = parseCSVLine(line)
    if (fields.length < 14) continue

    entities.push({
      id: fields[0],
      schema: fields[1],
      name: fields[2],
      aliases: fields[3] ? fields[3].split(';').filter(Boolean) : [],
      birthDate: fields[4] || '',
      countries: fields[5] ? fields[5].split(';').filter(Boolean) : [],
      dataset: fields[12] || '',
      listName: datasetLabel,
      firstSeen: fields[13] || '',
      sanctions: fields[8] || '',
    })
  }

  return entities
}

/**
 * Hook for loading and searching sanctioned entities from OpenSanctions bulk data.
 * Free, no API key needed — fetches CSV from data.opensanctions.org (CORS enabled).
 */
export function useSanctionsSearch() {
  const [allEntities, setAllEntities] = useState<SanctionEntity[]>([])
  const [results, setResults] = useState<SanctionEntity[]>([])
  const [loading, setLoading] = useState(false)
  const [dataLoading, setDataLoading] = useState(false)
  const [dataLoaded, setDataLoaded] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [total, setTotal] = useState(0)
  const [loadProgress, setLoadProgress] = useState('')

  const searchTimer = useRef<ReturnType<typeof setTimeout>>()

  /** Load bulk datasets. Called once when user first opens globe. */
  const loadData = useCallback(async () => {
    if (dataLoaded || dataLoading) return
    setDataLoading(true)
    setError(null)

    const today = new Date().toISOString().slice(0, 10).replace(/-/g, '')
    const allResults: SanctionEntity[] = []

    for (const ds of DATASETS) {
      setLoadProgress(`Loading ${ds.label}...`)
      try {
        // Try today's date first, fall back to latest
        const url = `https://data.opensanctions.org/datasets/${today}/${ds.id}/targets.simple.csv`
        const res = await fetch(url)
        if (!res.ok) {
          // Try "latest" path
          const fallback = `https://data.opensanctions.org/datasets/latest/${ds.id}/targets.simple.csv`
          const res2 = await fetch(fallback)
          if (!res2.ok) {
            console.warn(`Skipping ${ds.id}: ${res2.status}`)
            continue
          }
          const text = await res2.text()
          allResults.push(...parseCSV(text, ds.label))
        } else {
          const text = await res.text()
          allResults.push(...parseCSV(text, ds.label))
        }
      } catch (err) {
        console.warn(`Failed to load ${ds.id}:`, err)
      }
    }

    setAllEntities(allResults)
    setDataLoaded(true)
    setDataLoading(false)
    setLoadProgress(`${allResults.toLocaleString().replace(/,/g, ',')} entities loaded`)
    setTimeout(() => setLoadProgress(''), 3000)
  }, [dataLoaded, dataLoading])

  /** Search loaded entities by name/alias */
  const search = useCallback(
    (query: string) => {
      clearTimeout(searchTimer.current)

      if (!query.trim()) {
        setResults([])
        setTotal(0)
        return
      }

      const q = query.toLowerCase().trim()

      searchTimer.current = setTimeout(() => {
        setLoading(true)
        // Search in web worker would be ideal but for now do it sync
        const matches: SanctionEntity[] = []
        const seen = new Set<string>()

        for (const entity of allEntities) {
          if (matches.length >= 50) break

          const nameMatch = entity.name.toLowerCase().includes(q)
          const aliasMatch = entity.aliases.some((a) => a.toLowerCase().includes(q))

          if (nameMatch || aliasMatch) {
            // Dedupe by name+dataset
            const key = `${entity.name}|${entity.dataset}`
            if (seen.has(key)) continue
            seen.add(key)
            matches.push(entity)
          }
        }

        // Sort: exact starts first, then by name
        matches.sort((a, b) => {
          const aStarts = a.name.toLowerCase().startsWith(q) ? 0 : 1
          const bStarts = b.name.toLowerCase().startsWith(q) ? 0 : 1
          if (aStarts !== bStarts) return aStarts - bStarts
          return a.name.localeCompare(b.name)
        })

        setResults(matches)
        setTotal(matches.length)
        setLoading(false)
      }, 100)
    },
    [allEntities]
  )

  const clear = useCallback(() => {
    clearTimeout(searchTimer.current)
    setResults([])
    setTotal(0)
  }, [])

  return {
    results,
    loading: loading || dataLoading,
    error,
    total,
    search,
    clear,
    loadData,
    dataLoaded,
    dataLoading,
    loadProgress,
    entityCount: allEntities.length,
  }
}
