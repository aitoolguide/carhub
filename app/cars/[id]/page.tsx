import React from 'react';
import {
  Car as CarIcon,
  Share2,
  Heart,
  Ruler,
  Paintbrush,
  Gauge,
  Fuel,
  Euro,
  Phone,
  MessageSquare
} from 'lucide-react';
import { cn } from '@app/lib/utils';
import { ImageGallery, DescriptionSection, ActionButton, DirectMessageButton, ToastContainer } from '@app/components/car/CarDetailsClient';

type AnyObject = { [k: string]: any };

interface ButtonProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'primary' | 'secondary';
  href?: string;
  target?: string;
  rel?: string;
}

const Button = ({ children, className = '', variant = 'primary', href, target, rel }: ButtonProps) => {
  const baseStyles = 'inline-flex items-center justify-center px-6 py-3 rounded-xl font-semibold transition-all duration-200 shadow-md';
  const variants = {
    primary: 'bg-teal-600 text-white hover:bg-teal-700',
    secondary: 'bg-gray-200 text-gray-800 hover:bg-gray-300',
  };
  const classes = `${baseStyles} ${variants[variant]} ${className}`;

  if (href) {
    return (
      <a href={href} target={target} rel={rel} className={classes}>
        {children}
      </a>
    );
  }

  return (
    <button className={classes}>
      {children}
    </button>
  );
};

const Card = ({ children, className }: { children: React.ReactNode; className?: string }) => (
  <div className={cn('bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden', className)}>
    {children}
  </div>
);

const Badge = ({ children, className }: { children: React.ReactNode; className?: string }) => (
  <span className={cn('px-3 py-1 text-xs font-semibold rounded-full', className)}>{children}</span>
);

const formatPrice = (p?: number) =>
  typeof p === 'number' ? p.toLocaleString(undefined, { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }) : 'N/A';

// Fetch car data on the server
async function fetchCarData(id: string): Promise<AnyObject | null> {
  try {
    // Construct absolute URL for server-side fetch
    const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api';
    const url = `${baseUrl}/cars/${id}`;
    
    const response = await fetch(url, {
      cache: 'no-store', // or 'force-cache' depending on your needs
    });
    
    if (!response.ok) {
      console.error(`Failed to fetch car ${id}: ${response.status}`);
      return null;
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching car:', error);
    return null;
  }
}

const CarDetailsServer = ({ car }: { car: AnyObject | null }) => {
  if (!car) return null;

  const thumbnails: string[] = car.thumbnailUrls && car.thumbnailUrls.length ? car.thumbnailUrls : (car.images || []).slice(0, 8);
  const dealerPhone = car.dealerPhone || car.whatsappNumber || '';
  const dealerWhats = car.whatsappNumber || dealerPhone || '';
  const mainImage = car.imageUrl || (car.images && car.images.length > 0 && car.images[0]) || car.image || null;

  return (
    <div className="p-4 md:p-8 lg:p-12">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h1 className="text-2xl font-bold text-slate-900">{car.title || `${car.year || ''} ${car.make || ''} ${car.carModel || car.model || ''}`}</h1>
              <p className="text-sm text-slate-500 mt-1">
                <span className="mr-2"># {car._id}</span>
                <span className="mr-2">|</span>
                <span className="mr-2">Share</span>
                <Share2 size={16} className="inline text-slate-500 mr-2" />
                <span className="mr-2">Save</span>
                <Heart size={16} className="inline text-slate-500" />
              </p>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-teal-600">{formatPrice(car.price)}</div>
              <div className="text-sm text-slate-500">{car.location || 'Unknown location'}</div>
            </div>
          </div>

          <ImageGallery mainImageInitial={mainImage} thumbnails={thumbnails} car={car} />

          {/* Specifications */}
          <Card className="p-6">
            <h3 className="text-lg font-bold text-slate-900 mb-4">Specifications</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-y-4">
              {[
                { icon: Ruler, label: 'Body Type', value: car.bodyType },
                { icon: CarIcon, label: 'Drivetrain', value: car.drivetrain },
                { icon: Gauge, label: 'Mileage', value: car.mileage ? `${car.mileage.toLocaleString()} km` : 'N/A' },
                { icon: Paintbrush, label: 'Exterior Color', value: car.exteriorColor },
                { icon: Paintbrush, label: 'Interior Color', value: car.interiorColor },
                { icon: Euro, label: 'Cylinders', value: car.cylinders ?? 'N/A' },
                { icon: Fuel, label: 'Fuel Type', value: car.fuelType },
                { icon: CarIcon, label: 'Transmission', value: car.transmission },
                { icon: CarIcon, label: 'Hybrid', value: car.hybrid === true ? 'Yes' : car.hybrid === false ? 'No' : 'N/A' },
                { icon: Gauge, label: 'Horsepower', value: car.horsepower ?? 'N/A' },
                { icon: CarIcon, label: 'Steering Side', value: car.steeringSide ?? 'N/A' },
                { icon: CarIcon, label: 'Warranty', value: car.warranty ?? 'N/A' },
                { icon: CarIcon, label: 'Seller Type', value: car.sellerType ?? 'N/A' },
              ].map((spec, i) => (
                <div key={i} className="flex items-center">
                  <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-slate-100 mr-4">
                    <spec.icon size={20} className="text-teal-600" />
                  </div>
                  <div>
                    <p className="text-sm text-slate-500">{spec.label}</p>
                    <p className="font-semibold text-slate-700">{spec.value || 'N/A'}</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Description */}
          <Card className="p-6">
            <h3 className="text-lg font-bold text-slate-900 mb-4">Description</h3>
            <DescriptionSection description={car.description || 'No description provided.'} />
          </Card>

          {/* Features */}
          <Card className="p-6">
            <h3 className="text-lg font-bold text-slate-900 mb-4">Features</h3>
            <div className="flex flex-wrap gap-2">
              {Array.isArray(car.features) && car.features.length ? (
                car.features.map((f: string, i: number) => <Badge key={`${f}-${i}`} className="bg-slate-100 text-slate-700">{f}</Badge>)
              ) : (
                <p className="text-sm text-slate-600">N/A</p>
              )}
            </div>
          </Card>
        </div>

        {/* Right Column (Dealer info & actions) */}
        <div className="lg:col-span-1 space-y-6">
          <Card className="p-6">
            <div className="flex justify-between items-center mb-4">
              <p className="text-2xl font-bold text-teal-600">{formatPrice(car.price)}</p>
              {car.isGoodDeal && <Badge className="bg-green-100 text-green-700">Good Deal</Badge>}
            </div>

            <div className="border-t pt-4 space-y-1">
              <h4 className="font-semibold text-slate-800">{car.dealerName || 'Dealer'}</h4>
              <p className="text-sm text-slate-500">{car.dealerPhone || '-'}</p>
              <p className="text-sm text-slate-500">{car.dealerAddress || '-'}</p>
              <p className="text-xs text-slate-400 mt-2">Posted: {car.createdAt ? new Date(car.createdAt).toLocaleDateString() : 'N/A'}</p>
            </div>

            <div className="grid grid-cols-1 gap-2 mt-4">
              {/* Call Dealer */}
              {dealerPhone ? (
                <Button href={`tel:${dealerPhone.replace(/\s+/g, '')}`} className="w-full">
                  <Phone size={18} className="mr-2" /> Call Dealer
                </Button>
              ) : (
                <ActionButton />
              )}

              {/* WhatsApp Message */}
              {dealerWhats && (
                <Button
                  href={`https://wa.me/${dealerWhats.replace(/\D/g, '')}?text=Hi!%20I%20am%20interested%20in%20your%20car%20${encodeURIComponent(car.title || '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-green-500 hover:bg-green-600"
                >
                  <MessageSquare size={18} className="mr-2" /> WhatsApp
                </Button>
              )}
              {/* Direct Message (placeholder for Firebase) */}
              <DirectMessageButton />
            </div>
          </Card>
        </div>
      </div>

      <ToastContainer />
    </div>
  );
};

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const car = await fetchCarData(id);

  return (
    <div className="bg-slate-50 min-h-screen font-sans antialiased text-slate-800">
      <div className="container mx-auto">
        <CarDetailsServer car={car} />
      </div>
    </div>
  );
}