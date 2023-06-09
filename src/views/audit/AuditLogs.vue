<template>
  <page-header-wrapper title="审计日志管理">
    <div>
      <a-table :columns="columns" :data-source="data" :pagination="pagination">
        <span slot="operation" slot-scope="text, record">
          <template>
            <a @click="detailSyslog(record)">查看详情</a>
          </template>
        </span>
      </a-table>
      <!-- <a-modal ref="createModal" :visible="visible" title="日志详情" @ok="handleOk" @cancel="handleCancel">
        <div style="margin-bottom: 20px;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px;">
            <h3 style="font-size: 20px; color: #333;">『{{ detail.module }}』</h3>
            <span style="font-size: 14px; color: #999;">{{ formatDate(detail.logTime) }} | {{ detail.operator }}</span>
          </div>
          <div style="font-size: 16px; line-height: 1.5; color: #666; margin-bottom: 5px;">
            <p>（1）条件：{{ detail.conditions }}</p>
            <p>（2）结果：{{ detail.result }}</p>
            <p>（3）行为：{{ detail.action }}</p>
            <p>（4）状态：{{ detail.status }}</p>
          </div>
        </div>
      </a-modal> -->
    </div>
  </page-header-wrapper>
</template>

<script>
import { Table, Pagination, Modal } from 'ant-design-vue'
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
    'a-pagination': Pagination,
    'a-modal': Modal
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
    },
    detailSyslog(record) {
      // console.log(record)
      // this.mdl = null
      // this.visible = true
      // this.detail = { ...record }
      Modal.info({
        title: '详细信息',
        // 查看日志详情这里还要修改
        content: <p>${record.module}</p>
      })
    }
  }
}
</script>
