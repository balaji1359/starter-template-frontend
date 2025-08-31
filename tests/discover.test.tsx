import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { DiscoverPage } from '../app/discover/page'
import { useDiscover } from '../hooks/use-discover'

// Mock the discover hook
vi.mock('../hooks/use-discover')

describe('DiscoverPage', () => {
  const mockUseDiscover = vi.mocked(useDiscover)

  beforeEach(() => {
    mockUseDiscover.mockReturnValue({
      users: [],
      collections: [],
      graph: null,
      filters: {},
      isLoading: false,
      isLoadingUsers: false,
      isLoadingCollections: false,
      isLoadingGraph: false,
      error: null,
      loadDiscoverData: vi.fn(),
      loadUsers: vi.fn(),
      loadCollections: vi.fn(),
      loadGraph: vi.fn(),
      updateFilters: vi.fn(),
      clearFilters: vi.fn(),
      totalUsers: 0,
      totalCollections: 0,
      hasData: false,
    })
  })

  it('renders discover page with title', () => {
    render(<DiscoverPage />)
    expect(screen.getByText('Discover')).toBeInTheDocument()
  })

  it('shows loading state when data is loading', () => {
    mockUseDiscover.mockReturnValue({
      ...mockUseDiscover(),
      isLoading: true,
    })

    render(<DiscoverPage />)
    expect(screen.getByText('Discover')).toBeInTheDocument()
  })

  it('shows error when there is an error', () => {
    mockUseDiscover.mockReturnValue({
      ...mockUseDiscover(),
      error: 'Failed to load discover data',
    })

    render(<DiscoverPage />)
    expect(screen.getByText('Failed to load discover data')).toBeInTheDocument()
  })

  it('shows empty state when no data is available', () => {
    mockUseDiscover.mockReturnValue({
      ...mockUseDiscover(),
      hasData: false,
    })

    render(<DiscoverPage />)
    expect(screen.getByText('No discoverable content')).toBeInTheDocument()
  })
})

