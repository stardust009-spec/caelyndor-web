import type { Metadata } from "next";
import "@/styles/aura-ritual.css";
import { RitualAfinacion } from "./RitualAfinacion";

export const metadata: Metadata = {
  title: "Ritual de Afinación",
  description: "El cristal lee la constelación de tu Aura y te revela tu Senda.",
  robots: { index: false, follow: false }
};

export const dynamic = "force-dynamic";

export default function RitualPage() {
  return <RitualAfinacion />;
}
