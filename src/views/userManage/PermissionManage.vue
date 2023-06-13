<!-- eslint-disable vue/html-indent -->
<template>
    <page-header-wrapper title="用户权限管理">
        <a-layout>
            <a-layout-content>
                <a-card>
                    <a-form layout="inline">
                        <a-row :gutter="[0, 20]">
                            <a-col :md="8" :sm="24">
                                <a-form-item label="用户编号">
                                    <a-input v-model="search.userId" placeholder="请输入用户编号" />
                                </a-form-item>
                            </a-col>
                            <a-col :md="8" :sm="24">
                                <a-form-item label="状态">
                                    <a-select v-model="search.status" placeholder="请选择状态" style="width: 200px;">
                                        <a-select-option value="close">关闭</a-select-option>
                                        <a-select-option value="applying">申请中</a-select-option>
                                        <a-select-option value="granted">已授权</a-select-option>
                                        <a-select-option value="error">异常</a-select-option>
                                    </a-select>
                                </a-form-item>
                            </a-col>
                            <a-col :md="8" :sm="24">
                                <a-form-item>
                                    <a-button type="primary" @click="$refs.table.refresh(true)">查询</a-button>
                                    <a-button style="margin-left: 8px" @click="resetQuery">重置</a-button>
                                </a-form-item>
                            </a-col>
                            <a-col :md="8" :sm="24">
                            <!-- <a-space size="large">
                                    <a-button type="primary" @click="handleCreate">+ 新建</a-button>
                                    <a-button type="default" @click="handleBatchOperation">批量操作</a-button>
                                                                        </a-space> -->
                            </a-col>
                        </a-row>
                    </a-form>
                    <a-table :columns="columns"
:dataSource="data"
:pagination="pagination"
rowKey="id"
                        @change="handleTableChange"
:rowSelection="rowSelection">
                    <!-- <template slot="status" slot-scope="scope">
                            <a-badge :status="text | statusTypeFilter" :text="scope" />
                                </template> -->
                        <template slot="permission" slot-scope="scope">
                            <!-- <a>Invite 一 {{ scope.row }}</a> -->
                            <a-button v-if="scope.status=='待审批'"
type="primary"
style="margin-right:5px"
shape="circle"
icon="check"
                                @click="agree(scope)"></a-button>
                            <a-button v-if="scope.status=='待审批'"
type="danger"
style="margin-right:5px"
shape="circle"
icon="close"
                                @click="refuse(scope)"></a-button>
                            <a-button v-if="scope.status=='已通过'||scope.status=='已拒绝'"
type="normal"
style="margin-right:5px"
shape="circle"
icon="undo"
                                @click="undo(scope)"></a-button>
                        </template>
                    <!-- <template #action="{ text, record }">
                            <a @click="handleEdit(record)">同意</a>
                            <a-divider type="vertical" />
                            <a @click="handleSub(record)">拒绝</a>
                            <a-divider type="vertical" />
                                                        <a @click="handleSub(record)">撤销</a> -->
                        <!-- </template> -->
                    </a-table>
                </a-card>
            </a-layout-content>
        </a-layout>
    </page-header-wrapper>
</template>
<script>
export default {
    name: 'PermissionManage',
    data() {
        return {
            columns: [
                {
                    title: '用户',
                    dataIndex: 'userId',
                    key: 'userId'
                },
                {
                    title: '描述',
                    dataIndex: 'description',
                    key: 'description'
                },
                {
                    title: '状态',
                    dataIndex: 'status',
                    key: 'status'
                },
                {
                    title: '更新时间',
                    dataIndex: 'updateTime',
                    key: 'updateTime'
                },
                {
                    title: '权限申请管理',
                    // dataIndex: 'permission',
                    key: 'permission',
                    scopedSlots: { customRender: 'permission' }
                }
            ],
            data: [{
                userId: 'test_user',
                description: '申请查看字段',
                status: '待审批',
                updateTime: '2023-06-12 21:50',
                permission: []
            }, {
                userId: 'test_user',
                description: '申请查看字段',
                status: '已通过',
                updateTime: '2023-06-12 22:53',
                permission: []
            }, {
                userId: 'test_user',
                description: '申请查看字段',
                status: '待审批',
                updateTime: '2023-06-12 23:03',
                permission: []
            }
            ],
            pagination: {
                current: 1,
                pageSize: 10,
                total: 0
            },
            search: {
                userId: '',
                status: ''
            },
            rowSelection: {}
        }
    },
    filters: {
        statusFilter(type) {
            return statusMap[type].text
        },
        statusTypeFilter(type) {
            return statusMap[type].status
        }
    },
    methods: {
        handleSearch() {
            // 查询用户记录的实现代码
        },
        handleCreate() {
            // 新建用户的实现代码
        },
        handleBatchOperation() {
            // 批量操作的实现代码
        },
        handleTableChange(pagination) {
            this.pagination = pagination
            // 分页查询的实现代码
        },
        // isStatus(data) {
        //     if (data === '待审批') {
        //         return 0
        //     } else if (data === '已通过') {
        //         return 1
        //     } else if (data === '已拒绝') {
        //         return 2
        //     } else {
        //         return 3
        //     }
        // },
        agree(data) {
            console.log(data)
            data.status = '已通过'
            this.$notification.open({
                message: '已同意',
                description:
                    '已同意' + data.userId + '的申请',
                icon: <a-icon type="smile" style="color: #00FF66" />
            })
        },
        refuse(data) {
            console.log(data)
            data.status = '已拒绝'
            this.$notification.open({
                message: '已拒绝',
                description:
                    '已拒绝' + data.userId + '的申请',
                icon: <a-icon type="frown" style="color: #FF3300" />
            })
        },
        undo(data) {
            console.log(data)
            data.status = '待审批'
            this.$notification.open({
                message: '已撤销',
                description:
                    '已撤销' + data.userId + '的申请',
                icon: <a-icon type="coffee" style="color: #108ee9" />
            })
        }
    }
}
const statusMap = {
    0: {
        status: 'success',
        text: '已通过'
    },
    1: {
        status: 'error',
        text: '未通过'
    },
    2: {
        status: 'processing',
        text: '待通过'
    }
}

</script>

<style lang='less' scoped>
@import '~ant-design-vue/lib/style/themes/default.less';
</style>
