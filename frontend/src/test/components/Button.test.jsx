import { render, screen, fireEvent } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import Button from '../../components/ui/Button'

describe('Button', () => {
  it('renders children', () => {
    render(<Button>Click me</Button>)
    expect(screen.getByText('Click me')).toBeInTheDocument()
  })

  it('handles click', () => {
    const onClick = vi.fn()
    render(<Button onClick={onClick}>Click</Button>)
    fireEvent.click(screen.getByText('Click'))
    expect(onClick).toHaveBeenCalledOnce()
  })

  it('is disabled when disabled prop is true', () => {
    render(<Button disabled>Disabled</Button>)
    expect(screen.getByText('Disabled')).toBeDisabled()
  })

  it('applies primary variant by default', () => {
    render(<Button>Primary</Button>)
    const btn = screen.getByText('Primary')
    expect(btn.className).toContain('bg-primary')
  })

  it('applies danger variant', () => {
    render(<Button variant="danger">Delete</Button>)
    const btn = screen.getByText('Delete')
    expect(btn.className).toContain('bg-red-600')
  })
})
