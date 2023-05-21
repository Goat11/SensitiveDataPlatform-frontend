<template>
  <page-header-wrapper :title="false">
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
          <h3>{{ tableName }}</h3>
          <a-table :data-source="tableData" :columns="columns" :row-key="record => record.key"></a-table>
        </a-layout-content>
      </a-card>
    </a-layout>
  </page-header-wrapper>
</template>

<script>
import { Layout, Tree, Table } from 'ant-design-vue'

export default {
    name: 'DataDetail',
    components: { ALayout: Layout, ALayoutSider: Layout.Sider, ALayoutContent: Layout.Content, ATree: Tree, ATable: Table },
    data() {
        return {
            DataID: parseInt(this.$route.params.userID),
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
            columns: []
        }
    },
    methods: {
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
</style>
