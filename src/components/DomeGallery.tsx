import { useEffect, useMemo, useRef, useCallback, useState } from "react";
import { useGesture } from "@use-gesture/react";

type ImageItem = string | { src: string; alt?: string };

type DomeGalleryProps = {
  images?: ImageItem[];
  fit?: number;
  fitBasis?: "auto" | "min" | "max" | "width" | "height";
  minRadius?: number;
  maxRadius?: number;
  padFactor?: number;
  overlayBlurColor?: string;
  maxVerticalRotationDeg?: number;
  dragSensitivity?: number;
  enlargeTransitionMs?: number;
  segments?: number;
  dragDampening?: number;
  openedImageWidth?: string;
  openedImageHeight?: string;
  imageBorderRadius?: string;
  openedImageBorderRadius?: string;
  grayscale?: boolean;
};

type ItemDef = {
  src: string;
  alt: string;
  x: number;
  y: number;
  sizeX: number;
  sizeY: number;
};

const DEFAULT_IMAGES: ImageItem[] = [
  "https://images.unsplash.com/photo-1755331039789-7e5680e26e8f?q=80&w=774&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1755569309049-98410b94f66d?q=80&w=772&auto=format&fit=crop",
];

const DEFAULTS = {
  maxVerticalRotationDeg: 15, // Increased slightly for better feel
  dragSensitivity: 10, // Increased sensitivity (lower number = more sensitive)
  enlargeTransitionMs: 300,
  segments: 35,
};

const clamp = (v: number, min: number, max: number) =>
  Math.min(Math.max(v, min), max);
const wrapAngleSigned = (deg: number) => {
  const a = (((deg + 180) % 360) + 360) % 360;
  return a - 180;
};

function buildItems(pool: ImageItem[], seg: number): ItemDef[] {
  // More dense grid pattern for better coverage
  const xCols = Array.from({ length: seg }, (_, i) => -37 + i * 2);
  const evenYs = [-4, -2, 0, 2, 4];
  const oddYs = [-3, -1, 1, 3, 5];

  const coords = xCols.flatMap((x, c) => {
    const ys = c % 2 === 0 ? evenYs : oddYs;
    return ys.map((y) => ({ x, y, sizeX: 2, sizeY: 2 }));
  });

  const totalSlots = coords.length;
  // Duplicate images to fill slots if needed
  const normalizedImages = pool.map((image) =>
    typeof image === "string"
      ? { src: image, alt: "" }
      : { src: image.src || "", alt: image.alt || "" }
  );

  if (normalizedImages.length === 0) return [];

  const usedImages = Array.from(
    { length: totalSlots },
    (_, i) => normalizedImages[i % normalizedImages.length]
  );

  return coords.map((c, i) => ({
    ...c,
    src: usedImages[i].src,
    alt: usedImages[i].alt,
  }));
}

export default function DomeGallery({
  images = DEFAULT_IMAGES,
  fit = 1, // Increased fit
  fitBasis = "width",
  minRadius = 600, // Reduced min radius for better fit
  maxRadius = Infinity,
  maxVerticalRotationDeg = 0,
  dragSensitivity = 20,
  segments = 30,
  dragDampening = 5,
}: DomeGalleryProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const mainRef = useRef<HTMLDivElement>(null);
  const sphereRef = useRef<HTMLDivElement>(null);

  const rotationRef = useRef({ x: 0, y: 0 });
  const startRotRef = useRef({ x: 0, y: 0 });
  const startPosRef = useRef<{ x: number; y: number } | null>(null);
  const draggingRef = useRef(false);
  const inertiaRAF = useRef<number | null>(null);

  const items = useMemo(() => buildItems(images, segments), [images, segments]);

  const applyTransform = useCallback((xDeg: number, yDeg: number) => {
    if (sphereRef.current) {
      sphereRef.current.style.transform = `translateZ(calc(var(--radius) * -1)) rotateX(${xDeg}deg) rotateY(${yDeg}deg)`;
    }
  }, []);

  // Initial animation state
  useEffect(() => {
    // Start with a slight rotation to show depth immediately
    rotationRef.current = { x: -5, y: -5 };
    applyTransform(-5, -5);
  }, [applyTransform]);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const ro = new ResizeObserver((entries) => {
      const { width: w, height: h } = entries[0].contentRect;
      const basis =
        fitBasis === "min"
          ? Math.min(w, h)
          : fitBasis === "max"
          ? Math.max(w, h)
          : fitBasis === "width"
          ? w
          : h;
      let radius = clamp(basis * fit, minRadius, maxRadius);
      root.style.setProperty("--radius", `${Math.round(radius)}px`);
      applyTransform(rotationRef.current.x, rotationRef.current.y);
    });
    ro.observe(root);
    return () => ro.disconnect();
  }, [fit, fitBasis, minRadius, maxRadius, applyTransform]);

  const startInertia = useCallback(
    (vx: number, vy: number) => {
      let vX = clamp(vx, -1.4, 1.4) * 80;
      let vY = clamp(vy, -1.4, 1.4) * 80;
      const friction = 0.94 + 0.055 * clamp(dragDampening, 0, 1);
      const step = () => {
        vX *= friction;
        vY *= friction;
        if (Math.abs(vX) < 0.015 && Math.abs(vY) < 0.015) return;
        const nextX = clamp(
          rotationRef.current.x - vY / 200,
          -maxVerticalRotationDeg,
          maxVerticalRotationDeg
        );
        const nextY = wrapAngleSigned(rotationRef.current.y + vX / 200);
        rotationRef.current = { x: nextX, y: nextY };
        applyTransform(nextX, nextY);
        inertiaRAF.current = requestAnimationFrame(step);
      };
      inertiaRAF.current = requestAnimationFrame(step);
    },
    [dragDampening, maxVerticalRotationDeg, applyTransform]
  );

  useGesture(
    {
      onDragStart: ({ event }) => {
        // @ts-ignore
        const evt = event as PointerEvent;
        draggingRef.current = true;
        if (inertiaRAF.current) cancelAnimationFrame(inertiaRAF.current);
        startRotRef.current = { ...rotationRef.current };
        // @ts-ignore
        startPosRef.current = { x: evt.clientX, y: evt.clientY };
      },
      onDrag: ({ event, last, velocity: [vx, vy] }) => {
        // @ts-ignore
        const evt = event as PointerEvent;
        const dxTotal = evt.clientX - (startPosRef.current?.x || 0);
        const dyTotal = evt.clientY - (startPosRef.current?.y || 0);

        const nextX = clamp(
          startRotRef.current.x - dyTotal / dragSensitivity,
          -maxVerticalRotationDeg,
          maxVerticalRotationDeg
        );
        const nextY = startRotRef.current.y + dxTotal / dragSensitivity;
        rotationRef.current = { x: nextX, y: nextY };
        applyTransform(nextX, nextY);
        if (last) {
          draggingRef.current = false;
          startInertia(vx * 3, vy * 3); // Boost inertia slightly
        }
      },
    },
    { target: mainRef }
  );

  const cssStyles = `
    .sphere-root { --radius: 520px; --circ: calc(var(--radius) * 3.14); --rot-y: calc((360deg / var(--segments-x)) / 2); --rot-x: calc((360deg / var(--segments-y)) / 2); --item-width: calc(var(--circ) / var(--segments-x)); --item-height: calc(var(--circ) / var(--segments-y)); }
    .sphere, .sphere-item, .item__image { transform-style: preserve-3d; }
    .stage { width: 100%; height: 100%; display: grid; place-items: center; position: absolute; perspective: calc(var(--radius) * 2); }
    .sphere { transform: translateZ(calc(var(--radius) * -1)); will-change: transform; position: absolute; }
    .sphere-item { width: calc(var(--item-width) * var(--item-size-x)); height: calc(var(--item-height) * var(--item-size-y)); position: absolute; transform: rotateY(calc(var(--rot-y) * (var(--offset-x) + ((var(--item-size-x) - 1) / 2)) + var(--rot-y-delta, 0deg))) rotateX(calc(var(--rot-x) * (var(--offset-y) - ((var(--item-size-y) - 1) / 2)) + var(--rot-x-delta, 0deg))) translateZ(var(--radius)); }
    .item__image { position: absolute; inset: 5px; border-radius: 8px; overflow: hidden; backface-visibility: hidden; }
  `;

  const [selectedImage, setSelectedImage] = useState<ImageItem | null>(null);

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: cssStyles }} />
      <div
        ref={rootRef}
        className="sphere-root relative w-full h-full overflow-hidden cursor-grab active:cursor-grabbing"
        style={{ "--segments-x": segments, "--segments-y": segments } as any}
      >
        <main
          ref={mainRef}
          className="absolute inset-0 grid place-items-center overflow-hidden select-none bg-transparent"
          style={{ touchAction: "none" }}
        >
          {/* Gradient Overlays for depth */}
          <div className="absolute inset-0 z-20 pointer-events-none bg-[radial-gradient(circle_at_center,transparent_70%,var(--token-bg-color,white)_99%)]" />

          <div className="stage z-10">
            <div ref={sphereRef} className="sphere">
              {items.map((it, i) => (
                <div
                  key={i}
                  className="sphere-item"
                  style={
                    {
                      "--offset-x": it.x,
                      "--offset-y": it.y,
                      "--item-size-x": it.sizeX,
                      "--item-size-y": it.sizeY,
                    } as any
                  }
                >
                  <div
                    className="item__image bg-gray-200 transition-transform hover:scale-105 cursor-pointer"
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedImage({ src: it.src, alt: it.alt });
                    }}
                  >
                    <img
                      src={it.src}
                      alt={it.alt}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>

      {/* Lightbox Overlay */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 transition-opacity duration-300"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative max-w-4xl max-h-[90vh] w-full h-full flex items-center justify-center">
            <img
              src={
                typeof selectedImage === "string"
                  ? selectedImage
                  : selectedImage.src
              }
              alt={typeof selectedImage === "string" ? "" : selectedImage.alt}
              className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
            />
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 text-white hover:text-gray-300 focus:outline-none"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>
      )}
    </>
  );
}
