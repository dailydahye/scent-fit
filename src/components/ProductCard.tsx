import type { ProductKind } from '@/types';

interface Product {
  brand: string;
  name: string;
  note: string;
  image: string;
}

interface Props {
  product: Product;
  kind: ProductKind;
  reason?: string;
}

const KIND_LABEL: Record<ProductKind, { eyebrow: string; step: string }> = {
  bodywash: { eyebrow: 'Body Wash', step: '01' },
  shampoo: { eyebrow: 'Shampoo', step: '02' },
  next: { eyebrow: 'Next — Perfume', step: '03' },
};

function isKorean(s: string) {
  return /[\u3131-\uD79D]/.test(s);
}

export default function ProductCard({ product, kind, reason }: Props) {
  const meta = KIND_LABEL[kind];
  const noteList = product.note
    .split(/[·,]/)
    .map((s) => s.trim())
    .filter(Boolean);

  return (
    <article className="group relative flex h-full flex-col gap-5">
      {/* 이미지 영역 — 4:5 비율 */}
      <div className="relative overflow-hidden bg-stone-50">
        <div className="aspect-[4/5] w-full">
          <img
            src={product.image}
            alt=""
            loading="lazy"
            className="h-full w-full object-cover grayscale-[15%] transition-all duration-700 ease-velvet group-hover:grayscale-0 group-hover:scale-[1.02]"
          />
        </div>
        {/* Step 번호 좌상단 오버레이 */}
        <div className="absolute left-4 top-4">
          <span className="font-display text-[1.125rem] italic tabular-nums text-white drop-shadow-sm">
            {meta.step}
          </span>
        </div>
      </div>

      {/* 텍스트 영역 */}
      <div className="flex flex-1 flex-col gap-3">
        <p className="text-eyebrow">{meta.eyebrow}</p>

        <div className="space-y-1.5">
          <p className="font-ko text-[10.5px] uppercase tracking-wider-2 text-taupe-500">
            {product.brand}
          </p>
          <h3 className="font-display text-[1.375rem] leading-[1.15] text-ink-900 sm:text-[1.5rem]">
            {product.name}
          </h3>
        </div>

        {reason && (
          <p className="font-ko text-[12.5px] leading-[1.75] text-taupe-500">
            {reason}
          </p>
        )}

        {/* Notes */}
        <div className="mt-auto flex flex-wrap items-center gap-x-2.5 gap-y-1 pt-3">
          {noteList.map((note, idx) => (
            <span key={`${note}-${idx}`} className="flex items-center gap-x-2.5">
              <span
                className={
                  isKorean(note)
                    ? 'font-ko text-[10px] tracking-[0.04em] text-taupe-400'
                    : 'font-ko text-[9px] uppercase tracking-wider-3 text-taupe-400'
                }
              >
                {note}
              </span>
              {idx < noteList.length - 1 && (
                <span aria-hidden className="text-[8.5px] text-taupe-300">·</span>
              )}
            </span>
          ))}
        </div>
      </div>
    </article>
  );
}