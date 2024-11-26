"use client";

import React, { useEffect, useState } from 'react';

interface Listing {
  id: number;
  title: string;
  description: string;
}

const Listings: React.FC = () => {
  const [listings, setListings] = useState<Listing[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/listings', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${process.env.NEXT_PUBLIC_API_KEY}`,
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch listings');
        }

        const data = await response.json();
        setListings(data);
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchListings();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Listings mana?</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {listings.map((listing) => (
          <div key={listing.id} className="p-4 border rounded-lg shadow">
            <h2 className="text-xl font-semibold">{listing.title}</h2>
            <p className="text-gray-600">{listing.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Listings;
