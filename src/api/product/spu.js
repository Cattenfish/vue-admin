//spu管理请求文件
import request from '@/utils/request'
//GET /admin/product/{page}/{limit}
//获取SPU
export const reqSpuList = (page, limit, category3Id) => request({ url: `/admin/product/${page}/${limit}`, method: 'get', params: { category3Id } })
//获取spu信息 GET /admin/product/getSpuById/{spuId}
export const reqSpu = (spuId) => request({ url: `/admin/product/getSpuById/${spuId}`, method: 'get' })

//获取品牌信息 GET /admin/product/baseTrademark/getTrademarkList
export const reqTradeMarkList = () => request({ url: `/admin/product/baseTrademark/getTrademarkList`, method: 'get' })

//获取spu图片 GET /admin/product/spuImageList/{spuId}
export const reqSpuImageList = (spuId) => request({ url: `/admin/product/spuImageList/${spuId}`, method: 'get' })
//获取平台中全部的销售属性（3个） GET /admin/product/baseSaleAttrList
export const reqBaseSaleAttrList = () => request({ url: `/admin/product/baseSaleAttrList`, method: 'get' })


//修改spuz或者添加spu，携带给服务器的参数大致一样，区别为携带参数是否带id
export const reqAddOrUpdateSpu = (spuInfo) => {
    //携带的参数带有id---修改spu POST /admin/product/updateSpuInfo
    if (spuInfo.id) {
        return request({ url: `/admin/product/updateSpuInfo`, method: 'post', data: spuInfo })
    } else {
        //不携带id 添加spu POST /admin/product/saveSpuInfo
        return request({ url: `/admin/product/saveSpuInfo`, method: 'post', data: spuInfo })
    }

}
//删除spu  DELETE /admin/product/deleteSpu/{spuId}
export const reqDeleteSpu = (spuId) => request({ url: `/admin/product/deleteSpu/${spuId}`, method: 'delete' })



//获取销售属性的数据/GET /admin/product/spuSaleAttrList/{spuId}
export const reqSpuSaleAttrList = (spuId) => request({ url: `/admin/product/spuSaleAttrList/${spuId}`, method: "get" })
//获取平台属性数据 GET /admin/product/attrInfoList/{category1Id}/{category2Id}/{category3Id}
export const reqAttrInfoList = (category1Id, category2Id, category3Id) => request({ url: `/admin/product/attrInfoList/${category1Id}/${category2Id}/${category3Id}`, method: "get" })

//添加sku   POST /admin/product/saveSkuInfo
export const reqAddSku = (skuInfo) => request({ url: `/admin/product/saveSkuInfo`, method: "post", data: skuInfo })


//获取sku列表数据的接口GET /admin/product/findBySpuId/{spuId}
export const reqSkuList = (spuId) => request({ url: `/admin/product/findBySpuId/${spuId}`, method: "get" })
