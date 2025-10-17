import React from 'react';

const HOTEL_URL =
	'https://www.marriott.com/en-us/hotels/hnmsi-sheraton-maui-resort-and-spa/overview/';
const MAP_EMBED_URL = 'https://www.google.com/maps?q=Sheraton+Maui+Resort+and+Spa&output=embed';
const DIRECTIONS_URL =
	'https://www.google.com/maps/dir/?api=1&destination=Sheraton%20Maui%20Resort%20and%20Spa';

export default function EventDetails() {
	return (
		<div className="mx-auto max-w-4xl">
			<h2 className="font-display text-3xl md:text-4xl text-plum-purple mb-8 text-center">When &amp; Where</h2>
			<div className="grid gap-10 md:grid-cols-2">
				<div>
					<h3 className="font-display text-xl text-plum-purple">Reception</h3>
					<p className="mt-2 text-sm">Saturday, July 18, 2026</p>
					<p className="text-sm text-gray-700">
						<a
							href={HOTEL_URL}
							target="_blank"
							rel="noreferrer"
							className="font-medium text-plum-purple underline decoration-plum-purple/30 underline-offset-4 hover:text-plum-purple/80"
						>
							Sheraton Maui Resort &amp; Spa
						</a>{' '}
						• Lahaina, Hawai&apos;i
					</p>
					<div className="mt-4 flex flex-wrap gap-3 text-sm">
						<a
							href="/calendar.ics"
							className="rounded bg-plum-purple px-4 py-2 font-medium text-cornsilk hover:bg-plum-purple/90"
						>
							Add to Calendar
						</a>
						<a
							href={DIRECTIONS_URL}
							target="_blank"
							rel="noreferrer"
							className="rounded border border-plum-purple px-4 py-2 font-medium text-plum-purple hover:bg-plum-purple/10"
						>
							Get Directions
						</a>
					</div>
				</div>
				<div>
					<iframe
						title="Sheraton Maui Resort &amp; Spa Map"
						className="h-64 w-full rounded border border-plum-purple/30 shadow"
						loading="lazy"
						referrerPolicy="no-referrer-when-downgrade"
						src={MAP_EMBED_URL}
						allowFullScreen
					/>
				</div>
			</div>
					{/* Hidden tiles per request; keep markup for later when schedule is finalized */}
					{false && (
						<div className="mt-12 grid gap-8 md:grid-cols-3">
							{['Welcome Party', 'Reception', 'After Party'].map((label) => (
								<div
									key={label}
									className="rounded bg-white/70 backdrop-blur p-4 shadow ring-1 ring-plum-purple/10"
								>
									<h4 className="font-display text-lg text-plum-purple">{label}</h4>
									<p className="mt-1 text-xs text-gray-600">{label === 'Reception' ? 'Saturday, July 18, 2026' : 'TBD'}</p>
								</div>
							))}
						</div>
					)}
		</div>
	);
}
