interface AuthButtonProps {
  text: string;
  pending: boolean;
}

export function AuthButton({ text, pending }: AuthButtonProps) {
  return (
    <button
      disabled={pending}
      type="submit"
      className="w-full bg-blue-600 text-white font-semibold py-2 rounded-md hover:bg-blue-700 disabled:opacity-50"
    >
      {pending ? "Loading..." : text}
    </button>
  );
}
