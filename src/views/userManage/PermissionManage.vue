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
                                <a-space size="large">
                                    <a-button type="primary" @click="handleCreate">+ 新建</a-button>
                                    <a-button type="default" @click="handleBatchOperation">批量操作</a-button>
                                </a-space>
                            </a-col>
                        </a-row>
                    </a-form>
                    <a-table :columns="columns" :dataSource="data" :pagination="pagination" rowKey="id"
                        @change="handleTableChange" :rowSelection="rowSelection">
                        <template #action="{ text, record }">
                            <a @click="handleEdit(record)">同意</a>
                            <a-divider type="vertical" />
                            <a @click="handleSub(record)">拒绝</a>
                            <a-divider type="vertical" />
                            <a @click="handleSub(record)">撤销</a>
                        </template></a-table>
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
                    title: '用户编号',
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
                    dataIndex: 'permission',
                    key: 'permission'
                }
            ],
            data: [],
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
        }
    }
}
</script>

<style lang='less' scoped>
@import '~ant-design-vue/lib/style/themes/default.less';
</style>
