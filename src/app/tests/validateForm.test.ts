import { renderHook, act } from "@testing-library/react";
import { useForm } from "../hooks/form/useForm";
import { describe, it, expect } from "vitest";
import { ChangeEvent } from "react";

describe("validateForm", () => {
    const defaultProps = {
        text: "this is a test",
        maxLength: 500,
        errorIfEmpty: "Text is required",
        errorIfTooLong: "Text is too long",
    };

    it("should validate empty text correctly", () => {
        const { result } = renderHook(() => useForm(defaultProps));

        let isValid = false;
        act(() => {
            isValid = result.current.validateForm();
        });

        console.log("Error:", result.current.error);

        expect(isValid).toBe(false);
        expect(result.current.error).toBe(defaultProps.errorIfEmpty);
    });

    it("should validate text exceeding length limit", () => {
        const { result } = renderHook(() => useForm(defaultProps));

        act(() => {
            result.current.handleTextChange({
                target: {
                    value: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed a ullamcorper tortor, in elementum purus. Proin elit metus, maximus ut maximus posuere, fermentum id nisl. Nunc vel nisi ac nunc lacinia vehicula a sed sapien. Fusce dapibus leo in sapien lobortis, aliquet facilisis lorem maximus. Donec venenatis condimentum diam, at maximus ex sodales quis. Curabitur pharetra mauris a blandit posuere. Sed eu tempus lacus, nec placerat enim. Sed sit amet tortor lectus. Donec accumsan lectus eget laoreet scelerisque. Vivamus fermentum nulla eget metus lobortis, a porta dui posuere.",
                },
            } as unknown as ChangeEvent<HTMLTextAreaElement>);
        });

        let isValid = false;
        act(() => {
            isValid = result.current.validateForm();
        });

        console.log("Text Length:", result.current.text.length);
        console.log("Max Length:", defaultProps.maxLength);
        console.log("Error:", result.current.error);

        expect(isValid).toBe(false);
        expect(result.current.error).toBe(defaultProps.errorIfTooLong);
        expect(result.current.text.length).toBeGreaterThan(
            defaultProps.maxLength
        );
    });

    it("should validate correct text successfully", () => {
        const { result } = renderHook(() => useForm(defaultProps));

        act(() => {
            result.current.handleTextChange({
                target: { value: "this is a test" },
            } as unknown as ChangeEvent<HTMLTextAreaElement>);
        });

        let isValid = false;
        act(() => {
            isValid = result.current.validateForm();
        });

        console.log("Text:", result.current.text);
        console.log("Error:", result.current.error);

        expect(isValid).toBe(true);
        expect(result.current.error).toBeNull();
        expect(result.current.text).toBe("this is a test");
    });

    it("should clear error when valid text is entered", () => {
        const { result } = renderHook(() => useForm(defaultProps));

        act(() => {
            result.current.setError("Some error");
        });

        console.log("Test: Clear Error - Before");
        console.log("Error:", result.current.error);

        expect(result.current.error).toBe("Some error");

        act(() => {
            const event = {
                target: { value: "12345" },
            } as ChangeEvent<HTMLTextAreaElement>;
            result.current.handleTextChange(event);
        });

        console.log("Test: Clear Error - After");
        console.log("Error:", result.current.error);

        expect(result.current.error).toBeNull();
    });
});
