"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

const InteractiveFolder = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const folderRef = useRef(null);

  // Sample folder contents
  const folderContents = [
    { name: "Document.pdf", type: "pdf", size: "2.4 MB" },
    { name: "Image.jpg", type: "image", size: "1.8 MB" },
    { name: "Presentation.pptx", type: "presentation", size: "5.2 MB" },
    { name: "Spreadsheet.xlsx", type: "spreadsheet", size: "890 KB" },
    { name: "Video.mp4", type: "video", size: "12.5 MB" },
  ];

  const handleMouseMove = (e) => {
    if (folderRef.current) {
      const rect = folderRef.current.getBoundingClientRect();
      setMousePosition({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    }
  };

  const getFileIcon = (type) => {
    const icons = {
      pdf: "📄",
      image: "🖼️",
      presentation: "📊",
      spreadsheet: "📈",
      video: "🎥",
    };
    return icons[type] || "📄";
  };

  const folderVariants = {
    closed: {
      scale: 1,
      rotateY: 0,
      rotateX: 0,
    },
    hovered: {
      scale: 1.05,
      rotateY: 5,
      rotateX: 5,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 20,
      },
    },
    opening: {
      scale: 1.1,
      rotateY: 10,
      rotateX: 10,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 15,
      },
    },
    open: {
      scale: 1.15,
      rotateY: 20,
      rotateX: 15,
      transition: {
        type: "spring",
        stiffness: 150,
        damping: 12,
      },
    },
  };

  const tabVariants = {
    closed: {
      rotateX: 0,
      y: 0,
    },
    opening: {
      rotateX: -45,
      y: -10,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 20,
      },
    },
    open: {
      rotateX: -60,
      y: -15,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 15,
      },
    },
  };

  const contentsVariants = {
    hidden: {
      opacity: 0,
      scale: 0.8,
      y: 20,
    },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 25,
        staggerChildren: 0.1,
      },
    },
  };

  const fileVariants = {
    hidden: {
      opacity: 0,
      x: -20,
      scale: 0.8,
    },
    visible: {
      opacity: 1,
      x: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 25,
      },
    },
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-black p-8">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-800 dark:text-gray-100 mb-2">Interactive Folder</h1>
        <p className="text-gray-600 dark:text-gray-300">Click to open, hover for preview</p>
      </div>

      <div className="relative perspective-1000">
        {/* Folder Container */}
        <motion.div
          ref={folderRef}
          className="relative cursor-pointer select-none"
          variants={folderVariants}
          initial="closed"
          animate={
            isOpen ? "open" : isHovered && !isOpen ? "hovered" : "closed"
          }
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onMouseMove={handleMouseMove}
          onClick={() => setIsOpen(!isOpen)}
          style={{
            transformStyle: "preserve-3d",
          }}
        >
          {/* Folder Shadow */}
          <div className="absolute inset-0 bg-black/20 blur-xl transform translate-y-8 scale-110 rounded-lg" />

          {/* Folder Tab */}
          <motion.div
            className="absolute -top-4 left-8 w-24 h-8 bg-gradient-to-b from-yellow-400 to-yellow-500 rounded-t-lg shadow-lg border-2 border-yellow-600"
            variants={tabVariants}
            style={{
              transformOrigin: "bottom center",
              transformStyle: "preserve-3d",
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-b from-yellow-300/50 to-transparent rounded-t-lg" />
          </motion.div>

          {/* Main Folder Body */}
          <div className="w-64 h-48 bg-gradient-to-b from-yellow-400 to-yellow-500 rounded-lg shadow-2xl border-2 border-yellow-600 overflow-hidden">
            {/* Folder Highlight */}
            <div className="absolute inset-0 bg-gradient-to-br from-yellow-300/60 via-transparent to-yellow-700/30 rounded-lg" />
            
            {/* Folder Label */}
            <div className="absolute bottom-4 left-4 right-4">
              <div className="bg-white/90 backdrop-blur-sm rounded px-3 py-1 shadow-sm">
                <span className="text-sm text-gray-700">My Documents</span>
              </div>
            </div>

            {/* Interactive Glow Effect */}
            {isHovered && (
              <motion.div
                className="absolute inset-0 bg-gradient-radial from-white/30 to-transparent rounded-lg pointer-events-none"
                style={{
                  background: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(255,255,255,0.3) 0%, transparent 50%)`,
                }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              />
            )}

            {/* Opening Animation Lines */}
            {isOpen && (
              <motion.div
                className="absolute inset-0 pointer-events-none"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                {[...Array(5)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute h-px bg-white/40"
                    style={{
                      top: `${20 + i * 20}%`,
                      left: "10%",
                      right: "10%",
                    }}
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{
                      delay: i * 0.1,
                      duration: 0.3,
                      ease: "easeOut",
                    }}
                  />
                ))}
              </motion.div>
            )}
          </div>

          {/* Folder Contents */}
          <AnimatePresence>
            {isOpen && (
              <motion.div
                className="absolute -right-80 top-0 w-72 bg-white dark:bg-gray-800 rounded-lg shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden"
                variants={contentsVariants}
                initial="hidden"
                animate="visible"
                exit="hidden"
                whileHover={{
                  rotateY: -15,
                  rotateX: 5,
                  scale: 1.02,
                }}
                transition={{
                  type: "spring",
                  stiffness: 300,
                  damping: 20,
                }}
                style={{
                  transformStyle: "preserve-3d",
                }}
              >
                {/* Contents Header */}
                <div className="bg-yellow-500 text-white p-4">
                  <h3 className="font-semibold text-lg">Folder Contents</h3>
                  <p className="text-blue-100 text-sm">{folderContents.length} items</p>
                </div>

                {/* File List */}
                <div className="p-4 space-y-3 max-h-80 overflow-y-auto">
                  {folderContents.map((file, index) => (
                    <motion.div
                      key={index}
                      className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/60 transition-colors cursor-pointer group"
                      variants={fileVariants}
                      whileHover={{
                        scale: 1.02,
                        backgroundColor: "rgba(59, 130, 246, 0.1)",
                      }}
                    >
                      <div className="text-2xl group-hover:scale-110 transition-transform">
                        {getFileIcon(file.type)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-gray-900 dark:text-gray-100 truncate">
                          {file.name}
                        </p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">{file.size}</p>
                      </div>
                      <motion.div
                        className="w-2 h-2 bg-green-400 rounded-full opacity-0 group-hover:opacity-100"
                        initial={{ scale: 0 }}
                        whileHover={{ scale: 1 }}
                        transition={{ type: "spring", stiffness: 500 }}
                      />
                    </motion.div>
                  ))}
                </div>

                {/* Contents Footer */}
                <div className="bg-gray-50 dark:bg-gray-800/70 px-4 py-3 border-t dark:border-gray-700">
                  <div className="flex justify-between items-center text-sm text-gray-600 dark:text-gray-300">
                    <span>Total: {folderContents.length} files</span>
                    <motion.button
                      className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 font-medium"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      View All
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Status Indicator */}
        <motion.div
          className="absolute -bottom-16 left-1/2 transform -translate-x-1/2"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <div className="flex items-center space-x-2 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-full px-4 py-2 shadow-lg">
            <motion.div
              className={`w-3 h-3 rounded-full ${
                isOpen ? "bg-green-400" : isHovered ? "bg-yellow-400" : "bg-gray-400"
              }`}
              animate={{
                scale: isOpen || isHovered ? [1, 1.2, 1] : 1,
              }}
              transition={{
                repeat: isOpen || isHovered ? Infinity : 0,
                duration: 1.5,
              }}
            />
            <span className="text-sm font-medium text-gray-700 dark:text-gray-200">
              {isOpen ? "Open" : isHovered ? "Hover" : "Closed"}
            </span>
          </div>
        </motion.div>
      </div>

      {/* Instructions */}
      <motion.div
        className="mt-16 text-center max-w-md"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
      >
        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-lg p-6 shadow-lg">
          <h3 className="font-semibold text-gray-800 dark:text-gray-100 mb-3">How to Interact</h3>
          <div className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
            <p>🖱️ <strong>Hover</strong> to preview with 3D tilt</p>
            <p>👆 <strong>Click</strong> to open and view contents</p>
            <p>✨ <strong>Move mouse</strong> for dynamic lighting</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default InteractiveFolder;
