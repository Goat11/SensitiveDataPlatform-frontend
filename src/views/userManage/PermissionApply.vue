<template>
<page-header-wrapper title="用户权限申请">
  <div>
    <a-card :bordered="false" class="ant-pro-components-tag-select">
      <a-form :form="form" layout="inline">
        <standard-form-row title="所属类目" block style="padding-bottom: 11px;">
          <a-form-item>
            <tag-select>
              <tag-select-option value="Category2">学生类</tag-select-option>
              <tag-select-option value="Category3">医疗类</tag-select-option>
              <tag-select-option value="Category4">购物类</tag-select-option>
            </tag-select>
          </a-form-item>
        </standard-form-row>
        <standard-form-row title="数据库" grid>
          <a-row>
            <a-col :md="24">
              <a-form-item :wrapper-col="{ span: 24 }">
                <a-select
                  style="max-width: 268px; width: 100%;"
                  mode="multiple"
                  placeholder="输入数据库名称"
                  v-decorator="['owner']"
                  @change="handleChange"
                >
                  <a-select-option v-for="item in owners" :key="item.id">{{ item.name }}</a-select-option>
                </a-select>
                <a class="list-articles-trigger" @click="setOwner">只看自己的</a>
              </a-form-item>
            </a-col>
          </a-row>
        </standard-form-row>

        <standard-form-row title="其它选项" grid last>
          <a-row :gutter="16">
            <a-col :xs="24" :sm="24" :md="12" :lg="10" :xl="8">
              <a-form-item label="数据库平台" :wrapper-col="{ xs: 24, sm: 24, md: 12 }">
                <a-select placeholder="不限" style="max-width: 200px; width: 100%;">
                  <a-select-option value="MySQL">MySQL</a-select-option>
                  <a-select-option value="达梦">达梦</a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
            <a-col :xs="24" :sm="24" :md="12" :lg="10" :xl="8">
              <a-form-item label="年份" :wrapper-col="{ xs: 24, sm: 24, md: 12 }">
                <a-select placeholder="不限" style="max-width: 200px; width: 100%;">
                  <a-select-option value="2023">2023</a-select-option>
                  <a-select-option value="2022">2022</a-select-option>
                  <a-select-option value="2021">2021</a-select-option>
                  <a-select-option value="2020">2020</a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
          </a-row>
        </standard-form-row>
      </a-form>
    </a-card>

    <a-card style="margin-top: 24px;" :bordered="false">
      <a-list
        size="large"
        rowKey="id"
        :loading="loading"
        itemLayout="vertical"
        :dataSource="data"
      >
        <a-list-item :key="item.id" slot="renderItem" slot-scope="item">
          <template slot="actions">
            <icon-text type="star-o" :text="item.star" />
            <icon-text type="like-o" :text="item.like" />
            <icon-text type="message" :text="item.message" />
            <a-button type="link" @click="viewDetail(item)">查看详情</a-button>
            <a-button type="primary" @click="applyAccess(item)">申请访问</a-button>
          </template>
          <a-list-item-meta>
            <a slot="title" href="https://vue.ant.design/">{{ item.title }}</a>
            <template slot="description">
              <span>
                <a-tag>MySQL</a-tag>
                <a-tag>2020年</a-tag>
                <a-tag>淘宝</a-tag>
              </span>
            </template>
          </a-list-item-meta>
          <article-list-content :description="item.description" :owner="item.owner" :avatar="item.avatar" :href="item.href" :updateAt="item.updatedAt" />
        </a-list-item>
        <div slot="footer" v-if="data.length > 0" style="text-align: center; margin-top: 16px;">
          <a-button @click="loadMore" :loading="loadingMore">加载更多</a-button>
        </div>
      </a-list>
    </a-card>
  </div></page-header-wrapper>
</template>

<script>
import { TagSelect, StandardFormRow, ArticleListContent } from '@/components'
import IconText from './IconText'
const TagSelectOption = TagSelect.Option

const owners = [
  {
    id: 'wzj',
    name: '我自己'
  },
  {
    id: 'wjh',
    name: '吴家豪'
  },
  {
    id: 'zxx',
    name: '周星星'
  },
  {
    id: 'zly',
    name: '赵丽颖'
  },
  {
    id: 'ym',
    name: '姚明'
  }
]

export default {
  name: 'PermissionApply',
  components: {
    TagSelect,
    TagSelectOption,
    StandardFormRow,
    ArticleListContent,
    IconText
  },
  data () {
    return {
      owners,
      loading: true,
      loadingMore: false,
      data: [],
      form: this.$form.createForm(this)
    }
  },
  mounted () {
    this.getList()
  },
  methods: {
    handleChange (value) {
      console.log(`selected ${value}`)
    },
    getList () {
      this.$http.get('/list/article').then(res => {
        console.log('res', res)
        this.data = res.result
        this.loading = false
      })
    },
    loadMore () {
      this.loadingMore = true
      this.$http.get('/list/article').then(res => {
        this.data = this.data.concat(res.result)
      }).finally(() => {
        this.loadingMore = false
      })
    },
    setOwner () {
      const { form: { setFieldsValue } } = this
      setFieldsValue({
        owner: ['wzj']
      })
    }
  }
}
</script>

<style lang="less" scoped>
.ant-pro-components-tag-select {
  :deep(.ant-pro-tag-select .ant-tag) {
    margin-right: 24px;
    padding: 0 8px;
    font-size: 14px;
  }
}

.list-articles-trigger {
  margin-left: 12px;
}
</style>
