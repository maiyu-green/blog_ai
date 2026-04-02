---
name: gzh_images
description: Extracts content from WeChat article URLs and generates PPT-style HTML infographic pages. Invoke when user provides mp.weixin.qq.com links and asks for "公众号图文", "微信文章转PPT", "PPT风格页面", or infographic generation from WeChat articles.
version: 1.0.0
---

# 微信公众号文章转PPT风格图文生成器

将微信公众号文章转换为精美的PPT风格HTML页面，支持截图分享。

## Usage

```bash
# 输入微信文章链接生成PPT风格页面
/gzh_images https://mp.weixin.qq.com/s/xxxxx

# 多篇文章合并
/gzh_images https://mp.weixin.qq.com/s/xxx1 https://mp.weixin.qq.com/s/xxx2

# 指定主题色
/gzh_images https://mp.weixin.qq.com/s/xxxxx --theme blue

# 指定页面风格
/gzh_images https://mp.weixin.qq.com/s/xxxxx --style business
```

## Options

| Option | Description | Default |
|--------|-------------|---------|
| `--theme <color>` | 主题色: blue/red/green/purple/orange | blue |
| `--style <type>` | 风格: business/tech/minimal/creative | business |
| `--slides <n>` | 幻灯片数量 | auto |
| `--ratio <ratio>` | 比例: 16:9 / 4:3 / 1:1 / 9:16 | 16:9 |

## Workflow

### Step 1: 解析微信文章

1. 提取文章URL
2. 获取文章内容（标题、正文、图片）
3. 分析文章结构和核心要点

### Step 2: 内容分析与提炼

- 提取文章核心论点
- 识别关键数据和案例
- 归纳章节结构
- 生成内容大纲

### Step 3: 生成PPT风格HTML

创建单文件HTML，包含：
- 封面页（文章标题+作者+日期）
- 目录页（文章结构概览）
- 内容页（核心要点，每页3-5个重点）
- 总结页（核心结论+CTA）

### Step 4: 启动预览服务

自动生成并启动本地HTTP服务器，提供预览链接。

## PPT风格模板

### Business（商务风）
- 深蓝/深灰主色调
- 简洁专业的排版
- 适合商业、管理类文章

### Tech（科技风）
- 深色背景+霓虹点缀
- 代码元素装饰
- 适合技术、编程类文章

### Minimal（极简风）
- 大量留白
- 黑白灰为主
- 适合设计、生活类文章

### Creative（创意风）
- 渐变色彩
- 活泼的排版
- 适合营销、创意类文章

## File Structure

```
gzh-images/{article-slug}/
├── index.html          # PPT风格页面
├── article.md          # 提取的文章原文
├── outline.md          # 内容大纲
└── assets/
    ├── style.css       # 样式文件
    └── images/         # 提取的图片
```

## HTML Features

- 响应式设计
- 键盘导航（← → 或空格切换页面）
- 全屏演示模式
- 一键导出图片功能
- 打印友好

## Example

输入：
```
/gzh_images https://mp.weixin.qq.com/s/LDYfKTDAFCJPi5YAiXYoBA
```

输出：
- 生成5-8页PPT风格HTML
- 每页包含核心要点
- 支持键盘翻页
- 提供截图导出

## Notes

- 自动处理微信文章的防盗链图片
- 支持长文自动分页
- 保留原文关键数据和引用
- 中文排版优化
