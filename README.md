# 自维护 MCP 市场

此目录供 `grg-skill-mcp-panel` 的 MCP 市场读取。`catalog.json` 初始复制自 [dsh-mcp-connector-registry](https://github.com/duhu2000/dsh-mcp-connector-registry) 的 `main/catalog.json`（2026-09-27 下载，107 个连接器）；上游 MIT 许可见 [LICENSE.upstream](LICENSE.upstream)。当前目录保留国内服务及相关社区连接器，并收录金融服务商的 Token、OAuth 或匿名 MCP 模板，共 57 个连接器。此目录独立维护，不会自动同步上游。

## DSH 地址

公开 HTTPS 地址：

```text
https://raw.githubusercontent.com/mazai-xiangji/mcp-market-catalog/main/catalog.json
```

在 Web profile 的 `cordis.patch.yml` 中给 `skill-mcp-panel` 设置（可复制 [dsh-web.patch.yml](dsh-web.patch.yml)）：

```yaml
- id: skill-mcp-panel
  config:
    mcpCatalog:
      url: https://raw.githubusercontent.com/mazai-xiangji/mcp-market-catalog/main/catalog.json
```

## 修改和发布

编辑 `catalog.json` 中 `connectors` 数组的条目，保留顶层 `schemaVersion: 1`。每个条目的 `id` 必须唯一；名称、简介、分类和图标会出现在市场卡片中。`icon` 使用此仓库 `assets/` 下的公开 HTTPS 图片地址。

## 图标维护

57 张卡片均有图标，对应 `assets/` 中的 54 个文件；同品牌连接器可复用已有图标。原有 emoji 和其他插件的资源路径已替换。官网、官方产品 CDN、项目发布者及官网 favicon 缓存的原始地址记录在 [icon-sources.json](icon-sources.json)。图片用于识别相应产品或数据源，商标归各自权利人所有。

用户提出的金融 MCP 候选及核对结果见 [金融 MCP 候选核对](FINANCIAL_CANDIDATES.md)。公开端点、认证模式及渠道限制按表逐项标注；尚未用真实用户账号验证付费数据权限。

金数据 `jinshuju-forms` 的 OAuth 受保护资源标识为 `https://jinshuju.net`，元数据发布在站点根路径 `/.well-known/oauth-protected-resource`；MCP 服务端点仍为 `/mcp`。这两个地址不能互换，否则授权发现会返回 404。

`mediakit`、`starwell-world-statistics` 和 `stock-analysis` 的项目主页没有发布独立标志，使用 GitHub 官方图标表示其代码仓库，避免使用维护者的个人照片。其他社区连接器借用其所接服务的官方标志时，仍以卡片中的 `vendor` 和说明标识实际连接器发布者。

更换图标时，把新图片放入 `assets/`，同步修改该条目的 `icon` URL 和 `icon-sources.json` 来源记录，并将三个文件一起推送。GitHub Raw 必须能无需登录访问图片。

提交并推送到 GitHub 的 `main` 分支后，DSH 会从上面的地址读取新版本。面板可手动刷新；正常读取有 60 秒缓存。连接器的服务地址、命令和认证字段也在目录内，修改前应核对其来源及可用性。目录不能包含令牌、密码等实际凭据。
