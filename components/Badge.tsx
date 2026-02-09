interface Props {
    label: string;
  }
  
  export default function Badge({ label }: Props) {
    return (
      <span className="inline-block rounded-full border border-gold-500/40 px-4 py-1 text-xs tracking-widest text-gold-400">
        {label.toUpperCase()}
      </span>
    );
  }
  