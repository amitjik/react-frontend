import React from 'react';
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom'; // For routing context
import userEvent from '@testing-library/user-event';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import AddStation from './index'; // Import your component
import { notification } from 'antd';

// Create a mock adapter to mock Axios requests
const mockAxios = new MockAdapter(axios);

jest.mock('antd', () => ({
  notification: {
    error: jest.fn(),
    success: jest.fn(),
  },
}));

describe('AddStation Component', () => {
  beforeEach(() => {
    mockAxios.reset();
  });

  test('renders form and submits successfully', async () => {
    const mockStateData = [
      { state: 'Delhi', stateCode: 'DL' },
      { state: 'Mumbai', stateCode: 'MH' },
    ];

    // Mock the API call for state list and airport details
    mockAxios.onGet('https://fp-selfservice-finance-platform-core-dev.apps.arolab37nonprod.goindigo.in/api/state').reply(200, { data: { data: mockStateData } });
    mockAxios.onGet('https://fp-selfservice-finance-platform-core-dev.apps.arolab37nonprod.goindigo.in/api/airport/ABC').reply(200, {
      data: {
        data: {
          state: 'Domestic',
          location: 'Delhi',
          airportCode: 'ABC',
          gstinNofIndigo: 'AAAGC1234A1Z5',
          arnNumber: 'XYZ123',
          placeOfSupply: 'Delhi',
          stateCode: 'DL',
          address: '123 Airport Street, Delhi',
        },
      },
    });

    // Render component within Router for routing context
    render(
      <MemoryRouter initialEntries={['/pax-invoicing/add-airport-station/edit/ABC']}>
        <Routes>
          <Route path="/pax-invoicing/add-airport-station/edit/:airportCode" element={<AddStation />} />
        </Routes>
      </MemoryRouter>
    );

    // Wait for API data to be loaded
    await waitFor(() => expect(screen.getByLabelText('State name')).toBeInTheDocument());

    // Check if the form fields are populated with the fetched data
    expect(screen.getByDisplayValue('Delhi')).toBeInTheDocument();
    expect(screen.getByDisplayValue('AAAGC1234A1Z5')).toBeInTheDocument();
    expect(screen.getByDisplayValue('123 Airport Street, Delhi')).toBeInTheDocument();

    // Fill out the form
    userEvent.selectOptions(screen.getByLabelText('Flight Type'), screen.getByText('Domestic'));
    userEvent.selectOptions(screen.getByLabelText('State name'), screen.getByText('Delhi'));
    userEvent.type(screen.getByLabelText('IndiGo GST'), 'AAAGC1234A1Z5');
    userEvent.type(screen.getByLabelText('ANR'), 'XYZ123');
    userEvent.type(screen.getByLabelText('Location'), 'Delhi');
    userEvent.type(screen.getByLabelText('Airport code'), 'ABC');
    userEvent.type(screen.getByLabelText('Place of supply'), 'Delhi');
    userEvent.type(screen.getByLabelText('Address of airport'), '123 Airport Street, Delhi');
    userEvent.type(screen.getByLabelText('State code'), 'DL');

    // Submit the form
    userEvent.click(screen.getByText('Submit'));

    // Wait for the API call to complete
    await waitFor(() => {
      expect(mockAxios.history.put.length).toBe(1); // Ensure the PUT request was made
    });

    // Verify success notification was triggered
    expect(notification.error).toHaveBeenCalledWith({
      message: 'Record Update Successfully',
    });
  });

  test('shows error on API failure', async () => {
    mockAxios.onGet('https://fp-selfservice-finance-platform-core-dev.apps.arolab37nonprod.goindigo.in/api/state').reply(500);
    
    render(
      <MemoryRouter initialEntries={['/pax-invoicing/add-airport-station']}>
        <Routes>
          <Route path="/pax-invoicing/add-airport-station" element={<AddStation />} />
        </Routes>
      </MemoryRouter>
    );

    // Simulate form submission
    userEvent.click(screen.getByText('Submit'));

    // Wait for the error notification to appear
    await waitFor(() => expect(notification.error).toHaveBeenCalledWith({ message: 'Error Network' }));
  });

  test('validates required fields', async () => {
    render(
      <MemoryRouter initialEntries={['/pax-invoicing/add-airport-station']}>
        <Routes>
          <Route path="/pax-invoicing/add-airport-station" element={<AddStation />} />
        </Routes>
      </MemoryRouter>
    );

    // Submit the form without filling anything
    userEvent.click(screen.getByText('Submit'));

    // Wait for validation error messages to appear
    await waitFor(() => expect(screen.getByText('Please select flight type')).toBeInTheDocument());
    await waitFor(() => expect(screen.getByText('Please select state name')).toBeInTheDocument());
  });

  test('API call returns data and form is populated correctly', async () => {
    const mockResponse = {
      data: {
        data: {
          state: 'Domestic',
          location: 'Delhi',
          airportCode: 'XYZ',
          gstinNofIndigo: 'XYZGSTIN1234',
          arnNumber: 'ARN123',
          placeOfSupply: 'Delhi',
          stateCode: 'DL',
          address: 'Address of Airport',
        },
      },
    };

    mockAxios.onGet('https://fp-selfservice-finance-platform-core-dev.apps.arolab37nonprod.goindigo.in/api/airport/XYZ').reply(200, mockResponse);

    render(
      <MemoryRouter initialEntries={['/pax-invoicing/add-airport-station/edit/XYZ']}>
        <Routes>
          <Route path="/pax-invoicing/add-airport-station/edit/:airportCode" element={<AddStation />} />
        </Routes>
      </MemoryRouter>
    );

    await waitFor(() => expect(screen.getByLabelText('State name')).toBeInTheDocument());

    // Check if the form is populated with mock data
    expect(screen.getByDisplayValue('Delhi')).toBeInTheDocument();
    expect(screen.getByDisplayValue('XYZGSTIN1234')).toBeInTheDocument();
  });
});