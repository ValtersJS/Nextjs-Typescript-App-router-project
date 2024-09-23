export function header(headerLabels: Array<string>) {
  return (
    <>
      {Array(3)
        .fill(headerLabels)
        .flat()
        .map((label, index) => (
          <th
            key={index}
            scope="col"
            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
          >
            {label}
          </th>
        ))}
    </>
  );
}
