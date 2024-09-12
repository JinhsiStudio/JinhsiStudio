# Getting Started with Development

## Install Environment and Run the project

1. [Install Rust](https://www.rust-lang.org/tools/install)
2. [Install pnpm](https://pnpm.io/zh/installation)
3. Install pnpm dependencies and Run
```bash
cd app
pnpm install
pnpm tauri dev #Local development and debugging
pnpm tauri ios dev # For IOS device
pnpm tauri android dev # For Android device
# pnpm tauri build #Build release bundle
```