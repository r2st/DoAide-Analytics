import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { describe, expect, it } from 'vitest'
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

  it('renders feature cards', () => {
    renderLanding()
    expect(screen.getByText('Dashboard Builder')).toBeInTheDocument()
    expect(screen.getByText('AI Insights')).toBeInTheDocument()
    expect(screen.getByText('Data Connectors')).toBeInTheDocument()
  })

  it('renders pricing section', () => {
    renderLanding()
    expect(screen.getByText('Simple, transparent pricing')).toBeInTheDocument()
    expect(screen.getByText('Free')).toBeInTheDocument()
    expect(screen.getByText('Pro')).toBeInTheDocument()
    expect(screen.getByText('Enterprise')).toBeInTheDocument()
  })

  it('renders CTA buttons', () => {
    renderLanding()
    expect(screen.getByText('Start Free')).toBeInTheDocument()
  })
})
