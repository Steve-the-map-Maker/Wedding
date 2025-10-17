import React from 'react';
const timeline = [
	{
		year: 'November 2022',
		title: 'The Date That Started It All',
		text: 'We met on Bumble and hit it off right away. Things started slow and steady, but even from the beginning, everything felt natural and easy.',
	},
	{
		year: 'Winter 2022–2023',
		title: 'Ski Season & Getting Started',
		text: 'Between a busy ski season schedule, cozy nights off the mountain, and lots of laughter, we started to realize this was turning into something special.',
	},
	{
		year: 'Spring 2023',
		title: 'Adventures Together',
		text: 'We started traveling and exploring new places, sharing meals, and making memories. Time flew by when we were together.',
	},
	{
		year: 'October 2023',
		title: 'The Malibu Moment',
		text: 'One trip in particular stood out—a visit to Southern California. While exploring Malibu, surrounded by sunshine and ocean air, we both knew this was something forever.',
	},
	{
		year: '2023–2025',
		title: 'Building Our Life Together',
		text: 'From countless trips to simple everyday moments, our relationship grew stronger, filled with love, laughter, and our favorite saying: time flies when we’re together.',
	},
	{
		year: 'July 2025',
		title: 'The Proposal',
		text: 'Then, in July of 2025, Steve made it official and proposed—turning our favorite chapter into the start of a lifelong story.',
	},
	{
		year: 'Now',
		title: 'The Celebration',
		text: 'We can’t wait to celebrate this next chapter surrounded by our favorite people!',
	},
];
export default function OurStory(){return(<div className="mx-auto max-w-3xl"><h2 className="font-display text-3xl md:text-4xl text-plum-purple mb-10 text-center">Our Story</h2><ol className="relative border-l border-plum-purple/30 ml-4">{timeline.map((e,i)=>(<li key={i} className="mb-10 ml-4"><div className="absolute -left-2.5 h-5 w-5 rounded-full border-2 border-cornsilk bg-plum-purple" /><time className="mb-1 block text-sm font-semibold text-tropical-green">{e.year}</time><h3 className="text-xl font-display text-plum-purple">{e.title}</h3><p className="mt-2 text-sm leading-relaxed text-gray-700">{e.text}</p></li>))}</ol></div>);} 
