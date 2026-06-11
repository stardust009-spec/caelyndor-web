type SectionIntroProps = {
  eyebrow?: string;
  title: string;
  text?: string;
};

export function SectionIntro({ eyebrow, title, text }: SectionIntroProps) {
  return (
    <div className="section-intro">
      {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}
      <h2>{title}</h2>
      {text ? <p>{text}</p> : null}
    </div>
  );
}
