<!-- eslint-disable vue/html-indent -->
<template>
    <page-header-wrapper :title="数据详细">
        <a-layout>
            <a-card>
                <a-layout-sider width="250" style="background-color:white;">
                    <h3>数据库结构</h3>
                    <a-tree :show-line="true" @select="onSelect" :tree-data="treeData" :defaultExpandAll="true">
                    </a-tree>
                </a-layout-sider>
            </a-card>
            <a-card style="width: 100%; margin-left: 20px;">
                <a-card :bordered="false" class="ant-pro-components-tag-select">
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
                    <div class="sql-query-heading">查询结果</div>
                    <a-list :dataSource="queryResult" class="query-result-list">
                        <a-list-item slot="renderItem" slot-scope="item">
                            <div>{{ item }}</div>
                        </a-list-item>
                    </a-list>
                </a-card>
                <a-layout-content style="margin-left: 30px;">
                    <h3>{{ tableName }}</h3>
                    <a-table :data-source="tableData" :columns="columns" :row-key="record => record.key"></a-table>
                </a-layout-content>
            </a-card>
        </a-layout>
    </page-header-wrapper>
</template>

<script>
import { Layout, Tree, Table } from 'ant-design-vue'
import axios from 'axios'

export default {
    name: 'DataDetail',
    components: { ALayout: Layout, ALayoutSider: Layout.Sider, ALayoutContent: Layout.Content, ATree: Tree, ATable: Table },
    data() {
        return {
            // DataID: parseInt(this.$route.params.userID)
            treeData: [
                {
                    title: '学生信息数据库',
                    name: '数据库',
                    key: 'database',
                    children: [
                        { name: '学生表', key: 'table1', title: '学生表' },
                        { name: '成绩表', key: 'table2', title: '成绩表' }
                    ]
                }
            ],
            tableName: '',
            tableData: [],
            columns: [],
            query: '',
            queryResult: null
        }
    },
    mounted() {
        const id = this.$route.params.id
        this.getTableData(id)
    },
    methods: {
        executeQuery() {
            axios.post('/api/execute-sql', { query: this.query })
                .then(response => {
                    this.queryResult = response.data
                })
                .catch(error => {
                    console.log(error)
                })
        },
        onSelect(selectedKeys, info) {
            console.log('selected', selectedKeys, info)
            if (selectedKeys[0] === 'table1') {
                this.tableName = '学生表'
                this.columns = [
                    { title: '学号', dataIndex: 'id', key: 'id' },
                    { title: '姓名', dataIndex: 'name', key: 'name' },
                    { title: '性别', dataIndex: 'gender', key: 'gender' },
                    { title: '班级', dataIndex: 'class', key: 'class' }
                ]
                this.tableData = [
                    { key: '1', id: '001', name: '张三', gender: '男', class: '一班' },
                    { key: '2', id: '002', name: '李四', gender: '女', class: '二班' }
                ]
            } else if (selectedKeys[0] === 'table2') {
                this.tableName = '成绩表'
                this.columns = [
                    { title: '学号', dataIndex: 'id', key: 'id' },
                    { title: '课程', dataIndex: 'course', key: 'course' },
                    { title: '成绩', dataIndex: 'score', key: 'score' }
                ]
                this.tableData = [
                    { key: '1', id: '001', course: '数学', score: '89' },
                    { key: '2', id: '002', course: '数学', score: '95' }
                ]
            } else {
                this.tableName = ''
                this.columns = []
                this.tableData = []
            }
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
