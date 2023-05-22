<!-- eslint-disable vue/html-indent -->
<template>
    <page-header-wrapper :title="数据查看">
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
                                    <a-select style="max-width: 268px; width: 100%;"
mode="multiple"
placeholder="输入数据库名称"
                                        v-decorator="['owner']"
@change="handleChange">
                                        <a-select-option v-for="item in owners" :key="item.id">{{ item.name
                                        }}</a-select-option>
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
            <a-list rowKey="id"
:grid="{ gutter: 24, lg: 3, md: 2, sm: 1, xs: 1 }"
:dataSource="dataSource"
                class="card-list"
style="margin-top: 20px;">
                <a-list-item slot="renderItem" slot-scope="item">
                    <template v-if="!item || item.id === undefined">
                        <a-button class="new-btn" type="dashed">
                            <a-icon type="plus" />
                            导入新数据
                        </a-button>
                    </template>
                    <template v-else>
                        <a-card :hoverable="true">
                            <a-card-meta>
                                <a slot="title">{{ item.title }}</a>
                                <a-avatar class="card-avatar" slot="avatar" :src="item.avatar" size="large" />
                                <div class="meta-content" slot="description">{{ item.content }}</div>
                            </a-card-meta>
                            <template class="ant-card-actions" slot="actions">
                                <a @click="handleClick">原始数据</a>
                                <a @click="DataDetail(item)">脱敏数据</a>
                            </template>
                        </a-card>
                    </template>
                </a-list-item>
            </a-list>
        </div>
    </page-header-wrapper>
</template>

<script>
import { TagSelect, StandardFormRow, ArticleListContent } from '@/components'
import router from '@/router/index'
// import IconText from './IconText'
const TagSelectOption = TagSelect.Option

const dataSource = []
dataSource.push({
    id: 0,
    title: '学生信息数据库',
    avatar: 'https://www.quest.com/Images/icons/svg/database-quest-blue.svg',
    content: '学生信息数据库'
})
dataSource.push({
    id: 1,
    title: '医疗信息数据库',
    avatar: 'https://www.quest.com/Images/icons/svg/database-quest-blue.svg',
    content: '医疗信息数据库。'
})
dataSource.push({
    id: 2,
    title: '医疗信息数据库2',
    avatar: 'https://www.quest.com/Images/icons/svg/database-quest-blue.svg',
    content: '医疗信息数据库2'
})
dataSource.push({
    id: 3,
    title: '购物信息数据库',
    avatar: 'https://www.quest.com/Images/icons/svg/database-quest-blue.svg',
    content: '购物信息数据库'
})
dataSource.push({
    id: 4,
    title: '购物信息数据库2',
    avatar: 'https://www.quest.com/Images/icons/svg/database-quest-blue.svg',
    content: '购物信息数据库2'
})

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
    name: 'DataView',
    components: {
        TagSelect,
        TagSelectOption,
        StandardFormRow,
        ArticleListContent
        // IconText
    },
    data() {
        return {
            dataSource,
            owners,
            loading: true,
            loadingMore: false,
            data: [],
            form: this.$form.createForm(this)
        }
    },
    mounted() {
        this.getList()
    },
    methods: {
        handleClick() {
            // 这里可以根据实际情况检查用户权限，这里仅做示例
            // const hasPermission = false
            // const result = response.data
            // commit('SET_ROLETYPE', result.roleType)
            // if (result.roleType === 2 || result.roleType === '2') {
            //     this.$message.error('您没有访问权限！')
            // }
            this.$message.error('您没有访问权限！')
        },
        DataDetail(Data) {
            router.push({
                name: 'DataDetail',
                params: { id: Data.id }
            })
        },
        handleChange(value) {
            console.log(`selected ${value}`)
        },
        getList() {
            this.$http.get('/list/article').then(res => {
                console.log('res', res)
                this.data = res.result
                this.loading = false
            })
        },
        loadMore() {
            this.loadingMore = true
            this.$http.get('/list/article').then(res => {
                this.data = this.data.concat(res.result)
            }).finally(() => {
                this.loadingMore = false
            })
        },
        setOwner() {
            const { form: { setFieldsValue } } = this
            setFieldsValue({
                owner: ['wzj']
            })
        }
    }
}
</script>
<style lang='less' scoped>
@import '~ant-design-vue/lib/style/themes/default.less';
@import "~@/components/index.less";

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

.card-list {
    :deep(.ant-card-body:hover) {
        .ant-card-meta-title>a {
            color: @primary-color;
        }
    }

    :deep(.ant-card-meta-title) {
        margin-bottom: 12px;

        &>a {
            display: inline-block;
            max-width: 100%;
            color: rgba(0, 0, 0, .85);
        }
    }

    :deep(.meta-content) {
        position: relative;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        height: 64px;
        -webkit-line-clamp: 3;
        -webkit-box-orient: vertical;

        margin-bottom: 1em;
    }
}

.card-avatar {
    width: 48px;
    height: 48px;
    border-radius: 48px;
}

.ant-card-actions {
    background: #f7f9fa;

    li {
        float: left;
        text-align: center;
        margin: 12px 0;
        color: rgba(0, 0, 0, 0.45);
        width: 50%;

        &:not(:last-child) {
            border-right: 1px solid #e8e8e8;
        }

        a {
            color: rgba(0, 0, 0, .45);
            line-height: 22px;
            display: inline-block;
            width: 100%;

            &:hover {
                color: @primary-color;
            }
        }
    }
}

.new-btn {
    background-color: #fff;
    border-radius: 2px;
    width: 100%;
    height: 188px;
}
</style>
