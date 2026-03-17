"use client";

import React, { useState, useMemo } from "react";
import { CARS, Car, MAKES, TYPES, YEARS } from "@/lib/data";
import { formatCurrency } from "@/lib/utils";
import CarCard from "@/components/CarCard";
import CarModal from "@/components/CarModal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Search,
  SlidersHorizontal,
  X,
  Car as CarIcon,
  RotateCcw,
} from "lucide-react";

export default function InventarioPage() {
  const [selectedCar, setSelectedCar] = useState<Car | null>(null);
  const [filtersOpen, setFiltersOpen] = useState(false);

  // Filters
  const [search, setSearch] = useState("");
  const [make, setMake] = useState("");
  const [type, setType] = useState("");
  const [year, setYear] = useState("");
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(40000);
  const [maxMileage, setMaxMileage] = useState(200000);
  const [transmission, setTransmission] = useState("");
  const [sortBy, setSortBy] = useState<"price-asc" | "price-desc" | "year-desc" | "mileage-asc">("year-desc");

  const filtered = useMemo(() => {
    let results = CARS.filter((c) => {
      if (search) {
        const q = search.toLowerCase();
        if (
          !`${c.make} ${c.model} ${c.year} ${c.trim}`.toLowerCase().includes(q)
        )
          return false;
      }
      if (make && c.make !== make) return false;
      if (type && c.type !== type) return false;
      if (year && c.year !== Number(year)) return false;
      if (c.price < minPrice || c.price > maxPrice) return false;
      if (c.mileage > maxMileage) return false;
      if (transmission && c.transmission !== transmission) return false;
      return true;
    });

    results.sort((a, b) => {
      if (sortBy === "price-asc") return a.price - b.price;
      if (sortBy === "price-desc") return b.price - a.price;
      if (sortBy === "year-desc") return b.year - a.year;
      if (sortBy === "mileage-asc") return a.mileage - b.mileage;
      return 0;
    });

    return results;
  }, [search, make, type, year, minPrice, maxPrice, maxMileage, transmission, sortBy]);

  const clearFilters = () => {
    setSearch("");
    setMake("");
    setType("");
    setYear("");
    setMinPrice(0);
    setMaxPrice(40000);
    setMaxMileage(200000);
    setTransmission("");
  };

  const hasFilters = make || type || year || minPrice > 0 || maxPrice < 40000 || maxMileage < 200000 || transmission;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-navy-950 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-3">
            <CarIcon className="h-8 w-8 text-brand-green" />
            <h1 className="text-3xl font-extrabold">Inventario de Autos</h1>
          </div>
          <p className="text-gray-300 mb-6 max-w-xl">
            Explora nuestra selección completa de vehículos usados. Todos inspeccionados y con Buyers Guide FTC.
          </p>

          {/* Search bar */}
          <div className="flex gap-3 max-w-2xl">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Buscar por marca, modelo, año..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-gray-400 focus:bg-white focus:text-navy-900"
              />
            </div>
            <Button
              variant={filtersOpen ? "primary" : "outline-white"}
              onClick={() => setFiltersOpen(!filtersOpen)}
            >
              <SlidersHorizontal className="h-4 w-4" />
              Filtros
              {hasFilters && (
                <Badge variant="green" className="ml-1 text-[10px] h-4 px-1">
                  ON
                </Badge>
              )}
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filters Panel */}
        {filtersOpen && (
          <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-6 mb-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="font-bold text-navy-900">Filtros Avanzados</h2>
              {hasFilters && (
                <button
                  onClick={clearFilters}
                  className="flex items-center gap-1 text-sm text-red-500 hover:text-red-700"
                >
                  <RotateCcw className="h-3.5 w-3.5" />
                  Limpiar filtros
                </button>
              )}
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {/* Make */}
              <div>
                <label className="text-xs font-semibold text-gray-500 mb-1.5 block uppercase">
                  Marca
                </label>
                <select
                  value={make}
                  onChange={(e) => setMake(e.target.value)}
                  className="w-full border rounded-lg px-3 py-2 text-sm text-navy-900 focus:outline-none focus:ring-2 focus:ring-navy-500"
                >
                  <option value="">Todas las marcas</option>
                  {MAKES.map((m) => (
                    <option key={m} value={m}>{m}</option>
                  ))}
                </select>
              </div>

              {/* Type */}
              <div>
                <label className="text-xs font-semibold text-gray-500 mb-1.5 block uppercase">
                  Tipo
                </label>
                <select
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                  className="w-full border rounded-lg px-3 py-2 text-sm text-navy-900 focus:outline-none focus:ring-2 focus:ring-navy-500"
                >
                  <option value="">Todos los tipos</option>
                  {TYPES.map((t) => (
                    <option key={t} value={t}>{t}</option>
                  ))}
                </select>
              </div>

              {/* Year */}
              <div>
                <label className="text-xs font-semibold text-gray-500 mb-1.5 block uppercase">
                  Año
                </label>
                <select
                  value={year}
                  onChange={(e) => setYear(e.target.value)}
                  className="w-full border rounded-lg px-3 py-2 text-sm text-navy-900 focus:outline-none focus:ring-2 focus:ring-navy-500"
                >
                  <option value="">Todos los años</option>
                  {YEARS.map((y) => (
                    <option key={y} value={y}>{y}</option>
                  ))}
                </select>
              </div>

              {/* Transmission */}
              <div>
                <label className="text-xs font-semibold text-gray-500 mb-1.5 block uppercase">
                  Transmisión
                </label>
                <select
                  value={transmission}
                  onChange={(e) => setTransmission(e.target.value)}
                  className="w-full border rounded-lg px-3 py-2 text-sm text-navy-900 focus:outline-none focus:ring-2 focus:ring-navy-500"
                >
                  <option value="">Todas</option>
                  <option value="Automática">Automática</option>
                  <option value="Manual">Manual</option>
                </select>
              </div>

              {/* Price range */}
              <div className="col-span-2">
                <label className="text-xs font-semibold text-gray-500 mb-1.5 block uppercase">
                  Precio: {formatCurrency(minPrice)} – {formatCurrency(maxPrice)}
                </label>
                <div className="flex gap-3 items-center">
                  <Input
                    type="number"
                    placeholder="Mínimo"
                    value={minPrice || ""}
                    onChange={(e) => setMinPrice(Number(e.target.value) || 0)}
                    className="text-sm"
                    step={1000}
                    min={0}
                  />
                  <span className="text-gray-400">–</span>
                  <Input
                    type="number"
                    placeholder="Máximo"
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(Number(e.target.value) || 40000)}
                    className="text-sm"
                    step={1000}
                  />
                </div>
              </div>

              {/* Mileage */}
              <div className="col-span-2">
                <label className="text-xs font-semibold text-gray-500 mb-1.5 block uppercase">
                  Millas máximas: {maxMileage.toLocaleString()}
                </label>
                <input
                  type="range"
                  min={0}
                  max={200000}
                  step={5000}
                  value={maxMileage}
                  onChange={(e) => setMaxMileage(Number(e.target.value))}
                  className="w-full accent-brand-green"
                />
                <div className="flex justify-between text-xs text-gray-400 mt-0.5">
                  <span>0</span>
                  <span>200,000+</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Active filters */}
        {hasFilters && (
          <div className="flex flex-wrap gap-2 mb-4">
            {make && (
              <Badge variant="blue" className="gap-1 cursor-pointer" onClick={() => setMake("")}>
                {make} <X className="h-3 w-3" />
              </Badge>
            )}
            {type && (
              <Badge variant="blue" className="gap-1 cursor-pointer" onClick={() => setType("")}>
                {type} <X className="h-3 w-3" />
              </Badge>
            )}
            {year && (
              <Badge variant="blue" className="gap-1 cursor-pointer" onClick={() => setYear("")}>
                Año {year} <X className="h-3 w-3" />
              </Badge>
            )}
            {transmission && (
              <Badge variant="blue" className="gap-1 cursor-pointer" onClick={() => setTransmission("")}>
                {transmission} <X className="h-3 w-3" />
              </Badge>
            )}
          </div>
        )}

        {/* Results header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-3">
          <div>
            <span className="font-bold text-navy-900 text-lg">{filtered.length} vehículos</span>
            <span className="text-gray-500 text-sm ml-2">encontrados</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-500">Ordenar por:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
              className="border rounded-lg px-3 py-1.5 text-sm text-navy-900 focus:outline-none focus:ring-2 focus:ring-navy-500"
            >
              <option value="year-desc">Año (más nuevo)</option>
              <option value="price-asc">Precio (menor)</option>
              <option value="price-desc">Precio (mayor)</option>
              <option value="mileage-asc">Menos millas</option>
            </select>
          </div>
        </div>

        {/* Grid */}
        {filtered.length === 0 ? (
          <div className="text-center py-20">
            <CarIcon className="h-16 w-16 text-gray-200 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-500 mb-2">
              No encontramos vehículos con esos filtros
            </h3>
            <Button variant="outline" onClick={clearFilters}>
              <RotateCcw className="h-4 w-4" />
              Limpiar filtros
            </Button>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {filtered.map((car) => (
              <CarCard key={car.id} car={car} onClick={setSelectedCar} />
            ))}
          </div>
        )}
      </div>

      <CarModal car={selectedCar} onClose={() => setSelectedCar(null)} />
    </div>
  );
}
