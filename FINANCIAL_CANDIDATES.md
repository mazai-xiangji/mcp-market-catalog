# 金融 MCP 候选核对

核对日期：2026-09-28。市场卡片必须有可核实的 MCP URL 或本地启动命令，以及对应鉴权说明。产品本身存在、第三方市场列名或搜索结果中的名称，都不足以构成可连接配置。以下“待补”表示此次未核实到足以安全配置的信息，不表示该机构没有 MCP 产品。

| 用户提出的服务 | 本次处理 | 依据或待补信息 |
| --- | --- | --- |
| 通达信 | 保留现有社区连接器，未冒充官方 | 现有 `tongdaxin-mcp` 明确使用社区 `tdx-mcp` 包。通达信 [TdxClaw 官网](https://www.tdx.com.cn/tdxclaw/)及[帮助中心](https://help.tdx.com.cn/tdxclaw/)提及自有 AI 数据服务，但没有核实到面向第三方客户端的完整 MCP 配置。 |
| 腾讯自选股 | 待补 | 需要腾讯官方 MCP 接入文档、URL 或包名及鉴权方式。 |
| Tushare | 保留现有社区连接器 | `tushare` 使用第三方 `@tushare/mcp`，调用 TuShare 数据；不标为官方 MCP。 |
| 新华财经资讯 MCP | 待补 | 需要新华财经官方公开的 MCP 接入配置。 |
| 恒生聚源 MCP | 待补 | 需要恒生聚源官方公开的 MCP 接入配置。 |
| 同舟金融研究 | 待补 | 需要发布者和 MCP 接入配置。 |
| 盈米 MCP | 保留现有连接器 | 现有 `yingmi-wealth-management` 使用[盈米 MCP 页面](https://qieman.com/mcp)所指服务和 API Key。 |
| Wind Alice 万得金融数据 | 保留现有 Wind 数据 MCP；Alice 暂不单列 | 现有 `wind-stock-data` 指向万得 MCP。万得 [wind-skills](https://github.com/Wind-Information-Co-Ltd/wind-skills) 文档将 Alice 描述为 A2A Agent，而非独立 MCP Server。 |
| 东方财富妙想 MCP | 待补 | 现有 `eastmoney-mcp` 是社区量化连接器，不能当作“妙想”官方服务。需要东方财富发布的第三方 MCP 地址、启动命令和鉴权说明。 |
| 进门投研 | 待补 | 需要发布者和 MCP 接入配置。 |
| Gangtise 投研 | 保留现有连接器 | 现有 `gangtise` 基于 [Gangtise 发布者仓库](https://github.com/gangtiser/gangtise-mcp)。 |
| PandaData 金融数据 | 待补 | 需要发布者和 MCP 接入配置。 |
| 晨星 Morningstar | 待补 | 用户明确将其列为候选，但此次未核实到官方公开 MCP 接入配置，因此没有加入市场。 |
| 同花顺 iFinD 金融数据查询 | 新增同花顺官方金融数据 MCP；iFinD 待补 | [同花顺官方 MCP 文档](https://github.com/HiThink-Tech/Financial-API/blob/main/docs/mcp.md)列出六个托管端点及 `X-api-key` 鉴权。该服务没有声明等同于 iFinD 终端或其订阅数据。 |
| 大智慧 MCP | 待补 | 需要大智慧官方公开的 MCP 接入配置。 |
| 通联数据 | 待补 | 需要通联数据官方公开的 MCP 接入配置。 |
| Alpha 派投研助手 | 待补 | 需要发布者和 MCP 接入配置。 |
| 易方达基金 | 待补 | 需要易方达官方公开的 MCP 接入配置。 |
| AgentEarth 金融电商社媒工具 | 待补 | 需要发布者和 MCP 接入配置。 |
| 财汇金融与风险数据 | 待补 | 需要财汇官方公开的 MCP 接入配置。 |
| 森浦 qeubee 金融数据 | 待补 | 需要森浦官方公开的 MCP 接入配置。 |
| 广发证券 | 待补 | 需要广发证券官方公开的 MCP 接入配置。 |
| 华尔街见闻 | 待补 | 需要华尔街见闻官方公开的 MCP 接入配置。 |
| 今日投资金融数据 | 待补 | 需要今日投资官方公开的 MCP 接入配置。 |
| 慧择保险产品推荐 | 待补 | 需要慧择官方公开的 MCP 接入配置。 |
| 东证期货 | 待补 | 需要东证期货官方公开的 MCP 接入配置。 |

新增的同花顺卡片采用[官方六个端点及配置示例](https://github.com/HiThink-Tech/Financial-API/blob/main/docs/mcp.md)。无 API Key 的普通 GET 请求返回 HTTP 405，只能说明地址对 GET 不开放；没有用户凭据，本次未验证实际 MCP 工具列表或账号权限，故 `probeStatus` 保持 `unverified`。
