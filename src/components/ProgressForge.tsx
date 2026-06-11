type ProgressForgeProps = {
  value: number;
  label?: string;
};

export function ProgressForge({ value, label = "Progreso editorial" }: ProgressForgeProps) {
  return (
    <div className="progress-forge" aria-label={label}>
      <div className="progress-forge__label">
        <span>{label}</span>
        <strong>{value}%</strong>
      </div>
      <div className="progress-forge__bar" role="progressbar" aria-valuemin={0} aria-valuemax={100} aria-valuenow={value}>
        <span style={{ width: `${value}%` }} />
      </div>
    </div>
  );
}
