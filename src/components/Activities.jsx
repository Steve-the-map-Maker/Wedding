import React from 'react';
// Keep cards visible; mark all as TBD for now
const activities = [
	{ title: 'Welcome Party', desc: 'Details coming soon.', time: 'TBD' },
	{ title: 'Reception', desc: 'Saturday, July 18, 2026 — Sheraton Maui. More info soon.', time: 'TBD' },
	{ title: 'After Party', desc: 'Details coming soon.', time: 'TBD' },
];

export default function Activities() {
	return (
		<div className="mx-auto max-w-5xl">
			<h2 className="font-display text-3xl md:text-4xl text-plum-purple mb-6 text-center">Activities</h2>
			<p className="text-center text-base md:text-lg text-gray-700">More information to come.</p>
			{/* Keep the following for later; hidden for now */}
			{false && (
				<div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
					{activities.map((a) => (
						<div
							key={a.title}
							className="rounded-lg bg-white/80 backdrop-blur p-5 shadow ring-1 ring-plum-purple/10"
						>
							<h3 className="font-display text-xl text-plum-purple">{a.title}</h3>
							<p className="mt-1 text-xs uppercase tracking-wide text-tropical-green">{a.time}</p>
							<p className="mt-2 text-sm text-gray-700 leading-relaxed">{a.desc}</p>
						</div>
					))}
				</div>
			)}
		</div>
	);
}
