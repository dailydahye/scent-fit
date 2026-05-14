import { Routes, Route } from 'react-router-dom';
import Home from '@/pages/Home';
import Quiz from '@/pages/Quiz';
import Result from '@/pages/Result';

export default function App() {
  return (
    <>
      {/* 전역 silk ambient — 모든 페이지 뒤에 흐름 */}
      <div className="silk-bg" aria-hidden />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/quiz" element={<Quiz />} />
        <Route path="/result" element={<Result />} />
      </Routes>
    </>
  );
}