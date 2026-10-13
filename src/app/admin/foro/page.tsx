import type { Metadata } from "next";
import Link from "next/link";
import "@/styles/foro.css";
import { requireAdminPage } from "@/lib/server/adminPage";
import { getPrisma } from "@/lib/server/db";
import { AccionesReporte } from "@/components/foro/AccionesForo";
import { FechaHora } from "@/components/foro/FechaHora";
import { MOTIVOS_REPORTE } from "@/data/foro";

export const metadata: Metadata = {
  title: "Reportes del foro",
  robots: { index: false, follow: false }
};

export const dynamic = "force-dynamic";

export default async function AdminForoPage() {
  await requireAdminPage();

  const reportes = await getPrisma().foroReporte.findMany({
    where: { resueltoEn: null },
    orderBy: { createdAt: "asc" },
    take: 100,
    select: {
      id: true,
      motivo: true,
      detalle: true,
      createdAt: true,
      autor: { select: { profile: { select: { alias: true } }, displayName: true } },
      mensaje: {
        select: {
          id: true,
          cuerpo: true,
          ocultoEn: true,
          hilo: { select: { id: true, titulo: true } },
          autor: { select: { profile: { select: { alias: true } }, displayName: true } }
        }
      }
    }
  });

  return (
    <section className="page-section">
      <div className="container cuenta">
        <header>
          <p className="eyebrow">Administración</p>
          <h1>Reportes del foro</h1>
          <p className="cuenta-nota">
            <Link href="/admin">← Panel</Link> · {reportes.length} {reportes.length === 1 ? "reporte abierto" : "reportes abiertos"}
          </p>
        </header>

        {reportes.length === 0 ? (
          <p className="cuenta-nota">No hay reportes pendientes.</p>
        ) : (
          <ol className="foro-reportes">
            {reportes.map((reporte) => (
              <li key={reporte.id} className="panel cuenta-panel">
                <p className="foro-nota">
                  <strong>{MOTIVOS_REPORTE.find((m) => m.valor === reporte.motivo)?.etiqueta ?? reporte.motivo}</strong>
                  {" · "}reportado por {reporte.autor.profile?.alias ?? reporte.autor.displayName}
                  {" · "}
                  <FechaHora iso={reporte.createdAt.toISOString()} />
                </p>
                {reporte.detalle && <p className="foro-nota">“{reporte.detalle}”</p>}
                <p className="foro-nota">
                  En{" "}
                  <Link href={`/foro/hilo/${reporte.mensaje.hilo.id}#m-${reporte.mensaje.id}`}>
                    {reporte.mensaje.hilo.titulo}
                  </Link>
                  , mensaje de {reporte.mensaje.autor.profile?.alias ?? reporte.mensaje.autor.displayName}
                  {reporte.mensaje.ocultoEn && " (ya oculto)"}:
                </p>
                <blockquote className="foro-mensaje__texto foro-reporte__cita">{reporte.mensaje.cuerpo}</blockquote>
                <AccionesReporte reporteId={reporte.id} mensajeId={reporte.mensaje.id} />
              </li>
            ))}
          </ol>
        )}
      </div>
    </section>
  );
}
