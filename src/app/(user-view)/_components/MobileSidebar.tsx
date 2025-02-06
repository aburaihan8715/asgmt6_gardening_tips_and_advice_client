import React, { ReactNode } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MdClose } from 'react-icons/md';

interface SidebarDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  title?: string;
}

const UserMobileSidebar: React.FC<SidebarDrawerProps> = ({
  isOpen,
  onClose,
  children,
  title,
}) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex">
          {/* Overlay */}
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Sidebar */}
          <motion.div
            className="relative flex h-full w-[250px] flex-col bg-white p-5 shadow-lg"
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'tween', duration: 0.3 }}
          >
            {/* Close Button */}
            <button className="absolute right-3 top-3" onClick={onClose}>
              <MdClose className="h-5 w-5 text-gray-600 hover:text-gray-900" />
            </button>

            {/* Title */}
            {title && (
              <h2 className="mb-4 text-lg font-semibold">{title}</h2>
            )}

            {/* Content */}
            <div className="flex-1 overflow-auto">{children}</div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default UserMobileSidebar;
