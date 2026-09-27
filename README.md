# 自维护 MCP 市场

此目录供 `grg-skill-mcp-panel` 的 MCP 市场读取。`catalog.json` 初始复制自 [dsh-mcp-connector-registry](https://github.com/duhu2000/dsh-mcp-connector-registry) 的 `main/catalog.json`（2026-09-27 下载，107 个连接器）；上游 MIT 许可见 [LICENSE.upstream](LICENSE.upstream)。从此以后，本目录独立维护，不会自动同步上游。

## DSH 地址

公开 HTTPS 地址：

```text
https://raw.githubusercontent.com/mazai-xiangji/dsh-skill-mcp-panel/main/mcp-market-catalog/catalog.json
```

在 Web profile 的 `cordis.patch.yml` 中给 `skill-mcp-panel` 设置（可复制 [dsh-web.patch.yml](dsh-web.patch.yml)）：

```yaml
- id: skill-mcp-panel
  config:
    mcpCatalog:
      url: https://raw.githubusercontent.com/mazai-xiangji/dsh-skill-mcp-panel/main/mcp-market-catalog/catalog.json
```

## 修改和发布

编辑 `catalog.json` 中 `connectors` 数组的条目，保留顶层 `schemaVersion: 1`。每个条目的 `id` 必须唯一；名称、简介、分类和图标会出现在市场卡片中。`icon` 可使用简短的 Unicode 符号，或公开可访问的 HTTPS 图片地址。原目录中的 `/mcp-connector/ui/assets/` 路径属于另一个插件，当前面板会显示占位图标；可以逐条改成自己的 HTTPS 图片地址。

提交并推送到 GitHub 的 `main` 分支后，DSH 会从上面的地址读取新版本。面板可手动刷新；正常读取有 60 秒缓存。连接器的服务地址、命令和认证字段也在目录内，修改前应核对其来源及可用性。目录不能包含令牌、密码等实际凭据。
