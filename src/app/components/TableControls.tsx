"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

interface TableControlsProps {
  totalColumns: number;
  initialColumns: number;
}

export default function TableControls({
  totalColumns,
  initialColumns,
}: TableControlsProps) {
  const [columnCount, setColumnCount] = useState(initialColumns);
  const router = useRouter();

  useEffect(() => {
    setColumnCount(initialColumns);
  }, [initialColumns]);

  const updateColumns = (newCount: number) => {
    setColumnCount(newCount);
    router.push(`?columns=${newCount}`);
  };

  // dont exceed total column count
  const incrementColumn = () => {
    updateColumns(Math.min(columnCount + 1, totalColumns));
  };
  // columns >= 1
  const decrementColumn = () => {
    updateColumns(Math.max(columnCount - 1, 1));
  };

  return (
    <div className="mb-6 mt-6 flex justify-center space-x-4">
      <button
        onClick={incrementColumn}
        className="px-6 py-3 bg-blue-400 text-white rounded-lg shadow hover:bg-blue-600 transition duration-200"
      >
        Add Column
      </button>
      <button
        onClick={decrementColumn}
        className="px-6 py-3 bg-red-400 text-white rounded-lg shadow hover:bg-red-600 transition duration-200"
      >
        Remove Column
      </button>
    </div>
  );
}
