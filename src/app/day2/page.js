"use client";

import DayPage from "@/components/DayPage";
import { useState, useRef } from "react";



export default function Day2Page() {

  const correct = "123456";

  return (
    <DayPage dayNumber={2} title="interactive OTP Input">
    <p>Design an OTP input that clearly distinguishes default, active, correct, and incorrect states. Be creative with the interactions to enhance user feedback and make the verification process intuitive.</p>
    <div className="space-y-6">
      <div className="instrument-serif-regular p-6 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">

      </div>
      </div>
    </DayPage>
  );
}
