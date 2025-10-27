"use client";
import React, { useState } from 'react';
import {
  Car,
  ChevronRight,
  ChevronLeft,
  Upload,
  X,
  DollarSign,
  Calendar,
  Gauge,
  Fuel,
  Cog,
  Palette,
  Image as ImageIcon,
  FileText,
  CheckCircle,
  AlertCircle
} from 'lucide-react';

// Add new attributes to CarFormData
interface CarFormData {
  // Basic Info
  title: string;
  description: string;
  make: string;
  model: string;
  year: number | string;
  condition: string;
  
  // Pricing
  price: number | string;
  
  // Details
  bodyType: string;
  mileage: number | string;
  fuelType: string;
  transmission: string;
  drivetrain: string;
  cylinders: number | string;
  engineSize: string;
  hybrid: boolean | null;          // New
  horsepower: number | string;     // New
  steeringSide: string;            // New
  warranty: string;                // New
  sellerType: string;              // New
  
  // Features
  exteriorColor: string;
  interiorColor: string;
  doors: number | string;
  seats: number | string;
  features: string[];
  
  // Images
  images: File[];
  imagePreviews: string[];
  
  // Contact
  contactName: string;
  contactPhone: string;
  contactEmail: string;
  location: string;
  
  // Optional
  vin: string;
  isFeatured: boolean;
  isSponsored: boolean;
}

const PostAdPage = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState('');

  // Initialize in state
const [formData, setFormData] = useState<CarFormData>({
  title: '',
  description: '',
  make: '',
  model: '',
  year: '',
  condition: 'Used',
  price: '',
  bodyType: '',
  mileage: '',
  fuelType: 'Gasoline',
  transmission: 'Automatic',
  drivetrain: '',
  cylinders: '',
  engineSize: '',
  hybrid: null,
  horsepower: '',
  steeringSide: '',
  warranty: '',
  sellerType: '',
  exteriorColor: '',
  interiorColor: '',
  doors: 4,
  seats: 5,
  features: [],
  images: [],
  imagePreviews: [],
  contactName: '',
  contactPhone: '',
  contactEmail: '',
  location: '',
  vin: '',
  isFeatured: false,
  isSponsored: false
});

// Validation before moving to next step
const canProceed = (step: number) => {
  switch(step) {
    case 1:
      return formData.title && formData.make && formData.model && formData.year && formData.bodyType && formData.description;
    case 2:
      return formData.price && formData.mileage && formData.fuelType && formData.transmission;
    case 3:
      return formData.exteriorColor && formData.hybrid !== null && formData.horsepower && formData.steeringSide && formData.warranty && formData.sellerType;
    case 5:
      return formData.contactName && formData.contactPhone && formData.contactEmail && formData.location;
    default:
      return true;
  }
};

  const totalSteps = 5;

  // Available Options
  const makes = ['Ford', 'Honda', 'Toyota', 'BMW', 'Mercedes-Benz', 'Audi', 'Nissan', 'Chevrolet', 'Hyundai', 'Kia'];
  const bodyTypes = ['Sedan', 'SUV', 'Truck', 'Hatchback', 'Coupe', 'Convertible', 'Van', 'Wagon'];
  const colors = ['Black', 'White', 'Silver', 'Grey', 'Blue', 'Red', 'Green', 'Brown', 'Beige', 'Gold'];
  const drivetrains = ['Front-Wheel Drive', 'Rear-Wheel Drive', 'All-Wheel Drive', 'Four-Wheel Drive'];
  const availableFeatures = [
    'Bluetooth', 'Backup Camera', 'Heated Seats', 'Sunroof', 'Leather Seats',
    'Navigation System', 'Cruise Control', 'Adaptive Cruise Control', 'Parking Sensors',
    'Blind Spot Monitoring', 'Lane Departure Warning', 'Apple CarPlay', 'Android Auto',
    'Premium Sound System', 'Keyless Entry', 'Remote Start', 'Power Liftgate'
  ];

  const handleInputChange = (field: keyof CarFormData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleFeatureToggle = (feature: string) => {
    setFormData(prev => ({
      ...prev,
      features: prev.features.includes(feature)
        ? prev.features.filter(f => f !== feature)
        : [...prev.features, feature]
    }));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const newImages = [...formData.images, ...files].slice(0, 10); // Max 10 images
    
    const newPreviews = files.map(file => URL.createObjectURL(file));
    const allPreviews = [...formData.imagePreviews, ...newPreviews].slice(0, 10);
    
    setFormData(prev => ({
      ...prev,
      images: newImages,
      imagePreviews: allPreviews
    }));
  };

  const removeImage = (index: number) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
      imagePreviews: prev.imagePreviews.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    setSubmitError('');

    try {
      // Create FormData for file upload
      const submitData = new FormData();
      
      // Add all text fields
      Object.entries(formData).forEach(([key, value]) => {
        if (key !== 'images' && key !== 'imagePreviews') {
          if (Array.isArray(value)) {
            submitData.append(key, JSON.stringify(value));
          } else {
            submitData.append(key, value.toString());
          }
        }
      });
      
      // Add images
      formData.images.forEach((image, index) => {
        submitData.append('images', image);
      });
      console.log('Submitting form data:', submitData);
      const response = await fetch('/api/cars/new', {
        method: 'POST',
        body: submitData
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to create ad');
      }

      const result = await response.json();
      setSubmitSuccess(true);
      
      // Redirect after 2 seconds
      setTimeout(() => {
        window.location.href = `/cars/${result._id}`;
      }, 2000);
      
    } catch (error) {
      setSubmitError(error instanceof Error ? error.message : 'Failed to submit ad');
    } finally {
      setIsSubmitting(false);
    }
  };

const nextStep = () => {
  if (canProceed(currentStep)) {
    setCurrentStep(currentStep + 1);
  } else {
    alert("Please fill in all required fields before proceeding.");
  }
};

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const renderStepIndicator = () => (
    <div className="flex items-center justify-center mb-8">
      {[1, 2, 3, 4, 5].map((step) => (
        <React.Fragment key={step}>
          <div className={`flex items-center justify-center w-10 h-10 rounded-full font-semibold ${
            step === currentStep ? 'bg-red-600 text-white' : 
            step < currentStep ? 'bg-green-500 text-white' : 
            'bg-gray-200 text-gray-600'
          }`}>
            {step < currentStep ? <CheckCircle size={20} /> : step}
          </div>
          {step < 5 && <div className={`w-16 h-1 mx-2 ${step < currentStep ? 'bg-green-500' : 'bg-gray-200'}`} />}
        </React.Fragment>
      ))}
    </div>
  );

  // Step 1: Basic Information
  const renderStep1 = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900 flex items-center">
        <Car className="mr-3" />
        Basic Information
      </h2>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Ad Title *</label>
        <input
          type="text"
          value={formData.title}
          onChange={(e) => handleInputChange('title', e.target.value)}
          placeholder="e.g., 2020 Honda Civic EX - Low Mileage"
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
          required
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Make *</label>
          <select
            value={formData.make}
            onChange={(e) => handleInputChange('make', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500"
            required
          >
            <option value="">Select Make</option>
            {makes.map(make => <option key={make} value={make}>{make}</option>)}
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Model *</label>
          <input
            type="text"
            value={formData.model}
            onChange={(e) => handleInputChange('model', e.target.value)}
            placeholder="e.g., Civic"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500"
            required
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Year *</label>
          <input
            type="number"
            value={formData.year}
            onChange={(e) => handleInputChange('year', e.target.value)}
            placeholder="2020"
            min="1900"
            max={new Date().getFullYear() + 1}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500"
            required
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Condition *</label>
          <select
            value={formData.condition}
            onChange={(e) => handleInputChange('condition', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500"
          >
            <option value="New">New</option>
            <option value="Used">Used</option>
            <option value="Certified Pre-Owned">Certified Pre-Owned</option>
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Body Type *</label>
          <select
            value={formData.bodyType}
            onChange={(e) => handleInputChange('bodyType', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500"
            required
          >
            <option value="">Select Type</option>
            {bodyTypes.map(type => <option key={type} value={type}>{type}</option>)}
          </select>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Description *</label>
        <textarea
          value={formData.description}
          onChange={(e) => handleInputChange('description', e.target.value)}
          placeholder="Describe your vehicle in detail..."
          rows={5}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500"
          required
        />
      </div>
    </div>
  );

  // Step 2: Technical Details
  const renderStep2 = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900 flex items-center">
        <Cog className="mr-3" />
        Technical Details
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Price (AED) *</label>
          <div className="relative">
            <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="number"
              value={formData.price}
              onChange={(e) => handleInputChange('price', e.target.value)}
              placeholder="50000"
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Mileage (km) *</label>
          <div className="relative">
            <Gauge className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="number"
              value={formData.mileage}
              onChange={(e) => handleInputChange('mileage', e.target.value)}
              placeholder="50000"
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500"
              required
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Fuel Type *</label>
          <select
            value={formData.fuelType}
            onChange={(e) => handleInputChange('fuelType', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500"
          >
            <option value="Gasoline">Gasoline</option>
            <option value="Diesel">Diesel</option>
            <option value="Electric">Electric</option>
            <option value="Hybrid">Hybrid</option>
            <option value="Plug-in Hybrid">Plug-in Hybrid</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Transmission *</label>
          <select
            value={formData.transmission}
            onChange={(e) => handleInputChange('transmission', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500"
          >
            <option value="Automatic">Automatic</option>
            <option value="Manual">Manual</option>
            <option value="CVT">CVT</option>
            <option value="Semi-Automatic">Semi-Automatic</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Drivetrain</label>
          <select
            value={formData.drivetrain}
            onChange={(e) => handleInputChange('drivetrain', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500"
          >
            <option value="">Select</option>
            {drivetrains.map(dt => <option key={dt} value={dt}>{dt}</option>)}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Cylinders</label>
          <input
            type="number"
            value={formData.cylinders}
            onChange={(e) => handleInputChange('cylinders', e.target.value)}
            placeholder="4"
            min="2"
            max="16"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Engine Size (L)</label>
          <input
            type="text"
            value={formData.engineSize}
            onChange={(e) => handleInputChange('engineSize', e.target.value)}
            placeholder="2.0"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">VIN (Optional)</label>
        <input
          type="text"
          value={formData.vin}
          onChange={(e) => handleInputChange('vin', e.target.value)}
          placeholder="Vehicle Identification Number"
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500"
        />
      </div>
    </div>
  );

  // Step 3: Appearance & Features
  const renderStep3 = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900 flex items-center">
        <Palette className="mr-3" />
        Appearance & Features
      </h2>
<div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-2">Hybrid *</label>
    <select
      value={formData.hybrid === null ? '' : formData.hybrid ? 'yes' : 'no'}
      onChange={(e) => handleInputChange('hybrid', e.target.value === 'yes')}
      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500"
      required
    >
      <option value="">Select</option>
      <option value="yes">Yes</option>
      <option value="no">No</option>
    </select>
  </div>

  <div>
    <label className="block text-sm font-medium text-gray-700 mb-2">Horsepower *</label>
    <input
      type="number"
      value={formData.horsepower}
      onChange={(e) => handleInputChange('horsepower', e.target.value)}
      placeholder="e.g., 150"
      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500"
      required
    />
  </div>

  <div>
    <label className="block text-sm font-medium text-gray-700 mb-2">Steering Side *</label>
    <select
      value={formData.steeringSide}
      onChange={(e) => handleInputChange('steeringSide', e.target.value)}
      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500"
      required
    >
      <option value="">Select</option>
      <option value="Left Hand">Left Hand</option>
      <option value="Right Hand">Right Hand</option>
    </select>
  </div>

  <div>
    <label className="block text-sm font-medium text-gray-700 mb-2">Warranty *</label>
    <select
      value={formData.warranty}
      onChange={(e) => handleInputChange('warranty', e.target.value)}
      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500"
      required
    >
      <option value="">Select</option>
      <option value="Yes">Yes</option>
      <option value="No">No</option>
    </select>
  </div>

  <div>
    <label className="block text-sm font-medium text-gray-700 mb-2">Seller Type *</label>
    <select
      value={formData.sellerType}
      onChange={(e) => handleInputChange('sellerType', e.target.value)}
      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500"
      required
    >
      <option value="">Select</option>
      <option value="Owner">Owner</option>
      <option value="Dealer">Dealer</option>
    </select>
  </div>
</div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Exterior Color *</label>
          <select
            value={formData.exteriorColor}
            onChange={(e) => handleInputChange('exteriorColor', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500"
            required
          >
            <option value="">Select Color</option>
            {colors.map(color => <option key={color} value={color}>{color}</option>)}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Interior Color</label>
          <select
            value={formData.interiorColor}
            onChange={(e) => handleInputChange('interiorColor', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500"
          >
            <option value="">Select Color</option>
            {colors.map(color => <option key={color} value={color}>{color}</option>)}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Number of Doors</label>
          <input
            type="number"
            value={formData.doors}
            onChange={(e) => handleInputChange('doors', e.target.value)}
            min="2"
            max="6"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Number of Seats</label>
          <input
            type="number"
            value={formData.seats}
            onChange={(e) => handleInputChange('seats', e.target.value)}
            min="2"
            max="9"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3">Features</label>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {availableFeatures.map(feature => (
            <label key={feature} className="flex items-center space-x-2 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.features.includes(feature)}
                onChange={() => handleFeatureToggle(feature)}
                className="w-4 h-4 text-red-600 border-gray-300 rounded focus:ring-red-500"
              />
              <span className="text-sm text-gray-700">{feature}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );

  // Step 4: Photos
  const renderStep4 = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900 flex items-center">
        <ImageIcon className="mr-3" />
        Upload Photos
      </h2>

      <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
        <input
          type="file"
          accept="image/*"
          multiple
          onChange={handleImageUpload}
          className="hidden"
          id="image-upload"
        />
        <label htmlFor="image-upload" className="cursor-pointer">
          <Upload className="mx-auto mb-4 text-gray-400" size={48} />
          <p className="text-lg font-medium text-gray-700">Click to upload photos</p>
          <p className="text-sm text-gray-500 mt-2">Max 10 images (JPG, PNG)</p>
        </label>
      </div>

      {formData.imagePreviews.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {formData.imagePreviews.map((preview, index) => (
            <div key={index} className="relative group">
              <img src={preview} alt={`Preview ${index + 1}`} className="w-full h-32 object-cover rounded-lg" />
              <button
                onClick={() => removeImage(index)}
                className="absolute top-2 right-2 bg-red-600 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <X size={16} />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );

  // Step 5: Contact Information
  const renderStep5 = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900 flex items-center">
        <FileText className="mr-3" />
        Contact Information
      </h2>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Your Name *</label>
        <input
          type="text"
          value={formData.contactName}
          onChange={(e) => handleInputChange('contactName', e.target.value)}
          placeholder="John Doe"
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500"
          required
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number *</label>
          <input
            type="tel"
            value={formData.contactPhone}
            onChange={(e) => handleInputChange('contactPhone', e.target.value)}
            placeholder="+971 50 123 4567"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Email *</label>
          <input
            type="email"
            value={formData.contactEmail}
            onChange={(e) => handleInputChange('contactEmail', e.target.value)}
            placeholder="john@example.com"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500"
            required
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Location *</label>
        <input
          type="text"
          value={formData.location}
          onChange={(e) => handleInputChange('location', e.target.value)}
          placeholder="Dubai, UAE"
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500"
          required
        />
      </div>

      {submitError && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-start">
          <AlertCircle className="text-red-600 mr-3 flex-shrink-0 mt-0.5" size={20} />
          <p className="text-sm text-red-800">{submitError}</p>
        </div>
      )}

      {submitSuccess && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex items-start">
          <CheckCircle className="text-green-600 mr-3 flex-shrink-0 mt-0.5" size={20} />
          <p className="text-sm text-green-800">Ad posted successfully! Redirecting...</p>
        </div>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Place Your Ad</h1>
          <p className="text-gray-600 mb-8">Fill in the details to list your car</p>

          {renderStepIndicator()}

          <form onSubmit={(e) => e.preventDefault()}>
            {currentStep === 1 && renderStep1()}
            {currentStep === 2 && renderStep2()}
            {currentStep === 3 && renderStep3()}
            {currentStep === 4 && renderStep4()}
            {currentStep === 5 && renderStep5()}

            <div className="flex justify-between mt-8 pt-6 border-t">
              <button
                type="button"
                onClick={prevStep}
                disabled={currentStep === 1}
                className={`flex items-center px-6 py-3 rounded-lg font-semibold transition-colors ${
                  currentStep === 1
                    ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                <ChevronLeft size={20} className="mr-2" />
                Previous
              </button>

              {currentStep < totalSteps ? (
                <button
                  type="button"
                  onClick={nextStep}
                  className="flex items-center px-6 py-3 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 transition-colors"
                >
                  Next
                  <ChevronRight size={20} className="ml-2" />
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className="flex items-center px-8 py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition-colors disabled:bg-gray-400"
                >
                  {isSubmitting ? 'Submitting...' : 'Submit Ad'}
                  <CheckCircle size={20} className="ml-2" />
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PostAdPage;