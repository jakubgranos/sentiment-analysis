import { sentimentServiceAPI } from "@services/sentiment.service";
import { SentimentResult } from "@app/types/sentiment.types";
import { describe, it, expect, vi, beforeEach } from "vitest";

describe("sentimentServiceAPI", () => {
    beforeEach(() => {
        vi.restoreAllMocks();
    });

    it("should handle successful response with positive sentiment", async () => {
        const mockResponse: [SentimentResult[]] = [
            [
                { label: "POSITIVE", score: 0.9 },
                { label: "NEGATIVE", score: 0.1 },
            ],
        ];

        global.fetch = vi.fn(() =>
            Promise.resolve({
                ok: true,
                json: () => Promise.resolve(mockResponse),
            })
        ) as unknown as typeof fetch;

        const result = await sentimentServiceAPI("I love coding!");

        expect(result).toEqual({ label: "POSITIVE", score: 0.9 });
        expect(global.fetch).toHaveBeenCalledWith(
            expect.any(String),
            expect.objectContaining({
                method: "POST",
                headers: expect.objectContaining({
                    "Content-Type": "application/json",
                    Authorization: expect.stringContaining("Bearer "),
                }),
                body: JSON.stringify({ inputs: "I love coding!" }),
            })
        );
    });

    it("should handle successful response with negative sentiment", async () => {
        const mockResponse: [SentimentResult[]] = [
            [
                { label: "NEGATIVE", score: 0.8 },
                { label: "POSITIVE", score: 0.2 },
            ],
        ];

        global.fetch = vi.fn(() =>
            Promise.resolve({
                ok: true,
                json: () => Promise.resolve(mockResponse),
            })
        ) as unknown as typeof fetch;

        const result = await sentimentServiceAPI("I hate bugs!");
        expect(result).toEqual({ label: "NEGATIVE", score: 0.8 });
    });

    it("should handle API error response", async () => {
        const errorResponse = {
            error: "Model is currently loading",
            estimated_time: 20,
        };

        global.fetch = vi.fn(() =>
            Promise.resolve({
                ok: false,
                status: 503,
                json: () => Promise.resolve(errorResponse),
            })
        ) as unknown as typeof fetch;

        await expect(sentimentServiceAPI("test")).rejects.toThrow(
            "Failed to analyze text sentiment"
        );
    });

    it("should handle network error", async () => {
        global.fetch = vi.fn(() =>
            Promise.reject(new Error("Network error"))
        ) as unknown as typeof fetch;

        await expect(sentimentServiceAPI("test")).rejects.toThrow(
            "Failed to analyze text sentiment"
        );
    });

    it("should handle invalid response format", async () => {
        const invalidResponse = { unexpected: "format" };

        global.fetch = vi.fn(() =>
            Promise.resolve({
                ok: true,
                json: () => Promise.resolve(invalidResponse),
            })
        ) as unknown as typeof fetch;

        await expect(sentimentServiceAPI("test")).rejects.toThrow(
            "Failed to analyze text sentiment"
        );
    });

    it("should handle empty response", async () => {
        global.fetch = vi.fn(() =>
            Promise.resolve({
                ok: true,
                json: () => Promise.resolve([]),
            })
        ) as unknown as typeof fetch;

        await expect(sentimentServiceAPI("test")).rejects.toThrow(
            "Failed to analyze text sentiment"
        );
    });
});
