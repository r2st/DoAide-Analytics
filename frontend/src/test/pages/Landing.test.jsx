import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { describe, expect, it } from 'vitest'
import userEvent from '@testing-library/user-event'
import Landing from '../../pages/Landing'

function renderLanding() {
  return render(
    <BrowserRouter>
      <Landing />
    </BrowserRouter>
  )
}

describe('Landing', () => {
  it('renders hero heading', () => {
    renderLanding()
    expect(screen.getByText(/AI-Powered Analytics/)).toBeInTheDocument()
  })

  it('renders all 6 feature cards', () => {
    renderLanding()
    expect(screen.getByText('Dashboard Builder')).toBeInTheDocument()
    expect(screen.getByText('Data Connectors')).toBeInTheDocument()
    expect(screen.getByText('AI Insights')).toBeInTheDocument()
    expect(screen.getByText('Rich Visualizations')).toBeInTheDocument()
    expect(screen.getByText('Report Generation')).toBeInTheDocument()
    expect(screen.getByText('Scheduled Reports')).toBeInTheDocument()
  })

  it('renders how-it-works section', () => {
    renderLanding()
    expect(screen.getByText('How It Works')).toBeInTheDocument()
    expect(screen.getByText('Connect your data')).toBeInTheDocument()
    expect(screen.getByText('Build dashboards')).toBeInTheDocument()
    expect(screen.getByText('Get AI insights')).toBeInTheDocument()
  })

  it('renders pricing section with 3 tiers', () => {
    renderLanding()
    expect(screen.getByText('Simple, Transparent Pricing')).toBeInTheDocument()
    expect(screen.getByText('Free')).toBeInTheDocument()
    expect(screen.getByText('Pro')).toBeInTheDocument()
    expect(screen.getByText('Enterprise')).toBeInTheDocument()
  })

  it('renders testimonials', () => {
    renderLanding()
    expect(screen.getByText(/Rebecca T\./)).toBeInTheDocument()
    expect(screen.getByText(/Pradeep K\./)).toBeInTheDocument()
    expect(screen.getByText(/Sarah L\./)).toBeInTheDocument()
  })

  it('renders FAQ section with accordion', async () => {
    renderLanding()
    expect(screen.getByText('Frequently Asked Questions')).toBeInTheDocument()

    const user = userEvent.setup()
    const firstQ = screen.getByText('What data sources can I connect?')
    await user.click(firstQ)
    expect(screen.getByText(/CSV files/)).toBeInTheDocument()
  })

  it('renders CTA buttons', () => {
    renderLanding()
    const startButtons = screen.getAllByText('Start Free')
    expect(startButtons.length).toBeGreaterThan(0)
  })

  it('renders footer with DoAide products', () => {
    renderLanding()
    expect(screen.getByText('DoAide Products')).toBeInTheDocument()
    expect(screen.getByText('doaide.com')).toBeInTheDocument()
  })
})
