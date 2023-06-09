<!-- eslint-disable vue/html-indent -->
<template>
    <page-header-wrapper :title="数据查看">
        <template v-slot:content>
        </template>
        <div>
            <a-card :bordered="false" class="ant-pro-components-tag-select">
                <a-form :form="form" layout="inline">
                    <standard-form-row grid last>
                        <a-row :gutter="[0, 20]">
                            <a-col :md="8" :sm="24">
                                <div class="form-item-inline">
                                    <span>数据库名称:</span>
                                    <a-form-item :wrapper-col="{ span: 24 }">
                                        <a-input-search style="max-width: 268px; width: 100%;" placeholder="请输入数据库名称"
                                            v-decorator="['owner']" @search="handleSearch" />
                                    </a-form-item>
                                </div>
                            </a-col>
                            <a-col :md="8" :sm="24">
                                <div class="form-item-inline">
                                    <span>数据库类型:</span>
                                    <a-form-item :wrapper-col="{ span: 24 }">
                                        <a-select placeholder="不限" style="width: 200px;">
                                            <a-select-option value="MySQL">MySQL</a-select-option>
                                            <a-select-option value="达梦">达梦</a-select-option>
                                            <a-select-option value="Oracle">Oracle</a-select-option>
                                        </a-select>
                                    </a-form-item>
                                </div>
                            </a-col>
                            <a-col :md="8" :sm="24">
                                <a-form-item>
                                    <a-button type="primary">查询</a-button>
                                    <a-button style="margin-left: 8px" @click="resetQuery">重置</a-button>
                                </a-form-item>
                            </a-col>
                        </a-row>
                    </standard-form-row>
                </a-form>
            </a-card>
            <a-list rowKey="id" :grid="{ gutter: 24, lg: 3, md: 2, sm: 1, xs: 1 }" :dataSource="dataSource"
                class="card-list" style="margin-top: 20px;">
                <a-list-item slot="renderItem" slot-scope="item">
                    <template v-if="!item || item.id === undefined">
                        <a-button class="new-btn" type="dashed" @click="DataTrusteeship">
                            <a-icon type="plus" />
                            导入新数据
                        </a-button>
                    </template>
                    <template v-else>
                        <a-card :hoverable="true">
                            <a-card-meta @click="DataDetail(item)">
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
import { getAllDatabase } from '@/api/data'

// import IconText from './IconText'
const TagSelectOption = TagSelect.Option

// dataSource.push({
//     // id: 0, // 不写id，表示是新增按钮
//     title: '导入新数据',
//     avatar: 'https://www.quest.com/Images/icons/svg/database-quest-blue.svg',
//     content: '导入新数据'
// })
// dataSource.push({
//     id: 1,
//     title: '医疗信息数据库',
//     avatar: 'https://www.quest.com/Images/icons/svg/database-quest-blue.svg',
//     content: '医疗信息数据库'
// })
// dataSource.push({
//     id: 2,
//     title: '购物信息数据库',
//     avatar: 'https://www.quest.com/Images/icons/svg/database-quest-blue.svg',
//     content: '购物信息数据库'
// })
// dataSource.push({
//     id: 3,
//     title: '学生信息数据库',
//     avatar: 'https://www.quest.com/Images/icons/svg/database-quest-blue.svg',
//     content: '学生信息数据库'
// })

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
            dataSource: [],
            loading: true,
            loadingMore: false,
            data: [],
            form: this.$form.createForm(this)
        }
    },
    mounted() {
        // 初始化数据
        this.dataSource.push({
            // id: 0, // 不写id，表示是新增按钮
            title: '导入新数据',
            avatar: 'https://www.quest.com/Images/icons/svg/database-quest-blue.svg',
            content: '导入新数据'
        })
        // 获取所有数据库
        this.getDataBase()
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
        handleChange(value) {
            console.log(`selected ${value}`)
        },
        // 跳转到数据详情页面
        DataDetail(Data) {
            router.push({
                name: 'DataDetail',
                params: { id: Data.id }
            })
        },
        // 跳转到数据托管页面
        DataTrusteeship() {
            router.push({
                name: 'DataTrusteeship'
            })
        },
        // 获取所有数据库
        getDataBase() {
            const params = {}
            //            params['token'] = this.$store.getters.token
            // 调用API请求函数
            getAllDatabase(params).then(res => {
                // if (res.msg === '请求成功') {
                // } else {
                //     console.error('请求失败')
                // }
                for (let i = 0; i < res.data.length; i++) {
                    this.dataSource.push({
                        id: res.data[i].id,
                        title: res.data[i].DBname,
                        avatar: 'https://www.quest.com/Images/icons/svg/database-quest-blue.svg',
                        content: res.data[i].DBdescribe
                    })
                }
            }).catch(error => {
                console.error(error)
            })
        }

    }
}
</script>
<style lang='less' scoped>
@import '~ant-design-vue/lib/style/themes/default.less';

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
    height: 200px;
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

.form-item-inline {
    display: flex;
    align-items: center;
    margin-bottom: 16px;
}

.form-item-inline span {
    margin-right: 8px;
}
</style>
