import { act, renderHook, waitFor } from "@testing-library/react";
import axios from "axios";
import { useProducts } from "./useProducts";
import { Product } from "@/models/Product";

const mockPush = jest.fn();
const mockUseSelector = jest.fn();
const mockAbort = jest.fn();

jest.mock("axios");

jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: mockPush,
  }),
}));

jest.mock("react-redux", () => ({
  useSelector: (selector: (state: unknown) => unknown) => mockUseSelector(selector),
}));

describe("useProducts", () => {
  const mockedAxios = axios as jest.Mocked<typeof axios>;
  const RealAbortController = global.AbortController;
  const mockConsoleLog = jest.spyOn(console, "log").mockImplementation(() => {});

  let authState: { isAuthenticated: boolean; accessToken: string };
  let mockSignal: { aborted: boolean };

  beforeEach(() => {
    authState = {
      isAuthenticated: true,
      accessToken: "token-123",
    };
    mockSignal = { aborted: false };

    mockPush.mockClear();
    mockAbort.mockClear();
    mockedAxios.get.mockReset();
    mockConsoleLog.mockClear();

    mockUseSelector.mockImplementation(
      (selector: (state: { auth: typeof authState }) => unknown) =>
        selector({ auth: authState })
    );

    global.AbortController = jest.fn(() => ({
      signal: mockSignal,
      abort: mockAbort,
    })) as unknown as typeof AbortController;
  });

  afterAll(() => {
    mockConsoleLog.mockRestore();
    global.AbortController = RealAbortController;
  });

  test("initializes with products as an empty array", () => {
    authState = {
      isAuthenticated: false,
      accessToken: "",
    };

    const { result } = renderHook(() => useProducts());

    expect(result.current.products).toEqual([]);
  });

  test("fetches products on mount when authenticated", async () => {
    mockedAxios.get.mockResolvedValue({
      data: [new Product(1, "Laptop", 1000, "Office laptop")],
    });

    renderHook(() => useProducts());

    await waitFor(() => {
      expect(mockedAxios.get).toHaveBeenCalledWith(
        "http://localhost:9000/secure_products",
        {
          signal: { aborted: false },
          headers: { Authorization: "Bearer token-123" },
        }
      );
    });
  });

  test("redirects to /login when unauthenticated", async () => {
    authState = {
      isAuthenticated: false,
      accessToken: "",
    };

    renderHook(() => useProducts());

    await waitFor(() => {
      expect(mockPush).toHaveBeenCalledWith("/login");
    });

    expect(mockedAxios.get).not.toHaveBeenCalled();
  });

  test("returns setProducts as a function", () => {
    const { result } = renderHook(() => useProducts());

    expect(typeof result.current.setProducts).toBe("function");
  });

  test("returns fetchProducts as a function", () => {
    const { result } = renderHook(() => useProducts());

    expect(typeof result.current.fetchProducts).toBe("function");
  });

  test("sets products after a successful fetch", async () => {
    const products = [
      new Product(1, "Laptop", 1000, "Office laptop"),
      new Product(2, "Mouse", 100, "Wireless mouse"),
    ];
    mockedAxios.get.mockResolvedValue({ data: products });

    const { result } = renderHook(() => useProducts());

    await waitFor(() => {
      expect(result.current.products).toEqual(products);
    });
  });

  test("sends authorization header when fetching products", async () => {
    mockedAxios.get.mockResolvedValue({ data: [] });

    renderHook(() => useProducts());

    await waitFor(() => {
      expect(mockedAxios.get).toHaveBeenCalledWith(
        "http://localhost:9000/secure_products",
        expect.objectContaining({
          headers: { Authorization: "Bearer token-123" },
        })
      );
    });
  });

  test("passes abort controller signal to axios.get", async () => {
    mockedAxios.get.mockResolvedValue({ data: [] });

    renderHook(() => useProducts());

    await waitFor(() => {
      expect(mockedAxios.get).toHaveBeenCalledWith(
        "http://localhost:9000/secure_products",
        expect.objectContaining({
          signal: mockSignal,
        })
      );
    });
  });

  test("logs the response after a successful fetch", async () => {
    const response = { data: [new Product(1, "Laptop", 1000, "Office laptop")] };
    mockedAxios.get.mockResolvedValue(response);

    renderHook(() => useProducts());

    await waitFor(() => {
      expect(mockConsoleLog).toHaveBeenCalledWith(response);
    });
  });

  test("logs the error and does not throw when fetch fails", async () => {
    const error = new Error("request failed");
    mockedAxios.get.mockRejectedValue(error);

    expect(() => renderHook(() => useProducts())).not.toThrow();

    await waitFor(() => {
      expect(mockConsoleLog).toHaveBeenCalledWith(error);
    });
  });

  test("allows fetchProducts to be called manually after mount", async () => {
    mockedAxios.get.mockResolvedValue({ data: [] });

    const { result } = renderHook(() => useProducts());

    await waitFor(() => {
      expect(mockedAxios.get).toHaveBeenCalledTimes(1);
    });

    await act(async () => {
      await result.current.fetchProducts();
    });

    expect(mockedAxios.get).toHaveBeenCalledTimes(2);
  });

  test("aborts the request on unmount", () => {
    mockedAxios.get.mockResolvedValue({ data: [] });

    const { unmount } = renderHook(() => useProducts());

    unmount();

    expect(mockAbort).toHaveBeenCalled();
  });
});
