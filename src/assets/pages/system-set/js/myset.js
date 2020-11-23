let myset = {
    // layui tree table
    init() {
        // var layui = require('layui-src/dist/layui');
        layui.config({
            base: 'assets/pages/system-set/layui/treetable/',
        })
        layui.use(['treeTable', 'layer', 'code', 'form'], function() {
            var o = layui.$,
                form = layui.form,
                layer = layui.layer,
                treeTable = layui.treeTable;
            // 直接下载后url: './data/table-tree.json',这个配置可能看不到数据，改为data:[],获取自己的实际链接返回json数组
            var re = treeTable.render({
                elem: '#tree-table',
                data: [
                    { "id": 1, "pid": 0, "title": "1-1" },
                    { "id": 2, "pid": 0, "title": "1-2" },
                    { "id": 3, "pid": 0, "title": "1-3" },
                    { "id": 4, "pid": 1, "title": "1-1-1" },
                    { "id": 5, "pid": 1, "title": "1-1-2" },
                    { "id": 6, "pid": 2, "title": "1-2-1" },
                    { "id": 7, "pid": 2, "title": "1-2-3" },
                    { "id": 8, "pid": 3, "title": "1-3-1" },
                    { "id": 9, "pid": 3, "title": "1-3-2" },
                    { "id": 10, "pid": 4, "title": "1-1-1-1" },
                    { "id": 11, "pid": 4, "title": "1-1-1-2" }
                ],
                icon_key: 'title',
                is_checkbox: true,
                checked: {
                    key: 'id',
                    data: [0, 1, 4, 10, 11, 5, 2, 6, 7, 3, 8, 9],
                },
                end: function(e) {
                    form.render();
                },
                cols: [{
                        key: 'title',
                        title: '名称',
                        width: '100px',
                        template: function(item) {
                            if (item.level == 0) {
                                return '<span style="color:red;">' + item.title + '</span>';
                            } else if (item.level == 1) {
                                return '<span style="color:green;">' + item.title + '</span>';
                            } else if (item.level == 2) {
                                return '<span style="color:#aaa;">' + item.title + '</span>';
                            }
                        }
                    },
                    {
                        key: 'id',
                        title: 'ID',
                        width: '100px',
                        align: 'center',
                    },
                    {
                        key: 'pid',
                        title: '父ID',
                        width: '100px',
                        align: 'center',
                    },
                    {
                        title: '开关',
                        width: '100px',
                        align: 'center',
                        template: function(item) {
                            return '<input type="checkbox" name="close" lay-skin="switch" lay-text="ON|OFF">';
                        }
                    },
                    {
                        title: '操作',
                        align: 'center',
                        template: function(item) {
                            return '<a lay-filter="add">添加</a> | <a target="_blank" href="/detail?id=' + item.id + '">编辑</a>';
                        }
                    }
                ]
            });
            treeTable.render({
                elem: '#tree-table1',
                url: 'assets/pages/system-set/layui/treetable/table-tree.json',
                icon_key: 'title',
                is_checkbox: true,
                cols: [{
                        key: 'title',
                        title: '名称',
                        width: '100px',
                        template: function(item) {
                            if (item.level == 0) {
                                return '<span style="color:red;">' + item.title + '</span>';
                            } else if (item.level == 1) {
                                return '<span style="color:green;">' + item.title + '</span>';
                            } else if (item.level == 2) {
                                return '<span style="color:#aaa;">' + item.title + '</span>';
                            }
                        }
                    },
                    {
                        key: 'id',
                        title: 'ID',
                        width: '100px',
                        align: 'center',
                    },
                    {
                        key: 'pid',
                        title: '父ID',
                        width: '100px',
                        align: 'center',
                    },
                ]
            });
            treeTable.render({
                elem: '#tree',
                url: 'assets/pages/system-set/layui/treetable/table-tree.json',
                icon_key: 'title',
                is_checkbox: true,
                icon: {
                    open: 'layui-icon layui-icon-rate',
                    close: 'layui-icon layui-icon-rate-solid',
                    left: 16,
                },
                cols: [{
                    key: 'title',
                    title: '名称',
                }, ]
            });
            treeTable.render({
                elem: '#tree1',
                url: 'assets/pages/system-set/layui/treetable/table-tree.json',
                icon_key: 'title',
                cols: [{
                    key: 'title',
                    title: '名称',
                }, ]
            });
            // 监听展开关闭
            treeTable.on('tree(flex)', function(data) {
                    layer.msg(JSON.stringify(data));
                })
                // 监听checkbox选择
            treeTable.on('tree(box)', function(data) {
                    if (o(data.elem).parents('#tree-table1').length) {
                        var text = [];
                        o(data.elem).parents('#tree-table1').find('.cbx.layui-form-checked').each(function() {
                            o(this).parents('[data-pid]').length && text.push(o(this).parents('td').next().find('span').text());
                        })
                        o(data.elem).parents('#tree-table1').prev().find('input').val(text.join(','));
                    }
                    layer.msg(JSON.stringify(data));
                })
                // 监听自定义
            treeTable.on('tree(add)', function(data) {
                    layer.msg(JSON.stringify(data));
                })
                // 获取选中值，返回值是一个数组（定义的primary_key参数集合）
            o('.get-checked').click(function() {
                    layer.msg('选中参数' + treeTable.checked(re).join(','))
                })
                // 刷新重载树表（一般在异步处理数据后刷新显示）
            o('.refresh').click(function() {
                    re.data.push({ "id": 50, "pid": 0, "title": "1-4" }, { "id": 51, "pid": 50, "title": "1-4-1" });
                    treeTable.render(re);
                })
                // 全部展开
            o('.open-all').click(function() {
                    treeTable.openAll(re);
                })
                // 全部关闭
            o('.close-all').click(function() {
                    treeTable.closeAll(re);
                })
                // 随机更换小图标
            o('.change-icon').click(function() {
                var arr = [{
                        open: 'layui-icon layui-icon-set',
                        close: 'layui-icon layui-icon-set-fill',
                        left: 16,
                    },
                    {
                        open: 'layui-icon layui-icon-rate',
                        close: 'layui-icon layui-icon-rate-solid',
                        left: 16,
                    },
                    {
                        open: 'layui-icon layui-icon-tread',
                        close: 'layui-icon layui-icon-praise',
                        left: 16,
                    },
                    {
                        open: 'layui-icon layui-icon-camera',
                        close: 'layui-icon layui-icon-camera-fill',
                        left: 16,
                    },
                    {
                        open: 'layui-icon layui-icon-user',
                        close: 'layui-icon layui-icon-group',
                        left: 16,
                    },
                ];
                var round = Math.round(Math.random() * (arr.length - 1));
                re.icon = arr[round];
                treeTable.render(re);
            })
            o('#tree1').on('click', '[data-down]', function() {
                o(this).find('span').length && o(this).parents('.layui-unselect').find('input').val(o(this).text());
            })
            o('.layui-select-title').click(function() {
                o(this).parent().hasClass('layui-form-selected') ? o(this).next().hide() : o(this).next().show();
                o(this).parent().toggleClass('layui-form-selected');
            })
            o(document).on("click", function(i) {
                !o(i.target).parent().hasClass('layui-select-title') && !o(i.target).parents('table').length && !(!o(i.target).parents('table').length && o(i.target).hasClass('layui-icon')) && o(".layui-form-select").removeClass("layui-form-selected").find('.layui-anim').hide();
            })
        })

        console.log("--------------------------->", layui);
    },

    // boostrap table  tree table
    init2(data) {
        var $table = $('#table');
        // var datas = [{
        //     "id": "1",
        //     "pid": 0,
        //     "status": null,
        //     "name": "系统管理",
        //     "meuurl": '234/23',
        //     "parentname": 'zxx',
        //     "permissionValue": "open:system:get"
        // }, ]
        console.log($table, "<---------------------------------", data);
        $(function() {
            $table.bootstrapTable({
                //   url: 'assets/pages/system-set/bootstrap-table/data.json',

                //   sidePagination: 'server',
                idField: 'id',
                data: data,
                dataTpye: 'jsonp',
                columns: [{
                        field: 'ck',
                        checkbox: true
                    },
                    {
                        field: 'name',
                        title: '名称',
                        width: '200',
                    },
                    {
                        field: 'parentname',
                        title: '上级菜单',
                        width: '100',
                    },
                    {
                        field: 'menuurl',
                        title: '菜单url',
                        width: '100',
                    },
                    {
                        field: 'status',
                        title: '状态',
                        sortable: true,
                        align: 'center',
                        width: '200',
                        formatter: statusFormatter
                    },
                    {
                        field: 'permissionValue',
                        width: '200',
                        title: '权限值'
                    },
                    {
                        field: 'action',
                        title: '操作',
                        width: '200',
                        events: {
                            'click .like': function(e, value, row, index) {
                                // alert('You click like action, row: ' + JSON.stringify(row));
                                // 弹出层
                                layui.use(['layer', ], function() {
                                    var layer = layui.layer;
                                    layer.open({
                                        title: '编辑菜单',
                                        type: 1,
                                        content: '<div class="">' +
                                            '<label class="">输入框</label>' +
                                            '<input type="text" name="title"  placeholder="请输入标题" >' +
                                            '</div>',
                                        btn: ['确定', "取消"],
                                        yes: function(j, layero) {
                                            console.log("数据为：", JSON.stringify(row));
                                            layer.close(j); //如果设定了yes回调，需进行手工关闭
                                        },

                                    });


                                });
                            },
                            'click .remove': function(e, value, row, index) {
                                $table.bootstrapTable('remove', {
                                    field: 'id',
                                    values: [row.id]
                                });
                                // 删除之后 应该需要更新table
                                getdata_for_table();
                            }
                        },
                        formatter: actionFormatter,
                    },
                ],
                //   data: data,
                //   在那一列展示树形
                treeShowField: 'name',
                // 指定父id列
                parentIdField: 'pid',

                onPostBody: function() {
                    // var columns = $table.bootstrapTable('getOptions').columns

                    $table.treegrid({
                            treeColumn: 1,
                            onChange: function() {
                                $table.bootstrapTable('resetWidth')
                            }
                        })
                        //只展开树形的第一级节点
                    $table.treegrid('getRootNodes').treegrid('expand');
                    // if (columns && columns[0][1].visible) {
                    // }
                }
            })
        })

        // function typeFormatter(value, row, index) {
        //     if (value === 'menu') {
        //         return '菜单'
        //     }
        //     if (value === 'button') {
        //         return '按钮'
        //     }
        //     if (value === 'api') {
        //         return '接口'
        //     }
        //     return '-'
        // }

        function statusFormatter(value, row, index) {
            if (value === 1) {
                return '<span class="label label-success">正常</span>'
            }
            return '<span class="label label-default">锁定</span>'
        }

        // 操作
        function actionFormatter(value, row, index) {
            // return '<div class="row"><div class="col-md-6" style="text-align: center;"><button class="btn btn-info edit">编辑</button></div><div class="col-md-6" style="text-align: center;"><button class="btn btn-warning">删除</button></div></div>'
            return [
                '<a class="like" href="javascript:void(0)" title="编辑">',
                '<i class="fa fa-pencil-square"></i>',
                '</a>  ',
                '<a class="remove" href="javascript:void(0)" title="删除">',
                '<i class="fa fa-trash"></i>',
                '</a>'
            ].join('')
        }

        // ajax请求
        function getdata_for_table() {
            // window.location.reload();
            $.ajax({
                url: "http://192.168.8.104/eimapi",
                type: "POST",
                data: JSON.stringify({
                    "jsonrpc": "2.0",
                    "method": "getsysmenu_withuser",
                    "params": {},
                    "id": "1"
                }),
                dataType: "json",
                success: function(params) {
                    console.log("&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&")
                    console.log("params: ", params)
                    console.log("&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&")
                },
                error: function(err) {
                    // alert("失败")
                    console.log('失败')
                }
            });
        }


    }

}


module.exports = myset;