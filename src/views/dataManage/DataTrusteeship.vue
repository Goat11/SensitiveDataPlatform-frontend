<!-- eslint-disable vue/html-indent -->
<template>
  <page-header-wrapper :title="敏感数据管理">
    <a-card :body-style="{ padding: '24px 32px' }" :bordered="false">
      <a-form @submit="handleSubmit" :form="form">
        <a-form-item :label="$t('数据库名称')"
                     :labelCol="{ lg: { span: 7 }, sm: { span: 7 } }"
                     :wrapperCol="{ lg: { span: 10 }, sm: { span: 17 } }">
          <a-input v-decorator="[
                            'DBname',
                            { rules: [{ required: true, message: $t('form.basic-form.title.required') }] }
                        ]"
                   name="name"
                   :placeholder="$t('请输入您要导入的数据库名称')" />
        </a-form-item>

        <a-form-item :label="$t('数据库描述')"
                     :labelCol="{ lg: { span: 7 }, sm: { span: 7 } }"
                     :wrapperCol="{ lg: { span: 10 }, sm: { span: 17 } }">
          <a-textarea rows="4"
                      :placeholder="$t('请输入您要导入的数据库描述')"
                      v-decorator="[
                            'DBdescribe',
                            { rules: [{ required: false, message: $t('form.basic-form.goal.required') }] }
                        ]" />
        </a-form-item>

        <a-form-item :label="$t('数据库表名')"
                     :labelCol="{ lg: { span: 7 }, sm: { span: 7 } }"
                     :wrapperCol="{ lg: { span: 10 }, sm: { span: 17 } }">
          <a-textarea rows="4"
                      :placeholder="$t('请输入您要导入的数据库表名（用中文逗号隔开）')"
                      v-decorator="[
                            'alltbname',
                            { rules: [{ required: false, message: $t('form.basic-form.goal.required') }] }
                        ]" />
        </a-form-item>

<!--        <a-form-item label="数据库标签"-->
<!--                     :labelCol="{ lg: { span: 7 }, sm: { span: 7 } }"-->
<!--                     :wrapperCol="{ lg: { span: 10 }, sm: { span: 17 } }">-->
<!--          <a-select v-decorator="[-->
<!--                            'select',-->
<!--                            { rules: [{ required: true, message: 'Please select your country!' }] },-->
<!--                        ]"-->
<!--                    placeholder="请选择一个标签">-->
<!--            <a-select-option value="student">-->
<!--              学生类-->
<!--            </a-select-option>-->
<!--            <a-select-option value="medical">-->
<!--              医疗类-->
<!--            </a-select-option>-->
<!--            <a-select-option value="shopping">-->
<!--              购物类-->
<!--            </a-select-option>-->
<!--          </a-select>-->
<!--        </a-form-item>-->

<!--        <a-form-item :label="$t('数据库类型')"-->
<!--                     :labelCol="{ lg: { span: 7 }, sm: { span: 7 } }"-->
<!--                     :wrapperCol="{ lg: { span: 10 }, sm: { span: 17 } }">-->
<!--          <a-radio-group v-decorator="['target', { initialValue: 1 }]">-->
<!--            <a-radio :value="1">{{ $t('原始数据') }}</a-radio>-->
<!--            <a-radio :value="2">{{ $t('脱敏数据') }}</a-radio>-->
<!--          </a-radio-group>-->
<!--        </a-form-item>-->

        <a-form-item label="上传数据"
                     :labelCol="{ lg: { span: 7 }, sm: { span: 7 } }"
                     :wrapperCol="{ lg: { span: 10 }, sm: { span: 17 } }">
          <div class="dropbox">
            <a-upload-dragger v-decorator="[
                                'file'
                            ]"
                              name="files"
                              :before-upload="beforeUpload"
                              :fileList="fileList">
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
          <a-button htmlType="submit" type="primary">解析</a-button>
        </a-form-item>
      </a-form>
    </a-card>
    <a-modal :visible="visible" title="敏感字段识别" @ok="handleOk" okText="提交">
<!--      <a-select-->
<!--        :value="tableValue"-->
<!--        style="width: 200px"-->
<!--        :options="tableOptions"-->
<!--      ></a-select>-->
      表名：<a-select
        style="width: 200px"
        @change="handleChange"
      >
        <a-select-option v-for="option in tableOptions" :value="option.value" :key="option.value">
          {{ option.title }}
        </a-select-option>
      </a-select>
      <br/><br/>
      <div v-if="checkOptions.length!==0">自动化识别结果如下： </div><br />
      <div>
        <a-checkbox style="display: block; margin-bottom: 10px;" v-for="option in checkOptions" :key="option.value" :checked="option.checked" @change="option.checked=!option.checked">
          {{ option.title }}
        </a-checkbox>
      </div>
    </a-modal>
  </page-header-wrapper>
</template>

<script>
import { databaseUpdate } from '@/api/data'

export default {
  name: 'DataTrusteeship',
  data() {
    return {
      form: this.$form.createForm(this),
      fileList: [], // 文件列表
      visible: false,
      tableValue: '',
      checkOptions: '',
      tableOptions: [],
      data: { 'Volunteer_UserInfo': ['VolunteerID', 'Name', 'Gender', 'Phone', 'Address', 'IDCard'],
        'Volunteer_VolunteerRecord': ['RecordID', 'VolunteerID', 'ItemName', 'ItemID', 'VolunteerDate', 'VolunteerHours'] }
    }
  },
  created() {
    this.tableOptions = Object.keys(this.data).flatMap(key => {
        return { value: key, title: key, key: key }
    })
  },
  methods: {
    handleChange(option) {
      const checkFields = ['VolunteerID', 'Phone', 'Address', 'IDCard', 'RecordID', 'VolunteerID']
      this.checkOptions = this.data[option].map((dict) => {
        const isChecked = checkFields.includes(dict)
        return { value: dict, title: dict, key: dict, checked: isChecked }
      })
      // VolunteerID、Phone、Address、IDCard、RecordID、VolunteerID
    },
    handleOk() {
      this.$message.success('提交成功')
      this.visible = false
    },
    // 文件上传前的检查
    beforeUpload(file) {
      // 添加文件到文件列表中
      this.fileList.push(file)
      return false // 取消默认的上传行为
    },
    // handler
    handleSubmit(e) {
      e.preventDefault()
      this.form.validateFields((err, values) => {
        if (!err) {
          console.log('Received values of form: ', values)
          // 创建一个FormData对象
          values['file'] = this.fileList[0]
          values['token'] = this.$store.getters.token
          const formData = new FormData()
          // 将对象的属性和值添加到formData中
          for (const [key, value] of Object.entries(values)) {
            formData.append(key, value)
          }
          databaseUpdate(formData).then((res) => {
            if (res.status === 1) {
              this.$message.success(res.data.msg)
              this.form.resetFields()
              this.visible = true
            } else {
              this.$message.error('解析失败，请重新检查后解析')
            }
          })
        }
      })
    }
  }
}
</script>
<style lang='less' scoped>
@import '~ant-design-vue/lib/style/themes/default.less';
</style>
