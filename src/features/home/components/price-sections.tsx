import Image from "next/image";
import PaymentForm from "./payment-form";

const PriceSection: React.FC = () => {
	return (
		<section id="payment-section" className="py-2">
			<div className="container px-4 mx-auto">
				<div className="max-w-7xl mx-auto">
					<div className="max-w-2xl mx-auto mb-20 text-center">
						<div className="w-full mx-auto mb-4">
							<Image
								src="/images/editin-logo.png"
								className="mx-auto"
								alt="Editin Foto logo"
								width={200}
								height={40}
							/>
						</div>
						<p className="text-lg text-gray-500 mb-8">
							Tools Edit Foto All-in-One untuk kebutuhan edit foto profesional.{" "}
							<br />
							Unlimited, anti ribet, dan super cepat.
						</p>
						<img
							className="relative block mx-auto lg:px-8"
							src="/images/mockup-device.png"
							alt="Frequencii dashboard showing marketing asset organization and management interface"
						/>
						<div className="mt-8 text-center">
							<p className="text-xl font-bold bg-linear-to-r from-red-600 via-orange-500 via-green-400 via-blue-500 to-purple-600 bg-clip-text text-transparent animate-gradient-x">
								Tools lain harus langganan, sementara
							</p>
						</div>
						<h3 className="text-2xl sm:text-4xl font-bold mt-4">
							Tools <span className="text-blue-600">Editin Foto</span>
						</h3>
						<h1 className="font-heading tracking-tight text-4xl sm:text-5xl font-bold mt-5">
							<span className="bg-blue-600 px-4 text-white">95rb</span>
						</h1>
						<div className="mt-6 text-center">
							<p className="text-xl font-bold bg-linear-to-r from-red-600 via-orange-500 via-green-400 via-blue-500 to-purple-600 bg-clip-text text-transparent animate-gradient-x">
								Unlimited Access, Semua Sepuasnya.
							</p>
						</div>
						<p className="text-md italic mt-2 leading-7">
							Harga segitu ga ada apa-apanya dibanding karya super kece. <br />
							Fitur bakal terus bertambah, support 24/7, dan garansi lifetime.
						</p>

						<img
							className="relative block mx-auto px-6"
							src="/images/down.gif"
							alt="Arrow down"
							width={200}
							height={200}
						/>
						{/* Payment Form Integration */}
						<PaymentForm />
					</div>
				</div>
			</div>
		</section>
	);
};

export default PriceSection;
