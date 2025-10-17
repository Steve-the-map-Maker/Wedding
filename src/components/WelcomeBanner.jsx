import React from 'react';
import Countdown from './Countdown.jsx';

const RSVP_FORM_URL =
	'https://docs.google.com/forms/d/e/1FAIpQLSevC5QLmpMLpe3fRUWbXMUZ7qhPjfUPMotIwcMxNtJ3hgu8Rw/viewform?usp=dialog';

export default function WelcomeBanner({ imageSrc, welcomeText }) {
	return (
		<div className="relative min-h-[110vh] w-full overflow-hidden">
			<div
				className="absolute inset-0 bg-cover bg-center"
				style={{ backgroundImage: `url(${imageSrc})` }}
			/>
			<div className="absolute inset-0 bg-plum-purple/40 mix-blend-multiply" />

			<div className="relative z-10 flex min-h-[110vh] flex-col items-center justify-start gap-6 px-6 py-24 text-center text-cornsilk">
				<h1 className="font-display text-4xl font-bold drop-shadow-sm md:text-6xl">
					{welcomeText}
				</h1>
				<p className="mt-2 max-w-xl text-sm opacity-90 md:text-base">
					We&apos;re getting married — join us for an unforgettable celebration.
				</p>

				<div className="mt-6 w-full max-w-2xl">
					<Countdown targetDate={new Date('2026-07-18T00:00:00Z')} />
				</div>

				<div className="mt-8 w-full max-w-lg text-center">
					<p className="text-lg">
						Please fill out our survey to help us with the planning process.
					</p>
					<a
						href={RSVP_FORM_URL}
						target="_blank"
						rel="noopener noreferrer"
						className="mt-4 inline-block rounded-lg bg-plum-purple px-8 py-3 font-bold text-cornsilk shadow-lg transition-transform hover:scale-105"
					>
						Open Survey
					</a>
				</div>
			</div>
		</div>
	);
}
