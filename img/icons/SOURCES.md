# 图标素材来源

本目录下的 SVG 图标用于替代原页面中的 Emoji 图标，均为开源许可素材，通过 [Iconify API](https://api.iconify.design/) 抓取。

## 素材集

| 素材集 | 用途 | 许可证 | 版权方 |
| --- | --- | --- | --- |
| [Fluent Emoji](https://github.com/microsoft/fluentui-emoji)（Color 风格） | 功能/情感/状态图标（`cherry-blossom.svg`、`sparkles.svg`、`check-mark-button.svg` 等） | MIT | Microsoft Corporation |
| [Simple Icons](https://github.com/simple-icons/simple-icons) | 品牌 logo（`github.svg`、`xiaohongshu.svg`，已着品牌色） | SVG 代码 CC0 1.0；品牌图形归各自商标权人所有 | GitHub, Inc. / 小红书 |
| [Tabler Icons](https://github.com/tabler/tabler-icons) | CTA 按钮箭头（`arrow-right-white.svg`，白色描边） | MIT | Paweł Kuna |

## 说明

- Fluent Emoji 的 MIT 许可副本见各素材集仓库；本目录文件未做修改，仅统一了文件名。
- `enraged.svg` 取自 Fluent Emoji 的 "Angry Face"（对应表格中"愤怒/Anger"一项）。
- 新增/替换图标：在 `https://api.iconify.design/<素材集>/<名称>.svg?height=128` 获取对应 SVG 保存即可，页面侧通过 `class="icon-img"`（主页，见 `css/style.css`）或 `class="eicon"`（更新日志页）控制尺寸。
