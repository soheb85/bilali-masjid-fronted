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
      className="max-w-md"
      showValueLabel={true}
      size="lg"
      value={value}
      minValue={50}
      color="primary"
    
      
    />
    </div>
  );
}

