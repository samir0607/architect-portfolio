"use client"

import { useState, useEffect } from 'react';

export default function Projects() {
	// Generate array of image paths
	const images = Array.from({ length: 14 }, (_, i) => `/projects/img${i + 1}.png`);
	const firstRow = images.slice(0, 7);
	const secondRow = images.slice(7, 14);

	return (
		<div className="h-screen overflow-hidden">
			<div className="text-5xl font-bold mb-2">Projects</div>
			
			<div className="w-full border-t border-b shadow-[0_0_15px_3px_rgba(255,115,0,0.7),0_0_40px_10px_rgba(255,123,128,0.4)] py-6 space-y-6">
				{/* First row - moving left to right */}
				<div className="relative overflow-hidden">
					<div className="flex animate-scroll-right space-x-6">
						{/* Duplicate the images for seamless loop */}
						{[...firstRow, ...firstRow].map((img, index) => (
							<div
								key={index}
								className="flex-shrink-0 w-64 h-40 bg-gray-200 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300"
							>
								<img
									src={img}
									alt={`Project ${(index % 7) + 1}`}
									className="w-full h-full object-cover hover:scale-105 transition-transform duration-100"
								/>
								<div className="hidden w-full h-full items-center justify-center text-white font-semibold">
									Project {(index % 7) + 1}
								</div>
							</div>
						))}
					</div>
				</div>

				{/* Second row - moving right to left */}
				<div className="relative overflow-hidden">
					<div className="flex animate-scroll-left space-x-6">
						{/* Duplicate the images for seamless loop */}
						{[...secondRow, ...secondRow].map((img, index) => (
							<div
								key={index}
								className="flex-shrink-0 w-64 h-40 bg-gray-200 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300"
							>
								<img
									src={img}
									alt={`Project ${(index % 7) + 8}`}
									className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
								/>
								<div className="hidden w-full h-full items-center justify-center text-white font-semibold">
									Project {(index % 7) + 8}
								</div>
							</div>
						))}
					</div>
				</div>
			</div>

			<style jsx>{`
				@keyframes scroll-right {
					0% {
						transform: translateX(-50%);
					}
					100% {
						transform: translateX(0%);
					}
				}

				@keyframes scroll-left {
					0% {
						transform: translateX(0%);
					}
					100% {
						transform: translateX(-50%);
					}
				}

				.animate-scroll-right {
					animation: scroll-right 15s linear infinite;
				}

				.animate-scroll-left {
					animation: scroll-left 15s linear infinite;
				}
			`}</style>
		</div>
	);
}