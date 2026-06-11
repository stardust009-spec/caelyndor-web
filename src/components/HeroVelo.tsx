export function HeroVelo() {
  return (
    <section className="hero-velo hero-velo--has-video" aria-labelledby="hero-title">
      <video
        className="hero-velo__video"
        aria-hidden="true"
        autoPlay
        muted
        loop
        playsInline
        preload="none"
        poster="/video/hero/velo-rasgado-poster.jpg"
      >
        <source src="/video/hero/velo-rasgado-desktop.webm" type="video/webm" />
        <source src="/video/hero/velo-rasgado-desktop.mp4" type="video/mp4" />
      </video>
      <div className="hero-velo__overlay" aria-hidden="true" />
      <div className="hero-velo__curtain" aria-hidden="true" />
      <div className="hero-velo__particles" aria-hidden="true" />
      <div className="hero-velo__content">
        <p className="eyebrow">El Velo rasgado</p>
        <h1 id="hero-title">CAELYNDOR</h1>
        <p className="hero-velo__phrase">Toda herida deja un reino.</p>
      </div>
    </section>
  );
}
