import React from 'react';
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom'; // For routing context
import userEvent from '@testing-library/user-event';
import AddAirportStation from './index'; // Import your component
import api from '../../../axios'; // Axios instance
import MockAdapter from 'axios-mock-adapter'; // For mocking API requests
import { notification } from 'antd';

// Create a mock adapter to mock Axios requests
const mockAxios = new MockAdapter(api);

jest.mock('antd', () => ({
  notification: {
    error: jest.fn(),
    success: jest.fn(),
  },
}));

describe('AddAirportStation Component', () => {
  beforeEach(() => {
    mockAxios.reset();
  });

  test('renders and displays loader when data is loading', async () => {
    // Mock API request to simulate loading state
    mockAxios.onGet('https://fp-selfservice-finance-platform-core-dev.apps.arolab37nonprod.goindigo.in/api/airport').reply(200, { data: [] });

    // Render component
    render(
      <MemoryRouter>
        <AddAirportStation />
      </MemoryRouter>
    );

    // Check if the loader is visible
    expect(screen.getByText('Loading...')).toBeInTheDocument(); // Assuming the Loader component has this text

    // Simulate API response delay
    await waitFor(() => expect(screen.queryByText('Loading...')).not.toBeInTheDocument()); // Loader disappears after data is loaded
  });

  test('fetches and displays airport data with pagination', async () => {
    const mockData = Array.from({ length: 50 }, (_, i) => ({
      state: `State ${i + 1}`,
      location: `Location ${i + 1}`,
      address: `Address ${i + 1}`,
      airportCode: `Code${i + 1}`,
      gstinNofIndigo: `GST${i + 1}`,
    }));

    // Mock the API to return the mock data
    mockAxios.onGet('https://fp-selfservice-finance-platform-core-dev.apps.arolab37nonprod.goindigo.in/api/airport').reply(200, { data: mockData });

    // Render component
    render(
      <MemoryRouter>
        <AddAirportStation />
      </MemoryRouter>
    );

    // Wait for the API data to be loaded and rendered
    await waitFor(() => screen.getByText('State 1'));

    // Check if the first page of data is displayed
    expect(screen.getByText('State 1')).toBeInTheDocument();
    expect(screen.getByText('Location 1')).toBeInTheDocument();

    // Check if pagination is present
    expect(screen.getByRole('pagination')).toBeInTheDocument();
    expect(screen.getByText('Total 50 items')).toBeInTheDocument();

    // Click next page and verify the data changes
    userEvent.click(screen.getByText('2'));
    await waitFor(() => screen.getByText('State 11'));

    expect(screen.getByText('State 11')).toBeInTheDocument();
  });

  test('handles API error gracefully and shows error notification', async () => {
    // Simulate API failure
    mockAxios.onGet('https://fp-selfservice-finance-platform-core-dev.apps.arolab37nonprod.goindigo.in/api/airport').reply(500);

    // Render component
    render(
      <MemoryRouter>
        <AddAirportStation />
      </MemoryRouter>
    );

    // Wait for the error notification to be triggered
    await waitFor(() => expect(notification.error).toHaveBeenCalledWith({ message: 'Error Network' }));
  });

  test('clicking the "Add Airport" button navigates to the add airport page', async () => {
    // Mock the API response to return some data
    mockAxios.onGet('https://fp-selfservice-finance-platform-core-dev.apps.arolab37nonprod.goindigo.in/api/airport').reply(200, { data: [] });

    // Render the component
    render(
      <MemoryRouter initialEntries={['/pax-invoicing/add-airport-station']}>
        <AddAirportStation />
      </MemoryRouter>
    );

    // Simulate clicking the "Add Airport" button
    userEvent.click(screen.getByText(/Add Airport/i));

    // Check if the navigation occurred
    expect(window.location.pathname).toBe('/pax-invoicing/add-airport-station/add');
  });

  test('displays items in list view and app view toggle', async () => {
    const mockData = [
      { state: 'State 1', location: 'Location 1', address: 'Address 1', airportCode: 'Code1', gstinNofIndigo: 'GST1' },
      { state: 'State 2', location: 'Location 2', address: 'Address 2', airportCode: 'Code2', gstinNofIndigo: 'GST2' },
    ];

    // Mock the API response with some mock data
    mockAxios.onGet('https://fp-selfservice-finance-platform-core-dev.apps.arolab37nonprod.goindigo.in/api/airport').reply(200, { data: mockData });

    // Render the component
    render(
      <MemoryRouter>
        <AddAirportStation />
      </MemoryRouter>
    );

    // Wait for the data to load
    await waitFor(() => screen.getByText('State 1'));

    // Check for list view
    expect(screen.getByText('State 1')).toBeInTheDocument();
    expect(screen.getByText('Location 1')).toBeInTheDocument();

    // Toggle to app view
    userEvent.click(screen.getByLabelText('app'));

    // Check if the app view changes
    expect(screen.getByText('State 1')).toBeInTheDocument();
  });

  test('pagination size changer works correctly', async () => {
    const mockData = Array.from({ length: 50 }, (_, i) => ({
      state: `State ${i + 1}`,
      location: `Location ${i + 1}`,
      address: `Address ${i + 1}`,
      airportCode: `Code${i + 1}`,
      gstinNofIndigo: `GST${i + 1}`,
    }));

    // Mock the API to return mock data
    mockAxios.onGet('https://fp-selfservice-finance-platform-core-dev.apps.arolab37nonprod.goindigo.in/api/airport').reply(200, { data: mockData });

    // Render component
    render(
      <MemoryRouter>
        <AddAirportStation />
      </MemoryRouter>
    );

    // Wait for the data to be loaded
    await waitFor(() => screen.getByText('State 1'));

    // Check if the initial page size is set to 10
    expect(screen.getByText('Total 50 items')).toBeInTheDocument();

    // Change the page size to 20
    userEvent.click(screen.getByText('10'));
    userEvent.click(screen.getByText('20'));

    // Verify if the page size has changed
    expect(screen.getByText('Total 50 items')).toBeInTheDocument();
  });
});