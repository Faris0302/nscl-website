const files = import.meta.glob('../assets/img/*.{webp,png,jpg}', { eager: true, import: 'default' }) as Record<string, string>;

/** Photos keyed by file name without extension: img.night, img['l-qazi'] ... */
export const img: Record<string, string> = Object.fromEntries(
  Object.entries(files).map(([path, url]) => [path.split('/').pop()!.replace(/\.\w+$/, ''), url]),
);
