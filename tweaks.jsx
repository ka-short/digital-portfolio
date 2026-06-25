/* global React, ReactDOM, TweaksPanel, useTweaks, TweakSection, TweakRadio, TweakToggle */
const TWEAKS_DEFAULTS = /*EDITMODE-BEGIN*/{
  "accent": "#d4271f",
  "wall": "grid",
  "scanlines": true
}/*EDITMODE-END*/;

function TweaksApp() {
  const [t, setTweak] = useTweaks(TWEAKS_DEFAULTS);
  React.useEffect(() => {
    const root = document.documentElement;
    // derive a darker shade for the accent
    root.style.setProperty("--red", t.accent);
    const screen = document.querySelector(".screen");
    if (screen) screen.dataset.wall = t.wall;
    document.querySelectorAll(".screen, .boot").forEach((el) => {
      el.classList.toggle("crt", !!t.scanlines);
    });
  }, [t.accent, t.wall, t.scanlines]);

  return (
    <TweaksPanel title="Tweaks" defaultOpen={false}>
      <TweakSection label="Accent">
        <TweakRadio
          value={t.accent}
          onChange={(v) => setTweak("accent", v)}
          options={[
            { label: "Red", value: "#d4271f" },
            { label: "Rust", value: "#c0481f" },
            { label: "Crimson", value: "#b01030" },
          ]}
        />
      </TweakSection>
      <TweakSection label="Wallpaper">
        <TweakRadio
          value={t.wall}
          onChange={(v) => setTweak("wall", v)}
          options={[
            { label: "Grid", value: "grid" },
            { label: "Dots", value: "dots" },
            { label: "Diag", value: "diag" },
            { label: "Solid", value: "solid" },
          ]}
        />
      </TweakSection>
      <TweakSection label="CRT scanlines">
        <TweakToggle value={t.scanlines} onChange={(v) => setTweak("scanlines", v)} />
      </TweakSection>
    </TweaksPanel>
  );
}

ReactDOM.createRoot(document.getElementById("tweaks-root")).render(<TweaksApp />);
