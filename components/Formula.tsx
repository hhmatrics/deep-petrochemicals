/** Renders a chemical formula with numeric subscripts, e.g. "CH3OH" → CH₃OH. */
export function Formula({ value }: { value: string }) {
  const parts = value.match(/\d+|\D+/g) ?? [value];
  return (
    <span>
      {parts.map((part, i) =>
        /^\d+$/.test(part) ? <sub key={i}>{part}</sub> : <span key={i}>{part}</span>,
      )}
    </span>
  );
}
