import { VehicleCardData } from '@/components/vehicle/VehicleCard'

export const vehicles: VehicleCardData[] = [
  {
    slug: 'porsche-911-carrera-2022', statut: 'vente', marque: 'Porsche', modele: '911', version: 'Carrera 4S',
    annee: 2022, km: 18000, prix: 129900, carburant: 'Essence', puissance: 450,
    images: ['/images/vehicles/porsche-911-1.jpg', '/images/vehicles/porsche-911-2.jpg', '/images/vehicles/porsche-911-3.jpg'],
    youtubeUrl: null,
  },
  {
    slug: 'lamborghini-huracan-2020', statut: 'vente', marque: 'Lamborghini', modele: 'Huracán', version: 'EVO RWD',
    annee: 2020, km: 22000, prix: 219000, carburant: 'Essence', puissance: 610,
    images: ['/images/vehicles/lamborghini-huracan-1.jpg', '/images/vehicles/lamborghini-huracan-2.jpg'],
    youtubeUrl: null,
  },
  {
    slug: 'ferrari-f8-tributo-2021', statut: 'vente', marque: 'Ferrari', modele: 'F8 Tributo', version: 'Spider',
    annee: 2021, km: 9000, prix: 299000, carburant: 'Essence', puissance: 720,
    images: ['/images/vehicles/ferrari-f8-1.jpg', '/images/vehicles/ferrari-f8-2.jpg', '/images/vehicles/ferrari-f8-3.jpg', '/images/vehicles/ferrari-f8-4.jpg'],
    youtubeUrl: null,
  },
  {
    slug: 'mclaren-720s-2019', statut: 'vente', marque: 'McLaren', modele: '720S', version: 'Performance',
    annee: 2019, km: 31000, prix: 189000, carburant: 'Essence', puissance: 720,
    images: ['/images/vehicles/mclaren-720s-1.jpg'],
    youtubeUrl: null,
  },
  {
    slug: 'bmw-m4-competition-2023', statut: 'vente', marque: 'BMW', modele: 'M4', version: 'Competition xDrive',
    annee: 2023, km: 5000, prix: 109900, carburant: 'Essence', puissance: 510,
    images: ['/images/vehicles/bmw-m4-1.jpg', '/images/vehicles/bmw-m4-2.jpg'],
    youtubeUrl: null,
  },
  {
    slug: 'aston-martin-db11-2020', statut: 'vente', marque: 'Aston Martin', modele: 'DB11', version: 'V8 Volante',
    annee: 2020, km: 28000, prix: 169000, carburant: 'Essence', puissance: 510,
    images: ['/images/vehicles/aston-martin-db11-1.jpg', '/images/vehicles/aston-martin-db11-2.jpg'],
    youtubeUrl: null,
  },
  {
    slug: 'bentley-continental-gt-2021', statut: 'vendu', marque: 'Bentley', modele: 'Continental GT', version: 'V8',
    annee: 2021, km: 19000, prix: 249000, carburant: 'Essence', puissance: 550,
    images: ['/images/vehicles/bentley-continental-1.jpg'],
    youtubeUrl: null,
  },
  {
    slug: 'rolls-royce-ghost-2020', statut: 'vendu', marque: 'Rolls-Royce', modele: 'Ghost', version: 'Extended',
    annee: 2020, km: 45000, prix: 289000, carburant: 'Essence', puissance: 571,
    images: ['/images/vehicles/rolls-royce-ghost-1.jpg', '/images/vehicles/rolls-royce-ghost-2.jpg'],
    youtubeUrl: null,
  },
  {
    slug: 'ferrari-sf90-2022', statut: 'vendu', marque: 'Ferrari', modele: 'SF90', version: 'Stradale',
    annee: 2022, km: 3200, prix: 549000, carburant: 'Hybride', puissance: 1000,
    images: ['/images/vehicles/ferrari-sf90-1.jpg', '/images/vehicles/ferrari-sf90-2.jpg', '/images/vehicles/ferrari-sf90-3.jpg'],
    youtubeUrl: null,
  },
  {
    slug: 'bugatti-chiron-2019', statut: 'preparation', marque: 'Bugatti', modele: 'Chiron', version: 'Sport',
    annee: 2019, km: 8000, prix: null, carburant: 'Essence', puissance: 1500,
    images: ['/images/vehicles/bugatti-chiron-1.jpg'],
    youtubeUrl: null,
  },
  {
    slug: 'koenigsegg-agera-2018', statut: 'preparation', marque: 'Koenigsegg', modele: 'Agera', version: 'RS',
    annee: 2018, km: 12000, prix: null, carburant: 'Essence', puissance: 1360,
    images: ['/images/vehicles/koenigsegg-agera-1.jpg', '/images/vehicles/koenigsegg-agera-2.jpg'],
    youtubeUrl: null,
  },
]

export function byStatus(s: VehicleCardData['statut']) {
  return vehicles.filter((v) => v.statut === s)
}

export function getFeatured() {
  return vehicles.filter((v) => v.statut === 'vente').slice(0, 4)
}

export function getVehicleBySlug(slug: string) {
  return vehicles.find((v) => v.slug === slug)
}

/**
 * Search alternatives — when filters/search return no or few results,
 * suggests the closest vehicles from the full catalog using fuzzy matching
 * and multi-criteria scoring.
 */
export function searchAlternatives(
  query: string,
  filters: {
    marque?: string
    carburant?: string
    maxPrix?: number
    maxKm?: number
  },
  excludeSlugs: string[] = [],
  count = 6,
): VehicleCardData[] {
  const q = query.toLowerCase().trim()
  const words = q.split(/\s+/).filter(Boolean)

  const scored = vehicles
    .filter((v) => !excludeSlugs.includes(v.slug))
    .map((v) => {
      let score = 0
      const haystack = `${v.marque} ${v.modele} ${v.version}`.toLowerCase()

      // ── Text matching (fuzzy) ──
      if (q) {
        // Exact substring match
        if (haystack.includes(q)) {
          score += 50
        } else {
          // Per-word partial matching
          for (const word of words) {
            if (word.length < 2) continue
            if (haystack.includes(word)) {
              score += 30
            } else {
              // Prefix matching (e.g. "lambo" → "lamborghini")
              const fields = [v.marque.toLowerCase(), v.modele.toLowerCase(), v.version.toLowerCase()]
              for (const field of fields) {
                if (field.startsWith(word) || word.startsWith(field)) {
                  score += 20
                  break
                }
              }
              // Levenshtein-like: check if word is close to any field
              for (const field of fields) {
                if (field.length >= 3 && word.length >= 3) {
                  const common = countCommonChars(word, field)
                  if (common / Math.max(word.length, field.length) > 0.5) {
                    score += 10
                    break
                  }
                }
              }
            }
          }
        }
      }

      // ── Brand affinity ──
      if (filters.marque && filters.marque !== 'Toutes') {
        if (v.marque === filters.marque) {
          score += 25
        } else {
          // Same segment (luxury brands together)
          const luxuryBrands = ['Bentley', 'Rolls-Royce', 'Aston Martin']
          const supercarBrands = ['Ferrari', 'Lamborghini', 'McLaren', 'Bugatti', 'Koenigsegg']
          const sportBrands = ['Porsche', 'BMW']
          const getBrandGroup = (m: string) => {
            if (luxuryBrands.includes(m)) return 'luxury'
            if (supercarBrands.includes(m)) return 'supercar'
            if (sportBrands.includes(m)) return 'sport'
            return 'other'
          }
          if (getBrandGroup(v.marque) === getBrandGroup(filters.marque)) {
            score += 12
          }
        }
      }

      // ── Price proximity ──
      if (filters.maxPrix && filters.maxPrix < 1000000 && v.prix) {
        if (v.prix <= filters.maxPrix) {
          score += 15
        } else if (v.prix <= filters.maxPrix * 1.3) {
          // Slightly over budget — still relevant
          score += 8
        }
      }

      // ── Km proximity ──
      if (filters.maxKm && filters.maxKm < 200000) {
        if (v.km <= filters.maxKm) {
          score += 10
        } else if (v.km <= filters.maxKm * 1.3) {
          score += 5
        }
      }

      // ── Fuel match ──
      if (filters.carburant && filters.carburant !== 'Tous' && v.carburant === filters.carburant) {
        score += 8
      }

      // ── Boost available vehicles ──
      if (v.statut === 'vente') score += 5

      return { vehicle: v, score }
    })
    .filter((s) => s.score > 0)
    .sort((a, b) => b.score - a.score)

  return scored.slice(0, count).map((s) => s.vehicle)
}

/** Count characters in common between two strings (order-independent) */
function countCommonChars(a: string, b: string): number {
  const bChars = b.split('')
  let count = 0
  for (const ch of a) {
    const idx = bChars.indexOf(ch)
    if (idx !== -1) {
      count++
      bChars.splice(idx, 1)
    }
  }
  return count
}

/**
 * Recommendation engine — finds similar vehicles based on:
 * - Same brand (high weight)
 * - Similar power (+/- 25%)
 * - Similar price (+/- 35%)
 * - Same fuel type
 * Returns top N most similar, excluding the current vehicle.
 */
export function getSimilarVehicles(slug: string, count = 4): VehicleCardData[] {
  const current = getVehicleBySlug(slug)
  if (!current) return []

  const scored = vehicles
    .filter((v) => v.slug !== slug)
    .map((v) => {
      let score = 0

      // Same brand = strong match
      if (v.marque === current.marque) score += 40

      // Similar power (+/- 25%)
      const powerRatio = Math.min(v.puissance, current.puissance) / Math.max(v.puissance, current.puissance)
      score += powerRatio * 25

      // Similar price (if both have prices)
      if (v.prix && current.prix) {
        const priceRatio = Math.min(v.prix, current.prix) / Math.max(v.prix, current.prix)
        score += priceRatio * 25
      }

      // Same fuel type
      if (v.carburant === current.carburant) score += 10

      return { vehicle: v, score }
    })
    .sort((a, b) => b.score - a.score)

  return scored.slice(0, count).map((s) => s.vehicle)
}
