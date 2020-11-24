// 主要是针对弹窗窗口中的表单进行验证！

// 官方默认的有：required(必填)、phone(手机号)、email(邮箱)、url(网址)、number(数字)、date(日期)、identity(身份证)

/*
1、新增、编辑 设备
    设备名称 验证：devicename character(20)
    设备编号 验证：deviceno character(100)
    资产编号 验证：assetno character(50)
    出场编号 验证：factoryno character(50)
    购置日期 验证：purchaseon character(50)
    供应商 验证：supplier character(50)
    存放地点 验证：location character(50)
    使用部门 验证：department character(50)
    科室 验证：groups character(50)
    归属人 验证：belonged character(50)
    设备状态 验证：devicestatus character(50)
    创建人 验证：createdby character(50)
    创建时间 验证：createdon character(50)

*/

// sql注入和特殊字符
export const special_sql = {
    special_str: /^[^`~!@$%&*?<>/\\|=+^{}\[\]\'\"【】‘’￥——、，。；：？《》！]*$/i,
    special_sql: /(\band\b)|(\bor\b)|(\bDELETE\b)|(\bUPDATE\b)|(\bINSERT\b)|(\bEXEC\b)|(\bEXECUTE\b)|(\blike\b)|(\bselect\b)|(\bset\b)|(\bcreate\b)|(\btable\b)|(\bexec\b)|(\bdeclare\b)|(\bmaster\b)|(\bbackup\b)|(\bmid\b)|(\bcount\b)|(\badd\b)|(\balter\b)|(\bdrop\b)|(\bfrom\b)|(\btruncate\b)|(\bunion\b)|(\bjoin\b)|(\script\b)|(\balert\b)|(\blink\b)/gi,
}

// 1台架设备;2移动资产;3举升机  '设备状态，1在用；2封存；3停用；4闲置'


export const Device =  {
    devicename: "^[a-zA-Z0-9_\u4e00-\u9fa5\\s·]{1,20}$",       // 可中文
    deviceno: "[\u4e00-\u9fa5\\s·]{1,100}$",  // 数字、字母、下划线、短线、() 设备编号
    assetno: "[\u4e00-\u9fa5\\s·]{1,50}$",       //数字、字母、数字、字母、下划线、短线、() 资产编号
    factoryno: "[\u4e00-\u9fa5\\s·]{1,50}$",       //数字、字母、下划线、短线、() 设备编号  出厂编号 
    purchaseon: "^[a-zA-Z0-9_@]{1,50}$",       //时间

    supplier: "^[a-zA-Z_\u4e00-\u9fa5\\s·]{1,50}$",       // 可中文
    // location: "^[a-zA-Z0-9_]{1,50}$",       // 可中文
    department: "^[a-zA-Z\u4e00-\u9fa5\\s·]{1,50}$",       // 可中文  部门改为 deviceid eim设备编号
    deviceid: "^[\u4e00-\u9fa5\\s·]{1,50}",                // 不能为中文！
    groups: "^[a-zA-Z\u4e00-\u9fa5\\s·]{1,50}$",       // 可中文
    belonged: "^[a-zA-Z\u4e00-\u9fa5\\s·]{1,50}$",       // 可中文
    devicestatus: "^[1-4]{1,4}$",       //数字
    createdby: "^[a-zA-Z\u4e00-\u9fa5\\s·]{1,50}$",       // 可中文

    createdon: "^[a-zA-Z0-9_@]{1,50}$",       //时间

    special_sql: special_sql, // sql 注入

}