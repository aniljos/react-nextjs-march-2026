import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import ListProducts from "./page";
import { Product } from "@/models/Product";
import axios from "axios";

const mockUseTitle = jest.fn();
const mockPush = jest.fn();
const mockSetProducts = jest.fn();
const mockUseProducts = jest.fn();

jest.mock("axios");

jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: mockPush,
  }),
}));

jest.mock("@/hooks/useTitle", () => ({
  useTitle: (title: string) => mockUseTitle(title),
}));

jest.mock("@/hooks/useProducts", () => ({
  useProducts: () => mockUseProducts(),
}));

jest.mock("./ProductView", () => ({
  ProductView: ({
    product,
    onDelete,
    onEdit,
  }: {
    product: Product;
    onDelete: (product: Product) => void;
    onEdit: (product: Product) => void;
  }) => (
    <div data-testid="product-view">
      <span>{product.name}</span>
      <button onClick={() => onEdit(product)}>Edit {product.id}</button>
      <button onClick={() => onDelete(product)}>Delete {product.id}</button>
    </div>
  ),
}));

describe("ListProducts", () => {
  const mockedAxios = axios as jest.Mocked<typeof axios>;
  const products = [
    new Product(1, "Laptop", 1000, "Office laptop"),
    new Product(2, "Mouse", 100, "Wireless mouse"),
    new Product(3, "Keyboard", 200, "Mechanical keyboard"),
  ];

  beforeEach(() => {
    mockUseTitle.mockClear();
    mockPush.mockClear();
    mockSetProducts.mockClear();
    mockedAxios.delete.mockReset();
    mockUseProducts.mockReturnValue({
      products,
      setProducts: mockSetProducts,
    });
  });

  test("renders the page heading List Products", () => {
    render(<ListProducts />);

    expect(
      screen.getByRole("heading", { name: "List Products" })
    ).toBeInTheDocument();
  });

  test('calls useTitle with "List Products" on render', () => {
    render(<ListProducts />);

    expect(mockUseTitle).toHaveBeenCalledWith("List Products");
  });

  test("renders one ProductView per product returned by useProducts", () => {
    render(<ListProducts />);

    const productViews = screen.getAllByTestId("product-view");
    expect(productViews).toHaveLength(products.length);
  });

  test("toggles message visibility when clicking hide and show", () => {
    render(<ListProducts />);

    expect(
      screen.getByText("This is a page to demonstrate dat fetching")
    ).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: "Hide" }));
    expect(
      screen.queryByText("This is a page to demonstrate dat fetching")
    ).not.toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: "Show" }));
    expect(
      screen.getByText("This is a page to demonstrate dat fetching")
    ).toBeInTheDocument();
  });

  test("navigates to edit product page when edit is clicked", () => {
    render(<ListProducts />);

    fireEvent.click(screen.getByRole("button", { name: "Edit 2" }));

    expect(mockPush).toHaveBeenCalledWith("/products/2");
  });

  test("deletes product successfully and updates products list", async () => {
    mockedAxios.delete.mockResolvedValue({ data: {} });

    render(<ListProducts />);

    fireEvent.click(screen.getByRole("button", { name: "Delete 2" }));

    await waitFor(() => {
      expect(mockedAxios.delete).toHaveBeenCalledWith(
        "http://localhost:9000/products/2"
      );
    });

    expect(mockSetProducts).toHaveBeenCalledWith([
      products[0],
      products[2],
    ]);
  });
});
