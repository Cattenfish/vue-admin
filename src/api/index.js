//将四个模块接口函数统一暴露
import * as trademark from '@/api/product/tradeMark'
import * as attr from '@/api/product/attr'
import * as sku from '@/api/product/sku'
import * as spu from '@/api/product/spu'


//对外暴露
export default {
    trademark,
    attr,
    sku,
    spu
}