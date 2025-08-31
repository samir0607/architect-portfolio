"use client"

import { useState, useEffect, useRef } from 'react';

export default function Projects() {
	// Generate array of image paths
	const images = Array.from({ length: 14 }, (_, i) => `/projects/img${i + 1}.png`);
	const firstRow = images.slice(0, 7);
	const secondRow = images.slice(7, 14);
	
	// Separate visibility states for different sections
	const [titleVisible, setTitleVisible] = useState(false);
	const [carouselVisible, setCarouselVisible] = useState(false);
	const [portfolioVisible, setPortfolioVisible] = useState(false);
	
	// Refs for each section
	const titleRef = useRef(null);
	const carouselRef = useRef(null);
	const portfolioRef = useRef(null);

    useEffect(() => {
        const observerOptions = {
            threshold: 0.2,
            rootMargin: '-20px 0px'
        };

        const observers: IntersectionObserver[] = [];

        // Title observer
        if (titleRef.current) {
            const titleObserver = new IntersectionObserver(([entry]) => {
                // Update visibility based on intersection status
                setTitleVisible(entry.isIntersecting);
            }, observerOptions);
            titleObserver.observe(titleRef.current);
            observers.push(titleObserver);
        }

        // Carousel observer
        if (carouselRef.current) {
            const carouselObserver = new IntersectionObserver(([entry]) => {
                // Update visibility based on intersection status
                setCarouselVisible(entry.isIntersecting);
            }, observerOptions);
            carouselObserver.observe(carouselRef.current);
            observers.push(carouselObserver);
        }

        // Portfolio observer
        if (portfolioRef.current) {
            const portfolioObserver = new IntersectionObserver(([entry]) => {
                // Update visibility based on intersection status
                setPortfolioVisible(entry.isIntersecting);
            }, observerOptions);
            portfolioObserver.observe(portfolioRef.current);
            observers.push(portfolioObserver);
        }

        return () => {
            observers.forEach(observer => observer.disconnect());
        };
    }, []);

	return (
		<div className="h-screen overflow-hidden">
			{/* Title with scroll animation */}
			<div 
				ref={titleRef}
				className={`text-5xl font-bold pb-6 transition-all duration-1000 ${
					titleVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
				}`}
			>
				Projects
			</div>
			
			{/* Carousel section with scroll animation */}
			<div 
				ref={carouselRef}
				className={`w-full border-none border-t border-b shadow-[0_0_15px_3px_rgba(0,215,180,0.7),0_0_40px_10px_rgba(0,223,228,0.4)] py-6 space-y-6 transition-all duration-1000 delay-200 ${
					carouselVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
				}`}
			>
				{/* First row - moving left to right */}
				<div className={`relative overflow-hidden transition-all duration-800 delay-400 ${
					carouselVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'
				}`}>
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
				<div className={`relative overflow-hidden transition-all duration-800 delay-600 ${
					carouselVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'
				}`}>
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
		
			{/* Portfolio section with scroll-triggered animation */}
			<div ref={portfolioRef} className="mt-10 relative px-4 sm:px-0">
				{/* Background gradient blur */}
				<div className="absolute inset-0 bg-gradient-to-r from-cyan-400/20 to-blue-400/20 rounded-3xl blur-xl"></div>
				
				{/* Main content */}
				<div className={`relative backdrop-blur-sm border border-white/20 rounded-3xl p-4 sm:p-6 shadow-2xl transition-all duration-1000 ${
					portfolioVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
				}`}>
					
					{/* Animated decorative elements */}
					<div className={`absolute top-4 right-4 w-12 sm:w-16 h-12 sm:h-16 bg-gradient-to-r from-cyan-400 to-blue-400 rounded-full opacity-20 transition-all duration-700 ${
						portfolioVisible ? 'animate-pulse' : 'scale-0'
					}`}></div>
					<div className={`absolute bottom-4 left-4 w-10 sm:w-12 h-10 sm:h-12 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full opacity-20 transition-all duration-700 delay-300 ${
						portfolioVisible ? 'animate-bounce scale-100' : 'scale-0'
					}`}></div>
					
					<div className="flex flex-col sm:flex-row justify-between items-center gap-6 sm:gap-8">
						{/* Portfolio Link with Enhanced Styling */}
						<div className={`group relative transition-all duration-700 delay-300 w-full sm:w-auto ${
							portfolioVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'
						}`}>
							{/* Glow effect */}
							<div className="absolute -inset-2 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 rounded-2xl opacity-0 group-hover:opacity-20 transition-opacity duration-500 blur-lg"></div>
							
							<a 
								href="https://heyzine.com/flip-book/4a51ef1595.html#page/1" 
								target="_blank"
								rel="noopener noreferrer"
								className="relative block w-full sm:w-80 max-w-full group"
							>
								{/* Image container with advanced effects */}
								<div className="relative overflow-hidden rounded-2xl shadow-xl group-hover:shadow-2xl transition-all duration-500 transform group-hover:-translate-y-2">
									<img 
										src="portfolio.png" 
										alt="Interactive Portfolio Preview"
										className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-110"
									/>
									
									{/* Overlay with gradient */}
									<div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
									
									{/* Interactive indicator */}
									<div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full p-2 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-2 group-hover:translate-y-0">
										<svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
											<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
										</svg>
									</div>
									
									{/* Bottom label */}
									<div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/50 to-transparent p-4 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-2 group-hover:translate-y-0">
										<p className="text-white font-medium text-sm">Click to explore interactive portfolio</p>
									</div>
								</div>
								
								{/* Shimmer effect */}
								<div className="absolute inset-0 -top-2 -left-2 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 transform -skew-x-12 group-hover:animate-shimmer"></div>
							</a>
						</div>
						
						{/* Text Content with Typography Animation */}
						<div className={`flex-1 max-w-lg w-full sm:w-auto transition-all duration-700 delay-500 ${
							portfolioVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'
						}`}>
							{/* Main heading */}
							<div className="relative text-center sm:text-left">
								<h3 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-green-600 via-cyan-600 to-blue-600 bg-clip-text text-transparent mb-3">
									Dive Deeper Into My Work
								</h3>
								<div className={`absolute -bottom-1 left-1/2 sm:left-0 transform -translate-x-1/2 sm:translate-x-0 w-24 h-1 bg-gradient-to-r from-green-600 to-cyan-600 rounded-full transition-all duration-700 delay-600 ${
									portfolioVisible ? 'w-24 opacity-100' : 'w-0 opacity-0'
								}`}></div>
							</div>
							
							{/* Description */}
							<p className={`leading-relaxed mt-6 text-base sm:text-lg text-center sm:text-left transition-all duration-700 delay-700 ${
								portfolioVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
							}`}>
								Explore my complete portfolio featuring detailed case studies, 
								<span className="font-semibold text-cyan-600"> interactive demos</span>, and the stories behind each project.
							</p>
		 
							{/* Call to action */}
							<div className={`mt-6 sm:mt-8 text-center sm:text-left transition-all duration-700 delay-1000 ${
								portfolioVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
							}`}>
								<div className="inline-flex items-center space-x-2 text-cyan-600 font-semibold group cursor-pointer">
									<span className="border-b-2 border-cyan-200 group-hover:border-cyan-400 transition-colors duration-300">
										View Full Portfolio
									</span>
									<svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
										<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
									</svg>
								</div>
							</div>
						</div>
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
				
				@keyframes shimmer {
                    0% { transform: translateX(-100%) skewX(-12deg); }
                    100% { transform: translateX(200%) skewX(-12deg); }
                }
                
                .animate-shimmer {
                    animation: shimmer 1.5s ease-in-out;
                }
			`}</style>
		</div>
	);
}