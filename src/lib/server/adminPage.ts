import "server-only";
import { redirect } from "next/navigation";
import { getAdminContext, type AdminContext } from "./adminGuard";

/**
 * Guard de páginas /admin/*: repite la verificación completa server-side
 * (no confía en que el middleware ya filtró). Redirige fuera si no procede.
 */
export async function requireAdminPage(options?: { exigir2fa?: boolean }): Promise<AdminContext> {
  const result = await getAdminContext();
  if (!result.ok) {
    redirect("/cuenta");
  }
  if (options?.exigir2fa !== false && !result.admin.dosFaVigente) {
    redirect("/admin");
  }
  return result.admin;
}
