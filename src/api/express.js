import request from '@/utils/request'

export function pygjsdDepots() {
  return request({
    url: '/express/pygjsd/depots',
    method: 'get'
  })
}
export function pygjsdRoutes() {
  return request({
    url: '/express/pygjsd/routes',
    method: 'get'
  })
}
export function pygjsdRegion() {
  return request({
    url: '/express/pygjsd/region',
    method: 'get'
  })
}
export function pygjsdLeiBie() {
  return request({
    url: '/express/pygjsd/leiBie',
    method: 'get'
  })
}
