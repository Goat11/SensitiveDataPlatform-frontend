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
    getMedInsurance, getMedPatientInfo, getShopOrderList, getMedicalList,
    getShopPayList, getShopUserList, getStuInfoList, getStuRewardPunishment,
    getStuScoreList, getStuStatus
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
            treeData1: [ // 后续treeData1, 2, 3, ……要从后端获取
                {
                    title: '医保表',
                    key: 'Insurance'
                },
                {
                    title: '医院表',
                    key: 'MedicalList'
                },
                {
                    title: '病人表',
                    key: 'PatientInfo'
                }
            ],
            treeData2: [
                {
                    title: '订单表',
                    key: 'OrderList'
                },
                {
                    title: '用户表',
                    key: 'UserList'
                },
                {
                    title: '支付表',
                    key: 'PayList'
                }
            ],
            treeData3: [
                {
                    title: '学生信息表',
                    key: 'StuInfo'
                },
                {
                    title: '学生奖惩表',
                    key: 'RewardPunishment'
                },
                {
                    title: '学生成绩表',
                    key: 'ScoreList'
                },
                {
                    title: '学生状态表',
                    key: 'Status'
                }
            ],
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
        this.getTreeData() // 获取数据库结构
    },
    methods: {
        // 获取数据库结构
        getTreeData() {
            const DataBaseId = this.$route.params.id
            if (DataBaseId === 1) {
                this.treeData = this.treeData1
            } else if (DataBaseId === 2) {
                this.treeData = this.treeData2
            } else if (DataBaseId === 3) {
                this.treeData = this.treeData3
            }
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
            if (selectedKeys[0] === 'Insurance') {
                this.getTable('Insurance')
            } else if (selectedKeys[0] === 'MedicalList') {
                this.getTable('MedicalList')
            } else if (selectedKeys[0] === 'PatientInfo') {
                this.getTable('PatientInfo')
            } else if (selectedKeys[0] === 'OrderList') {
                this.getTable('OrderList')
            } else if (selectedKeys[0] === 'UserList') {
                this.getTable('UserList')
            } else if (selectedKeys[0] === 'PayList') {
                this.getTable('PayList')
            } else if (selectedKeys[0] === 'StuInfo') {
                this.getTable('StuInfo')
            } else if (selectedKeys[0] === 'RewardPunishment') {
                this.getTable('RewardPunishment')
            } else if (selectedKeys[0] === 'ScoreList') {
                this.getTable('ScoreList')
            } else if (selectedKeys[0] === 'Status') {
                this.getTable('Status')
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
            // 创建一个映射对象
            const apiFunctionMap = {
                'Insurance': getMedInsurance,
                'MedicalList': getMedicalList,
                'PatientInfo': getMedPatientInfo,
                'OrderList': getShopOrderList,
                'UserList': getShopUserList,
                'PayList': getShopPayList,
                'StuInfo': getStuInfoList,
                'RewardPunishment': getStuRewardPunishment,
                'ScoreList': getStuScoreList,
                'Status': getStuStatus
            }
            // 通过映射对象获取相应的API请求函数
            const apiFunction = apiFunctionMap[tablename]
            // 调用API请求函数
            apiFunction(params).then(res => {
                if (res.msg === '请求成功') {
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
