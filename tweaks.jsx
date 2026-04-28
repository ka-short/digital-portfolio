/* global React, ReactDOM, TweaksPanel, useTweaks, TweakSection, TweakRadio */
const TWEAKS_DEFAULTS = /*EDITMODE-BEGIN*/{
  "theme": "light",
  "density": "comfortable"
}/*EDITMODE-END*/;

function TweaksApp() {
  const [t, setTweak] = useTweaks(TWEAKS_DEFAULTS);
  React.useEffect(() => {
    document.documentElement.dataset.theme = t.theme;
    document.documentElement.dataset.density = t.density;
  }, [t.theme, t.density]);

  return (
    <TweaksPanel title="Tweaks" defaultOpen={false}>
      <TweakSection label="Theme">
        <TweakRadio
          value={t.theme}
          onChange={(v) => setTweak("theme", v)}
          options={[
            { label: "Light", value: "light" },
            { label: "Dark", value: "dark" },
          ]}
        />
      </TweakSection>
      <TweakSection label="Density">
        <TweakRadio
          value={t.density}
          onChange={(v) => setTweak("density", v)}
          options={[
            { label: "Spacious", value: "comfortable" },
            { label: "Compact", value: "compact" },
          ]}
        />
      </TweakSection>
    </TweaksPanel>
  );
}

ReactDOM.createRoot(document.getElementById("tweaks-root")).render(<TweaksApp />);
