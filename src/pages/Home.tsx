import { Link } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import Layout from '@/components/Layout';
import PrimaryButton from '@/components/PrimaryButton';
import MotionPage from '@/components/MotionPage';
import { fadeUp, stagger, EASE_OUT_SOFT } from '@/components/motion';

const IDENTITIES = [
  {
    name: 'Clean & Crisp',
    nameKo: '아침의 깨끗함',
    notes: 'CITRUS · AQUA · WHITE MUSK',
    quote: '환기를 끝낸 방의 공기, 셔츠의 단정한 결.',
    image: 'https://images.unsplash.com/photo-1615634260167-c8cdede054de?auto=format&fit=crop&w=900&q=80',
    tone: 'gradient-crisp',
  },
  {
    name: 'Warm Cotton',
    nameKo: '포근한 오후',
    notes: 'MUSK · CEDAR · VANILLA',
    quote: '햇살에 말린 면, 오래된 책의 종이.',
    image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=900&q=80',
    tone: 'gradient-cotton',
  },
  {
    name: 'Green Garden',
    nameKo: '산책길의 공기',
    notes: 'GREEN · HERB · PEPPERMINT',
    quote: '비 갠 뒤 잎사귀, 손끝에 묻은 풀.',
    image: 'https://images.unsplash.com/photo-1490750967868-88aa4486c946?auto=format&fit=crop&w=900&q=80',
    tone: 'gradient-garden',
  },
  {
    name: 'Soft Powder',
    nameKo: '잠들기 전 무드',
    notes: 'POWDER · IRIS · LAVENDER',
    quote: '갓 씻은 머리카락, 베개의 온기.',
    image: 'https://images.unsplash.com/photo-1519415943484-9fa1873496d4?auto=format&fit=crop&w=900&q=80',
    tone: 'gradient-powder',
  },
];

export default function Home() {
  const reduce = useReducedMotion();

  return (
    <MotionPage>
      <Layout>
        {/* ═══ HERO ═══ */}
        <section className="relative overflow-hidden">
          <div className="container-content grid items-center gap-12 py-20 sm:py-28 lg:grid-cols-[6fr_5fr] lg:gap-20 lg:py-36">
            <motion.div
              variants={stagger(0.14, 0.2)}
              initial={reduce ? false : 'hidden'}
              animate="show"
              className="space-y-8"
            >
              <motion.p variants={fadeUp} className="text-eyebrow">
                Personal Scent Diagnosis
              </motion.p>

              <motion.h1
                variants={fadeUp}
                className="font-ko text-[2.5rem] font-medium leading-[1.18] tracking-[-0.03em] text-ink-900 sm:text-[3rem] lg:text-[3.5rem]"
              >
                매일 쓰는 한 줌의 향이,
                <br />
                당신의 분위기가 됩니다.
              </motion.h1>

              <motion.div variants={fadeUp} className="space-y-2 pt-2">
                <p className="font-ko text-[14px] leading-[1.7] text-taupe-500">
                  향수가 아니어도 좋습니다.
                </p>
                <p className="font-ko text-[14px] leading-[1.7] text-taupe-500">
                  평소의 바디워시와 샴푸에서 출발해, 당신의 결에 맞는 향을 찾아드립니다.
                </p>
              </motion.div>

              <motion.div variants={fadeUp} className="flex items-center gap-6 pt-6">
                <Link to="/quiz">
                  <PrimaryButton size="lg">
                    진단을 시작합니다
                    <span aria-hidden className="ml-1 text-taupe-400">·</span>
                    <span className="font-display text-[11px] italic text-taupe-400">2 MIN</span>
                  </PrimaryButton>
                </Link>
                <a href="#about" className="font-ko text-[13px] text-taupe-500 underline-offset-4 hover:underline">
                  더 알아보기
                </a>
              </motion.div>
            </motion.div>

            {/* 오른쪽 — Hero 이미지 */}
            <motion.div
              initial={reduce ? false : { opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1.4, ease: EASE_OUT_SOFT, delay: 0.2 }}
              className="relative"
            >
              <div className="img-hero relative aspect-[4/5] w-full overflow-hidden" />
              <div className="absolute bottom-6 right-6 max-w-[200px] text-right">
                <p className="font-display text-[10px] uppercase tracking-wider-3 text-taupe-500">
                  Inspired By
                </p>
                <p className="font-display mt-1 text-[14px] italic text-ink-700">
                  the quiet between breaths.
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ═══ PHILOSOPHY ═══ */}
        <section id="about" className="border-t border-stone-100">
          <div className="container-content grid items-center gap-12 py-20 sm:py-28 lg:grid-cols-[5fr_6fr] lg:gap-20">
            <motion.div
              initial={reduce ? false : { opacity: 0, x: -16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 1.2, ease: EASE_OUT_SOFT }}
            >
              <div className="img-philosophy aspect-[4/5] w-full" />
            </motion.div>

            <motion.div
              initial={reduce ? false : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 1.2, ease: EASE_OUT_SOFT }}
              className="space-y-8"
            >
              <p className="text-eyebrow">Philosophy</p>
              <p className="font-display text-[1.875rem] italic leading-[1.3] text-ink-900 sm:text-[2.5rem]">
                A scent is not bought.
                <br />
                It is discovered, slowly,
                <br />
                in the everyday.
              </p>
              <p className="font-ko text-[14px] leading-[1.85] text-taupe-500">
                향은 사는 것이 아닙니다. 매일의 작은 결 안에서, 천천히 발견하는 것입니다.
                <br />
                Scent Fit은 당신의 일상을 읽고, 가장 자연스러운 향의 결을 안내합니다.
              </p>
            </motion.div>
          </div>
        </section>

        {/* ═══ THE PROCESS ═══ */}
        <section className="border-t border-stone-100">
          <div className="container-content py-20 sm:py-28">
            <motion.div
              initial={reduce ? false : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 1.2, ease: EASE_OUT_SOFT }}
              className="mb-14 max-w-xl space-y-4"
            >
              <p className="text-eyebrow">The Process</p>
              <h2 className="font-ko text-[1.75rem] font-medium leading-[1.3] tracking-[-0.03em] text-ink-900 sm:text-[2rem]">
                세 걸음의 진단
              </h2>
            </motion.div>

            <motion.div
              variants={stagger(0.12, 0.2)}
              initial={reduce ? false : 'hidden'}
              whileInView="show"
              viewport={{ once: true, amount: 0.2 }}
              className="grid gap-x-10 gap-y-10 sm:grid-cols-3"
            >
              {[
                { num: '01', title: '일상의 결을 묻습니다', desc: '샤워 시간, 좋아하는 분위기, 머무는 공간.' },
                { num: '02', title: '당신의 향 카테고리를 찾습니다', desc: '4가지 결 중 가장 가까운 하나.' },
                { num: '03', title: '바디워시 · 샴푸 · 다음 퍼퓸을 안내합니다', desc: '매일 쓰는 것에서 출발하는 자연스러운 흐름.' },
              ].map((step) => (
                <motion.div key={step.num} variants={fadeUp} className="space-y-4 border-t border-stone-200 pt-6">
                  <p className="font-display text-[1.5rem] italic text-taupe-400">{step.num}</p>
                  <h3 className="font-ko text-[16px] font-medium leading-[1.5] text-ink-900">
                    {step.title}
                  </h3>
                  <p className="font-ko text-[13px] leading-[1.8] text-taupe-500">
                    {step.desc}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ═══ FOUR SCENT IDENTITIES — 가로 4열 ═══ */}
        <section className="border-t border-stone-100">
          <div className="container-content py-20 sm:py-28">
            <motion.div
              initial={reduce ? false : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 1.2, ease: EASE_OUT_SOFT }}
              className="mb-12 max-w-xl space-y-4 sm:mb-16"
            >
              <p className="text-eyebrow">Four Scent Identities</p>
              <h2 className="font-ko text-[1.75rem] font-medium leading-[1.3] tracking-[-0.03em] text-ink-900 sm:text-[2rem]">
                네 가지 결
              </h2>
              <p className="font-ko pt-1 text-[13px] leading-[1.8] text-taupe-500">
                Scent Fit은 향을 사고파는 곳이 아닙니다. 당신이 머무는 결을 찾는 과정입니다.
              </p>
            </motion.div>

            {/* 가로 4열 그리드 — 모바일 2열 / 데스크탑 4열 */}
            <motion.div
              variants={stagger(0.1, 0.2)}
              initial={reduce ? false : 'hidden'}
              whileInView="show"
              viewport={{ once: true, amount: 0.15 }}
              className="grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-x-8"
            >
              {IDENTITIES.map((id) => (
                <motion.article key={id.name} variants={fadeUp} className="group space-y-4">
                  {/* 이미지 — 3:4 비율 */}
                  <div className="relative overflow-hidden bg-stone-50">
                    <div className="aspect-[3/4] w-full">
                      <img
                        src={id.image}
                        alt=""
                        loading="lazy"
                        className="h-full w-full object-cover grayscale-[20%] transition-all duration-700 ease-velvet group-hover:grayscale-0 group-hover:scale-[1.03]"
                      />
                    </div>
                    {/* 카테고리 톤 오버레이 */}
                    <div className={`${id.tone} pointer-events-none absolute inset-0 opacity-30 mix-blend-multiply`} aria-hidden />
                  </div>

                  {/* 텍스트 */}
                  <div className="space-y-2 pt-1">
                    <h3 className="font-display text-[1.375rem] leading-[1.15] text-ink-900">
                      {id.name}
                    </h3>
                    <p className="font-ko text-[12px] text-taupe-500">{id.nameKo}</p>
                    <p className="font-ko pt-1 text-[9.5px] uppercase tracking-wider-3 text-taupe-400">
                      {id.notes}
                    </p>
                    <p className="font-ko pt-2 text-[12px] leading-[1.7] text-taupe-500">
                      {id.quote}
                    </p>
                  </div>
                </motion.article>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ═══ CLOSING ═══ */}
        <section className="border-t border-stone-100">
          <div className="container-content py-24 sm:py-32">
            <motion.div
              initial={reduce ? false : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 1.2, ease: EASE_OUT_SOFT }}
              className="max-w-2xl space-y-8"
            >
              <p className="font-display text-[1.5rem] italic leading-[1.4] text-ink-700 sm:text-[1.875rem]">
                Begin with the everyday.
                <br />
                The scent will follow.
              </p>
              <p className="font-ko text-[14px] leading-[1.85] text-taupe-500">
                일상에서 시작하세요. 당신의 향이 자연스럽게 따라옵니다.
              </p>
              <div className="pt-2">
                <Link to="/quiz">
                  <PrimaryButton size="lg">
                    진단을 시작합니다
                    <span aria-hidden>→</span>
                  </PrimaryButton>
                </Link>
              </div>
            </motion.div>
          </div>
        </section>
      </Layout>
    </MotionPage>
  );
}