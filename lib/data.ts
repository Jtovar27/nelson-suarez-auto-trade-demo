export type CarCondition = "Excelente" | "Muy Bueno" | "Bueno" | "Regular";
export type CarType = "Sedan" | "SUV" | "Pickup" | "Hatchback" | "Minivan" | "Coupe";
export type CarStatus = "available" | "sold" | "pending";

export interface Car {
  id: string;
  make: string;
  model: string;
  year: number;
  trim: string;
  price: number;
  mileage: number;
  color: string;
  type: CarType;
  condition: CarCondition;
  status: CarStatus;
  transmission: "Automática" | "Manual";
  engine: string;
  fuelType: "Gasolina" | "Híbrido" | "Diésel" | "Eléctrico";
  doors: number;
  vin: string;
  description: string;
  features: string[];
  image: string;
  images: string[];
  featured: boolean;
  daysOnLot: number;
}

const BASE = "https://placehold.co";

export const CARS: Car[] = [
  {
    id: "car-001",
    make: "Toyota",
    model: "Camry",
    year: 2020,
    trim: "SE",
    price: 24995,
    mileage: 38420,
    color: "Gris Perla",
    type: "Sedan",
    condition: "Muy Bueno",
    status: "available",
    transmission: "Automática",
    engine: "2.5L 4-Cilindros 203 HP",
    fuelType: "Gasolina",
    doors: 4,
    vin: "4T1B11HK0LU123456",
    description:
      "Toyota Camry SE 2020 en excelente estado. Un solo dueño, historial limpio, nunca en accidente. Ideal para familia. Mantenimiento al día con Toyota Certified.",
    features: [
      "Apple CarPlay & Android Auto",
      "Cámara trasera",
      "Control de crucero adaptivo",
      "Asientos calefaccionados",
      "Sistema de sonido JBL",
      "Llantas de aleación 18\"",
    ],
    image: `${BASE}/800x500/0d2244/22c55e?text=Toyota+Camry+SE+2020`,
    images: [
      `${BASE}/800x500/0d2244/22c55e?text=Toyota+Camry+SE+2020`,
      `${BASE}/800x500/1a3a5c/ffffff?text=Interior+Camry`,
      `${BASE}/800x500/0f2a40/4ade80?text=Motor+Camry`,
    ],
    featured: true,
    daysOnLot: 12,
  },
  {
    id: "car-002",
    make: "Honda",
    model: "CR-V",
    year: 2019,
    trim: "EX-L",
    price: 22500,
    mileage: 52300,
    color: "Azul Lunar",
    type: "SUV",
    condition: "Muy Bueno",
    status: "available",
    transmission: "Automática",
    engine: "1.5L Turbo 190 HP",
    fuelType: "Gasolina",
    doors: 4,
    vin: "2HKRW2H58KH234567",
    description:
      "Honda CR-V EX-L 2019 con cuero en asientos. Perfecto para familias activas en Carolina del Norte. Tracción delantera, excelente rendimiento de combustible.",
    features: [
      "Asientos de cuero",
      "Techo solar panorámico",
      "Honda Sensing Suite completo",
      "Apple CarPlay",
      "Control de crucero adaptivo",
      "Sensor de punto ciego",
    ],
    image: `${BASE}/800x500/1a3a5c/22c55e?text=Honda+CR-V+EX-L+2019`,
    images: [
      `${BASE}/800x500/1a3a5c/22c55e?text=Honda+CR-V+EX-L+2019`,
      `${BASE}/800x500/0d2244/ffffff?text=Interior+CR-V`,
    ],
    featured: true,
    daysOnLot: 8,
  },
  {
    id: "car-003",
    make: "Ford",
    model: "F-150",
    year: 2021,
    trim: "XLT SuperCrew",
    price: 34900,
    mileage: 29800,
    color: "Blanco Oxford",
    type: "Pickup",
    condition: "Excelente",
    status: "available",
    transmission: "Automática",
    engine: "3.5L EcoBoost V6 400 HP",
    fuelType: "Gasolina",
    doors: 4,
    vin: "1FTEW1EP5MFC34567",
    description:
      "Ford F-150 XLT 2021 prácticamente nuevo. Cabina doble, caja de 5.5 pies. Capacidad de remolque de 11,600 lbs. Ideal para trabajo y familia.",
    features: [
      "FordPass Connect WiFi",
      "SYNC 4 con pantalla 12\"",
      "Cámara 360°",
      "Pre-Collision Assist",
      "Caja de carga con cubierta",
      "Enganches de remolque clase V",
    ],
    image: `${BASE}/800x500/2a3a2a/22c55e?text=Ford+F-150+XLT+2021`,
    images: [
      `${BASE}/800x500/2a3a2a/22c55e?text=Ford+F-150+XLT+2021`,
      `${BASE}/800x500/1a2a1a/ffffff?text=Interior+F-150`,
    ],
    featured: true,
    daysOnLot: 5,
  },
  {
    id: "car-004",
    make: "Chevrolet",
    model: "Equinox",
    year: 2018,
    trim: "LT AWD",
    price: 17500,
    mileage: 71200,
    color: "Rojo Roca",
    type: "SUV",
    condition: "Bueno",
    status: "available",
    transmission: "Automática",
    engine: "1.5L Turbo 170 HP",
    fuelType: "Gasolina",
    doors: 4,
    vin: "3GNAXUEV4JS456789",
    description:
      "Chevrolet Equinox LT AWD 2018. Excelente para las carreteras de NC en todas las estaciones. Mantenimiento al día, carrocería sin golpes.",
    features: [
      "Tracción integral AWD",
      "MyLink Infotainment 7\"",
      "Cámara trasera",
      "Alerta de carril",
      "Asientos calefaccionados",
    ],
    image: `${BASE}/800x500/3a1a1a/22c55e?text=Chevy+Equinox+LT+2018`,
    images: [
      `${BASE}/800x500/3a1a1a/22c55e?text=Chevy+Equinox+LT+2018`,
    ],
    featured: true,
    daysOnLot: 21,
  },
  {
    id: "car-005",
    make: "Nissan",
    model: "Altima",
    year: 2020,
    trim: "SV",
    price: 19995,
    mileage: 44100,
    color: "Negro Super",
    type: "Sedan",
    condition: "Muy Bueno",
    status: "available",
    transmission: "Automática",
    engine: "2.5L 4-Cilindros 188 HP",
    fuelType: "Gasolina",
    doors: 4,
    vin: "1N4BL4BV1LC567890",
    description:
      "Nissan Altima SV 2020 con ProPILOT Assist. Sedán cómodo y eficiente, perfecto para viajes por I-40 o I-85. Garantía de motor disponible.",
    features: [
      "ProPILOT Assist",
      "NissanConnect 8\"",
      "Apple CarPlay & Android Auto",
      "Cámara de punto ciego",
      "Control de crucero adaptivo",
      "Sensor de lluvia",
    ],
    image: `${BASE}/800x500/0a0a1a/22c55e?text=Nissan+Altima+SV+2020`,
    images: [
      `${BASE}/800x500/0a0a1a/22c55e?text=Nissan+Altima+SV+2020`,
    ],
    featured: true,
    daysOnLot: 14,
  },
  {
    id: "car-006",
    make: "Jeep",
    model: "Cherokee",
    year: 2019,
    trim: "Latitude Plus 4x4",
    price: 21500,
    mileage: 61500,
    color: "Verde Oliva",
    type: "SUV",
    condition: "Bueno",
    status: "available",
    transmission: "Automática",
    engine: "2.4L 4-Cilindros 180 HP",
    fuelType: "Gasolina",
    doors: 4,
    vin: "1C4PJMLB7KD678901",
    description:
      "Jeep Cherokee Latitude Plus 4x4 2019. Ideal para aventuras y el día a día. Capacidad off-road comprobada. Interior bien equipado.",
    features: [
      "4x4 Selec-Terrain",
      "Uconnect 8.4\" con navegación",
      "Techo solar",
      "Asientos calefaccionados delanteros",
      "Cámara trasera con guías",
      "Remote Start",
    ],
    image: `${BASE}/800x500/1a2a0a/22c55e?text=Jeep+Cherokee+4x4+2019`,
    images: [
      `${BASE}/800x500/1a2a0a/22c55e?text=Jeep+Cherokee+4x4+2019`,
    ],
    featured: true,
    daysOnLot: 17,
  },
  {
    id: "car-007",
    make: "Toyota",
    model: "RAV4",
    year: 2017,
    trim: "XLE",
    price: 18900,
    mileage: 83400,
    color: "Plata Clásica",
    type: "SUV",
    condition: "Bueno",
    status: "available",
    transmission: "Automática",
    engine: "2.5L 4-Cilindros 176 HP",
    fuelType: "Gasolina",
    doors: 4,
    vin: "2T3RFREV8HW789012",
    description:
      "Toyota RAV4 XLE 2017, conocido por su fiabilidad y durabilidad. Excelente historial de servicio. Perfecto para familias que buscan valor.",
    features: [
      "Toyota Safety Sense P",
      "Pantalla táctil 7\"",
      "Bluetooth",
      "Cámara trasera",
      "Asientos calefaccionados",
      "Portón trasero eléctrico",
    ],
    image: `${BASE}/800x500/2a2a2a/22c55e?text=Toyota+RAV4+XLE+2017`,
    images: [
      `${BASE}/800x500/2a2a2a/22c55e?text=Toyota+RAV4+XLE+2017`,
    ],
    featured: false,
    daysOnLot: 28,
  },
  {
    id: "car-008",
    make: "Hyundai",
    model: "Sonata",
    year: 2021,
    trim: "SEL",
    price: 22900,
    mileage: 27600,
    color: "Azul Celeste",
    type: "Sedan",
    condition: "Excelente",
    status: "available",
    transmission: "Automática",
    engine: "2.5L 4-Cilindros 191 HP",
    fuelType: "Gasolina",
    doors: 4,
    vin: "5NPEG4JA3MH890123",
    description:
      "Hyundai Sonata SEL 2021 casi nuevo. Diseño moderno y tecnología de vanguardia. Garantía de fábrica aún vigente.",
    features: [
      "Hyundai SmartSense",
      "Pantalla 10.25\" touch",
      "Cargador inalámbrico",
      "Asientos ventilados",
      "Head-Up Display",
      "Remote Smart Parking",
    ],
    image: `${BASE}/800x500/0a1a3a/22c55e?text=Hyundai+Sonata+SEL+2021`,
    images: [
      `${BASE}/800x500/0a1a3a/22c55e?text=Hyundai+Sonata+SEL+2021`,
    ],
    featured: false,
    daysOnLot: 6,
  },
  {
    id: "car-009",
    make: "Honda",
    model: "Civic",
    year: 2018,
    trim: "EX",
    price: 14995,
    mileage: 68900,
    color: "Blanco Champagne",
    type: "Sedan",
    condition: "Bueno",
    status: "available",
    transmission: "Manual",
    engine: "1.5L Turbo 174 HP",
    fuelType: "Gasolina",
    doors: 4,
    vin: "2HGFC2F88JH901234",
    description:
      "Honda Civic EX 2018 transmisión manual. Ideal para quien disfruta conducir. Económico en combustible, fácil de estacionar. Perfecto primer auto.",
    features: [
      "Honda Sensing",
      "Pantalla 7\" touch",
      "Apple CarPlay",
      "Techo solar",
      "Asientos calefaccionados",
      "Cámara trasera",
    ],
    image: `${BASE}/800x500/1a1a0a/22c55e?text=Honda+Civic+EX+2018`,
    images: [
      `${BASE}/800x500/1a1a0a/22c55e?text=Honda+Civic+EX+2018`,
    ],
    featured: false,
    daysOnLot: 35,
  },
  {
    id: "car-010",
    make: "Kia",
    model: "Sportage",
    year: 2022,
    trim: "EX AWD",
    price: 28500,
    mileage: 18200,
    color: "Gris Acero",
    type: "SUV",
    condition: "Excelente",
    status: "available",
    transmission: "Automática",
    engine: "2.5L 4-Cilindros 187 HP",
    fuelType: "Gasolina",
    doors: 4,
    vin: "5XYRKDLF7NG012345",
    description:
      "Kia Sportage EX AWD 2022 como nuevo. Tecnología premium a precio accesible. Garantía Kia 5 años / 60,000 millas transferible.",
    features: [
      "AWD inteligente",
      "Pantalla 12.3\" curva",
      "Carga inalámbrica",
      "Sistema de sonido Harman Kardon",
      "Asientos ventilados",
      "Drive Mode Select",
    ],
    image: `${BASE}/800x500/1a1a1a/22c55e?text=Kia+Sportage+EX+2022`,
    images: [
      `${BASE}/800x500/1a1a1a/22c55e?text=Kia+Sportage+EX+2022`,
    ],
    featured: false,
    daysOnLot: 3,
  },
];

export const FEATURED_CARS = CARS.filter((c) => c.featured);

export const MAKES = Array.from(new Set(CARS.map((c) => c.make))).sort();
export const TYPES: CarType[] = ["Sedan", "SUV", "Pickup", "Hatchback", "Minivan", "Coupe"];
export const YEARS = Array.from(new Set(CARS.map((c) => c.year))).sort((a, b) => b - a);

export const TESTIMONIALS = [
  {
    id: 1,
    name: "María González",
    city: "Charlotte, NC",
    rating: 5,
    text: "¡Excelente experiencia! Nelson me ayudó a encontrar el carro perfecto para mi familia. Todo el proceso fue transparente y sin presión. 100% recomendado.",
    car: "Honda CR-V 2019",
  },
  {
    id: 2,
    name: "Carlos Mendoza",
    city: "Raleigh, NC",
    rating: 5,
    text: "Me explicaron todo sobre el proceso de compra en NC, los impuestos y los formularios del DMV. Me sentí muy seguro durante toda la transacción.",
    car: "Toyota Camry 2020",
  },
  {
    id: 3,
    name: "Ana Rodríguez",
    city: "Durham, NC",
    rating: 5,
    text: "Vendí mi auto aquí y me dieron la mejor oferta del área. Proceso rápido, profesional y honesto. ¡Definitivamente volvería!",
    car: "Vendió: Nissan Sentra 2017",
  },
];

export const FAKE_LEADS = [
  { id: 1, name: "Roberto Fuentes", phone: "(919) 555-0142", email: "r.fuentes@email.com", interest: "Toyota Camry 2020", date: "2026-03-15", status: "Nuevo" },
  { id: 2, name: "Luisa Herrera", phone: "(704) 555-0281", email: "l.herrera@email.com", interest: "Honda CR-V 2019", date: "2026-03-14", status: "Contactado" },
  { id: 3, name: "Miguel Ángel Torres", phone: "(336) 555-0093", email: "m.torres@email.com", interest: "Ford F-150 2021", date: "2026-03-13", status: "Cita agendada" },
  { id: 4, name: "Carmen López", phone: "(919) 555-0376", email: "c.lopez@email.com", interest: "Kia Sportage 2022", date: "2026-03-12", status: "Negociando" },
  { id: 5, name: "José Martínez", phone: "(704) 555-0517", email: "j.martinez@email.com", interest: "Vender su auto", date: "2026-03-11", status: "Evaluado" },
];
