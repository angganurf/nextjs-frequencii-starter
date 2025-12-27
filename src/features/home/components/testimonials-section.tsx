"use client";

import Image from "next/image";
import testimonials from "@/data/testimonials.json";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { useEffect, useState, useCallback } from "react";

interface Testimonial {
	id: number;
	logoSrc: string;
	quote: string;
	avatarSrc: string;
	name: string;
	title: string;
}

const TestimonialsSection: React.FC = () => {
	const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [
		Autoplay({ delay: 3000, stopOnInteraction: false }),
	]);
	const [selectedIndex, setSelectedIndex] = useState(0);
	const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

	const onInit = useCallback((emblaApi: any) => {
		setScrollSnaps(emblaApi.scrollSnapList());
	}, []);

	const onSelect = useCallback((emblaApi: any) => {
		setSelectedIndex(emblaApi.selectedScrollSnap());
	}, []);

	useEffect(() => {
		if (!emblaApi) return;

		onInit(emblaApi);
		onSelect(emblaApi);
		emblaApi.on("reInit", onInit);
		emblaApi.on("reInit", onSelect);
		emblaApi.on("select", onSelect);
	}, [emblaApi, onInit, onSelect]);

	const scrollTo = useCallback(
		(index: number) => {
			if (emblaApi) emblaApi.scrollTo(index);
		},
		[emblaApi]
	);

	if (!testimonials) {
		return (
			<section className="py-2 bg-gray-500">
				<div className="container px-4 mx-auto ">
					<div className="max-w-7xl mx-auto">
						<div className="max-w-2xl mx-auto mb-20 text-center text-bas">
							<span className="inline-flex items-center h-6 mb-6 px-2 text-xs uppercase font-medium text-yellowGreen-700 bg-blue-200 rounded-full">
								TESTIMONIALS
							</span>
							<h1 className="font-heading tracking-tight text-4xl sm:text-5xl font-bold">
								Kata mereka yang pake Editin Foto
							</h1>
						</div>
						<div className="flex items-center justify-center">
							<div className="text-gray-500">Loading testimonials...</div>
						</div>
					</div>
				</div>
			</section>
		);
	}

	return (
		<section className="py-10">
			<div className="container px-4 mx-auto">
				<div className="max-w-7xl mx-auto">
					<div className="max-w-2xl mx-auto mb-10 text-center">
						<span className="inline-flex items-center h-6 mb-6 px-2 text-xs uppercase font-medium text-yellowGreen-700 bg-blue-200 rounded-full">
							TESTIMONIALS
						</span>
						<h1 className="font-heading tracking-tight text-4xl sm:text-5xl font-bold">
							Kata mereka yang pake Editin Foto
						</h1>
					</div>

					{/* Carousel Container */}
					<div className="overflow-hidden" ref={emblaRef}>
						<div className="flex touch-pan-y">
							{(testimonials as Testimonial[]).map((testimonial) => (
								<div
									key={testimonial.id}
									className="flex-[0_0_100%] min-w-0 md:flex-[0_0_50%] lg:flex-[0_0_33.33%] px-4"
								>
									<div className="flex flex-col h-full bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden border border-gray-100">
										{/* Image Container with Aspect Ratio */}
										<div className="relative w-full">
											<Image
												src={testimonial.logoSrc}
												alt={`Testimonial by ${testimonial.name}`}
												className="w-full h-auto overflow-hidden object-cover"
												width={500}
												height={500}
												objectFit="cover"
												objectPosition="center"
												loading="lazy"
												quality={100}
											/>
										</div>

										<p className="p-4 text-center text-gray-600 text-sm font-semibold italic">
											"{testimonial.quote}"
										</p>
									</div>
								</div>
							))}
						</div>
					</div>

					{/* Navigation Dots */}
					<div className="flex justify-center mt-8 gap-2">
						{scrollSnaps.map((_, index) => (
							<button
								key={index}
								onClick={() => scrollTo(index)}
								className={`w-3 h-3 rounded-full transition-all duration-300 ${
									index === selectedIndex
										? "bg-blue-600 w-8"
										: "bg-gray-300 hover:bg-gray-400"
								}`}
								aria-label={`Go to slide ${index + 1}`}
							/>
						))}
					</div>
				</div>
			</div>
		</section>
	);
};

export default TestimonialsSection;
