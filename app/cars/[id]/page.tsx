
'use client';

import React, { useState, useEffect } from 'react';
import {
    Car,
    ChevronLeft,
    Phone,
    Mail,
    LocateFixed,
    Euro,
    Gauge,
    Fuel,
    Calendar,
    Zap,
    ChevronRight,
    ChevronDown,
    X,
    AlertTriangle,
    CheckCircle2,
    Share2,
    Heart,
    CarIcon,
    Ruler,
    Paintbrush,
    Cog,
} from 'lucide-react';
import { cn } from '@app/lib/utils';
import { mockCars } from '@app/data/cars';
import Link from '@node_modules/next/link';
import { ReactNode, MouseEventHandler } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCars, fetchCarById, createCar, updateCar, deleteCar } from '@app/store/slices/carSlice';
import { AppDispatch,RootState } from '@app/store';

interface ButtonProps {
  children: ReactNode;
  className?: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  disabled?: boolean;
  variant?: 'primary' | 'secondary';
}

const Button = ({ children, className, onClick, disabled = false, variant = 'primary' }: ButtonProps) => {
  const baseStyles =
    'px-6 py-3 rounded-xl font-semibold transition-all duration-200 shadow-md flex items-center justify-center';

  const variants = {
    primary: 'bg-teal-600 text-white hover:bg-teal-700',
    secondary: 'bg-gray-200 text-gray-800 hover:bg-gray-300',
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${variants[variant]} ${className ?? ''}`}
    >
      {children}
    </button>
  );
};
// Custom component to simulate the Card component

interface CardProps {
  children: ReactNode;
  className?: string;
}

const Card = ({ children, className }: CardProps) => {
  return (
    <div
      className={cn(
        'bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden',
        className
      )}
    >
      {children}
    </div>
  );
};



// Custom component to simulate the Badge component
interface BadgeProps {
  children: ReactNode;
  className?: string;
}

const Badge = ({ children, className }: BadgeProps) => {
  return (
    <span
      className={cn('px-3 py-1 text-xs font-semibold rounded-full', className)}
    >
      {children}
    </span>
  );
};

// Custom component for Alert.tsx
interface AlertProps {
  title: string;
  message: string;
  type?: 'info' | 'error';
  onClose: () => void;
}

const Alert = ({ title, message, type = 'info', onClose }: AlertProps) => {
  const bgColor = type === 'error' ? 'bg-red-500' : 'bg-green-500';
  const icon =
    type === 'error' ? <AlertTriangle size={24} /> : <CheckCircle2 size={24} />;

  return (
    <div
      className={cn(
        'fixed inset-x-4 top-4 z-50 p-4 rounded-xl shadow-lg text-white flex items-center justify-between',
        bgColor
      )}
    >
      <div className="flex items-center">
        {icon}
        <div className="ml-4">
          <h4 className="font-bold">{title}</h4>
          <p className="text-sm">{message}</p>
        </div>
      </div>
      <button
        onClick={onClose}
        className="p-1 rounded-full hover:bg-white/20 transition-colors"
      >
        <X size={20} />
      </button>
    </div>
  );
};

// Custom component for Toast.tsx
interface ToastProps {
  message: string;
  type?: 'success' | 'error';
  onClose: () => void;
}

const Toast = ({ message, type = 'success', onClose }: ToastProps) => {
  const bgColor = type === 'error' ? 'bg-red-500' : 'bg-teal-600';
  const icon =
    type === 'error' ? <AlertTriangle size={20} /> : <CheckCircle2 size={20} />;

  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div
      className={cn(
        'fixed bottom-4 right-4 z-50 px-6 py-3 rounded-full shadow-lg text-white flex items-center',
        bgColor
      )}
    >
      {icon}
      <span className="ml-2 font-semibold">{message}</span>
    </div>
  );
};

const CarDetails = ({ car }: { car: any }) => {
    const [showToast, setShowToast] = useState(false);
    const [showMoreDescription, setShowMoreDescription] = useState(false);
    const handleContactDealer = () => {
        // Simulate contact form submission or action
        setShowToast(true);
    };
    
    return (
        <>
            {car && <div className="p-4 md:p-8 lg:p-12">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left Column: Main Content */}
                    <div className="lg:col-span-2 space-y-6">
                        <div className="flex justify-between items-start mb-4">
                            <div>
                                <h1 className="text-2xl font-bold text-slate-900">{car.title}</h1>
                                <p className="text-sm text-slate-500 mt-1">
                                    <span className="mr-2"># {car._id}</span>
                                    <span className="mr-2">|</span>
                                    <span className="mr-2">Share</span>
                                    <Share2 size={16} className="inline text-slate-500 mr-2" />
                                    <span className="mr-2">Save</span>
                                    <Heart size={16} className="inline text-slate-500" />
                                </p>
                            </div>
                        </div>
                        
                        <Card className="p-0">
                            <img src={car.imageUrl} alt={car.title} className="w-full rounded-t-2xl object-cover h-96 sm:h-[600px]" />
                            <div className="flex p-4 space-x-2 overflow-x-auto bg-slate-100 rounded-b-2xl">
                                {car.thumbnailUrls.map((url:string, index:number) => (
                                    <img key={index} src={url} alt={`Thumbnail ${index + 1}`} className="w-24 h-16 object-cover rounded-md cursor-pointer" />
                                ))}
                            </div>
                        </Card>

                        <Card className="p-6">
                            <h3 className="text-lg font-bold text-slate-900 mb-4">Specifications</h3>
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-y-4">
                                <div className="flex items-center">
                                    <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-slate-100 mr-4">
                                        <Ruler size={20} className="text-teal-600" />
                                    </div>
                                    <div>
                                        <p className="text-sm text-slate-500">Body Type</p>
                                        <p className="font-semibold text-slate-700">{car.bodyType}</p>
                                    </div>
                                </div>
                                <div className="flex items-center">
                                    <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-slate-100 mr-4">
                                        <Cog size={20} className="text-teal-600" />
                                    </div>
                                    <div>
                                        <p className="text-sm text-slate-500">Transmission</p>
                                        <p className="font-semibold text-slate-700">{car.transmission}</p>
                                    </div>
                                </div>
                                <div className="flex items-center">
                                    <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-slate-100 mr-4">
                                        <Gauge size={20} className="text-teal-600" />
                                    </div>
                                    <div>
                                        <p className="text-sm text-slate-500">Mileage</p>
                                        <p className="font-semibold text-slate-700">{car.mileage} km</p>
                                    </div>
                                </div>
                                <div className="flex items-center">
                                    <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-slate-100 mr-4">
                                        <CarIcon size={20} className="text-teal-600" />
                                    </div>
                                    <div>
                                        <p className="text-sm text-slate-500">Drivetrain</p>
                                        <p className="font-semibold text-slate-700">{car.drivetrain}</p>
                                    </div>
                                </div>
                                <div className="flex items-center">
                                    <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-slate-100 mr-4">
                                        <Paintbrush size={20} className="text-teal-600" />
                                    </div>
                                    <div>
                                        <p className="text-sm text-slate-500">Interior Color</p>
                                        <p className="font-semibold text-slate-700">{car.interiorColor}</p>
                                    </div>
                                </div>
                                <div className="flex items-center">
                                    <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-slate-100 mr-4">
                                        <Paintbrush size={20} className="text-teal-600" />
                                    </div>
                                    <div>
                                        <p className="text-sm text-slate-500">Exterior Color</p>
                                        <p className="font-semibold text-slate-700">{car.exteriorColor}</p>
                                    </div>
                                </div>
                                <div className="flex items-center">
                                    <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-slate-100 mr-4">
                                        <Euro size={20} className="text-teal-600" />
                                    </div>
                                    <div>
                                        <p className="text-sm text-slate-500">Cylinders</p>
                                        <p className="font-semibold text-slate-700">{car.cylinders}</p>
                                    </div>
                                </div>
                                <div className="flex items-center">
                                    <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-slate-100 mr-4">
                                        <Fuel size={20} className="text-teal-600" />
                                    </div>
                                    <div>
                                        <p className="text-sm text-slate-500">Fuel Type</p>
                                        <p className="font-semibold text-slate-700">{car.fuelType}</p>
                                    </div>
                                </div>
                            </div>
                        </Card>

                        <Card className="p-6">
                            <h3 className="text-lg font-bold text-slate-900 mb-4">Description</h3>
                            <div className={cn('text-slate-600 leading-relaxed text-sm', !showMoreDescription && 'line-clamp-3')}>
                                <p>{car.description}</p>
                            </div>
                            <button
                                onClick={() => setShowMoreDescription(!showMoreDescription)}
                                className="mt-4 flex items-center font-semibold text-teal-600 hover:text-teal-700"
                            >
                                {showMoreDescription ? 'Read less' : 'Read more'}
                                <ChevronDown size={16} className={cn('ml-1 transition-transform', showMoreDescription && 'rotate-180')} />
                            </button>
                        </Card>

                        <Card className="p-6">
                            <h3 className="text-lg font-bold text-slate-900 mb-4">Fuel Economy</h3>
                            <div className="flex justify-between items-end border-b pb-4">
                                <div className="text-center">
                                    <p className="text-3xl font-bold">{car.fuelEconomyCity}</p>
                                    <p className="text-sm text-slate-500">L/100km</p>
                                    <p className="font-semibold text-slate-700">City</p>
                                </div>
                                <div className="text-center">
                                    <div className="w-24 h-1 bg-slate-200"></div>
                                </div>
                                <div className="text-center">
                                    <p className="text-3xl font-bold">{car.fuelEconomyHighway}</p>
                                    <p className="text-sm text-slate-500">L/100km</p>
                                    <p className="font-semibold text-slate-700">Highway</p>
                                </div>
                            </div>
                        </Card>

                        <Card className="p-6">
                            <h3 className="text-lg font-bold text-slate-900 mb-4">Features</h3>
                            <p className="text-sm text-slate-600">N/A</p>
                        </Card>
                    </div>

                    {/* Right Column: Dealer Info and Contact Form */}
                    <div className="lg:col-span-1 space-y-6">
                        <Card className="p-6">
                            <div className="flex justify-between items-center mb-4">
                                <p className="text-2xl font-bold text-teal-600">${car.price}</p>
                                {car.goodDeal && <Badge className="bg-green-100 text-green-700">Good Deal</Badge>}
                            </div>
                            <div className="border-t pt-4">
                                <h4 className="font-semibold text-slate-800">{car.dealerName}</h4>
                                <p className="text-sm text-slate-500">{car.dealerPhone}</p>
                                <p className="text-sm text-slate-500">{car.dealerAddress}</p>
                            </div>
                        </Card>

                        <Card className="p-6">
                            <div className="space-y-4">
                                <input type="text" placeholder="First Name" className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-teal-500" />
                                <input type="text" placeholder="Last Name" className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-teal-500" />
                                <input type="email" placeholder="Email Address" className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-teal-500" />
                                <input type="phone" placeholder="Phone" className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-teal-500" />
                                <textarea placeholder="Message" rows={4} className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-teal-500"></textarea>
                                <Button onClick={handleContactDealer} className="w-full">
                                    <Mail size={20} className="mr-2" />
                                    Send Email
                                </Button>
                            </div>
                        </Card>

                        <Card className="p-6">
                            <h4 className="font-semibold text-slate-800">{car.dealerName}</h4>
                            <p className="text-sm text-slate-500">{car.dealerPhone}</p>
                            <div className="flex items-center justify-between mt-4">
                                <Button variant="secondary" className="text-sm px-4 py-2">View Inventory</Button>
                            </div>
                            <div className="flex items-center mt-4 text-slate-600">
                                <LocateFixed size={16} className="mr-2" />
                                <p className="text-sm">{car.dealerAddress}</p>
                            </div>
                        </Card>
                    </div>
                </div>
                {showToast && <Toast message="Message sent to dealer successfully!" onClose={() => setShowToast(false)} />}
            </div>}
        </>

    );
};

// Main App component
export default function App({ params }: { params: Promise<{ id: string }> }) {
    const dispatch = useDispatch<AppDispatch>();
    const { car, loading, error } = useSelector((state: RootState) => state.cars);
    const [showAlert, setShowAlert] = useState(false);
    const unwrappedParams = React.use(params); // Unwrap the params promise
    // const car = mockCars.find(car => car._id === unwrappedParams.id);
     useEffect(() => {
        if (unwrappedParams.id) {
            dispatch(fetchCarById(unwrappedParams.id));
        }
    }, [dispatch, unwrappedParams.id]);
    // if (!car) {
    //     return (
    //         <div className="flex flex-col items-center justify-center min-h-screen p-4 text-center">
    //             <h1 className="text-3xl font-bold text-red-500">Car Not Found</h1>
    //             <p className="mt-2 text-gray-600">The requested car ID does not exist.</p>
    //             <Link href="/cars">
    //                 <button className="mt-4 px-6 py-3 rounded-md text-white bg-teal-500 hover:bg-teal-600 transition-colors">
    //                     Back to Listings
    //                 </button>
    //             </Link>
    //         </div>
    //     );
    // }
    return (
        <> 
        {<div className="bg-slate-50 min-h-screen font-sans antialiased text-slate-800">
            <script src="https://cdn.tailwindcss.com"></script>
            <div className="container mx-auto">
                {showAlert && <Alert
                    title="Important Notice"
                    message="Due to high demand, some vehicles may sell quickly. Contact us to confirm availability!"
                    onClose={() => setShowAlert(false)}
                    type="error"
                />}
                <CarDetails car={car} />
            </div>
        </div>}
        </>
    );
}