<template>
  <page-header-wrapper title="审计日志管理">
    <div>
      <a-table :columns="columns" :data-source="data" :pagination="pagination"></a-table>
    </div>
  </page-header-wrapper>
</template>

<script>
import { Table, Pagination } from 'ant-design-vue'
import axios from 'axios'

export default {
  name: 'AuditLogs',
  components: {
    'a-table': Table,
    'a-pagination': Pagination
  },
  data() {
    return {
      columns: [
        { title: '序号', dataIndex: 'id', key: 'id' },
        { title: '操作时间', dataIndex: 'operationTime', key: 'operationTime' },
        { title: '操作者', dataIndex: 'operator', key: 'operator' },
        { title: '操作模块名', dataIndex: 'moduleName', key: 'moduleName' },
        { title: '条件', dataIndex: 'condition', key: 'condition' },
        { title: '结果', dataIndex: 'result', key: 'result' },
        { title: '操作', dataIndex: 'operation', key: 'operation' }
      ],
      data: [],
      pagination: {
        current: 1,
        pageSize: 10,
        total: 0,
        showSizeChanger: true,
        showQuickJumper: true,
        pageSizeOptions: ['10', '20', '30', '40']
      }
    }
  },
  mounted() {
    this.loadData()
  },
  methods: {
    loadData() {
      axios.get('/api/auditLog', {
        params: {
          pageNum: this.pagination.current,
          pageSize: this.pagination.pageSize
        }
      }).then(response => {
        const data = response.data.list
        this.data = data
        this.pagination.total = response.data.total
      }).catch(error => {
        console.log(error)
      })
    },
    handlePageChange(page) {
      this.pagination.current = page
      this.loadData()
    },
    handlePageSizeChange(pageSize) {
      this.pagination.pageSize = pageSize
      this.loadData()
    }
  }
}
</script>
