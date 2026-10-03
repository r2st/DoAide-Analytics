import { render, screen, fireEvent } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import ThemeToggle from '../../components/layout/ThemeToggle'

describe('ThemeToggle', () => {
  it('renders three mode buttons', () => {
    render(<ThemeToggle />)
    const buttons = screen.getAllByRole('button')
    expect(buttons).toHaveLength(3)
  })

  it('has light, system, and dark buttons', () => {
    render(<ThemeToggle />)
    expect(screen.getByTitle('light')).toBeInTheDocument()
    expect(screen.getByTitle('system')).toBeInTheDocument()
    expect(screen.getByTitle('dark')).toBeInTheDocument()
  })
})
