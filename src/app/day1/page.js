import DayPage from '@/components/DayPage';

export default function Day1Page() {
  return (
    <DayPage dayNumber={1} title="Avatar Stack">
      <div className="space-y-6">
        <div className=".instrument-serif-regular p-6 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
          <h3 className="text-xl font-semibold text-blue-800 dark:text-blue-200 mb-3">
            🚀 Day 1 Challenge
          </h3>
          <p className="text-blue-700 dark:text-blue-300">
            day 1 challenege was done on codepen. you can check it out
            <a href="https://codepen.io/amanbind/pen/ExgqQjv" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 underline hover:text-blue-800 dark:hover:text-blue-200"> here </a>
          </p>
        </div>
     
      </div>
    </DayPage>
  );
}