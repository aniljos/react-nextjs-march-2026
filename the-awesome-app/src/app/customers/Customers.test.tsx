import { CustomerPage } from "./page";
import {render, screen} from '@testing-library/react';

// Mock the global fetch function
beforeEach(() => {
    fetchMock.resetMocks();
});


test("render customers", async () => {

    const mockCustomers = [
        { id: 1, name: 'Customer 1', location: "Mumbai" },
        { id: 2, name: 'Customer 2', location: "Bangalore" },
    ];
    fetchMock.mockResponseOnce(
        JSON.stringify(mockCustomers)
    );
    render(await CustomerPage({timeout: 1000}));

    const customer1 = screen.getByText("Customer 1");
    expect(customer1).toBeInTheDocument();




})