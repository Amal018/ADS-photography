/**
 * The homepage opens like a lens: an eight-blade iris turns open over the
 * hero with a soft flash, as if the shutter just fired.
 *
 * This is plain CSS (see `.shutter` in globals.css) rather than Framer Motion
 * so it starts with the first paint instead of waiting for hydration; a dark
 * screen that hangs until JavaScript loads would be worse than no intro at all.
 * It plays once per browser session and never for reduced-motion users.
 */

const R = 60;
const vertices = Array.from({ length: 8 }, (_, i) => {
  const a = ((i * 45 - 22.5) * Math.PI) / 180;
  return [R * Math.cos(a), R * Math.sin(a)] as const;
});
const octagon = vertices.map(([x, y]) => `${x.toFixed(2)},${y.toFixed(2)}`).join(" ");
// Each blade edge carries on past its corner, which is what makes eight
// straight lines read as overlapping iris blades.
const blades = vertices.map(([x, y], i) => {
  const [px, py] = vertices[(i + 7) % 8];
  const dx = x - px;
  const dy = y - py;
  const len = Math.hypot(dx, dy);
  return { x1: x, y1: y, x2: x + (dx / len) * 320, y2: y + (dy / len) * 320 };
});

const once = `try{var s=sessionStorage;var e=document.currentScript.previousElementSibling;if(s.getItem("ads-shutter")){e.setAttribute("data-seen","");window.__adsShutter="seen"}else{s.setItem("ads-shutter","1");window.__adsShutter="play"}}catch(_){}`;

export function ShutterIntro() {
  return (
    <>
      <div className="shutter" aria-hidden="true" suppressHydrationWarning>
        <svg viewBox="-100 -100 200 200" preserveAspectRatio="xMidYMid slice">
          <defs>
            <mask id="shutter-iris">
              <rect x="-400" y="-400" width="800" height="800" fill="#fff" />
              <polygon className="shutter-iris" points={octagon} fill="#000" />
            </mask>
          </defs>
          <g mask="url(#shutter-iris)">
            <rect x="-400" y="-400" width="800" height="800" fill="#0b0b0b" />
            <g className="shutter-iris">
              {blades.map((b, i) => (
                <line key={i} {...b} stroke="#3a3a3a" strokeWidth="1.25" vectorEffect="non-scaling-stroke" />
              ))}
            </g>
          </g>
        </svg>
        <span className="shutter-flash" />
      </div>
      <script dangerouslySetInnerHTML={{ __html: once }} />
    </>
  );
}
