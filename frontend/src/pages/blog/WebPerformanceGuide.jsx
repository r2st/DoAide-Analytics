import { Link } from 'react-router-dom'
import { usePageTitle } from '../../hooks/usePageTitle'

export default function WebPerformanceGuide() {
  usePageTitle('Core Web Vitals — The Website Performance Metrics That Matter')
  return (
    <article className="leading-relaxed text-gray-900 dark:text-white">
      <Link to="/blog" className="text-sm text-primary no-underline">&larr; All articles</Link>
      <h1 className="text-2xl font-extrabold mt-4 mb-4">Core Web Vitals — The Website Performance Metrics That Matter</h1>
      <p className="text-gray-500 dark:text-gray-400">Google uses Core Web Vitals as a ranking factor. Here&apos;s what each metric measures and how to improve them.</p>

      <h2 className="text-lg font-bold mt-6">FCP — First Contentful Paint</h2>
      <p className="text-gray-500 dark:text-gray-400">FCP measures when the first text or image appears on screen. It tells users the page is loading.</p>
      <ul className="text-gray-500 dark:text-gray-400 pl-5 list-disc space-y-1">
        <li><strong>Good:</strong> under 1.8 seconds</li>
        <li><strong>Needs improvement:</strong> 1.8–3.0 seconds</li>
        <li><strong>Poor:</strong> over 3.0 seconds</li>
        <li><strong>Fix:</strong> reduce server response time, eliminate render-blocking resources</li>
      </ul>

      <h2 className="text-lg font-bold mt-6">LCP — Largest Contentful Paint</h2>
      <p className="text-gray-500 dark:text-gray-400">LCP measures when the largest visible element (hero image, headline) finishes rendering. It represents perceived load speed.</p>
      <ul className="text-gray-500 dark:text-gray-400 pl-5 list-disc space-y-1">
        <li><strong>Good:</strong> under 2.5 seconds</li>
        <li><strong>Needs improvement:</strong> 2.5–4.0 seconds</li>
        <li><strong>Poor:</strong> over 4.0 seconds</li>
        <li><strong>Fix:</strong> optimize images (WebP, lazy loading), preload hero assets, use a CDN</li>
      </ul>

      <h2 className="text-lg font-bold mt-6">CLS — Cumulative Layout Shift</h2>
      <p className="text-gray-500 dark:text-gray-400">CLS measures visual stability — how much content jumps around as the page loads. Users hate clicking a button only to have it move.</p>
      <ul className="text-gray-500 dark:text-gray-400 pl-5 list-disc space-y-1">
        <li><strong>Good:</strong> under 0.1</li>
        <li><strong>Needs improvement:</strong> 0.1–0.25</li>
        <li><strong>Poor:</strong> over 0.25</li>
        <li><strong>Fix:</strong> set explicit width/height on images and ads, avoid inserting content above the fold</li>
      </ul>

      <h2 className="text-lg font-bold mt-6">TTFB — Time to First Byte</h2>
      <p className="text-gray-500 dark:text-gray-400">TTFB measures server response time. A slow TTFB delays everything else. Target under 200ms for static pages, under 600ms for dynamic.</p>

      <h2 className="text-lg font-bold mt-6">Tools for Measurement</h2>
      <ul className="text-gray-500 dark:text-gray-400 pl-5 list-disc space-y-1">
        <li><strong>Google PageSpeed Insights</strong> — lab + field data in one report</li>
        <li><strong>Chrome DevTools Lighthouse</strong> — run audits locally during development</li>
        <li><strong>Google Search Console</strong> — Core Web Vitals report for your whole site</li>
        <li><strong>WebPageTest</strong> — filmstrip view and waterfall for deep analysis</li>
      </ul>

      <p className="text-gray-500 dark:text-gray-400 mt-4">Try our <Link to="/checker" className="text-primary">free website speed checker</Link> to get an instant performance estimate for any URL.</p>
    </article>
  )
}
