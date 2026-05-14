import type { ReactNode } from 'react';

interface Props {
  id?: string;
  eyebrow?: string;
  title: string;
  description?: string;
  children: ReactNode;
  align?: 'left' | 'center';
}

export default function Section({
  id,
  eyebrow,
  title,
  description,
  children,
  align = 'left',
}: Props) {
  return (
    <section id={id} className="py-28 sm:py-36 lg:py-44">
      <div className="container-content">
        <header
          className={[
            'mb-16 max-w-xl space-y-5 sm:mb-24',
            align === 'center' ? 'mx-auto text-center' : '',
          ].join(' ')}
        >
          {eyebrow && <p className="text-eyebrow">{eyebrow}</p>}
          <h2 className="display-ko">{title}</h2>
          {description && <p className="lead max-w-lg">{description}</p>}
        </header>
        {children}
      </div>
    </section>
  );
}
