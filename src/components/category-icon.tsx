import {
  Car,
  Truck,
  Package,
  Caravan,
  CalendarClock,
  Briefcase,
  type LucideIcon,
} from "lucide-react";
import type { VehicleCategory } from "@/data/vehicles";

const iconMap: Record<VehicleCategory["icon"], LucideIcon> = {
  car: Car,
  truck: Truck,
  package: Package,
  caravan: Caravan,
  "calendar-clock": CalendarClock,
  briefcase: Briefcase,
};

export function CategoryIcon({
  name,
  className,
}: {
  name: VehicleCategory["icon"];
  className?: string;
}) {
  const Icon = iconMap[name];
  return <Icon className={className} aria-hidden />;
}
