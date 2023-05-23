<template>
  <page-header-wrapper title="审计日志管理">
    <div>
      <a-table :columns="columns" :data-source="data" :pagination="pagination">
        <span slot="action" slot-scope="text, record">
          <template>
            <a @click="detailSyslog(record)">查看</a>
            <a-divider type="vertical" />
            <a @click="deleteOne(record.ID)">删除</a>
          </template>
        </span>
      </a-table>
    </div>
  </page-header-wrapper>
</template>

<script>
import { Table, Pagination } from 'ant-design-vue'
import { getList } from '@/api/auditLog_api'
const columns = [
  {
    title: '序号',
    dataIndex: 'id',
    scopedSlots: { customRender: 'serial' },
    width: '5%',
    align: 'center'
  },
  {
    title: '操作时间',
    dataIndex: 'createdAt',
    // customRender: (text) => secToTime(text),
    width: '15%',
    align: 'center'
  },
  {
    title: '操作内容',
    dataIndex: 'message',
    width: '10%',
    align: 'center'
  },
  {
    title: '操作用户',
    dataIndex: 'userID',
    width: '10%',
    align: 'center'
  },
  {
    title: '用户IP',
    dataIndex: 'ipAddress',
    // customRender: (text) => truncateString(text, 50),
    width: '10%',
    align: 'center'
  },
  {
    title: '操作模块',
    dataIndex: 'module',
    // customRender: (text) => truncateString(text, 50),
    width: '15%',
    align: 'center'
  },
  {
    title: '操作',
    dataIndex: 'operation',
    width: '8%',
    scopedSlots: { customRender: 'operation' },
    align: 'center'
  }
]
export default {
  name: 'AuditLogs',
  components: {
    'a-table': Table,
    'a-pagination': Pagination
  },
  data() {
    this.columns = columns
    return {
      data: [],
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
    this.getList()
  },
  methods: {
    handlePageSizeChange(page, pageSize) {
      this.pagination.current = page
      this.pagination.pageSize = pageSize
      this.loading = true
      this.getList()
    },
    getList() {
      const params = {}
      params['page'] = this.pagination.current
      params['pageSize'] = this.pagination.pageSize
      params['orderBy'] = 'logTime DESC'
      params['token'] = this.$store.getters.token
      getList(params).then(params => {
        this.data = params.data
        this.pagination.total = 200
        this.loading = false
      }).catch(error => {
        this.requestFailed(error)
      })
    }
  }
}
</script>
