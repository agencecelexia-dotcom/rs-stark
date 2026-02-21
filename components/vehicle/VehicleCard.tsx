'use client'
import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Heart, Gauge, Fuel, Zap, ArrowRight } from 'lucide-react'
import { Vehicle, formatPrice, formatKm } from '@/lib/data'
import { cn } from '@/lib/utils'

interface Props {
  vehicle: Vehicle
  index?: number
}

const statusLabel = {
  vente: 'DISPONIBLE',
  vendu: 'VENDU',
  preparation: 'EN PRÉPARATION',
}

export default function VehicleCard({ vehicle, index = 0 }: Props) {
  const [liked, setLiked] = useState(false)
  const [imgIndex, setImgIndex] = useState(0)

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
    >
      <Link href={`/vehicule/${vehicle.slug}`} className="group block">
        <div className="bg-[#111111] border border-[#2A2A2A] hover:border-[#C9A84C]/40 transition-all duration-500 overflow-hidden">
          {/* Image */}
          <div
            className="relative aspect-[16/10] overflow-hidden"
            onMouseEnter={() => vehicle.photos[1] && setImgIndex(1)}
            onMouseLeave={() => setImgIndex(0)}
          >
            <Image
              src={vehicle.photos[imgIndex] || vehicle.photos[0]}
              alt={`${vehicle.marque} ${vehicle.modele}`}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />

            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

            {/* Badge */}
            <div className="absolute top-3 left-3">
              <span className={cn(
                'text-[10px] font-mono tracking-[0.2em] px-2 py-1 rounded-sm',
                `badge-${vehicle.statut}`
              )}>
                {statusLabel[vehicle.statut]}
              </span>
            </div>

            {/* Favorite */}
            <button
              onClick={(e) => { e.preventDefault(); setLiked(!liked) }}
              className="absolute top-3 right-3 w-8 h-8 flex items-center justify-center bg-black/40 backdrop-blur-sm border border-white/10 hover:border-[#C9A84C] transition-all"
            >
              <Heart
                size={14}
                className={cn('transition-colors', liked ? 'fill-red-500 text-red-500' : 'text-white/60')}
              />
            </button>

            {/* CTA on hover */}
            <div className="absolute bottom-4 left-0 right-0 flex justify-center opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
              <div className="flex items-center gap-2 bg-[#C9A84C] text-black text-xs font-mono tracking-widest px-4 py-2">
                VOIR LA FICHE <ArrowRight size={12} />
              </div>
            </div>
          </div>

          {/* Info */}
          <div className="p-5">
            <div className="flex justify-between items-start mb-3">
              <div>
                <p className="text-[10px] tracking-[0.3em] text-white/40 uppercase mb-1">{vehicle.marque}</p>
                <h3 className="font-display text-xl tracking-wide text-white">{vehicle.modele} <span className="text-white/50 text-base">{vehicle.version}</span></h3>
              </div>
              <div className="text-right">
                <p className="font-mono text-[#C9A84C] font-medium text-lg">{formatPrice(vehicle.prix)}</p>
                <p className="text-[10px] text-white/30 mt-0.5">{vehicle.annee}</p>
              </div>
            </div>

            {/* Specs */}
            <div className="flex items-center gap-4 pt-4 border-t border-[#2A2A2A]">
              <div className="flex items-center gap-1.5 text-white/40 text-xs">
                <Gauge size={11} className="text-[#C9A84C]" />
                <span className="font-mono">{formatKm(vehicle.km)}</span>
              </div>
              <div className="flex items-center gap-1.5 text-white/40 text-xs">
                <Fuel size={11} className="text-[#C9A84C]" />
                {vehicle.carburant}
              </div>
              <div className="flex items-center gap-1.5 text-white/40 text-xs">
                <Zap size={11} className="text-[#C9A84C]" />
                <span className="font-mono">{vehicle.puissance} ch</span>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}
