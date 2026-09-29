import assert from 'node:assert/strict'
import { existsSync, readFileSync } from 'node:fs'
import { test } from 'node:test'

const catalog = JSON.parse(readFileSync(new URL('../catalog.json', import.meta.url), 'utf8'))
const ids = new Set(catalog.connectors.map(connector => connector.id))
const iconSources = JSON.parse(readFileSync(new URL('../icon-sources.json', import.meta.url), 'utf8'))

test('every published card has a local icon and a recorded source', () => {
  const sourcesById = new Map(iconSources.assets.map(source => [source.id, source]))
  for (const connector of catalog.connectors.filter(item => item.published)) {
    const source = sourcesById.get(connector.id)
    assert.ok(source, `missing icon source for ${connector.id}`)
    assert.ok(connector.icon, `missing icon for ${connector.id}`)
    assert.ok(connector.icon.endsWith(`/assets/${source.asset}`), `icon/source mismatch for ${connector.id}`)
    assert.ok(existsSync(new URL(`../assets/${source.asset}`, import.meta.url)), `missing icon file for ${connector.id}`)
  }
})

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
    'tushare-pro', 'xinhua-finance', 'gildata', 'yingmi-mcp', 'wind-alice',
    'gangtise-openapi', 'datayes', 'agentearth', 'finchina', 'sumscope',
    'wallstreetcn',
    'efunds-official', 'huize-insurance', 'orientfutures', 'tongzhou-research', 'eastmoney-miaoxiang',
    'tencent-westock', 'finenter-research', 'alphapai',
  ])
  assert.deepEqual(ids, expected)
  assert.equal(catalog.connectors.length, ids.size)
})

test('anonymous finance endpoints preserve their observed authorization mode', () => {
  for (const id of ['efunds-official', 'huize-insurance', 'orientfutures']) {
    const item = catalog.connectors.find(connector => connector.id === id)
    assert.equal(item?.auth.mode, 'none', id)
    assert.equal(item?.probeStatus, 'reachable', id)
  }
  assert.equal(catalog.connectors.find(item => item.id === 'tongzhou-research')?.auth.scope, 'research:read')
  for (const id of ['tencent-westock', 'finenter-research', 'alphapai']) {
    const item = catalog.connectors.find(connector => connector.id === id)
    assert.equal(item?.auth.mode, 'oauth2-pkce', id)
    assert.match(item?.servers[0].oauthMetadataUrl ?? '', /^https:\/\//)
  }
})

test('Tongdaxin and Eastmoney use the requested remote API key endpoints', () => {
  const tongdaxin = catalog.connectors.find(item => item.id === 'tongdaxin-mcp')
  assert.equal(tongdaxin?.name, '通达信')
  assert.equal(tongdaxin?.auth.mode, 'api-key')
  assert.equal(tongdaxin?.auth.credentialHelpLabel, '如何获取 API Key？')
  assert.equal(tongdaxin?.homepage, 'https://vip.tdx.com.cn/site/app/pc-mall/main.html#/page_product_mcp')
  assert.equal(tongdaxin?.servers[0].transport, 'streamable-http')
  assert.equal(tongdaxin?.servers[0].url, 'https://mcp.tdx.com.cn:3001/mcp')

  const eastmoney = catalog.connectors.find(item => item.id === 'eastmoney-miaoxiang')
  assert.equal(eastmoney?.auth.mode, 'api-key')
  assert.equal(eastmoney?.auth.apiKeyHeader, 'em_api_key')
  assert.equal(eastmoney?.auth.credentialEnvName, 'EM_API_KEY')
  assert.equal(eastmoney?.auth.credentialHelpLabel, '如何获取 API Key？')
  assert.equal(eastmoney?.homepage, 'https://choice.eastmoney.com/mcp/')
  assert.deepEqual(eastmoney?.servers.map(server => [server.serverName, server.transport, server.url]), [
    ['mx-ds-mcp', 'streamable-http', 'https://mxapi.eastmoney.com/mxds/mcp'],
  ])
})

test('Jinshuju OAuth uses its published root resource metadata', () => {
  const connector = catalog.connectors.find(item => item.id === 'jinshuju-forms')
  assert.equal(connector?.servers[0].oauthResource, 'https://jinshuju.net')
  assert.equal(connector?.servers[0].oauthMetadataUrl, 'https://jinshuju.net/.well-known/oauth-protected-resource')
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

test('provider credential MCP cards use the documented endpoints without embedded secrets', () => {
  const expected = new Set(['tushare-pro', 'xinhua-finance', 'gildata', 'yingmi-mcp', 'wind-alice', 'gangtise-openapi', 'datayes', 'agentearth', 'finchina', 'sumscope', 'wallstreetcn'])
  for (const id of expected) {
    const item = catalog.connectors.find(connector => connector.id === id)
    assert.ok(item, `missing ${id}`)
    assert.equal(item.published, true)
    assert.match(item.servers[0].url, /^https:\/\//)
    assert.doesNotMatch(JSON.stringify(item), /\$\{|Bearer \S{12,}/)
    assert.ok(item.homepage, `missing credential help for ${id}`)
    assert.ok(['api-key', 'bearer'].includes(item.auth.mode))
  }
  assert.deepEqual(catalog.connectors.find(item => item.id === 'gangtise-openapi').servers[0].credentialHeaderBindings,
    { accessKey: 'accessKey', secretKey: 'secretKey' })
  assert.deepEqual(catalog.connectors.find(item => item.id === 'tushare-pro').servers[0].credentialQueryBindings, { token: 'token' })
})
