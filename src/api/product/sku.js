//sku管理请求文件
import request from '@/utils/request'
// 获取sku列表 GET /admin/product/list/{page}/{limit}
export const reqSkuList = (page, limit) => request({ url: `/admin/product/list/${page}/${limit}`, method: "get" })

//上架   GET /admin/product/onSale/{skuId}
export const reqSale = (skuId) => request({ url: `/admin/product/onSale/${skuId}`, method: "get" })

//下架  GET /admin/product/cancelSale/{skuId}
export const reqCancel = (skuId) => request({ url: `/admin/product/cancelSale/${skuId}`, method: "get" })
//获取sku详情接口 GET /admin/product/getSkuById/{skuId}
export const reqSkuById = (skuId) => request({ url: `/admin/product/getSkuById/${skuId}`, method: "get" })

//删除sku DELETE /admin/product/deleteSku/{skuId}
export const reqDeleteSku = (skuId) => request({ url: `/admin/product/deleteSku/${skuId}`, method: "delete" })

