'use client';

import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { FaMapMarkerAlt } from 'react-icons/fa';

export default function MapLocation() {
  const mapRef = useRef<HTMLDivElement>(null);

  const latitude = parseFloat(process.env.NEXT_PUBLIC_LATITUDE || '6.4489');
  const longitude = parseFloat(process.env.NEXT_PUBLIC_LONGITUDE || '2.3537');
  const address =
    process.env.NEXT_PUBLIC_ADDRESS ||
    'Abomey-Calavi, Atlantique, Bénin';

  useEffect(() => {
    if (!mapRef.current) return;

    const initMap = async () => {
      try {
        // @ts-ignore
        const { Map } = await google.maps.importLibrary('maps');
        // @ts-ignore
        const { AdvancedMarkerElement } =
          await google.maps.importLibrary('marker');

        const mapStyles = [
          { elementType: 'geometry', stylers: [{ color: '#1a1a1a' }] },
          { elementType: 'labels.text.stroke', stylers: [{ color: '#0a0a0a' }] },
          { elementType: 'labels.text.fill', stylers: [{ color: '#D4AF37' }] },
          {
            featureType: 'road',
            elementType: 'geometry',
            stylers: [{ color: '#2a2a2a' }],
          },
          {
            featureType: 'water',
            elementType: 'geometry',
            stylers: [{ color: '#0a0a0a' }],
          },
        ];

        const map = new Map(mapRef.current, {
          center: { lat: latitude, lng: longitude },
          zoom: 15,
          styles: mapStyles,
          mapId: 'LUXURY_MAP_ID',
          disableDefaultUI: true,
          zoomControl: true,
        });

        new AdvancedMarkerElement({
          map,
          position: { lat: latitude, lng: longitude },
          title: address,
        });
      } catch (error) {
        console.error('Error loading map:', error);
      }
    };

    const loadGoogleMaps = () => {
      const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

      if (!apiKey || apiKey === 'your_google_maps_api_key_here') {
        console.warn('Google Maps API key not configured');
        return;
      }

      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=maps,marker&v=beta`;
      script.async = true;
      script.defer = true;
      script.onload = () => initMap();
      document.head.appendChild(script);
    };

    loadGoogleMaps();
  }, [latitude, longitude, address]);

  return (
    <motion.section
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
      className="py-20 px-4 bg-gradient-to-br from-gray-900 to-black"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-block mb-4"
          >
            <FaMapMarkerAlt className="text-6xl text-gold-500 animate-bounce" />
          </motion.div>

          <h2 className="text-4xl md:text-5xl font-bold text-gold-500 mb-4">
            Nous Trouver
          </h2>

          <div className="w-24 h-1 bg-gradient-to-r from-gold-500 to-gold-600 mx-auto mb-6" />

          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            {address}
          </p>
        </div>

        {/* Map */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="rounded-2xl overflow-hidden h-[500px] shadow-2xl border border-gold-500/20"
        >
          <div
            ref={mapRef}
            className="w-full h-full bg-gray-900"
          />
        </motion.div>

        {/* Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          viewport={{ once: true }}
          className="mt-8 text-center"
        >
          <a
            href={`https://www.google.com/maps?q=${latitude},${longitude}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-gradient-to-r from-gold-500 to-gold-600 text-black px-8 py-4 rounded-lg font-bold uppercase tracking-wide hover:shadow-lg hover:shadow-gold-500/50 transition-all"
          >
            Voir l&apos;itinéraire
          </a>
        </motion.div>
      </div>
    </motion.section>
  );
}
