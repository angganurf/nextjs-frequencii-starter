"use client";

import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { useEffect, useState, useCallback } from "react";
import { useTranslations } from "next-intl";

interface Testimonial {
	id: number;
	logoSrc: string;
	quote: string;
	name: string;
	title: string;
}

const TestimonialsSection: React.FC = () => {
	const t = useTranslations("Testimonials");
	const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [
		Autoplay({ delay: 3000, stopOnInteraction: false }),
	]);
	const [selectedIndex, setSelectedIndex] = useState(0);
	const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

	// Construct testimonials data from translations
	const testimonials: Testimonial[] = [0, 1, 2, 3].map((index) => ({
		id: index + 1,
		quote: t(`items.${index}.quote`),
		name: t(`items.${index}.name`),
		title: t(`items.${index}.title`),
		logoSrc:
			index === 0
				? "https://cdn.socionity.uk/img/testi1-5f6be3d0.png"
				: index === 1
				? "https://cdn.socionity.uk/img/testi2-5f6c15c0.png"
				: index === 2
				? "https://cdn.socionity.uk/img/testi3-5f6c402a.png"
				: "https://cdn.socionity.uk/img/testi4-5f6c61da.png",
	}));

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

	return (
		<section className="py-10">
			<div className="container px-4 mx-auto">
				<div className="max-w-7xl mx-auto">
					<div className="max-w-2xl mx-auto mb-10 text-center">
						<span className="inline-flex items-center h-6 mb-6 px-2 text-xs uppercase font-medium text-yellowGreen-700 bg-blue-200 rounded-full">
							{t("badge")}
						</span>
						<h1 className="font-heading tracking-tight text-4xl sm:text-5xl font-bold">
							{t("title")}{" "}
							<span className="text-blue-600 inline-block">
								{t("subtitle")}
							</span>
						</h1>
					</div>

					{/* Carousel Container */}
					<div className="overflow-hidden" ref={emblaRef}>
						<div className="flex touch-pan-y">
							{testimonials.map((testimonial) => (
								<div
									key={testimonial.id}
									className="flex-[0_0_100%] md:flex-[0_0_33.333333%] lg:flex-[0_0_50%] min-w-0 px-4 cursor-grab"
								>
									<div className="flex flex-col h-full bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden border border-gray-100">
										{/* Image Container with Aspect Ratio */}
										<div className="relative w-full">
											<Image
												src={testimonial.logoSrc}
												alt={`Testimonial by ${testimonial.name}`}
												className="w-full h-auto overflow-hidden object-cover object-center"
												width={500}
												height={500}
												loading="lazy"
												quality={75}
												unoptimized
											/>
										</div>

										<div className="flex justify-center items-center gap-1 mt-4">
											<span className="font-bold text-gray-900">
												{testimonial.id % 2 === 0 ? "5,0" : "4,9"}
											</span>
											<span className="text-xs">⭐⭐⭐⭐⭐</span>
										</div>

										<p className="p-4 text-center text-gray-600 text-sm font-semibold italic">
											"{testimonial.quote}"
										</p>

										{/* Added name/title display below quote to match typical testimonial style if needed, 
                                            though previous carousel code didn't explicitely show it in the card body unless inside the image or implied.
                                            Checking Step 580 code: It ONLY showed the quote and rating in the card body. 
                                            Wait, where was name/title? 
                                            Ah, I see Step 580 code basically just prints the image and quote. 
                                            The logoSrc seems to contain the "tweet" or "testimonial card" image itself?
                                            "https://cdn.socionity.uk/img/testi1..." might be a screenshot of a testimonial.
                                            If so, the text translation might be redundant if the image contains the text?
                                            BUT the user asked to translate the text "Mas, sumph ini apps keren banget".
                                            If the previous design relied on images for the text, then my translation won't appear unless I modify the design to show text.
                                            
                                            Re-reading Step 580 code:
                                            <Image ... src={testimonial.logoSrc} ... />
                                            <p className="p-4 ...">"{testimonial.quote}"</p>
                                            
                                            Okay, it displays the quote below the image. So restoring this structure with my translated quotes works.
                                            I will include name/title just in case, below the quote or as part of the card, 
                                            but to be safe and strictly follow "jangan ganti style", I will stick to exactly what Step 580 had: 
                                            Image -> Rating -> Quote.
                                        */}
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
								className={`w-3 h-3 rounded-full transition-all duration-300 cursor-pointer ${
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
