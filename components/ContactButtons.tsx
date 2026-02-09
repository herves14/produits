'use client';

import { motion } from 'framer-motion';
import { FaWhatsapp, FaEnvelope, FaPhone } from 'react-icons/fa';

export default function ContactButtons() {
  const whatsapp = process.env.NEXT_PUBLIC_WHATSAPP || '22961234567';
  const email = process.env.NEXT_PUBLIC_EMAIL || 'contact@chezamadou.com';
  const phone = process.env.NEXT_PUBLIC_PHONE || '22961234567';

  const handleWhatsApp = () => {
    window.open(`https://wa.me/${whatsapp}`, '_blank');
  };

  const handleEmail = () => {
    window.location.href = `mailto:${email}`;
  };

  const handlePhone = () => {
    window.location.href = `tel:${phone}`;
  };

  const buttons = [
    {
      icon: <FaWhatsapp className="text-2xl" />,
      label: 'WhatsApp',
      onClick: handleWhatsApp,
      color: 'from-green-500 to-green-600',
      hoverColor: 'hover:from-green-600 hover:to-green-700',
    },
    {
      icon: <FaEnvelope className="text-2xl" />,
      label: 'Email',
      onClick: handleEmail,
      color: 'from-blue-500 to-blue-600',
      hoverColor: 'hover:from-blue-600 hover:to-blue-700',
    },
    {
      icon: <FaPhone className="text-2xl" />,
      label: 'Appeler',
      onClick: handlePhone,
      color: 'from-gold-500 to-gold-600',
      hoverColor: 'hover:from-gold-600 hover:to-gold-700',
    },
  ];

  return (
    <div className="fixed bottom-8 right-8 z-50 flex flex-col gap-4">
      {buttons.map((button, index) => (
        <motion.button
          key={button.label}
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.1 }}
          whileHover={{ scale: 1.1, rotate: 5 }}
          whileTap={{ scale: 0.9 }}
          onClick={button.onClick}
          className={`group relative w-16 h-16 rounded-full bg-gradient-to-r ${button.color} ${button.hoverColor} shadow-lg hover:shadow-2xl transition-all duration-300 flex items-center justify-center text-white`}
        >
          <span className="relative z-10">{button.icon}</span>

          {/* Label au hover */}
          <span className="absolute right-full mr-3 bg-black text-gold-500 px-4 py-2 rounded-lg font-semibold text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-xl border border-gold-500/30">
            {button.label}
          </span>

          {/* Effet de pulse */}
          <span className="absolute inset-0 rounded-full bg-white opacity-0 group-hover:opacity-20 group-hover:animate-ping" />
        </motion.button>
      ))}
    </div>
  );
}