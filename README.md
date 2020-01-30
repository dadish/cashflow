# CASHFLOW

### Visual Studio Code

If you're using VSCode, consider adding below configs to improve your development experience.

#### jsconfig.json

```json
{
  "compilerOptions": {
    "baseUrl": "./src"
  },
  "include": ["./src/**/*"],
  "exclude": [".github", ".vscode", "node_modules", "build", ".tmp"]
}
```

#### .vscode/settings.json

```json
{
  "typescript.validate.enable": false,
  "javascript.validate.enable": false,
  "eslint.enable": true,
  "javascript.format.enable": false,
  "typescript.format.enable": false,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "[javascript]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "editor.formatOnSave": true
}
```

#### Expensions

The following extensions are also helpful:

- orta.vscode-jest
- esbenp.prettier-vscode
- dbaeumer.vscode-eslint
- formulahendry.auto-close-tag
- formulahendry.auto-rename-tag
