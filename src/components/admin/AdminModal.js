'use client';

import { motion, AnimatePresence } from 'framer-motion';

export default function AdminModal({ isOpen, onClose, type, title, message, onConfirm, confirmText }) {
  
  const config = {
    success: {
      icon: 'fa-check-circle',
      color: 'text-green-500',
      btnColor: 'bg-green-600 hover:bg-green-700',
      btnText: 'OK, Mengerti'
    },
    error: {
      icon: 'fa-times-circle',
      color: 'text-red-500',
      btnColor: 'bg-red-600 hover:bg-red-700',
      btnText: 'Tutup'
    },
    confirm: {
      icon: 'fa-exclamation-triangle',
      color: 'text-yellow-500',
      btnColor: 'bg-red-600 hover:bg-red-700',
      btnText: 'Ya, Hapus Data' 
    }
  };

  const currentConfig = config[type] || config.success;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[999] flex items-center justify-center p-4">
          
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
          />

          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="relative bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-sm w-full p-6 text-center border border-gray-100 dark:border-gray-700"
          >
            <div className={`text-6xl mb-4 ${currentConfig.color}`}>
              <i className={`fas ${currentConfig.icon}`}></i>
            </div>

            <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">
              {title}
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6 text-sm">
              {message}
            </p>

            <div className="flex gap-3 justify-center">
              {type === 'confirm' ? (
                <>
                  <button 
                    onClick={onClose}
                    className="px-5 py-2.5 rounded-lg border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 font-semibold hover:bg-gray-100 dark:hover:bg-gray-700 transition"
                  >
                    Batal
                  </button>
                  <button 
                    onClick={() => { onConfirm(); onClose(); }}
                    className={`px-5 py-2.5 rounded-lg text-white font-semibold transition shadow-lg ${currentConfig.btnColor}`}
                  >
                    {confirmText || currentConfig.btnText}
                  </button>
                </>
              ) : (
                <button 
                  onClick={onClose}
                  className={`px-6 py-2.5 rounded-lg text-white font-semibold transition shadow-lg w-full ${currentConfig.btnColor}`}
                >
                  {currentConfig.btnText}
                </button>
              )}
            </div>

          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}