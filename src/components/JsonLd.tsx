// Inserta datos estructurados Schema.org como <script type="application/ld+json">.
// Server component: el JSON viaja en el HTML para que Google lo rastree.
type JsonLdProps = {
  data: Record<string, unknown> | Record<string, unknown>[];
};

export function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      // Escapamos "<" para no romper el cierre del <script>; el resto es JSON seguro.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}
