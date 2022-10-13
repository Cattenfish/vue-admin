//spu管理请求文件
import request from '@/utils/request'
//GET /admin/product/{page}/{limit}
//获取SPU
export const reqSpuList = (page, limit, category3Id) => request({ url: `/admin/product/${page}/${limit}`, method: 'get', params: { category3Id } })
//获取spu信息 GET /admin/product/getSpuById/{spuId}
export const reqSpu = (spuId) => request({ url: `/admin/product/getSpuById/${spuId}`, method: 'get' })

//获取品牌信息 GET /admin/product/baseTrademark/getTrademarkList
export const reqTrademarkList = () => request({ url: `/admin/product/baseTrademark/getTrademarkList`, method: 'get' })

//获取spu图片 GET /admin/product/spuImageList/{spuId}
export const reqSpuImageList = (spuId) => request({ url: `/admin/product/spuImageList/${spuId}`, method: 'get' })
//获取平台中全部的销售属性（3个） GET /admin/product/baseSaleAttrList
export const reqBaseSaleAttrList = () => request({ url: `/admin/product/baseSaleAttrList`, method: 'get' })
