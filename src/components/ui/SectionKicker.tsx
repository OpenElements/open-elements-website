export default function SectionKicker({
  className = '',
}: {
  className?: string;
}) {
  return (
    <span
      aria-hidden="true"
      className={`mb-6 block h-1 w-16 rounded-full bg-blue ${className}`}
    />
  );
}
