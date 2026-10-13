import type { Metadata } from "next";
import "@/styles/aura-ritual.css";
import { DespertarDon } from "./DespertarDon";

export const metadata: Metadata = {
  title: "Prueba del Aura Interna",
  description: "El despertar de tu Habilidad Única.",
  robots: { index: false, follow: false }
};

export const dynamic = "force-dynamic";

export default function DespertarPage() {
  return <DespertarDon />;
}
