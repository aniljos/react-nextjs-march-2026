import { render, screen } from "@testing-library/react";
import '@testing-library/jest-dom';
import { CustomersPage } from "./page"

// Mock the global fetch function
beforeEach(() => {
    fetchMock.resetMocks();
});

test("render CustomerView", async () => {

    const mockCustomers = [
        { id: 1, name: 'Customer 1', location: "Mumbai" },
        { id: 2, name: 'Customer 2', location: "Bangalore" },
    ];
    fetchMock.mockResponseOnce(
        JSON.stringify(mockCustomers)
    );


   
    render(await CustomersPage({interval: 10}));

    const title = screen.getByText("Customers");
    expect(title).toBeInTheDocument();

    const text1 = screen.getByText("Customer 1");
    expect(text1).toBeInTheDocument();

    const text2 = screen.getByText("Bangalore");
    expect(text2).toBeInTheDocument();

})