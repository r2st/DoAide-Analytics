import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import { afterEach, describe, expect, it, vi } from 'vitest'
import ChurnPredictor from '../../pages/tools/ChurnPredictor'

vi.mock('../../hooks/usePageTitle', () => ({ usePageTitle: () => {} }))
vi.mock('../../lib/track', () => ({ track: vi.fn() }))

function renderPage() {
  return render(
    <MemoryRouter initialEntries={['/tools/churn-predictor']}>
      <ChurnPredictor />
    </MemoryRouter>,
  )
}

describe('ChurnPredictor', () => {
  afterEach(() => vi.clearAllMocks())

  it('renders title', () => {
    renderPage()
    expect(screen.getByRole('heading', { name: /Churn Risk Assessment/i })).toBeInTheDocument()
  })

  it('renders all 5 questions', () => {
    renderPage()
    const fieldsets = screen.getAllByRole('group')
    expect(fieldsets).toHaveLength(5)
  })

  it('has disabled assess button initially', () => {
    renderPage()
    expect(screen.getByText('Assess Risk')).toBeDisabled()
  })

  it('shows result after answering all questions and submitting', async () => {
    renderPage()
    const radios = screen.getAllByRole('radio')
    for (let i = 0; i < 5; i++) {
      await userEvent.click(radios[i * 4])
    }
    await userEvent.click(screen.getByText('Assess Risk'))
    expect(screen.getByText('Health Score')).toBeInTheDocument()
  })

  it('resets when reset button is clicked', async () => {
    renderPage()
    const radios = screen.getAllByRole('radio')
    await userEvent.click(radios[0])
    await userEvent.click(screen.getByText('Reset'))
    expect(radios[0]).not.toBeChecked()
  })

  it('includes JSON-LD schema', () => {
    renderPage()
    const scripts = document.querySelectorAll('script[type="application/ld+json"]')
    const found = Array.from(scripts).some((s) => s.textContent.includes('Churn Risk'))
    expect(found).toBe(true)
  })
})
