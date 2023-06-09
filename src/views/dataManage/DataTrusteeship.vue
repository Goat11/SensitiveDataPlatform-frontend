<!-- eslint-disable vue/html-indent -->
<template>
    <page-header-wrapper :title="敏感数据管理">
        <a-card :body-style="{ padding: '24px 32px' }" :bordered="false">
            <a-form @submit="handleSubmit" :form="form">
                <a-form-item :label="$t('数据库名称')" :labelCol="{ lg: { span: 7 }, sm: { span: 7 } }"
                    :wrapperCol="{ lg: { span: 10 }, sm: { span: 17 } }">
                    <a-input v-decorator="[
                            'name',
                            { rules: [{ required: true, message: $t('form.basic-form.title.required') }] }
                        ]" name="name" :placeholder="$t('请输入您要导入的数据库名称')" />
                </a-form-item>

                <a-form-item :label="$t('数据库描述')" :labelCol="{ lg: { span: 7 }, sm: { span: 7 } }"
                    :wrapperCol="{ lg: { span: 10 }, sm: { span: 17 } }">
                    <a-textarea rows="4" :placeholder="$t('请输入您要导入的数据库描述')" v-decorator="[
                            'description',
                            { rules: [{ required: false, message: $t('form.basic-form.goal.required') }] }
                        ]" />
                </a-form-item>

                <a-form-item label="数据库标签" :labelCol="{ lg: { span: 7 }, sm: { span: 7 } }"
                    :wrapperCol="{ lg: { span: 10 }, sm: { span: 17 } }">
                    <a-select v-decorator="[
                            'select',
                            { rules: [{ required: true, message: 'Please select your country!' }] },
                        ]" placeholder="请选择一个标签">
                        <a-select-option value="student">
                            学生类
                        </a-select-option>
                        <a-select-option value="medical">
                            医疗类
                        </a-select-option>
                        <a-select-option value="shopping">
                            购物类
                        </a-select-option>
                    </a-select>
                </a-form-item>

                <a-form-item :label="$t('数据库类型')" :labelCol="{ lg: { span: 7 }, sm: { span: 7 } }"
                    :wrapperCol="{ lg: { span: 10 }, sm: { span: 17 } }">
                    <a-radio-group v-decorator="['target', { initialValue: 1 }]">
                        <a-radio :value="1">{{ $t('原始数据') }}</a-radio>
                        <a-radio :value="2">{{ $t('脱敏数据') }}</a-radio>
                    </a-radio-group>
                </a-form-item>

                <a-form-item label="上传数据" :labelCol="{ lg: { span: 7 }, sm: { span: 7 } }"
                    :wrapperCol="{ lg: { span: 10 }, sm: { span: 17 } }">
                    <div class="dropbox">
                        <a-upload-dragger v-decorator="[
                                'dragger',
                                {
                                    valuePropName: 'fileList',
                                    getValueFromEvent: normFile,
                                },
                            ]" name="files" action="/upload.do">
                            <p class="ant-upload-drag-icon">
                                <a-icon type="inbox" />
                            </p>
                            <p class="ant-upload-text">
                                点击或拖拽文件到此区域进行上传
                            </p>
                            <p class="ant-upload-hint">
                                支持单个或批量上传
                            </p>
                        </a-upload-dragger>
                    </div>
                </a-form-item>

                <a-form-item :wrapperCol="{ span: 24 }" style="text-align: center">
                    <a-button htmlType="submit" type="primary">{{ $t('form.basic-form.form.submit') }}</a-button>
                </a-form-item>
            </a-form>
        </a-card>
    </page-header-wrapper>
</template>

<script>
export default {
    name: 'DataTrusteeship',
    data() {
        return {
            form: this.$form.createForm(this)
        }
    },
    methods: {
        // handler
        handleSubmit(e) {
            e.preventDefault()
            this.form.validateFields((err, values) => {
                if (!err) {
                    console.log('Received values of form: ', values)
                }
            })
        }
    }
}
</script>
<style lang='less' scoped>
@import '~ant-design-vue/lib/style/themes/default.less';
</style>
