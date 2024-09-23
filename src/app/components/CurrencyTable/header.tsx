interface headerLogicProps {
  labels: Array<string>;
}

export function HeaderLogic({ labels }: headerLogicProps) {
  return (
    <>
      {Array(3)
        .fill(labels)
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
