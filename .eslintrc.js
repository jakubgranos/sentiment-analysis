module.exports = {
    root: true,
    extends: [
        "eslint:recommended",
        "plugin:@typescript-eslint/recommended",
        "plugin:react/recommended",
        "plugin:react-hooks/recommended",
        "prettier",
    ],
    parser: "@typescript-eslint/parser",
    plugins: ["@typescript-eslint", "react", "react-hooks", "prettier"],
    rules: {
        "prettier/prettier": "error",
        "react/react-in-jsx-scope": "off",
        "@typescript-eslint/explicit-function-return-type": "off",
        "@typescript-eslint/no-explicit-any": "error",
        "no-console": ["warn", { allow: ["warn", "error"] }],
        "@typescript-eslint/no-unused-vars": "error",
    },
    settings: {
        react: {
            version: "detect",
        },
    },
    env: {
        browser: true,
        es2021: true,
        node: true,
    },
};
