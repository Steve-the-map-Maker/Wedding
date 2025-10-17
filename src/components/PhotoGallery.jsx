import React, { useEffect, useMemo, useState } from 'react';

function toSrcSets(list, id) {
	const webps = list.filter(x => x.format === 'webp').sort((a,b)=>a.width-b.width);
	const jpgs = list.filter(x => x.format === 'jpg').sort((a,b)=>a.width-b.width);
	return {
		webp: webps.map(x => `/gallery/${x.file} ${x.width}w`).join(', '),
		jpg: jpgs.map(x => `/gallery/${x.file} ${x.width}w`).join(', '),
		alt: id,
		largestWebp: webps.length ? `/gallery/${webps[webps.length-1].file}` : undefined,
		largestJpg: jpgs.length ? `/gallery/${jpgs[jpgs.length-1].file}` : undefined,
		thumb: webps.length ? `/gallery/${webps[0].file}` : (jpgs[0] ? `/gallery/${jpgs[0].file}` : undefined),
	};
}

export default function PhotoGallery() {
	const [index, setIndex] = useState(null);
	const [active, setActive] = useState(null);

		useEffect(() => {
			const base = import.meta.env.BASE_URL || '/';
			fetch(`${base}gallery/index.json`)
			.then(r => r.json())
			.then(setIndex)
			.catch(() => setIndex({}));
	}, []);

	const items = useMemo(() => {
		if (!index) return [];
		return Object.entries(index).map(([id, list]) => ({ id, ...toSrcSets(list, id) }));
	}, [index]);

		return (
		<div className="mx-auto max-w-6xl">
			<h2 className="font-display text-3xl md:text-4xl text-plum-purple mb-8 text-center">Gallery</h2>
			{!items.length ? (
				<p className="text-center text-sm text-gray-500">Loading photos…</p>
			) : (
				// Masonry-style layout using CSS columns so images keep their natural height
				<div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4">
					{items.map(img => (
						<button
							key={img.id}
							onClick={()=>setActive(img)}
							className="mb-4 block w-full overflow-hidden rounded shadow ring-1 ring-plum-purple/10 break-inside-avoid focus:outline-none focus:ring-2 focus:ring-plum-purple hover:opacity-95"
						>
							<picture>
								{img.webp && <source type="image/webp" srcSet={img.webp} sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 50vw" />}
								{img.jpg && <source type="image/jpeg" srcSet={img.jpg} sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 50vw" />}
								<img src={img.thumb} alt={img.alt} loading="lazy" className="w-full h-auto" />
							</picture>
						</button>
					))}
				</div>
			)}
			{active && (
				<div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4" role="dialog" aria-modal="true">
					<div className="relative max-h-full max-w-3xl">
						<picture>
							{active.webp && <source type="image/webp" srcSet={active.webp} />}
							<img src={active.largestJpg || active.largestWebp} alt={active.alt} className="max-h-[80vh] w-auto rounded shadow-lg" />
						</picture>
						<button aria-label="Close" onClick={()=>setActive(null)} className="absolute -top-3 -right-3 rounded-full bg-plum-purple p-2 text-cornsilk shadow hover:bg-plum-purple/90 focus:outline-none focus:ring">
							<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
						</button>
					</div>
				</div>
			)}
		</div>
	);
}
