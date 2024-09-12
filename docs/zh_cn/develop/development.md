# 参与开发

## 环境安装与项目运行

1. [安装 Rust](https://www.rust-lang.org/tools/install)
2. [安装 pnpm](https://pnpm.io/zh/installation)
3. 安装 pnpm 依赖并运行项目
```bash
cd app
pnpm install
pnpm tauri dev # 本地调试开发
pnpm tauri ios dev # IOS设备(仅支持Mac)
pnpm tauri android dev # 安卓设备
# pnpm tauri build #编译 Release bundle
```