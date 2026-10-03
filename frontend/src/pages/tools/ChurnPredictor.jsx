import { useState } from 'react'
import ShareButtons from '../../components/ShareButtons'
import ToolsNav from '../../components/ToolsNav'
import { usePageTitle } from '../../hooks/usePageTitle'
import { track } from '../../lib/track'
import JsonLdTool from '../../components/JsonLdTool'

const QUESTIONS = [
  { id: 'usage', label: 'How often does the customer use your product?', options: [
    { value: 4, text: 'Daily' },
    { value: 3, text: 'Weekly' },
    { value: 2, text: 'Monthly' },
    { value: 1, text: 'Rarely' },
  ]},
  { id: 'support', label: 'Support tickets in the last 30 days?', options: [
    { value: 4, text: '0 tickets' },
    { value: 3, text: '1-2 tickets' },
    { value: 2, text: '3-5 tickets' },
    { value: 1, text: '6+ tickets' },
  ]},
  { id: 'nps', label: 'Latest NPS or satisfaction score?', options: [
    { value: 4, text: 'Promoter (9-10)' },
    { value: 3, text: 'Passive (7-8)' },
    { value: 2, text: 'Detractor (5-6)' },
    { value: 1, text: 'Very Unhappy (0-4)' },
  ]},
  { id: 'tenure', label: 'How long has the customer been subscribed?', options: [
    { value: 4, text: 'Over 12 months' },
    { value: 3, text: '6-12 months' },
    { value: 2, text: '3-6 months' },
    { value: 1, text: 'Under 3 months' },
  ]},
  { id: 'engagement', label: 'Feature adoption (% of features used)?', options: [
    { value: 4, text: 'Over 75%' },
    { value: 3, text: '50-75%' },
    { value: 2, text: '25-50%' },
    { value: 1, text: 'Under 25%' },
  ]},
]

function assessRisk(answers) {
  const total = Object.values(answers).reduce((sum, v) => sum + v, 0)
  const maxScore = QUESTIONS.length * 4
  const healthScore = Math.round((total / maxScore) * 100)
  let risk, color, recommendation
  if (healthScore >= 80) {
    risk = 'Low'
    color = 'text-green-500'
    recommendation = 'This customer is healthy. Focus on upselling and referrals.'
  } else if (healthScore >= 60) {
    risk = 'Medium'
    color = 'text-yellow-500'
    recommendation = 'Monitor closely. Schedule a check-in and offer onboarding resources.'
  } else if (healthScore >= 40) {
    risk = 'High'
    color = 'text-orange-500'
    recommendation = 'Intervention needed. Offer a success call and address pain points.'
  } else {
    risk = 'Critical'
    color = 'text-red-500'
    recommendation = 'Immediate action required. Executive outreach and retention offer recommended.'
  }
  return { healthScore, risk, color, recommendation }
}

export default function ChurnPredictor() {
  usePageTitle('Churn Risk Assessment — Predict Customer Churn')
  const [answers, setAnswers] = useState({})
  const [submitted, setSubmitted] = useState(false)

  const allAnswered = QUESTIONS.every((q) => answers[q.id] !== undefined)
  const result = submitted && allAnswered ? assessRisk(answers) : null

  const handleAnswer = (questionId, value) => {
    setAnswers((prev) => ({ ...prev, [questionId]: value }))
    setSubmitted(false)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (allAnswered) {
      setSubmitted(true)
      track('churn_predict', answers)
    }
  }

  const handleReset = () => {
    setAnswers({})
    setSubmitted(false)
  }

  return (
    <div className="min-h-screen bg-white dark:bg-surface-dark">
      <ToolsNav />
      <JsonLdTool name="Churn Risk Predictor" description="Assess customer churn risk with a quick quiz. Get a health score and actionable recommendations." url="https://insights.doaide.com/tools/churn-predictor" />
      <main className="max-w-2xl mx-auto px-4 py-8 flex flex-col gap-8">
        <div>
          <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white">Churn Risk Assessment</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">Answer 5 questions about a customer to assess their churn risk and get recommendations.</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white dark:bg-surface-dark-secondary border border-border dark:border-gray-800 rounded-xl p-6 flex flex-col gap-6">
          {QUESTIONS.map((q, qi) => (
            <fieldset key={q.id} className="flex flex-col gap-2">
              <legend className="text-sm font-medium text-gray-900 dark:text-white mb-1">{qi + 1}. {q.label}</legend>
              <div className="flex flex-col gap-1.5">
                {q.options.map((opt) => (
                  <label key={opt.value} className={`flex items-center gap-3 px-3 py-2 rounded-lg border cursor-pointer transition-colors ${answers[q.id] === opt.value ? 'border-primary bg-primary/5' : 'border-border dark:border-gray-700 hover:border-gray-400'}`}>
                    <input type="radio" name={q.id} value={opt.value} checked={answers[q.id] === opt.value} onChange={() => handleAnswer(q.id, opt.value)} className="accent-primary" />
                    <span className="text-sm text-gray-900 dark:text-white">{opt.text}</span>
                  </label>
                ))}
              </div>
            </fieldset>
          ))}

          <div className="flex gap-3">
            <button type="submit" disabled={!allAnswered} className="flex-1 px-4 py-2.5 bg-primary text-white rounded-lg font-semibold hover:bg-primary-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
              Assess Risk
            </button>
            <button type="button" onClick={handleReset} className="px-4 py-2.5 border border-border dark:border-gray-700 text-gray-500 rounded-lg font-semibold hover:text-gray-900 dark:hover:text-white transition-colors">
              Reset
            </button>
          </div>

          {result && (
            <div className="flex flex-col gap-3 pt-4 border-t border-border dark:border-gray-800" aria-live="polite">
              <div className="text-center">
                <div className={`text-5xl font-bold ${result.color}`}>{result.healthScore}</div>
                <div className="text-sm text-gray-500 mt-1">Health Score</div>
              </div>
              <div className="flex justify-between text-sm bg-primary/5 -mx-2 px-2 py-2 rounded-lg"><span className="text-gray-500">Churn Risk</span><span className={`font-bold text-lg ${result.color}`}>{result.risk}</span></div>
              <p className="text-sm text-gray-500 dark:text-gray-400">{result.recommendation}</p>
              <ShareButtons path="/tools/churn-predictor" text={`Customer health score: ${result.healthScore}/100 (${result.risk} risk) — assessed free on DoAide Analytics`} />
            </div>
          )}
        </form>

        <section className="leading-relaxed">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Understanding Churn Prediction</h2>
          <p className="text-gray-500 dark:text-gray-400 mb-3">Customer churn is the rate at which customers stop using your product. Predicting churn early lets you intervene before it happens — saving 5x what it costs to acquire a new customer.</p>
          <h3 className="text-base font-semibold text-gray-900 dark:text-white mt-4">Factors This Assessment Covers</h3>
          <ul className="text-gray-500 dark:text-gray-400 pl-5 list-disc space-y-1">
            <li><strong>Usage frequency</strong> — daily users rarely churn</li>
            <li><strong>Support load</strong> — excessive tickets signal frustration</li>
            <li><strong>Satisfaction</strong> — NPS is a leading indicator of retention</li>
            <li><strong>Tenure</strong> — new customers are most at risk</li>
            <li><strong>Feature adoption</strong> — deeper adoption means higher switching costs</li>
          </ul>
        </section>
      </main>
    </div>
  )
}
