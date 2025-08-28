"use client";
import React from 'react';
import { motion } from 'framer-motion';
import DayPage from '@/components/DayPage';
import Ctp from '@/components/cardtopage/ctp';
export default function DayWisePage() {
  return (
    <motion.div
      initial={{ scale: 0.95, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="h-full"
    >
      <DayPage dayNumber={3} title="Card to Page transition">
        <p>Design a transition that seamlessly blends from one page to another. You’re free to choose the form factor (web or mobile).</p>
        <Ctp />
      </DayPage>
    </motion.div>
  );
}
