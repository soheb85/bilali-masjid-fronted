import React from "react";
import {Progress} from "@heroui/progress";

export default function LoaderPage() {
  const [value, setValue] = React.useState(0);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setValue((v) => (v >= 100 ? 0 : v + 10));
    }, 500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className=" mt-2 mx-auto text-green-500">
      <Progress
      aria-label="Downloading..."
      className="max-w-md text-red-500 font-bold text-[25px] bg-slate-400/50 w-[100px] flex items-center rounded-lg tracking-wider"
      showValueLabel={true}
      value={value}
      minValue={50}
      color="success"
      
    
      
    />
    </div>
  );
}

