// Hidden from people, filled in by bots; the contact route drops any submission that sets it.
export default function Honeypot({
  id,
  value,
  onChange,
}: {
  id: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
      <label htmlFor={id}>Website</label>
      <input
        type="text"
        id={id}
        name="website"
        tabIndex={-1}
        autoComplete="off"
        value={value}
        onChange={onChange}
      />
    </div>
  );
}
