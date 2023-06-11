<!-- eslint-disable vue/html-indent -->
<template>
    <page-header-wrapper :title="数据详细">
        <a-card :bordered="false" class="ant-pro-components-tag-select" style="float: center;">
            <div class="sql-query-heading">SQL查询</div>
            <a-row>
                <a-col span="18">
                    <a-textarea v-model="query" placeholder="请输入您要执行的SQL语句" :autoSize="{ minRows: 4 }"></a-textarea>
                </a-col>
                <a-col span="6" class="sql-query-button">
                    <a-button type="primary" @click="executeQuery">执行</a-button>
                </a-col>
            </a-row>
        </a-card>
        <a-card v-if="queryResult" :bordered="false" class="sql-query-result">
            <template>
                <page-header-wrapper title="">
                    <div class="sql-query-heading">查询结果</div>
                    <a-list :dataSource="queryResult" class="query-result-list">
                        <a-list-item slot="renderItem" slot-scope="item">
                            <div>{{ item }}</div>
                        </a-list-item>
                    </a-list>
                </page-header-wrapper>
            </template>
        </a-card>
        <!-- 左侧占比较小一部分，右侧占比较大一部分 -->
        <a-layout>
            <a-card>
                <a-layout-sider width="250" style="background-color:white;">
                    <h3>数据库结构</h3>
                    <a-tree :show-line="true" @select="onSelect" :tree-data="treeData" :defaultExpandAll="true">
                    </a-tree>
                </a-layout-sider>
            </a-card>
            <a-card style="width: 100%; margin-left: 20px;">
                <a-layout-content style="margin-left: 30px;">
                    <!-- <a-table :data-source="tableData" :columns="columns" :row-key="record => record.key"></a-table> -->
                    <a-table :columns="columns" :data-source="data" :pagination="pagination"></a-table>
                </a-layout-content>
            </a-card>
        </a-layout>
    </page-header-wrapper>
</template>

<script>
import { Layout, Tree, Table, Pagination } from 'ant-design-vue'
import axios from 'axios'
import {
    // getMedInsurance, getMedPatientInfo, getShopOrderList, getMedicalList,
    // getShopPayList, getShopUserList, getStuInfoList, getStuRewardPunishment,
    // getStuScoreList, getStuStatus,
    getAllTable, getTableData
} from '@/api/data'

function generateColumns(data) {
    if (!data || data.length === 0) {
        return []
    }
    const firstRecord = data[0]
    const columns = []

    for (const key in firstRecord) {
        if (firstRecord.hasOwnProperty(key)) {
            const column = {
                title: key,
                dataIndex: key,
                align: 'center'
            }
            columns.push(column)
        }
    }
    return columns
}

export default {
    name: 'DataDetail',
    components: { ALayout: Layout, ALayoutSider: Layout.Sider, ALayoutContent: Layout.Content, ATree: Tree, ATable: Table, 'a-pagination': Pagination },
    data() {
        return {
            DataID: parseInt(this.$route.params.userID),
            treeData: [], // 数据库结构，先置为空，后续从其它变量赋值
            query: '',
            queryResult: null,
            columns: [],
            data: [],
            // 分页
            pagination: {
                current: 1,
                pageSize: 10,
                total: 0,
                showSizeChanger: true,
                showQuickJumper: true,
                pageSizeOptions: ['10'],
                onChange: this.handlePageSizeChange,
                onShowSizeChange: this.handlePageSizeChange
            }
        }
    },
    mounted() {
        this.getTreeData() // 获取数据库表结构
    },
    methods: {
        // 获取数据库结构
        getTreeData() {
            const DataBaseId = this.$route.params.id
            // 从后端获取数据库的表结构
            const params = {}
            params['DBid'] = DataBaseId
            getAllTable(params).then(res => {
                if (res.msg === '请求成功') {
                    // 更新treeData
                    this.treeData = []
                    for (const item of res.data) {
                        this.treeData.push({
                            title: item.tablesname,
                            key: item.tablesname_en
                        })
                    }
                } else {
                    console.error('请求失败')
                }
            }).catch(error => {
                this.requestFailed(error)
            })
        },
        // 执行SQL语句
        executeQuery() {
            axios.post('/api/execute-sql', { query: this.query })
                .then(response => {
                    this.queryResult = response.data
                })
                .catch(error => {
                    console.log(error)
                })
        },
        // 选择数据库表，调用获取表数据函数
        onSelect(selectedKeys, info) {
            console.log('selected', selectedKeys, info)
            if (selectedKeys[0]) {
                this.getTable(selectedKeys[0])
            } else {
                this.tableName = ''
                this.columns = []
                this.data = []
                this.pagination.total = 0
            }
        },
        // 分页
        handlePageSizeChange(page, pageSize, tablename) {
            this.pagination.current = page
            this.pagination.pageSize = pageSize
            this.loading = true
            this.getTable(tablename)
        },
        // 获取表数据,请求后端接口
        getTable(tablename) {
            const params = {}
            params['page'] = this.pagination.current
            params['pageSize'] = this.pagination.pageSize
            params['orderBy'] = 'time DESC'
            params['token'] = this.$store.getters.token
            params['tablesname_en'] = tablename // 表名
            getTableData(params).then(res => {
                if (res.msg === '请求成功') {
                    console.log(this.data)
                    this.data = res.data
                    this.pagination.total = res.data.length
                    this.columns = generateColumns(res.data)
                    // debug
                    console.log('columns:', this.columns)
                    console.log('data:', this.data)
                } else {
                    console.error('请求失败')
                }
                this.loading = false
            }).catch(error => {
                this.requestFailed(error)
            })
        }
    }
}
</script>

<style lang="less" scoped>
@import "~ant-design-vue/lib/style/themes/default.less";

.a-layout {
    height: 100vh;
}

.a-layout-content {
    padding: 24px;
    background: @layout-body-background;
    min-height: 280px;
}

.a-tree {
    height: 100%;
    overflow: auto;
}

.a-table {
    background: @component-background;
}

.page-header-wrapper {
    padding: 20px;
}

.primary {
    margin-bottom: 10px;
}

.button-wrapper {
    text-align: left;
    margin-bottom: 10px;
}

.card-list {
    margin-top: 20px;
}

.card-avatar {
    margin-bottom: 10px;
}

.meta-content {
    margin-top: 10px;
}

.ant-card-actions {
    margin-top: 10px;
}

.sql-query-heading {
    font-size: 20px;
    font-weight: bold;
    margin-bottom: 20px;
}

.sql-query-button {
    padding-left: 10px;
}

.sql-query-result {
    margin-top: 20px;
}

.query-result-list {
    margin-top: 10px;
}
</style>
