# 金融 MCP 接入核对

核对日期：2026-09-28。依据本机 WorkBuddy 官方市场下载的 `connectors/<id>/mcp.json` 与 `token-schema.json` 模板，以及对无凭据端点的标准 MCP `initialize` 请求和 OAuth 公开元数据的只读检查。模板只提供连接方式；“WorkBuddy 市场收录”不等于服务商已确认 DSH 客户端获得相同渠道权限。本次没有读取用户凭据，也没有用真实账号完成授权或调用付费数据。

| 用户提出的服务 | DSH 市场状态 | 核对情况 |
| --- | --- | --- |
| 通达信 | 保留社区 `tongdaxin-mcp`；官方入口暂缓 | 官方端点返回 OAuth 401，但授权页含 `workbuddy` 渠道路径。 |
| 腾讯自选股 | 新增 `tencent-westock`，OAuth | 公开元数据声明 PKCE S256、动态注册、`read` scope。 |
| Tushare | 新增 `tushare-pro`，Token | 官方 MCP 地址，Token 注入 URL `token` 查询参数；社区版 `tushare` 保留。 |
| 新华财经资讯 MCP | 新增 `xinhua-finance`，API Key | 服务商地址，`Authorization: Bearer`。 |
| 恒生聚源 MCP | 新增 `gildata`，Token | 服务商地址，Token 注入 URL `token` 查询参数。 |
| 同舟金融研究 | 新增 `tongzhou-research`，OAuth | 公开元数据与面板 PKCE 流程兼容，`research:read` scope。 |
| 盈米 MCP | 新增 `yingmi-mcp`，API Key | 服务商地址，Key 注入 URL `apiKey` 查询参数；原有盈米卡片保留。 |
| Wind Alice 万得金融数据 | 新增 `wind-alice`，API Key | 地址含 `/vserver_workbuddy/`，独立客户端使用权限待服务商确认；原 Wind 股票数据卡片保留。 |
| 东方财富妙想 MCP | 新增 `eastmoney-miaoxiang`，OAuth | 公开元数据与面板 PKCE 流程兼容；社区量化卡片仍单独标识。 |
| 进门投研 | 新增 `finenter-research`，OAuth | 公开元数据声明 PKCE、动态注册及数据查询 scope；受保护资源元数据在独立域名。 |
| Gangtise 投研 | 新增 `gangtise-openapi`，双 Key | 同时填写 Access Key、Secret Key，分别注入同名请求头；原社区卡片保留。 |
| PandaData 金融数据 | 暂缓 | OAuth 元数据仅声明客户端密钥认证，面板当前只支持公开客户端。 |
| 晨星 Morningstar | 暂缓 | OAuth 元数据可发现，但公开 scope 只有 OIDC 类权限；MCP 数据权限范围需服务商确认。 |
| 同花顺 iFinD 金融数据查询 | 暂缓 iFinD；保留 `hithink-finance` | iFinD 端点与 issuer 带 `ifcwb` 渠道路径；同花顺官方公开的另一组金融数据 MCP 已单列。 |
| 大智慧 MCP | 暂缓 | 授权 scope 仅列 WorkBuddy 等指定渠道，尚无 DSH scope。 |
| 通联数据 | 新增 `datayes`，Token | 服务商地址，`Authorization: Bearer`。 |
| Alpha 派投研助手 | 新增 `alphapai`，OAuth | 公开元数据声明 PKCE、动态注册、`read` scope；元数据位于服务商自定义路径。 |
| 易方达基金 | 新增 `efunds-official`，免登录 | 无凭据 `initialize` 返回 MCP 成功响应。 |
| AgentEarth 金融电商社媒工具 | 新增 `agentearth`，API Key | 服务商地址，`X-Api-Key` 请求头。 |
| 财汇金融与风险数据 | 新增 `finchina`，API Key | 服务商地址，`x-api-key` 请求头；没有带入 WorkBuddy 的静态渠道请求头。 |
| 森浦 qeubee 金融数据 | 新增 `sumscope`，Access Key | 服务商地址，`X-Access-Key` 请求头。 |
| 广发证券 | 暂缓 | OAuth `resource_metadata` 返回 403，模板还带 `x-gf-channel: workbuddy-area`。 |
| 华尔街见闻 | 新增 `wallstreetcn`，Token | 服务商地址与 Bearer Token；模板带 `X-WMCP-Client: wbwscn` 渠道头，独立权限待确认。 |
| 今日投资金融数据 | 暂缓 | 地址带 `source=work_buddy`；授权服务器标准元数据返回 404。 |
| 慧择保险产品推荐 | 新增 `huize-insurance`，免登录 | 无凭据 `initialize` 返回 MCP 成功响应。 |
| 东证期货 | 新增 `orientfutures`，免登录 | 无凭据 `initialize` 返回 MCP 成功响应。 |

市场卡片中的 `homepage` 是服务商凭据获取页面；面板的凭据表单会提供可点击链接。Token 只在 DSH Host 凭据存储中保存，连接时由 Host 注入 Header 或 URL 查询参数；公开 `catalog.json` 不含实际凭据。所有新增凭据及 OAuth 卡片在没有用户账户授权时均标记为 `unverified`。`reachable` 只表示匿名 MCP 初始化成功，不代表每个工具或数据权限都可用。
