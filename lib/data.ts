import { VehicleCardData } from '@/components/vehicle/VehicleCard'

export const vehicles: VehicleCardData[] = [
  { slug: 'porsche-911-carrera-2022',    statut: 'vente',       marque: 'Porsche',      modele: '911',            version: 'Carrera 4S',        annee: 2022, km: 18000, prix: 129900, carburant: 'Essence', puissance: 450  },
  { slug: 'lamborghini-huracan-2020',    statut: 'vente',       marque: 'Lamborghini',  modele: 'Huracán',        version: 'EVO RWD',           annee: 2020, km: 22000, prix: 219000, carburant: 'Essence', puissance: 610  },
  { slug: 'ferrari-f8-tributo-2021',     statut: 'vente',       marque: 'Ferrari',      modele: 'F8 Tributo',     version: 'Spider',            annee: 2021, km:  9000, prix: 299000, carburant: 'Essence', puissance: 720  },
  { slug: 'mclaren-720s-2019',           statut: 'vente',       marque: 'McLaren',      modele: '720S',           version: 'Performance',       annee: 2019, km: 31000, prix: 189000, carburant: 'Essence', puissance: 720  },
  { slug: 'bmw-m4-competition-2023',     statut: 'vente',       marque: 'BMW',          modele: 'M4',             version: 'Competition xDrive', annee: 2023, km:  5000, prix: 109900, carburant: 'Essence', puissance: 510  },
  { slug: 'aston-martin-db11-2020',      statut: 'vente',       marque: 'Aston Martin', modele: 'DB11',           version: 'V8 Volante',        annee: 2020, km: 28000, prix: 169000, carburant: 'Essence', puissance: 510  },
  { slug: 'bentley-continental-gt-2021', statut: 'vendu',       marque: 'Bentley',      modele: 'Continental GT', version: 'V8',                annee: 2021, km: 19000, prix: 249000, carburant: 'Essence', puissance: 550  },
  { slug: 'rolls-royce-ghost-2020',      statut: 'vendu',       marque: 'Rolls-Royce',  modele: 'Ghost',          version: 'Extended',          annee: 2020, km: 45000, prix: 289000, carburant: 'Essence', puissance: 571  },
  { slug: 'ferrari-sf90-2022',           statut: 'vendu',       marque: 'Ferrari',      modele: 'SF90',           version: 'Stradale',          annee: 2022, km:  3200, prix: 549000, carburant: 'Hybride', puissance: 1000 },
  { slug: 'bugatti-chiron-2019',         statut: 'preparation', marque: 'Bugatti',      modele: 'Chiron',         version: 'Sport',             annee: 2019, km:  8000, prix:    null, carburant: 'Essence', puissance: 1500 },
  { slug: 'koenigsegg-agera-2018',       statut: 'preparation', marque: 'Koenigsegg',   modele: 'Agera',          version: 'RS',                annee: 2018, km: 12000, prix:    null, carburant: 'Essence', puissance: 1360 },
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
