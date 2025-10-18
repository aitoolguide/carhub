"use client";
import React, { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import {
  Car,
  Edit,
  Trash2,
  Eye,
  EyeOff,
  Clock,
  DollarSign,
  MapPin,
  Calendar,
  TrendingUp,
  Plus,
  Search,
  Filter,
  AlertCircle,
  CheckCircle2,
  XCircle,
  Loader2
} from 'lucide-react';

interface CarAd {
  _id: string;
  title: string;
  make: string;
  model: string;
  year: number;
  price: number;
  mileage: number;
  condition: string;
  bodyType: string;
  location: string;
  images: string[];
  image?: string;
  createdAt: string;
  updatedAt: string;
  isSold: boolean;
  isFeatured: boolean;
  isSponsored: boolean;
  views?: number;
  status?: 'active' | 'pending' | 'rejected';
}

const MyAdsPage = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  
  const [ads, setAds] = useState<CarAd[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filter, setFilter] = useState<'all' | 'active' | 'sold' | 'pending'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/api/auth/signin');
    } else if (status === 'authenticated') {
      fetchMyAds();
    }
  }, [status, router]);

  const fetchMyAds = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/cars/my-ads');
      
      if (!response.ok) {
        throw new Error('Failed to fetch ads');
      }
      
      const data = await response.json();
      setAds(data.cars || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load ads');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (carId: string) => {
    try {
      setDeletingId(carId);
      const response = await fetch(`/api/cars/${carId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete ad');
      }

      setAds(ads.filter(ad => ad._id !== carId));
      setDeleteConfirm(null);
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Failed to delete ad');
    } finally {
      setDeletingId(null);
    }
  };

  const handleToggleSold = async (carId: string, currentStatus: boolean) => {
    try {
      const response = await fetch(`/api/cars/${carId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isSold: !currentStatus }),
      });

      if (!response.ok) {
        throw new Error('Failed to update status');
      }

      setAds(ads.map(ad => 
        ad._id === carId ? { ...ad, isSold: !currentStatus } : ad
      ));
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Failed to update status');
    }
  };

  const filteredAds = ads.filter(ad => {
    const matchesFilter = 
      filter === 'all' ? true :
      filter === 'sold' ? ad.isSold :
      filter === 'active' ? !ad.isSold && ad.status !== 'pending' :
      filter === 'pending' ? ad.status === 'pending' : true;

    const matchesSearch = searchQuery === '' || 
      ad.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ad.make.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ad.model.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesFilter && matchesSearch;
  });

  const stats = {
    total: ads.length,
    active: ads.filter(ad => !ad.isSold && ad.status !== 'pending').length,
    sold: ads.filter(ad => ad.isSold).length,
    pending: ads.filter(ad => ad.status === 'pending').length,
  };

  if (status === 'loading' || loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-red-600 animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Loading your ads...</p>
        </div>
      </div>
    );
  }

  if (!session) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">My Ads</h1>
              <p className="text-gray-600 mt-1">Manage your car listings</p>
            </div>
            <button
              onClick={() => router.push('/post-ad')}
              className="mt-4 md:mt-0 flex items-center space-x-2 px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-semibold"
            >
              <Plus size={20} />
              <span>Post New Ad</span>
            </button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
            <div className="bg-blue-50 rounded-lg p-4">
              <div className="flex items-center space-x-2">
                <Car className="text-blue-600" size={20} />
                <span className="text-sm font-medium text-blue-900">Total Ads</span>
              </div>
              <p className="text-2xl font-bold text-blue-600 mt-2">{stats.total}</p>
            </div>
            <div className="bg-green-50 rounded-lg p-4">
              <div className="flex items-center space-x-2">
                <CheckCircle2 className="text-green-600" size={20} />
                <span className="text-sm font-medium text-green-900">Active</span>
              </div>
              <p className="text-2xl font-bold text-green-600 mt-2">{stats.active}</p>
            </div>
            <div className="bg-orange-50 rounded-lg p-4">
              <div className="flex items-center space-x-2">
                <Clock className="text-orange-600" size={20} />
                <span className="text-sm font-medium text-orange-900">Pending</span>
              </div>
              <p className="text-2xl font-bold text-orange-600 mt-2">{stats.pending}</p>
            </div>
            <div className="bg-gray-100 rounded-lg p-4">
              <div className="flex items-center space-x-2">
                <XCircle className="text-gray-600" size={20} />
                <span className="text-sm font-medium text-gray-900">Sold</span>
              </div>
              <p className="text-2xl font-bold text-gray-600 mt-2">{stats.sold}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters & Search */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search your ads..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
              />
            </div>

            {/* Filter Buttons */}
            <div className="flex items-center space-x-2">
              <Filter size={20} className="text-gray-400" />
              <button
                onClick={() => setFilter('all')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  filter === 'all' ? 'bg-red-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                All
              </button>
              <button
                onClick={() => setFilter('active')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  filter === 'active' ? 'bg-red-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Active
              </button>
              <button
                onClick={() => setFilter('sold')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  filter === 'sold' ? 'bg-red-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Sold
              </button>
              <button
                onClick={() => setFilter('pending')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  filter === 'pending' ? 'bg-red-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Pending
              </button>
            </div>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6 flex items-start">
            <AlertCircle className="text-red-600 mr-3 flex-shrink-0 mt-0.5" size={20} />
            <p className="text-sm text-red-800">{error}</p>
          </div>
        )}

        {/* Ads List */}
        {filteredAds.length === 0 ? (
          <div className="bg-white rounded-lg shadow-sm p-12 text-center">
            <Car className="mx-auto mb-4 text-gray-400" size={48} />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No ads found</h3>
            <p className="text-gray-600 mb-6">
              {searchQuery ? 'Try adjusting your search' : 'Start by posting your first car ad'}
            </p>
            {!searchQuery && (
              <button
                onClick={() => router.push('/post-ad')}
                className="inline-flex items-center space-x-2 px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-semibold"
              >
                <Plus size={20} />
                <span>Post Your First Ad</span>
              </button>
            )}
          </div>
        ) : (
          <div className="space-y-4">
            {filteredAds.map((ad) => (
              <div key={ad._id} className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow">
                <div className="flex flex-col md:flex-row">
                  {/* Image */}
                  <div className="md:w-64 h-48 md:h-auto bg-gray-200 flex-shrink-0">
                    {(ad.images?.[0] || ad.image) ? (
                      <img
                        src={ad.images?.[0] || ad.image}
                        alt={ad.title}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <Car className="text-gray-400" size={48} />
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex-1 p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <h3 className="text-xl font-bold text-gray-900">{ad.title}</h3>
                          {ad.isSold && (
                            <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs font-semibold rounded">
                              SOLD
                            </span>
                          )}
                          {ad.isFeatured && (
                            <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs font-semibold rounded">
                              FEATURED
                            </span>
                          )}
                          {ad.status === 'pending' && (
                            <span className="px-2 py-1 bg-orange-100 text-orange-800 text-xs font-semibold rounded">
                              PENDING
                            </span>
                          )}
                        </div>
                        
                        <div className="flex items-center space-x-4 text-sm text-gray-600 mb-3">
                          <span>{ad.year} • {ad.make} {ad.model}</span>
                          <span>•</span>
                          <span>{ad.mileage?.toLocaleString()} km</span>
                          <span>•</span>
                          <span>{ad.condition}</span>
                        </div>

                        <div className="flex items-center space-x-6 text-sm text-gray-500">
                          <div className="flex items-center space-x-1">
                            <DollarSign size={16} />
                            <span className="text-lg font-bold text-red-600">
                              AED {ad.price?.toLocaleString()}
                            </span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <MapPin size={16} />
                            <span>{ad.location || 'Dubai, UAE'}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Calendar size={16} />
                            <span>{new Date(ad.createdAt).toLocaleDateString()}</span>
                          </div>
                          {ad.views && (
                            <div className="flex items-center space-x-1">
                              <Eye size={16} />
                              <span>{ad.views} views</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center space-x-3 mt-4 pt-4 border-t">
                      <button
                        onClick={() => router.push(`/cars/${ad._id}`)}
                        className="flex items-center space-x-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-medium"
                      >
                        <Eye size={18} />
                        <span>View</span>
                      </button>
                      
                      <button
                        onClick={() => router.push(`/post-ad?edit=${ad._id}`)}
                        className="flex items-center space-x-2 px-4 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors font-medium"
                      >
                        <Edit size={18} />
                        <span>Edit</span>
                      </button>

                      <button
                        onClick={() => handleToggleSold(ad._id, ad.isSold)}
                        className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors font-medium ${
                          ad.isSold
                            ? 'bg-green-100 text-green-700 hover:bg-green-200'
                            : 'bg-orange-100 text-orange-700 hover:bg-orange-200'
                        }`}
                      >
                        {ad.isSold ? <Eye size={18} /> : <EyeOff size={18} />}
                        <span>{ad.isSold ? 'Mark Available' : 'Mark Sold'}</span>
                      </button>

                      <button
                        onClick={() => setDeleteConfirm(ad._id)}
                        className="flex items-center space-x-2 px-4 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors font-medium ml-auto"
                      >
                        <Trash2 size={18} />
                        <span>Delete</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      {deleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h3 className="text-xl font-bold text-gray-900 mb-2">Delete Ad</h3>
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete this ad? This action cannot be undone.
            </p>
            <div className="flex space-x-3">
              <button
                onClick={() => setDeleteConfirm(null)}
                disabled={deletingId === deleteConfirm}
                className="flex-1 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors font-medium disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(deleteConfirm)}
                disabled={deletingId === deleteConfirm}
                className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium disabled:opacity-50 flex items-center justify-center"
              >
                {deletingId === deleteConfirm ? (
                  <>
                    <Loader2 className="animate-spin mr-2" size={18} />
                    Deleting...
                  </>
                ) : (
                  'Delete'
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyAdsPage;