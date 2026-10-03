import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import { afterEach, describe, expect, it, vi } from 'vitest'
import SampleSizeCalculator from '../../pages/tools/SampleSizeCalculator'

vi.mock('../../hooks/usePageTitle', () => ({ usePageTitle: () => {} }))
vi.mock('../../lib/track', () => ({ track: vi.fn() }))

function renderPage() {
  return render(
    <MemoryRouter initialEntries={['/tools/sample-size-calculator']}>
      <SampleSizeCalculator />
    </MemoryRouter>,
  )
}

describe('SampleSizeCalculator', () => {
  afterEach(() => vi.clearAllMocks())

  it('renders title', () => {
    renderPage()
    expect(screen.getByRole('heading', { name: /A\/B Test Sample Size Calculator/i })).toBeInTheDocument()
  })

  it('shows default values', () => {
    renderPage()
    expect(screen.getByLabelText(/Baseline Conversion Rate/i)).toHaveValue(5)
    expect(screen.getByLabelText(/Minimum Detectable Effect/i)).toHaveValue(20)
  })

  it('calculates results with defaults', () => {
    renderPage()
    expect(screen.getByText(/Per Variant/)).toBeInTheDocument()
    expect(screen.getByText(/Total \(both variants\)/)).toBeInTheDocument()
  })

  it('updates results when baseline changes', async () => {
    renderPage()
    const input = screen.getByLabelText(/Baseline Conversion Rate/i)
    await userEvent.clear(input)
    await userEvent.type(input, '10')
    expect(screen.getByText(/Per Variant/)).toBeInTheDocument()
  })

  it('includes JSON-LD schema', () => {
    renderPage()
    const scripts = document.querySelectorAll('script[type="application/ld+json"]')
    const found = Array.from(scripts).some((s) => s.textContent.includes('Sample Size Calculator'))
    expect(found).toBe(true)
  })
})
