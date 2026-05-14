interface Props {
  category: string;
  subtitle: string;
  description: string;
}

export default function ResultHeader({ category, subtitle, description }: Props) {
  return (
    <div className="space-y-4">
      <p className="text-eyebrow">Your Scent Type</p>
      <h1 className="font-serif text-3xl leading-tight text-charcoal-900 sm:text-4xl lg:text-5xl">
        {category}
        <span className="mt-2 block font-sans text-base font-normal tracking-normal text-charcoal-700">
          — {subtitle}
        </span>
      </h1>
      <p className="text-base leading-relaxed text-charcoal-700 sm:text-[17px]">
        {description}
      </p>
    </div>
  );
}