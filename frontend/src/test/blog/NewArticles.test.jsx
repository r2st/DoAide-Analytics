import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, it, vi } from 'vitest'
import AiAnalyticsTransforms from '../../pages/blog/AiAnalyticsTransforms'
import SaasKpis from '../../pages/blog/SaasKpis'
import PredictiveAnalyticsGuide from '../../pages/blog/PredictiveAnalyticsGuide'

vi.mock('../../hooks/usePageTitle', () => ({ usePageTitle: () => {} }))
vi.mock('../../lib/track', () => ({ track: vi.fn() }))

function renderArticle(Component) {
  return render(
    <MemoryRouter>
      <Component />
    </MemoryRouter>,
  )
}

describe('AiAnalyticsTransforms', () => {
  it('renders title', () => {
    renderArticle(AiAnalyticsTransforms)
    expect(screen.getByRole('heading', { level: 1, name: /AI Analytics Transforms/i })).toBeInTheDocument()
  })

  it('has a back link to blog', () => {
    renderArticle(AiAnalyticsTransforms)
    expect(screen.getByText(/All articles/)).toHaveAttribute('href', '/blog')
  })
})

describe('SaasKpis', () => {
  it('renders title', () => {
    renderArticle(SaasKpis)
    expect(screen.getByRole('heading', { level: 1, name: /5 KPIs/i })).toBeInTheDocument()
  })

  it('lists all 5 KPIs', () => {
    renderArticle(SaasKpis)
    expect(screen.getByText(/Monthly Recurring Revenue/)).toBeInTheDocument()
    expect(screen.getByText(/Churn Rate/)).toBeInTheDocument()
    expect(screen.getByText(/Customer Acquisition Cost/)).toBeInTheDocument()
    expect(screen.getByText(/LTV:CAC Ratio/)).toBeInTheDocument()
    expect(screen.getByText(/Net Revenue Retention/)).toBeInTheDocument()
  })
})

describe('PredictiveAnalyticsGuide', () => {
  it('renders title', () => {
    renderArticle(PredictiveAnalyticsGuide)
    expect(screen.getByRole('heading', { level: 1, name: /Predictive Analytics/i })).toBeInTheDocument()
  })

  it('includes share buttons', () => {
    renderArticle(PredictiveAnalyticsGuide)
    expect(screen.getByLabelText('Share on WhatsApp')).toBeInTheDocument()
    expect(screen.getByLabelText('Share on Twitter')).toBeInTheDocument()
  })
})
