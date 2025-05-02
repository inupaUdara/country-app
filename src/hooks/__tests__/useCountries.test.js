// src/hooks/__tests__/useCountries.test.js
import { renderHook, act } from '@testing-library/react';
import { useCountries } from '../useCountries';
import { getCountries, getCountryByName, getCountriesByRegion } from '../../services/api';

// Mock the API module
jest.mock('../../services/api');

describe('useCountries', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('fetches all countries initially', async () => {
    const mockCountries = [{ name: { common: 'Test Country' } }];
    getCountries.mockResolvedValue(mockCountries);

    const { result, waitForNextUpdate } = renderHook(() => useCountries());

    expect(result.current.loading).toBe(true);
    await waitForNextUpdate();
    expect(result.current.loading).toBe(false);
    expect(result.current.countries).toEqual(mockCountries);
  });

  it('handles search functionality', async () => {
    const mockSearchResults = [{ name: { common: 'Searched Country' } }];
    getCountryByName.mockResolvedValue(mockSearchResults);

    const { result } = renderHook(() => useCountries());

    await act(async () => {
      await result.current.searchCountries('test');
    });

    expect(result.current.countries).toEqual(mockSearchResults);
  });

  it('handles region filter functionality', async () => {
    const mockRegionResults = [{ name: { common: 'Region Country' } }];
    getCountriesByRegion.mockResolvedValue(mockRegionResults);

    const { result } = renderHook(() => useCountries());

    await act(async () => {
      await result.current.filterByRegion('Europe');
    });

    expect(result.current.countries).toEqual(mockRegionResults);
  });

  it('handles errors during country fetch', async () => {
    getCountries.mockRejectedValue(new Error('Network error'));

    const { result, waitForNextUpdate } = renderHook(() => useCountries());

    expect(result.current.loading).toBe(true);
    await waitForNextUpdate();
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBe('Network error');
  });
});