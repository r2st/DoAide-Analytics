import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import { afterEach, describe, expect, it, vi } from 'vitest'
import RoiCalculator from '../../pages/tools/RoiCalculator'

vi.mock('../../hooks/usePageTitle', () => ({ usePageTitle: () => {} }))
vi.mock('../../lib/track', () => ({ track: vi.fn() }))

function renderPage() {
  return render(
    <MemoryRouter initialEntries={['/tools/roi-calculator']}>
      <RoiCalculator />
    </MemoryRouter>,
  )
}

describe('RoiCalculator', () => {
  afterEach(() => vi.clearAllMocks())

  it('renders title', () => {
    renderPage()
    expect(screen.getByRole('heading', { name: /Analytics ROI Calculator/i })).toBeInTheDocument()
  })

  it('renders all input fields', () => {
    renderPage()
    expect(screen.getByLabelText(/Monthly Analytics Tool Cost/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/Hours Saved Per Week/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/Hourly Rate/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/Time Period/i)).toBeInTheDocument()
  })

  it('shows results when valid inputs are provided', async () => {
    renderPage()
    await userEvent.type(screen.getByLabelText(/Monthly Analytics Tool Cost/i), '100')
    await userEvent.type(screen.getByLabelText(/Hours Saved Per Week/i), '10')
    await userEvent.type(screen.getByLabelText(/Hourly Rate/i), '50')
    expect(screen.getByText(/Monthly Savings/)).toBeInTheDocument()
    expect(screen.getByText(/Payback Period/)).toBeInTheDocument()
    expect(screen.getByText(/Net Gain/)).toBeInTheDocument()
  })

  it('does not show results with empty inputs', () => {
    renderPage()
    expect(screen.queryByText(/Payback Period/)).not.toBeInTheDocument()
  })

  it('includes JSON-LD schema', () => {
    renderPage()
    const scripts = document.querySelectorAll('script[type="application/ld+json"]')
    const found = Array.from(scripts).some((s) => s.textContent.includes('Analytics ROI Calculator'))
    expect(found).toBe(true)
  })
})
