import Counter from "./Counter";
import {render, screen, fireEvent} from '@testing-library/react';


test("mount counter", () => {

    render(<Counter count={5}/>)
    const text = screen.getByText("Count : 5");
    expect(text).toBeInTheDocument();

});

test("increment counter", () => {

    render(<Counter count={5}/>)
    const text = screen.getByText("Count : 5");
    expect(text).toBeInTheDocument();

    const incBtn = screen.getByText("++");
    fireEvent.click(incBtn);

    const updatedText = screen.getByText("Count : 6");
    expect(updatedText).toBeInTheDocument();

    const inputField = screen.getByPlaceholderText("Enter the new count");
    fireEvent.change(inputField,{target: {value: "100"}});
    
    
    const updateBtn = screen.getByText("Update Count");
    fireEvent.click(updateBtn);

    const updatedText2 = screen.getByText("Count : 100");
    expect(updatedText2).toBeInTheDocument();

});