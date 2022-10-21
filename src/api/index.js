//将四个模块接口函数统一暴露
import * as trademark from '@/api/product/tradeMark'
import * as attr from '@/api/product/attr'
import * as sku from '@/api/product/sku'
import * as spu from '@/api/product/spu'
//引入权限相关接口
import * as user from '@/api/acl/user';
import role from '@/api/acl/role';
import permission from '@/api/acl/permission';


//对外暴露
export default {
    trademark,
    attr,
    sku,
    spu,
    user,
    role,
    permission
}