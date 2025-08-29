"use client";

import DayPage from "@/components/DayPage";
import InputCard from "@/components/inputstack/inputcard";
import { useState, useRef } from "react";


export default function DayWisePage() {



  return (
    <DayPage dayNumber={5} title="Progressive Input stack">
      <div className="flex items-center justify-center w-full h-full ">
    <InputCard className="poppins-regular-italic" />
      </div>

    </DayPage>
  );
}
