// "use client";
// import React, { Suspense } from 'react';
// import Image from 'next/image';
// import Link from 'next/link';
// import { 
//   Search, 
//   Star, 
//   MapPin, 
//   Phone, 
//   MessageCircle, 
//   Car, 
//   Calendar, 
//   Gauge, 
//   Fuel,
//   Shield,
//   Award,
//   Users,
//   TrendingUp,
//   ArrowRight,
//   Play,
//   ChevronLeft,
//   ChevronRight,
//   Filter,
//   SortAsc,
//   Heart,
//   Share2
// } from 'lucide-react';

import { randomFillSync } from "crypto";

// // Mock data - In real app, this would come from your API
// const featuredCars = [
//   {
//     id: 1,
//     title: "2024 Mercedes-Benz C-Class",
//     year: 2024,
//     make: "Mercedes-Benz",
//     model: "C-Class",
//     price: 45888,
//     originalPrice: 48888,
//     mileage: 12500,
//     location: "Karachi, Sindh",
//     dealerName: "Premium Motors",
//     dealerPhone: "+92-321-1234567",
//     drivetrain: "All-Wheel Drive",
//     condition: "Used",
//     bodyType: "Sedan",
//     fuelType: "Petrol",
//     transmission: "Automatic",
//     images: [
//       "/images/cars/mercedes-c-class-1.jpg",
//       "/images/cars/mercedes-c-class-2.jpg"
//     ],
//     features: ["Leather Seats", "Sunroof", "Navigation", "Backup Camera"],
//     rating: 4.8,
//     reviews: 24,
//     isSponsored: true,
//     isFeatured: true,
//     whatsappNumber: "+923211234567"
//   },
//   {
//     id: 2,
//     title: "2023 Toyota Camry Hybrid",
//     year: 2023,
//     make: "Toyota",
//     model: "Camry",
//     price: 32888,
//     mileage: 25000,
//     location: "Lahore, Punjab",
//     dealerName: "City Auto",
//     dealerPhone: "+92-321-9876543",
//     drivetrain: "Front-Wheel Drive",
//     condition: "Used",
//     bodyType: "Sedan",
//     fuelType: "Hybrid",
//     transmission: "CVT",
//     images: [
//       "/images/cars/toyota-camry-1.jpg",
//       "/images/cars/toyota-camry-2.jpg"
//     ],
//     features: ["Hybrid Engine", "Lane Assist", "Adaptive Cruise", "Wireless Charging"],
//     rating: 4.6,
//     reviews: 18,
//     isSponsored: false,
//     isFeatured: true,
//     whatsappNumber: "+923219876543"
//   },
//   {
//     id: 3,
//     title: "2022 BMW X5 M Sport",
//     year: 2022,
//     make: "BMW",
//     model: "X5",
//     price: 78888,
//     mileage: 18000,
//     location: "Islamabad, Capital",
//     dealerName: "Luxury Cars Hub",
//     dealerPhone: "+92-321-5555666",
//     drivetrain: "All-Wheel Drive",
//     condition: "Used",
//     bodyType: "SUV",
//     fuelType: "Petrol",
//     transmission: "Automatic",
//     images: [
//       "/images/cars/bmw-x5-1.jpg",
//       "/images/cars/bmw-x5-2.jpg"
//     ],
//     features: ["M Sport Package", "Panoramic Roof", "Premium Audio", "Heads-Up Display"],
//     rating: 4.9,
//     reviews: 31,
//     isSponsored: true,
//     isFeatured: true,
//     whatsappNumber: "+923215555666"
//   }
// ];

// const carCategories = [
//   { name: "Sedans", count: 1250, icon: Car, image: "/images/categories/sedan.jpg" },
//   { name: "SUVs", count: 980, icon: Car, image: "/images/categories/suv.jpg" },
//   { name: "Hatchbacks", count: 756, icon: Car, image: "/images/categories/hatchback.jpg" },
//   { name: "Convertibles", count: 234, icon: Car, image: "/images/categories/convertible.jpg" },
//   { name: "Trucks", count: 445, icon: Car, image: "/images/categories/truck.jpg" },
//   { name: "Electric", count: 189, icon: Car, image: "/images/categories/electric.jpg" }
// ];

// const testimonials = [
//   {
//     id: 1,
//     name: "Ahmad Hassan",
//     location: "Karachi",
//     rating: 5,
//     text: "Found my dream car within days! The platform is user-friendly and the dealers are responsive.",
//     image: "/images/testimonials/user1.jpg"
//   },
//   {
//     id: 2,
//     name: "Fatima Sheikh",
//     location: "Lahore",
//     rating: 5,
//     text: "Excellent service and genuine listings. WhatsApp integration made communication so easy!",
//     image: "/images/testimonials/user2.jpg"
//   },
//   {
//     id: 3,
//     name: "Ali Khan",
//     location: "Islamabad",
//     rating: 4,
//     text: "Great variety of cars and competitive prices. Highly recommend for car buyers in Pakistan.",
//     image: "/images/testimonials/user3.jpg"
//   }
// ];

// // Car Card Component
// const CarCard = ({ car }: { car: typeof featuredCars[0] }) => {
//   return (
//     <div className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100">
//       {/* Image Section */}
//       <div className="relative h-56 overflow-hidden">
//         <Image
//           src={car.images[0] || "/images/placeholder-car.jpg"}
//           alt={car.title}
//           fill
//           className="object-cover group-hover:scale-105 transition-transform duration-300"
//         />
        
//         {/* Badges */}
//         <div className="absolute top-4 left-4 flex flex-col gap-2">
//           {car.isSponsored && (
//             <span className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full">
//               SPONSORED
//             </span>
//           )}
//           {car.isFeatured && (
//             <span className="bg-gradient-to-r from-blue-600 to-purple-600 text-white text-xs font-bold px-3 py-1 rounded-full">
//               FEATURED
//             </span>
//           )}
//         </div>

//         {/* Action Buttons */}
//         <div className="absolute top-4 right-4 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
//           <button className="bg-white/90 hover:bg-white p-2 rounded-full shadow-md transition-colors">
//             <Heart className="w-4 h-4 text-gray-600 hover:text-red-500" />
//           </button>
//           <button className="bg-white/90 hover:bg-white p-2 rounded-full shadow-md transition-colors">
//             <Share2 className="w-4 h-4 text-gray-600" />
//           </button>
//         </div>

//         {/* Price Badge */}
//         <div className="absolute bottom-4 left-4">
//           <div className="bg-white/95 backdrop-blur-sm rounded-lg px-3 py-2 shadow-md">
//             <div className="flex items-center gap-2">
//               <span className="text-2xl font-bold text-gray-900">
//                 ${car.price.toLocaleString()}
//               </span>
//               {car.originalPrice && (
//                 <span className="text-sm line-through text-gray-500">
//                   ${car.originalPrice.toLocaleString()}
//                 </span>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Content Section */}
//       <div className="p-6">
//         <div className="mb-4">
//           <Link href={`/cars/${car.id}`} className="hover:text-blue-600 transition-colors">
//             <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-1">
//               {car.title}
//             </h3>
//           </Link>
          
//           {/* Car Details Grid */}
//           <div className="grid grid-cols-2 gap-3 text-sm text-gray-600 mb-4">
//             <div className="flex items-center gap-2">
//               <Gauge className="w-4 h-4 text-blue-500" />
//               <span>{car.mileage.toLocaleString()} km</span>
//             </div>
//             <div className="flex items-center gap-2">
//               <Calendar className="w-4 h-4 text-green-500" />
//               <span>{car.year}</span>
//             </div>
//             <div className="flex items-center gap-2">
//               <Fuel className="w-4 h-4 text-orange-500" />
//               <span>{car.fuelType}</span>
//             </div>
//             <div className="flex items-center gap-2">
//               <Car className="w-4 h-4 text-purple-500" />
//               <span>{car.bodyType}</span>
//             </div>
//           </div>

//           {/* Location & Dealer */}
//           <div className="flex items-center justify-between mb-4">
//             <div className="flex items-center gap-1 text-sm text-gray-600">
//               <MapPin className="w-4 h-4" />
//               <span>{car.location}</span>
//             </div>
//             <div className="flex items-center gap-1">
//               <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
//               <span className="text-sm font-semibold">{car.rating}</span>
//               <span className="text-xs text-gray-500">({car.reviews})</span>
//             </div>
//           </div>

//           {/* Dealer Info */}
//           <div className="text-sm text-gray-700 mb-4">
//             <span className="font-semibold">{car.dealerName}</span>
//           </div>
//         </div>

//         {/* Action Buttons */}
//         <div className="flex gap-3">
//           <Link 
//             href={`/cars/${car.id}`}
//             className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-3 px-4 rounded-xl font-semibold text-center transition-all duration-300 transform hover:scale-[1.02]"
//           >
//             View Details
//           </Link>
          
//           <Link
//             href={`https://wa.me/${car.whatsappNumber}?text=Hi, I'm interested in ${car.title} - ${window.location.origin}/cars/${car.id}`}
//             target="_blank"
//             rel="noopener noreferrer"
//             className="bg-green-500 hover:bg-green-600 text-white p-3 rounded-xl transition-colors duration-300"
//             title="Contact on WhatsApp"
//           >
//             <MessageCircle className="w-5 h-5" />
//           </Link>
          
//           <Link
//             href={`tel:${car.dealerPhone}`}
//             className="bg-gray-100 hover:bg-gray-200 text-gray-700 p-3 rounded-xl transition-colors duration-300"
//             title="Call Dealer"
//           >
//             <Phone className="w-5 h-5" />
//           </Link>
//         </div>
//       </div>
//     </div>
//   );
// };

// // Search Hero Component
// const SearchHero = () => {
//   return (
//     <div className="relative min-h-[600px] flex items-center justify-center overflow-hidden">
//       {/* Background */}
//       <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900">
//         <div className="absolute inset-0 bg-black/20"></div>
//       </div>
      
//       {/* Animated Background Elements */}
//       <div className="absolute inset-0 overflow-hidden">
//         <div className="absolute -top-40 -right-32 w-96 h-96 rounded-full bg-blue-400/10 blur-3xl animate-pulse"></div>
//         <div className="absolute -bottom-32 -left-40 w-80 h-80 rounded-full bg-purple-400/10 blur-3xl animate-pulse delay-1000"></div>
//         <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full bg-indigo-400/5 blur-2xl animate-ping"></div>
//       </div>

//       {/* Content */}
//       <div className="relative z-10 text-center max-w-4xl mx-auto px-4">
//         <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
//           Find Your
//           <span className="block bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
//             Perfect Car
//           </span>
//         </h1>
        
//         <p className="text-xl md:text-2xl text-gray-200 mb-12 max-w-3xl mx-auto leading-relaxed">
//           Search thousands of new and used cars from trusted dealers across Pakistan. 
//           Your dream car is just a click away.
//         </p>

//         {/* Search Form */}
//         <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-6 shadow-2xl max-w-4xl mx-auto">
//           <div className="grid md:grid-cols-4 gap-4 mb-6">
//             <div className="md:col-span-2">
//               <label className="block text-sm font-semibold text-gray-700 mb-2">
//                 Search by make, model, or keyword
//               </label>
//               <div className="relative">
//                 <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
//                 <input
//                   type="text"
//                   placeholder="e.g., Toyota Camry, BMW X5, Mercedes..."
//                   className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
//                 />
//               </div>
//             </div>
            
//             <div>
//               <label className="block text-sm font-semibold text-gray-700 mb-2">
//                 Price Range
//               </label>
//               <select className="w-full py-3 px-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all">
//                 <option value="">Any Price</option>
//                 <option value="0-25000">Under $25,000</option>
//                 <option value="25000-50000">$25,000 - $50,000</option>
//                 <option value="50000-100000">$50,000 - $100,000</option>
//                 <option value="100000+">$100,000+</option>
//               </select>
//             </div>
            
//             <div>
//               <label className="block text-sm font-semibold text-gray-700 mb-2">
//                 Location
//               </label>
//               <select className="w-full py-3 px-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all">
//                 <option value="">All Cities</option>
//                 <option value="karachi">Karachi</option>
//                 <option value="lahore">Lahore</option>
//                 <option value="islamabad">Islamabad</option>
//                 <option value="faisalabad">Faisalabad</option>
//                 <option value="rawalpindi">Rawalpindi</option>
//               </select>
//             </div>
//           </div>

//           <div className="flex flex-col sm:flex-row gap-4 items-center">
//             <button className="w-full sm:flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-4 px-8 rounded-xl font-bold text-lg transition-all duration-300 transform hover:scale-[1.02] shadow-lg hover:shadow-xl">
//               Search Cars
//             </button>
            
//             <div className="flex gap-2">
//               <button className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-700 py-3 px-4 rounded-xl transition-colors">
//                 <Filter className="w-5 h-5" />
//                 <span>Filters</span>
//               </button>
              
//               <button className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-700 py-3 px-4 rounded-xl transition-colors">
//                 <SortAsc className="w-5 h-5" />
//                 <span>Sort</span>
//               </button>
//             </div>
//           </div>
//         </div>

//         {/* Quick Stats */}
//         <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12 max-w-3xl mx-auto">
//           <div className="text-center">
//             <div className="text-3xl font-bold text-white mb-2">25K+</div>
//             <div className="text-gray-300">Cars Listed</div>
//           </div>
//           <div className="text-center">
//             <div className="text-3xl font-bold text-white mb-2">500+</div>
//             <div className="text-gray-300">Trusted Dealers</div>
//           </div>
//           <div className="text-center">
//             <div className="text-3xl font-bold text-white mb-2">50K+</div>
//             <div className="text-gray-300">Happy Customers</div>
//           </div>
//           <div className="text-center">
//             <div className="text-3xl font-bold text-white mb-2">15</div>
//             <div className="text-gray-300">Cities Covered</div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// // Categories Section
// const CategoriesSection = () => {
//   return (
//     <section className="py-20 bg-gray-50">
//       <div className="max-w-7xl mx-auto px-4">
//         <div className="text-center mb-16">
//           <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
//             Browse by Category
//           </h2>
//           <p className="text-xl text-gray-600 max-w-3xl mx-auto">
//             Explore our extensive collection of vehicles across different categories
//           </p>
//         </div>

//         <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
//           {carCategories.map((category, index) => (
//             <Link
//               key={index}
//               href={`/cars/category/${category.name.toLowerCase()}`}
//               className="group bg-white rounded-2xl p-6 text-center hover:shadow-xl transition-all duration-300 transform hover:scale-105 border border-gray-100"
//             >
//               <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center group-hover:from-blue-600 group-hover:to-purple-600 transition-colors">
//                 <category.icon className="w-8 h-8 text-white" />
//               </div>
//               <h3 className="font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
//                 {category.name}
//               </h3>
//               <p className="text-gray-500 text-sm">
//                 {category.count.toLocaleString()} cars
//               </p>
//             </Link>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// };

// // Featured Cars Section
// const FeaturedCarsSection = () => {
//   return (
//     <section className="py-20 bg-white">
//       <div className="max-w-7xl mx-auto px-4">
//         <div className="flex items-center justify-between mb-16">
//           <div>
//             <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
//               Featured Cars
//             </h2>
//             <p className="text-xl text-gray-600">
//               Hand-picked premium vehicles from trusted dealers
//             </p>
//           </div>
          
//           <Link
//             href="/cars"
//             className="hidden md:flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-3 px-6 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105"
//           >
//             View All Cars
//             <ArrowRight className="w-5 h-5" />
//           </Link>
//         </div>

//         <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
//           {featuredCars.map((car) => (
//             <CarCard key={car.id} car={car} />
//           ))}
//         </div>

//         <div className="text-center mt-12 md:hidden">
//           <Link
//             href="/cars"
//             className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-4 px-8 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105"
//           >
//             View All Cars
//             <ArrowRight className="w-5 h-5" />
//           </Link>
//         </div>
//       </div>
//     </section>
//   );
// };

// // Why Choose Us Section
// const WhyChooseUsSection = () => {
//   const features = [
//     {
//       icon: Shield,
//       title: "Verified Dealers",
//       description: "All our dealers are verified and trusted partners with proven track records."
//     },
//     {
//       icon: Award,
//       title: "Quality Assured",
//       description: "Every listed vehicle undergoes quality checks to ensure the best buying experience."
//     },
//     {
//       icon: MessageCircle,
//       title: "WhatsApp Support",
//       description: "Connect instantly with dealers via WhatsApp for quick responses and deals."
//     },
//     {
//       icon: Users,
//       title: "Expert Guidance",
//       description: "Our automotive experts help you make informed decisions throughout your journey."
//     }
//   ];

//   return (
//     <section className="py-20 bg-gradient-to-br from-blue-50 to-indigo-100">
//       <div className="max-w-7xl mx-auto px-4">
//         <div className="text-center mb-16">
//           <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
//             Why Choose CarHub
//           </h2>
//           <p className="text-xl text-gray-600 max-w-3xl mx-auto">
//             We're committed to making your car buying journey smooth, transparent, and successful
//           </p>
//         </div>

//         <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
//           {features.map((feature, index) => (
//             <div
//               key={index}
//               className="bg-white rounded-2xl p-8 text-center hover:shadow-xl transition-all duration-300 transform hover:scale-105 border border-gray-100"
//             >
//               <div className="w-16 h-16 mx-auto mb-6 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center">
//                 <feature.icon className="w-8 h-8 text-white" />
//               </div>
//               <h3 className="text-xl font-bold text-gray-900 mb-4">
//                 {feature.title}
//               </h3>
//               <p className="text-gray-600 leading-relaxed">
//                 {feature.description}
//               </p>
//             </div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// };

// // Testimonials Section
// const TestimonialsSection = () => {
//   return (
//     <section className="py-20 bg-white">
//       <div className="max-w-7xl mx-auto px-4">
//         <div className="text-center mb-16">
//           <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
//             What Our Customers Say
//           </h2>
//           <p className="text-xl text-gray-600 max-w-3xl mx-auto">
//             Don't just take our word for it - hear from thousands of satisfied customers
//           </p>
//         </div>

//         <div className="grid md:grid-cols-3 gap-8">
//           {testimonials.map((testimonial) => (
//             <div
//               key={testimonial.id}
//               className="bg-gray-50 rounded-2xl p-8 hover:shadow-lg transition-all duration-300"
//             >
//               <div className="flex items-center mb-4">
//                 <div className="flex">
//                   {[...Array(testimonial.rating)].map((_, i) => (
//                     <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
//                   ))}
//                 </div>
//               </div>
              
//               <p className="text-gray-700 mb-6 leading-relaxed italic">
//                 "{testimonial.text}"
//               </p>
              
//               <div className="flex items-center">
//                 <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mr-4">
//                   <span className="text-white font-bold">
//                     {testimonial.name.charAt(0)}
//                   </span>
//                 </div>
//                 <div>
//                   <div className="font-semibold text-gray-900">{testimonial.name}</div>
//                   <div className="text-gray-500 text-sm">{testimonial.location}</div>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// };

// // CTA Section
// const CTASection = () => {
//   return (
//     <section className="py-20 bg-gradient-to-r from-blue-900 via-purple-900 to-indigo-900 relative overflow-hidden">
//       {/* Background Elements */}
//       <div className="absolute inset-0">
//         <div className="absolute -top-40 -right-32 w-96 h-96 rounded-full bg-white/5 blur-3xl"></div>
//         <div className="absolute -bottom-32 -left-40 w-80 h-80 rounded-full bg-white/5 blur-3xl"></div>
//       </div>

//       <div className="max-w-4xl mx-auto text-center px-4 relative z-10">
//         <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
//           Ready to Find Your Car?
//         </h2>
//         <p className="text-xl text-gray-200 mb-12 max-w-2xl mx-auto">
//           Join thousands of satisfied customers who found their perfect vehicle through our platform
//         </p>
        
//         <div className="flex flex-col sm:flex-row gap-4 justify-center">
//           <Link
//             href="/cars"
//             className="bg-white hover:bg-gray-100 text-gray-900 py-4 px-8 rounded-xl font-bold text-lg transition-all duration-300 transform hover:scale-105"
//           >
//             Browse Cars Now
//           </Link>
//           <Link
//             href="/auth/signup"
//             className="border-2 border-white hover:bg-white hover:text-gray-900 text-white py-4 px-8 rounded-xl font-bold text-lg transition-all duration-300 transform hover:scale-105"
//           >
//             List Your Car
//           </Link>
//         </div>
//       </div>
//     </section>
//   );
// };

// // Main HomePage Component
// export default function HomePage() {
//   return (
//     <main className="min-h-screen">
//       <SearchHero />
//       <CategoriesSection />
//       <FeaturedCarsSection />
//       <WhyChooseUsSection />
//       <TestimonialsSection />
//       <CTASection />
      
//       {/* WhatsApp Floating Button */}
//       <Link
//         href="https://wa.me/923001234567?text=Hi, I need help finding a car"
//         target="_blank"
//         rel="noopener noreferrer"
//         className="fixed bottom-6 right-6 bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-110 z-50 animate-pulse"
//         title="Chat with us on WhatsApp"
//       >
//         <MessageCircle className="w-6 h-6" />
//       </Link>

//       {/* Newsletter Section */}
//       <section className="py-16 bg-gray-100">
//         <div className="max-w-4xl mx-auto text-center px-4">
//           <h3 className="text-3xl font-bold text-gray-900 mb-4">
//             Stay Updated
//           </h3>
//           <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
//             Get notified about new car listings, price drops, and exclusive deals directly in your inbox
//           </p>
          
//           <div className="flex flex-col sm:flex-row max-w-md mx-auto gap-4">
//             <input
//               type="email"
//               placeholder="Enter your email address"
//               className="flex-1 py-3 px-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
//             />
//             <button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-3 px-6 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105">
//               Subscribe
//             </button>
//           </div>
          
//           <p className="text-xs text-gray-500 mt-4">
//             We respect your privacy. Unsubscribe at any time.
//           </p>
//         </div>
//       </section>

//       {/* Footer */}
//       <footer className="bg-gray-900 text-gray-300 py-16">
//         <div className="max-w-7xl mx-auto px-4">
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
//             {/* Company Info */}
//             <div className="lg:col-span-1">
//               <div className="flex items-center mb-6">
//                 <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center mr-3">
//                   <Car className="w-6 h-6 text-white" />
//                 </div>
//                 <span className="text-2xl font-bold text-white">CarHub</span>
//               </div>
//               <p className="text-gray-400 mb-6 leading-relaxed">
//                 Pakistan's most trusted platform for buying and selling cars. 
//                 Find your perfect vehicle from verified dealers nationwide.
//               </p>
//               <div className="flex space-x-4">
//                 <a href="#" className="w-10 h-10 bg-gray-800 hover:bg-blue-600 rounded-full flex items-center justify-center transition-colors">
//                   <span className="sr-only">Facebook</span>
//                   <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
//                     <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
//                   </svg>
//                 </a>
//                 <a href="#" className="w-10 h-10 bg-gray-800 hover:bg-blue-400 rounded-full flex items-center justify-center transition-colors">
//                   <span className="sr-only">Twitter</span>
//                   <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
//                     <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
//                   </svg>
//                 </a>
//                 <a href="#" className="w-10 h-10 bg-gray-800 hover:bg-pink-600 rounded-full flex items-center justify-center transition-colors">
//                   <span className="sr-only">Instagram</span>
//                   <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
//                     <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.62 5.367 11.987 11.988 11.987 6.62 0 11.987-5.367 11.987-11.987C24.014 5.367 18.637.001 12.017.001zM8.449 16.988c-1.297 0-2.349-1.052-2.349-2.35 0-1.297 1.052-2.349 2.349-2.349 1.297 0 2.349 1.052 2.349 2.349 0 1.298-1.052 2.35-2.349 2.35zm7.718 0c-1.297 0-2.349-1.052-2.349-2.35 0-1.297 1.052-2.349 2.349-2.349 1.297 0 2.349 1.052 2.349 2.349 0 1.298-1.052 2.35-2.349 2.35z"/>
//                   </svg>
//                 </a>
//               </div>
//             </div>

//             {/* Quick Links */}
//             <div>
//               <h4 className="text-white font-bold mb-6">Quick Links</h4>
//               <ul className="space-y-3">
//                 <li><Link href="/cars" className="hover:text-white transition-colors">Browse Cars</Link></li>
//                 <li><Link href="/cars/new" className="hover:text-white transition-colors">New Cars</Link></li>
//                 <li><Link href="/cars/used" className="hover:text-white transition-colors">Used Cars</Link></li>
//                 <li><Link href="/cars/luxury" className="hover:text-white transition-colors">Luxury Cars</Link></li>
//                 <li><Link href="/dealers" className="hover:text-white transition-colors">Find Dealers</Link></li>
//                 <li><Link href="/sell" className="hover:text-white transition-colors">Sell Your Car</Link></li>
//               </ul>
//             </div>

//             {/* Categories */}
//             <div>
//               <h4 className="text-white font-bold mb-6">Categories</h4>
//               <ul className="space-y-3">
//                 <li><Link href="/cars/category/sedans" className="hover:text-white transition-colors">Sedans</Link></li>
//                 <li><Link href="/cars/category/suvs" className="hover:text-white transition-colors">SUVs</Link></li>
//                 <li><Link href="/cars/category/hatchbacks" className="hover:text-white transition-colors">Hatchbacks</Link></li>
//                 <li><Link href="/cars/category/convertibles" className="hover:text-white transition-colors">Convertibles</Link></li>
//                 <li><Link href="/cars/category/trucks" className="hover:text-white transition-colors">Trucks</Link></li>
//                 <li><Link href="/cars/category/electric" className="hover:text-white transition-colors">Electric Cars</Link></li>
//               </ul>
//             </div>

//             {/* Support */}
//             <div>
//               <h4 className="text-white font-bold mb-6">Support</h4>
//               <ul className="space-y-3">
//                 <li><Link href="/contact" className="hover:text-white transition-colors">Contact Us</Link></li>
//                 <li><Link href="/help" className="hover:text-white transition-colors">Help Center</Link></li>
//                 <li><Link href="/financing" className="hover:text-white transition-colors">Car Financing</Link></li>
//                 <li><Link href="/insurance" className="hover:text-white transition-colors">Car Insurance</Link></li>
//                 <li><Link href="/about" className="hover:text-white transition-colors">About Us</Link></li>
//                 <li><Link href="/careers" className="hover:text-white transition-colors">Careers</Link></li>
//               </ul>
//             </div>
//           </div>

//           {/* Bottom Bar */}
//           <div className="border-t border-gray-800 pt-8">
//             <div className="flex flex-col lg:flex-row justify-between items-center">
//               <div className="text-gray-400 mb-4 lg:mb-0">
//                 <p>&copy; 2024 CarHub Pakistan. All rights reserved.</p>
//               </div>
              
//               <div className="flex flex-wrap justify-center lg:justify-end gap-6">
//                 <Link href="/privacy" className="text-gray-400 hover:text-white transition-colors text-sm">
//                   Privacy Policy
//                 </Link>
//                 <Link href="/terms" className="text-gray-400 hover:text-white transition-colors text-sm">
//                   Terms of Service
//                 </Link>
//                 <Link href="/cookies" className="text-gray-400 hover:text-white transition-colors text-sm">
//                   Cookie Policy
//                 </Link>
//                 <Link href="/sitemap" className="text-gray-400 hover:text-white transition-colors text-sm">
//                   Sitemap
//                 </Link>
//               </div>
//             </div>
//           </div>
//         </div>
//       </footer>

//       {/* Back to Top Button */}
//       <button
//         onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
//         className="fixed bottom-6 left-6 bg-gray-800 hover:bg-gray-700 text-white p-3 rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-110 opacity-0 invisible scroll-to-top z-50"
//         title="Back to Top"
//       >
//         <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
//         </svg>
//       </button>

//       {/* Custom Styles for animations and scroll behavior */}
//       <style jsx>{`
//         .scroll-to-top {
//           transition: opacity 0.3s, visibility 0.3s, transform 0.3s;
//         }
        
//         .scroll-to-top.show {
//           opacity: 1;
//           visibility: visible;
//         }
        
//         @keyframes fadeInUp {
//           from {
//             opacity: 0;
//             transform: translateY(30px);
//           }
//           to {
//             opacity: 1;
//             transform: translateY(0);
//           }
//         }
        
//         .animate-fadeInUp {
//           animation: fadeInUp 0.8s ease-out forwards;
//         }
        
//         @keyframes slideInLeft {
//           from {
//             opacity: 0;
//             transform: translateX(-30px);
//           }
//           to {
//             opacity: 1;
//             transform: translateX(0);
//           }
//         }
        
//         .animate-slideInLeft {
//           animation: slideInLeft 0.8s ease-out forwards;
//         }
        
//         @keyframes slideInRight {
//           from {
//             opacity: 0;
//             transform: translateX(30px);
//           }
//           to {
//             opacity: 1;
//             transform: translateX(0);
//           }
//         }
        
//         .animate-slideInRight {
//           animation: slideInRight 0.8s ease-out forwards;
//         }
        
//         .line-clamp-1 {
//           display: -webkit-box;
//           -webkit-line-clamp: 1;
//           -webkit-box-orient: vertical;
//           overflow: hidden;
//         }
        
//         .line-clamp-2 {
//           display: -webkit-box;
//           -webkit-line-clamp: 2;
//           -webkit-box-orient: vertical;
//           overflow: hidden;
//         }
        
//         /* Custom scrollbar */
//         ::-webkit-scrollbar {
//           width: 8px;
//         }
        
//         ::-webkit-scrollbar-track {
//           background: #f1f1f1;
//         }
        
//         ::-webkit-scrollbar-thumb {
//           background: linear-gradient(to bottom, #3b82f6, #8b5cf6);
//           border-radius: 4px;
//         }
        
//         ::-webkit-scrollbar-thumb:hover {
//           background: linear-gradient(to bottom, #2563eb, #7c3aed);
//         }
        
//         /* Smooth scroll behavior */
//         html {
//           scroll-behavior: smooth;
//         }
        
//         /* Loading animation for images */
//         .loading-shimmer {
//           background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
//           background-size: 200% 100%;
//           animation: shimmer 1.5s infinite;
//         }
        
//         @keyframes shimmer {
//           0% {
//             background-position: -200% 0;
//           }
//           100% {
//             background-position: 200% 0;
//           }
//         }
//       `}</style>

//       {/* Intersection Observer Script for animations */}
//       <script dangerouslySetInnerHTML={{
//         __html: `
//           // Show/hide back to top button
//           window.addEventListener('scroll', function() {
//             const backToTopButton = document.querySelector('.scroll-to-top');
//             if (window.pageYOffset > 300) {
//               backToTopButton.classList.add('show');
//             } else {
//               backToTopButton.classList.remove('show');
//             }
//           });
          
//           // Intersection Observer for animations
//           const observerOptions = {
//             threshold: 0.1,
//             rootMargin: '0px 0px -50px 0px'
//           };
          
//           const observer = new IntersectionObserver((entries) => {
//             entries.forEach(entry => {
//               if (entry.isIntersecting) {
//                 entry.target.classList.add('animate-fadeInUp');
//               }
//             });
//           }, observerOptions);
          
//           // Observe elements for animation
//           document.addEventListener('DOMContentLoaded', function() {
//             const animateElements = document.querySelectorAll('.animate-on-scroll');
//             animateElements.forEach(el => observer.observe(el));
//           });
//         `
//       }} />
//     </main>
//   );
// }

export default function HomePage() {
  return (
    <main className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 py-16">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Welcome to CarHub</h1>
        <p className="text-lg text-gray-700">Your one-stop solution for buying and selling cars in Pakistan.</p>
      </div>
    </main>
  );
}