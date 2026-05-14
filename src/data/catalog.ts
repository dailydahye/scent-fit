import type { Product } from '@/types';

// 카테고리별 ambient 이미지 (Unsplash, 상업 사용 가능)
// Body Wash → 물 / 비누 / 욕실
// Shampoo → 머리카락 / 실루엣
// Perfume → 향수병 / 미니멀 정물

const IMG = {
  // Clean & Crisp
  crispBody: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=900&q=80',
  crispHair: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=900&q=80',
  crispPerfume: 'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=900&q=80',
  // Warm Cotton
  cottonBody: 'https://images.unsplash.com/photo-1570194065650-d99fb4bedf0a?auto=format&fit=crop&w=900&q=80',
  cottonHair: 'https://images.unsplash.com/photo-1519415943484-9fa1873496d4?auto=format&fit=crop&w=900&q=80',
  cottonPerfume: 'https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&w=900&q=80',
  // Green Garden
  gardenBody: 'https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?auto=format&fit=crop&w=900&q=80',
  gardenHair: 'https://images.unsplash.com/photo-1519415387722-a1c3bbef716c?auto=format&fit=crop&w=900&q=80',
  gardenPerfume: 'https://images.unsplash.com/photo-1588405748880-12d1d2a59d75?auto=format&fit=crop&w=900&q=80',
  // Soft Powder
  powderBody: 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&w=900&q=80',
  powderHair: 'https://images.unsplash.com/photo-1492106087820-71f1a00d2b11?auto=format&fit=crop&w=900&q=80',
  powderPerfume: 'https://images.unsplash.com/photo-1523293182086-7651a899d37f?auto=format&fit=crop&w=900&q=80',
};

export const CATEGORIES = {
  'Clean & Crisp': {
    defaultDescription:
      '환기를 끝낸 방의 공기처럼 가볍고 정돈된 결입니다. 처음 만나는 사람에게도 부담 없는 단정한 인상을 만들어줍니다.',
    defaultRoutine: [
      '아침 샤워의 첫 단계로 시트러스 톤의 바디워시를 사용해보세요.',
      '머리를 말리는 동안 향이 머리카락에 옅게 머무릅니다.',
      '외출 직전, 손목 안쪽에 같은 결의 가벼운 향을 한 번.',
      '오후가 되면 자연스럽게 옅어지는 잔향이 단정함을 만듭니다.',
    ],
    defaultNoteAxes: [
      { label: 'Citrus', value: 82 },
      { label: 'Aqua', value: 74 },
      { label: 'Musk', value: 38 },
      { label: 'Woody', value: 30 },
      { label: 'Floral', value: 22 },
    ],
    bodywash: [
      { brand: 'Aesop', name: 'Geranium Leaf Body Cleanser', note: '제라늄 잎 · 만다린 · 소나무', image: IMG.crispBody },
      { brand: 'Grown Alchemist', name: 'Body Cleanser — Cocoa Butter, Geranium', note: '코코아 버터 · 제라늄 · 자몽', image: IMG.crispBody },
    ],
    shampoo: [
      { brand: 'Davines', name: 'Volu Shampoo', note: '베르가못 · 시트러스 · 화이트 머스크', image: IMG.crispHair },
      { brand: 'Sachajuan', name: 'Ocean Mist Shampoo', note: '솔트 · 시트러스 · 시더우드', image: IMG.crispHair },
    ],
    nextPerfume: [
      { brand: 'Jo Malone', name: 'Wood Sage & Sea Salt', note: '씨솔트 · 세이지 · 앰브레트', image: IMG.crispPerfume },
      { brand: 'Le Labo', name: 'Bergamote 22', note: '베르가못 · 자몽 · 페티그레인', image: IMG.crispPerfume },
    ],
  },
  'Warm Cotton': {
    defaultDescription:
      '햇살에 말린 면, 오래된 책의 종이처럼 따스하고 편안한 결입니다. 익숙하지만 잊히지 않는 인상을 만듭니다.',
    defaultRoutine: [
      '저녁 샤워 마지막 단계로 머스크 톤의 바디워시를 천천히 사용해보세요.',
      '머리카락이 마르는 동안 향이 자연스럽게 베어들어요.',
      '잠자기 한 시간 전, 손목과 옷깃에 한 번씩 머무는 향을 두세요.',
      '잔향이 다음 날 아침까지 옅게 이어집니다.',
    ],
    defaultNoteAxes: [
      { label: 'Musk', value: 78 },
      { label: 'Woody', value: 70 },
      { label: 'Powdery', value: 56 },
      { label: 'Floral', value: 34 },
      { label: 'Citrus', value: 24 },
    ],
    bodywash: [
      { brand: 'Aveda', name: 'Rosemary Mint Body Wash', note: '로즈마리 · 민트 · 시더', image: IMG.cottonBody },
      { brand: 'Christophe Robin', name: 'Hydrating Shower Cream', note: '알로에 · 머스크 · 우디', image: IMG.cottonBody },
    ],
    shampoo: [
      { brand: 'Oribe', name: 'Gold Lust Repair & Restore Shampoo', note: '버가못 · 일랑일랑 · 샌달우드', image: IMG.cottonHair },
      { brand: 'Davines', name: 'OI Shampoo', note: '오일 · 우디 · 머스크', image: IMG.cottonHair },
    ],
    nextPerfume: [
      { brand: 'Maison Margiela', name: 'REPLICA — Lazy Sunday Morning', note: '이리스 · 화이트 머스크 · 페어', image: IMG.cottonPerfume },
      { brand: 'Le Labo', name: 'Santal 33', note: '샌달우드 · 카다멈 · 가죽', image: IMG.cottonPerfume },
    ],
  },
  'Green Garden': {
    defaultDescription:
      '비 갠 뒤 잎사귀, 손끝에 묻은 풀처럼 신선하고 살아있는 결입니다. 자연스럽고 가까운 인상을 만듭니다.',
    defaultRoutine: [
      '아침 샤워 시 그린 톤의 바디워시로 시작해보세요.',
      '머리카락이 마르는 동안 풀잎 같은 잔향이 머무릅니다.',
      '외출 후 손목과 목 뒤에 같은 결의 향을 한 번.',
      '오후엔 자연스럽게 옅어져 부담스럽지 않습니다.',
    ],
    defaultNoteAxes: [
      { label: 'Green', value: 84 },
      { label: 'Herbal', value: 72 },
      { label: 'Citrus', value: 50 },
      { label: 'Woody', value: 40 },
      { label: 'Musk', value: 22 },
    ],
    bodywash: [
      { brand: 'Aesop', name: 'Geranium Leaf Body Cleanser', note: '제라늄 잎 · 만다린 · 소나무', image: IMG.gardenBody },
      { brand: 'Davines', name: 'Naturaltech Shampoo', note: '레몬 · 라벤더 · 페퍼민트', image: IMG.gardenBody },
    ],
    shampoo: [
      { brand: 'Aveda', name: 'Rosemary Mint Purifying Shampoo', note: '로즈마리 · 민트 · 유칼립투스', image: IMG.gardenHair },
      { brand: 'Davines', name: 'Dede Shampoo', note: '그린 티 · 캐모마일 · 베르가못', image: IMG.gardenHair },
    ],
    nextPerfume: [
      { brand: 'Diptyque', name: 'Philosykos', note: '무화과 잎 · 무화과 · 시더', image: IMG.gardenPerfume },
      { brand: 'Le Labo', name: 'Geranium 30', note: '제라늄 · 시트러스 · 머스크', image: IMG.gardenPerfume },
    ],
  },
  'Soft Powder': {
    defaultDescription:
      '갓 씻은 머리카락, 베개의 온기처럼 부드럽고 포근한 결입니다. 가까이 다가오는 사람에게만 보이는 친밀한 향입니다.',
    defaultRoutine: [
      '저녁 샤워의 마무리로 파우더리 톤의 바디워시를 사용해보세요.',
      '머리를 말린 뒤 베이스 향이 자연스럽게 깔립니다.',
      '잠자기 전, 옷깃과 베개 모서리에 같은 결의 향을.',
      '다음 날 아침까지 옅게 머무는 잔향.',
    ],
    defaultNoteAxes: [
      { label: 'Powdery', value: 82 },
      { label: 'Floral', value: 68 },
      { label: 'Musk', value: 60 },
      { label: 'Woody', value: 36 },
      { label: 'Citrus', value: 22 },
    ],
    bodywash: [
      { brand: 'Diptyque', name: 'Eau Rose Shower Gel', note: '로즈 · 시트러스 · 머스크', image: IMG.powderBody },
      { brand: 'Aesop', name: 'A Rose By Any Other Name', note: '로즈 · 베르가못 · 페티그레인', image: IMG.powderBody },
    ],
    shampoo: [
      { brand: 'Christophe Robin', name: 'Delicate Volumizing Shampoo', note: '로즈 · 화이트 머스크 · 파우더', image: IMG.powderHair },
      { brand: 'Oribe', name: 'Signature Shampoo', note: '베르가못 · 일랑일랑 · 머스크', image: IMG.powderHair },
    ],
    nextPerfume: [
      { brand: 'Byredo', name: 'Blanche', note: '핑크 페퍼 · 알데하이드 · 화이트 머스크', image: IMG.powderPerfume },
      { brand: 'Maison Margiela', name: 'REPLICA — Flower Market', note: '튜베로즈 · 자스민 · 프리지아', image: IMG.powderPerfume },
    ],
  },
} as const;

export type CategoryName = keyof typeof CATEGORIES;

export function pickProduct<T extends Product>(arr: readonly T[], seed: number): T {
  const idx = Math.abs(seed) % arr.length;
  return arr[idx];
}