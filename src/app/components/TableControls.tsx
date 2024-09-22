// src/app/components/TableControls.tsx
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

  const incrementColumn = () => {
    updateColumns(Math.min(columnCount + 1, totalColumns));
  };

  const decrementColumn = () => {
    updateColumns(Math.max(columnCount - 1, 1));
  };

  return (
    <div className="mb-4">
      <button
        onClick={incrementColumn}
        className="px-4 py-2 bg-blue-500 text-white rounded mr-2 hover:bg-blue-600"
      >
        Add Column
      </button>
      <button
        onClick={decrementColumn}
        className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
      >
        Remove Column
      </button>
    </div>
  );
}
