// 主要是针对弹窗窗口中的表单进行验证！

// 官方默认的有：required(必填)、phone(手机号)、email(邮箱)、url(网址)、number(数字)、date(日期)、identity(身份证)

/*
1、新增、编辑 用户
    员工编号 验证：employeeno character(20)
    姓名 验证：name character(100)
    域账号 验证：loginname character(50)
    邮箱 验证：email character(50)

*/

// sql注入和特殊字符
export const special_sql = {
    special_str: /^[^`~!@$%&*?<>/\\|=+^{}\[\]\'\"【】‘’￥——、，。；：？《》！]*$/i,
    special_sql: /(\band\b)|(\bor\b)|(\bDELETE\b)|(\bUPDATE\b)|(\bINSERT\b)|(\bEXEC\b)|(\bEXECUTE\b)|(\blike\b)|(\bselect\b)|(\bset\b)|(\bcreate\b)|(\btable\b)|(\bexec\b)|(\bdeclare\b)|(\bmaster\b)|(\bbackup\b)|(\bmid\b)|(\bcount\b)|(\badd\b)|(\balter\b)|(\bdrop\b)|(\bfrom\b)|(\btruncate\b)|(\bunion\b)|(\bjoin\b)|(\script\b)|(\balert\b)|(\blink\b)/gi,
}


export const AddEmployee =  {
    employeeno: "^[a-zA-Z0-9]{1,20}$",       // 数字、字母、_ 
    name: "^[a-zA-Z0-9_\u4e00-\u9fa5\\s·]{1,100}$",  // 数字、字母、中文
    loginname: "^[a-zA-Z0-9_@.]{1,50}$",       //数字、字母、_ 
    special_sql: special_sql, // sql注入
}

/*
2、添加、编辑 菜单
*/

export const AddMenu =  {
    muluname: "^[a-zA-Z0-9_\u4e00-\u9fa5\\s·]{1,255}$",       // 数字、字母、_ 、中文
    muluname_en: "^[a-zA-Z0-9_]{1,255}$",  // 数字、字母、_ 组成的字符串

    caidanname: "^[a-zA-Z0-9_\u4e00-\u9fa5\\s·]{1,255}$", // 数字、字母、_ 、中文
    caidanname_en: "^[a-zA-Z0-9_]{1,255}$",  // 数字、字母、_组成的字符串

    anniuname: "^[a-zA-Z0-9_\u4e00-\u9fa5\\s·]{1,255}$", // 数字、字母、_ 、中文
    anniuname_en: "^[a-zA-Z0-9_ ]{1,255}$",  // 数字、字母、_组成的字符串

    special_sql: special_sql, // sql注入
}


/*
3、添加、编辑 角色
*/

export const AddRole =  {
    role_name: "^[a-zA-Z_\u4e00-\u9fa5\\s·]{1,255}$",       // 数字、字母、_ 、中文
    role: "^[a-zA-Z0-9_]{1,255}$",  // 数字、字母、_ 组成的字符串

    special_sql: special_sql, // sql注入
}

/*
4、添加、编辑 用户组

*/

export const EmployeeGroup =  {
    group_name: "^[a-zA-Z0-9_]{1,20}$",       // 数字、字母、_ 
    group_: "^[a-zA-Z0-9_\u4e00-\u9fa5\\s·]{1,100}$",  // 数字、字母、中文

    special_sql: special_sql, // sql注入
}






