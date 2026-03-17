"use client";

import React from "react";
import Image from "next/image";
import { Car } from "@/lib/data";
import { formatCurrency, formatNumber } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Fuel, Gauge, Settings2, Calendar, Eye } from "lucide-react";

interface CarCardProps {
  car: Car;
  onClick: (car: Car) => void;
}

export default function CarCard({ car, onClick }: CarCardProps) {
  const isNew = car.daysOnLot <= 7;
  const conditionColor =
    car.condition === "Excelente"
      ? "green"
      : car.condition === "Muy Bueno"
      ? "blue"
      : "yellow";

  return (
    <div
      className="group bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 cursor-pointer flex flex-col"
      onClick={() => onClick(car)}
    >
      {/* Image */}
      <div className="relative overflow-hidden h-52">
        <Image
          src={car.image}
          alt={`${car.year} ${car.make} ${car.model}`}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
          {isNew && (
            <Badge variant="green" className="text-xs">
              ✦ Recién llegado
            </Badge>
          )}
          <Badge variant={conditionColor as "green" | "blue" | "yellow"} className="text-xs">
            {car.condition}
          </Badge>
        </div>

        {/* Status */}
        {car.status === "pending" && (
          <div className="absolute top-3 right-3">
            <Badge variant="yellow" className="text-xs">Pendiente</Badge>
          </div>
        )}

        {/* Price overlay */}
        <div className="absolute bottom-3 left-3">
          <div className="text-white text-2xl font-extrabold drop-shadow-lg">
            {formatCurrency(car.price)}
          </div>
        </div>
      </div>

      {/* Info */}
      <div className="p-4 flex flex-col flex-1">
        <div className="mb-2">
          <h3 className="font-bold text-navy-900 text-lg leading-tight">
            {car.year} {car.make} {car.model}
          </h3>
          <p className="text-sm text-gray-500 font-medium">{car.trim}</p>
        </div>

        {/* Specs grid */}
        <div className="grid grid-cols-2 gap-2 my-3">
          <div className="flex items-center gap-1.5 text-xs text-gray-600">
            <Gauge className="h-3.5 w-3.5 text-navy-700" />
            <span>{formatNumber(car.mileage)} mi</span>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-gray-600">
            <Calendar className="h-3.5 w-3.5 text-navy-700" />
            <span>{car.year}</span>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-gray-600">
            <Settings2 className="h-3.5 w-3.5 text-navy-700" />
            <span>{car.transmission}</span>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-gray-600">
            <Fuel className="h-3.5 w-3.5 text-navy-700" />
            <span>{car.fuelType}</span>
          </div>
        </div>

        <div className="flex items-center gap-1.5 mb-3">
          <Badge variant="secondary" className="text-xs">{car.type}</Badge>
          <Badge variant="secondary" className="text-xs">{car.color}</Badge>
        </div>

        <div className="mt-auto">
          <Button
            variant="default"
            size="sm"
            className="w-full group-hover:bg-brand-green transition-colors"
          >
            <Eye className="h-4 w-4" />
            Ver Detalles
          </Button>
        </div>
      </div>
    </div>
  );
}
