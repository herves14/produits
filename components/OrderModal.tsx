type Props = {
    onClose: () => void;
  };
  
  export default function OrderModal({ onClose }: Props) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
        <div className="bg-[#0B0B0B] border border-gold-500/30 rounded-2xl p-8 w-80 text-center">
          <h2 className="text-2xl font-semibold text-gold-500">
            Passer commande
          </h2>
  
          <div className="mt-6 space-y-4">
            {/* APPEL */}
            <a
              href="tel:+2290190047401"
              className="block w-full py-3 rounded-full bg-gold-500 text-black font-semibold hover:bg-gold-400 transition"
            >
              📞 Appeler le service client
            </a>
  
            {/* WHATSAPP */}
            <a
              href="https://wa.me/22990047401"
              target="_blank"
              className="block w-full py-3 rounded-full border border-gold-500 text-gold-500 hover:bg-gold-500 hover:text-black transition"
            >
              💬 Commander via WhatsApp
            </a>
          </div>
  
          <button
            onClick={onClose}
            className="mt-6 text-sm text-gray-400 hover:text-white"
          >
            Fermer
          </button>
        </div>
      </div>
    );
  }
  