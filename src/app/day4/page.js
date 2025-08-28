"use client";

import DayPage from "@/components/DayPage";
import InteractiveFolder from "@/components/InteractiveFolder";

export default function DayWisePage() {
  return (
    <DayPage dayNumber={4} title="Interactive Folder">
      <InteractiveFolder />
    </DayPage>
  );
}
