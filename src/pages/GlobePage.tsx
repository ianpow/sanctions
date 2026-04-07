import { useEffect, useRef, useState, useCallback } from 'react'
import {
  Viewer,
  Cartesian3,
  Color,
  NearFarScalar,
  VerticalOrigin,
  HorizontalOrigin,
  LabelStyle,
  HeightReference,
  Ion,
  ScreenSpaceEventHandler,
  ScreenSpaceEventType,
  defined,
} from 'cesium'
import 'cesium/Build/Cesium/Widgets/widgets.css'
import {
  sanctionedCountries,
  bodyColors,
  typeColors,
  typeLabels,
  type SanctionedCountry,
} from '../lib/sanctionsData'
import { useSanctionsSearch } from '../hooks/useSanctionsSearch'

Ion.defaultAccessToken = import.meta.env.VITE_CESIUM_ION_TOKEN || ''

type FilterBody = 'ALL' | 'UK' | 'US' | 'EU' | 'UN'
type FilterType = 'ALL' | 'comprehensive' | 'sectoral' | 'targeted'

export default function GlobePage() {
  const containerRef = useRef<HTMLDivElement>(null)
  const viewerRef = useRef<Viewer | null>(null)

  const [filterBody, setFilterBody] = useState<FilterBody>('ALL')
  const [filterType, setFilterType] = useState<FilterType>('ALL')
  const [selected, setSelected] = useState<SanctionedCountry | null>(null)
  const [searchQuery, setSearchQuery] = useState('')

  const {
    results, loading, error, total, search, clear,
    loadData, dataLoaded, dataLoading, loadProgress, entityCount,
  } = useSanctionsSearch()

  // Debounced search
  const handleSearchChange = useCallback(
    (value: string) => {
      setSearchQuery(value)
      if (!value.trim()) {
        clear()
        return
      }
      search(value)
    },
    [search, clear]
  )

  // Filter countries
  const filtered = sanctionedCountries.filter((c) => {
    if (filterBody !== 'ALL' && !c.sanctions.includes(filterBody)) return false
    if (filterType !== 'ALL' && c.type !== filterType) return false
    return true
  })

  // Init Cesium viewer
  useEffect(() => {
    if (!containerRef.current || viewerRef.current) return

    const viewer = new Viewer(containerRef.current, {
      animation: false,
      timeline: false,
      baseLayerPicker: false,
      geocoder: false,
      homeButton: false,
      sceneModePicker: false,
      navigationHelpButton: false,
      fullscreenButton: false,
      infoBox: false,
      selectionIndicator: false,
      creditContainer: document.createElement('div'),
    })

    viewer.scene.globe.enableLighting = false
    if (viewer.scene.skyAtmosphere) viewer.scene.skyAtmosphere.show = true
    viewer.scene.fog.enabled = false

    // Start with a nice view
    viewer.camera.flyTo({
      destination: Cartesian3.fromDegrees(20, 20, 30_000_000),
      duration: 0,
    })

    viewerRef.current = viewer

    return () => {
      viewer.destroy()
      viewerRef.current = null
    }
  }, [])

  // Add country entities
  useEffect(() => {
    const viewer = viewerRef.current
    if (!viewer) return

    // Remove previous entities
    viewer.entities.removeAll()

    for (const country of filtered) {
      const color = typeColors[country.type]
      const cesiumColor = Color.fromCssColorString(color)

      // Point marker
      viewer.entities.add({
        position: Cartesian3.fromDegrees(country.lon, country.lat),
        point: {
          pixelSize: country.type === 'comprehensive' ? 14 : country.type === 'sectoral' ? 11 : 9,
          color: cesiumColor.withAlpha(0.9),
          outlineColor: cesiumColor.withAlpha(0.4),
          outlineWidth: country.type === 'comprehensive' ? 8 : 5,
          heightReference: HeightReference.CLAMP_TO_GROUND,
          scaleByDistance: new NearFarScalar(5e6, 1.2, 30e6, 0.6),
          disableDepthTestDistance: Number.POSITIVE_INFINITY,
        },
        label: {
          text: country.name,
          font: '13px Inter, sans-serif',
          style: LabelStyle.FILL_AND_OUTLINE,
          fillColor: Color.WHITE,
          outlineColor: Color.fromCssColorString('#1a1f2e'),
          outlineWidth: 3,
          verticalOrigin: VerticalOrigin.BOTTOM,
          horizontalOrigin: HorizontalOrigin.CENTER,
          pixelOffset: new Cartesian3(0, -14, 0) as any,
          scaleByDistance: new NearFarScalar(3e6, 1, 20e6, 0.5),
          translucencyByDistance: new NearFarScalar(1e6, 1, 30e6, 0.6),
          disableDepthTestDistance: Number.POSITIVE_INFINITY,
          heightReference: HeightReference.CLAMP_TO_GROUND,
        },
        properties: {
          sanctionData: country,
        } as any,
      })

      // Sanction body indicator dots (small dots around the main point)
      const bodyList = country.sanctions
      const dotRadius = 0.6
      bodyList.forEach((body, i) => {
        const angle = ((2 * Math.PI) / bodyList.length) * i - Math.PI / 2
        const offsetLon = country.lon + dotRadius * Math.cos(angle)
        const offsetLat = country.lat + dotRadius * Math.sin(angle)
        viewer.entities.add({
          position: Cartesian3.fromDegrees(offsetLon, offsetLat),
          point: {
            pixelSize: 5,
            color: Color.fromCssColorString(bodyColors[body]),
            heightReference: HeightReference.CLAMP_TO_GROUND,
            scaleByDistance: new NearFarScalar(3e6, 1, 15e6, 0.4),
            translucencyByDistance: new NearFarScalar(3e6, 1, 20e6, 0),
            disableDepthTestDistance: Number.POSITIVE_INFINITY,
          },
        })
      })
    }
  }, [filtered])

  // Click handler for country selection
  useEffect(() => {
    const viewer = viewerRef.current
    if (!viewer) return

    const handler = new ScreenSpaceEventHandler(viewer.scene.canvas)
    handler.setInputAction((click: any) => {
      const picked = viewer.scene.pick(click.position)
      if (defined(picked) && picked.id?.properties?.sanctionData) {
        const data = picked.id.properties.sanctionData.getValue(
          viewer.clock.currentTime
        ) as SanctionedCountry
        setSelected(data)
        // Fly to country
        viewer.camera.flyTo({
          destination: Cartesian3.fromDegrees(data.lon, data.lat, 5_000_000),
          duration: 1.5,
        })
      } else {
        setSelected(null)
      }
    }, ScreenSpaceEventType.LEFT_CLICK)

    return () => handler.destroy()
  }, [])

  // Fly to country from sidebar
  const flyTo = (country: SanctionedCountry) => {
    setSelected(country)
    viewerRef.current?.camera.flyTo({
      destination: Cartesian3.fromDegrees(country.lon, country.lat, 5_000_000),
      duration: 1.5,
    })
  }

  return (
    <div className="globe-page">
      <div ref={containerRef} className="globe-container" />

      {/* Sidebar */}
      <div className="globe-sidebar">
        <h3>Sanctions Explorer</h3>

        {/* Load data button */}
        {!dataLoaded && !dataLoading && (
          <button
            onClick={loadData}
            style={{
              width: '100%',
              padding: '10px 14px',
              borderRadius: 8,
              border: '1px solid rgba(91,163,158,0.4)',
              background: 'rgba(91,163,158,0.15)',
              color: '#5ba39e',
              fontFamily: 'inherit',
              fontSize: 13,
              fontWeight: 600,
              cursor: 'pointer',
              marginBottom: 12,
              transition: 'all 0.2s',
            }}
          >
            Load Sanctions Data (UK, US, EU)
          </button>
        )}
        {loadProgress && (
          <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)', marginBottom: 8, fontStyle: 'italic' }}>
            {loadProgress}
          </p>
        )}

        {/* Search */}
        <input
          type="text"
          placeholder={dataLoaded ? `Search ${entityCount.toLocaleString()} entities...` : 'Search sanctioned entities...'}
          value={searchQuery}
          onChange={(e) => handleSearchChange(e.target.value)}
          onFocus={() => { if (!dataLoaded && !dataLoading) loadData() }}
        />

        {/* Search results */}
        {searchQuery.trim() && (
          <div style={{ marginBottom: 16 }}>
            {loading && (
              <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.5)', padding: '8px 0' }}>
                {dataLoading ? 'Loading sanctions data...' : 'Searching...'}
              </p>
            )}
            {error && (
              <p style={{ fontSize: 13, color: '#c4956a', padding: '8px 0' }}>{error}</p>
            )}
            {!loading && !error && results.length > 0 && (
              <>
                <p
                  style={{
                    fontSize: 11,
                    color: 'rgba(255,255,255,0.4)',
                    marginBottom: 8,
                    textTransform: 'uppercase',
                    letterSpacing: 1,
                  }}
                >
                  {total} results
                </p>
                <ul className="entity-list">
                  {results.map((entity) => (
                    <li key={entity.id} className="entity-item">
                      <a
                        href={`https://www.opensanctions.org/entities/${entity.id}/`}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}
                      >
                        <div className="entity-name">{entity.name}</div>
                        <div className="entity-detail">
                          {entity.schema === 'Person'
                            ? '👤'
                            : entity.schema === 'Company'
                            ? '🏢'
                            : entity.schema === 'Organization'
                            ? '🏛'
                            : entity.schema === 'Vessel'
                            ? '🚢'
                            : '📋'}{' '}
                          {entity.schema}
                          {entity.countries.length > 0 && ` · ${entity.countries.join(', ').toUpperCase()}`}
                        </div>
                        <div style={{ marginTop: 6, display: 'flex', flexWrap: 'wrap', gap: 4 }}>
                          <span
                            className="entity-badge"
                            style={{
                              background: entity.listName.includes('UK')
                                ? bodyColors.UK
                                : entity.listName.includes('US')
                                ? bodyColors.US
                                : entity.listName.includes('EU')
                                ? bodyColors.EU
                                : 'rgba(255,255,255,0.15)',
                              color: 'white',
                            }}
                          >
                            {entity.listName}
                          </span>
                        </div>
                        {entity.birthDate && (
                          <div className="entity-detail" style={{ marginTop: 4 }}>
                            Born: {entity.birthDate}
                          </div>
                        )}
                      </a>
                    </li>
                  ))}
                </ul>
              </>
            )}
            {!loading && !error && results.length === 0 && searchQuery.trim().length > 2 && dataLoaded && (
              <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.4)', padding: '8px 0' }}>
                No entities found
              </p>
            )}
          </div>
        )}

        {/* Filters */}
        {!searchQuery.trim() && (
          <>
            <div style={{ marginBottom: 12 }}>
              <div
                style={{
                  fontSize: 11,
                  textTransform: 'uppercase',
                  letterSpacing: 1.5,
                  color: 'rgba(255,255,255,0.4)',
                  marginBottom: 8,
                }}
              >
                Sanctioning Body
              </div>
              <div className="filter-pills">
                {(['ALL', 'UK', 'US', 'EU', 'UN'] as FilterBody[]).map((body) => (
                  <button
                    key={body}
                    className={`filter-pill ${filterBody === body ? 'active' : ''}`}
                    onClick={() => setFilterBody(body)}
                    style={
                      filterBody === body && body !== 'ALL'
                        ? { background: bodyColors[body], borderColor: bodyColors[body] }
                        : undefined
                    }
                  >
                    {body === 'ALL' ? 'All' : body}
                  </button>
                ))}
              </div>
            </div>

            <div style={{ marginBottom: 16 }}>
              <div
                style={{
                  fontSize: 11,
                  textTransform: 'uppercase',
                  letterSpacing: 1.5,
                  color: 'rgba(255,255,255,0.4)',
                  marginBottom: 8,
                }}
              >
                Sanction Type
              </div>
              <div className="filter-pills">
                {(['ALL', 'comprehensive', 'sectoral', 'targeted'] as FilterType[]).map((type) => (
                  <button
                    key={type}
                    className={`filter-pill ${filterType === type ? 'active' : ''}`}
                    onClick={() => setFilterType(type)}
                    style={
                      filterType === type && type !== 'ALL'
                        ? { background: typeColors[type], borderColor: typeColors[type] }
                        : undefined
                    }
                  >
                    {type === 'ALL' ? 'All' : typeLabels[type]}
                  </button>
                ))}
              </div>
            </div>

            {/* Legend */}
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: 12,
                marginBottom: 16,
                paddingBottom: 12,
                borderBottom: '1px solid rgba(255,255,255,0.08)',
              }}
            >
              {Object.entries(typeLabels).map(([key, label]) => (
                <div key={key} style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 11, color: 'rgba(255,255,255,0.5)' }}>
                  <span
                    style={{
                      width: 8,
                      height: 8,
                      borderRadius: '50%',
                      background: typeColors[key],
                      display: 'inline-block',
                    }}
                  />
                  {label}
                </div>
              ))}
            </div>

            {/* Selected country detail */}
            {selected && (
              <div
                style={{
                  background: 'rgba(255,255,255,0.06)',
                  borderRadius: 10,
                  padding: 16,
                  marginBottom: 16,
                  borderLeft: `3px solid ${typeColors[selected.type]}`,
                }}
              >
                <div style={{ fontSize: 16, fontWeight: 700, marginBottom: 4 }}>
                  {selected.name}
                </div>
                <div
                  style={{
                    display: 'inline-block',
                    padding: '2px 10px',
                    borderRadius: 10,
                    background: typeColors[selected.type],
                    color: 'white',
                    fontSize: 10,
                    fontWeight: 600,
                    textTransform: 'uppercase',
                    letterSpacing: 0.5,
                    marginBottom: 10,
                  }}
                >
                  {typeLabels[selected.type]}
                </div>
                <p
                  style={{
                    fontSize: 13,
                    color: 'rgba(255,255,255,0.7)',
                    lineHeight: 1.6,
                    marginBottom: 10,
                  }}
                >
                  {selected.description}
                </p>
                <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                  {selected.sanctions.map((body) => (
                    <span
                      key={body}
                      style={{
                        padding: '3px 10px',
                        borderRadius: 12,
                        background: bodyColors[body],
                        color: 'white',
                        fontSize: 11,
                        fontWeight: 600,
                      }}
                    >
                      {body}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Country list */}
            <div
              style={{
                fontSize: 11,
                textTransform: 'uppercase',
                letterSpacing: 1.5,
                color: 'rgba(255,255,255,0.4)',
                marginBottom: 8,
              }}
            >
              {filtered.length} countries / territories
            </div>
            <ul className="entity-list">
              {filtered.map((country) => (
                <li
                  key={country.iso2}
                  className="entity-item"
                  onClick={() => flyTo(country)}
                  style={
                    selected?.iso2 === country.iso2
                      ? { background: 'rgba(255,255,255,0.1)', borderLeft: `3px solid ${typeColors[country.type]}` }
                      : undefined
                  }
                >
                  <div className="entity-name">{country.name}</div>
                  <div className="entity-detail">
                    {typeLabels[country.type]} · {country.sanctions.join(', ')}
                  </div>
                </li>
              ))}
            </ul>
          </>
        )}
      </div>

      {/* Body colour legend (bottom right) */}
      <div
        style={{
          position: 'absolute',
          bottom: 16,
          right: 16,
          display: 'flex',
          gap: 12,
          background: 'rgba(26,31,46,0.85)',
          backdropFilter: 'blur(8px)',
          borderRadius: 10,
          padding: '8px 14px',
        }}
      >
        {Object.entries(bodyColors).map(([body, color]) => (
          <div key={body} style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 11, color: 'rgba(255,255,255,0.7)' }}>
            <span
              style={{
                width: 8,
                height: 8,
                borderRadius: '50%',
                background: color,
                display: 'inline-block',
              }}
            />
            {body}
          </div>
        ))}
      </div>
    </div>
  )
}
