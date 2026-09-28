import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { test } from 'node:test'

const catalog = JSON.parse(readFileSync(new URL('../catalog.json', import.meta.url), 'utf8'))
const ids = new Set(catalog.connectors.map(connector => connector.id))

test('the published market contains the selected domestic connectors', () => {
  const expected = new Set([
    'akshare', 'amap', 'baidu-maps', 'bazhuayu-cloud-collection', 'bocha-search',
    'chinese-almanac-mcp', 'cloudbase', 'cnb', 'dingtalk', 'eastmoney-mcp',
    'edgeone-pages', 'feishu', 'gangtise', 'gitee', 'hithink-finance',
    'huayu-legal', 'jinshuju-forms', 'kling', 'mastergo', 'minimax-mcp',
    'netease-mail', 'patsnap', 'pixso', 'pkulaw-legal', 'polardb', 'qingliu',
    'qq-mail', 'seedance', 'seedream-image-generation', 'shopline-developer-mcp',
    'stock-analysis', 'tencent-docs', 'tongdaxin-mcp', 'tushare', 'wecom',
    'wind-stock-data', 'wps-docs', 'yingmi-wealth-management',
  ])
  assert.deepEqual(ids, expected)
  assert.equal(catalog.connectors.length, ids.size)
})

test('the official HiThink connector matches the published MCP endpoints', () => {
  const connector = catalog.connectors.find(item => item.id === 'hithink-finance')
  assert.ok(connector)
  assert.equal(connector.auth.mode, 'api-key')
  assert.equal(connector.auth.apiKeyHeader, 'X-api-key')
  assert.deepEqual(connector.servers.map(server => server.url), [
    'https://fuyao.aicubes.cn/mcp/a-share',
    'https://fuyao.aicubes.cn/mcp/a-share-index',
    'https://fuyao.aicubes.cn/mcp/meta',
    'https://fuyao.aicubes.cn/mcp/fund',
    'https://fuyao.aicubes.cn/mcp/futures',
    'https://fuyao.aicubes.cn/mcp/options',
  ])
})
