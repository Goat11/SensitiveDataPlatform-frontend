<template>
  <page-header-wrapper :title="false">
    <template v-slot:content>
      <div class="page-header-content" style="margin-top: 10px;">
        <a-row :gutter="24">
          <a-col :xl="1" :lg="24" :md="24" :sm="24" :xs="24">
            <div class="avatar">
              <a-avatar size="large" :src="currentUser.avatar" />
            </div>
          </a-col>
          <a-col :xl="10"
                 :lg="24"
                 :md="24"
                 :sm="24"
                 :xs="24"
                 style="margin-left: 20px;">
            <div class="content">
              <div style="font-size: 20px; font-weight: bold;">
                <!-- {{ timeFix }},{{ user.name }} <span class="welcome-text">{{ welcome }}</span> -->
                {{ timeFix }}, {{ user }} ！<span class="welcome-text">{{ welcome }}</span>
              </div>
              <!-- <div>
                XX企业xx部门xx岗位 -->
              <!-- {{ user.description }} -->
              <!-- </div> -->
            </div>
          </a-col>
        </a-row>
      </div>
    </template>
    <!-- <template v-slot:extraContent>
      <div class="user-stats">
        <a-row :gutter="4">
          <a-col :span="8">
            <a-statistic title="粉丝" :value="user.followerCount">
            </a-statistic>
          </a-col>
          <a-col :span="8">
            <a-statistic title="文章" :value="user.postCount ? user.postCount : 105">
            </a-statistic>
          </a-col>
          <a-col :span="8">
            <a-statistic title="文章" :value="user.postCount ? user.postCount : 105">
            </a-statistic>
          </a-col>
        </a-row>
      </div>
    </template> -->
    <div>
      <a-row :gutter="24">
        <a-col :xl="10" :lg="24" :md="24" :sm="24" :xs="24">

          <a-card class="project-list" style="margin-bottom: 24px; " :bordered="false" :body-style="{ padding: 0 }">
            <div>
              <a-carousel autoplay :dots="false">
                <div>
                  <img src="@/assets/1.jpg" style="width: 100%; height: 200px;" />
                </div>
                <div>
                  <img src="@/assets/2.jpg" style="width: 100%; height: 200px;" />
                </div>
                <div>
                  <img src="@/assets/3.jpg" style="width: 100%; height: 200px;" />
                </div>
              </a-carousel>
            </div>
          </a-card>
          <a-card :loading="loading" title="消息列表" :bordered="false" style="height:450px;overflow-y: auto;">
            <div class="notification-list">
            </div>
            <div v-if="notifications.length === 0" class="no-data">暂无数据</div>
            <div v-else>
              <div v-for="(item, index) in notifications" :key="index" class="notification-item">
                <div class="notification-header">{{ item.title }}</div>
                <div class="notification-content">{{ item.content }}</div>
                <div class="notification-time">{{ item.time }}</div>
              </div>
            </div>
          </a-card>

        </a-col>
        <a-col :xl="14"
               :lg="24"
               :md="24"
               :sm="24"
               :xs="24"
               style="padding: 0 12px;">
          <a-card title="快速开始" style="margin-bottom: 24px;" :bordered="false" :body-style="{ padding: 0 }">
            <div class="item-group">
              <!-- 添加点击事件 -->
              <a @click="PermissionManage()">用户管理</a>
              <a @click="DataTrusteeship()">数据导入</a>
              <a @click="DataView()">数据查看</a>
              <!-- <a-button size="small" type="primary" ghost icon="plus">添加</a-button> -->
            </div>
          </a-card>
          <!--  这块等有空换成审计的接口，只是暂时写死 -->
          <a-card title="上次登录" :bordered="false" style="margin-bottom: 24px;">
            <div style="font-size:16px;margin-bottom:10px;">登录时间：{{ lastLoginTime }}</div>
            <div style="font-size:16px;">登录IP：{{ lastLoginIP }}</div>
          </a-card>
          <a-card title="系统介绍" :bordered="false">
            <div style="font-size:16px;">这是一个<span class="important">基于白盒国密算法的敏感数据服务平台</span>，使用数据库的<span class="important">透明网关</span>，对数据表中的敏感数据使用<span class="important">基于白盒分组密码的FPE/OPE加密算法</span>进行脱敏。包含了<span class="important">数据脱敏、数据访问、权限管理、行为审计</span>等功能，为用户提供了一个安全、高效的敏感数据服务平台</div>
          </a-card>
        </a-col>
      </a-row>
    </div>
  </page-header-wrapper>
</template>

<script>
import { timeFix } from '@/utils/util'
import { mapState } from 'vuex'
import { PageHeaderWrapper } from '@ant-design-vue/pro-layout'
import { Radar } from '@/components'
import router from '@/router/index'
import { getRoleList, getServiceList } from '@/api/manage'
import { axios } from '@/utils/request'
// import PermissionManage from '../userManage/PermissionManage.vue'

const DataSet = require('@antv/data-set')

export default {
  name: 'HomePage',
  components: {
    PageHeaderWrapper,
    Radar
  },
  data() {
    return {
      timeFix: timeFix(),
      avatar: '',
      user: {},
      lastLoginIP: '',
      lastLoginTime: '',
      projects: [],
      loading: true,
      radarLoading: true,
      activities: [],
      teams: [],
      // message
      unreadMessageCount: 3,
      unfinishedTaskCount: 5,
            // notifications: [
      //   {
      //     title: '系统公告',
      //     content: '用户【test_admin】上传了【志愿信息】数据库，敬请查看。',
      //     time: '2023-06-14 09:07:53'
      //   },
      //   {
      //     title: '权限申请',
      //     content: '用户【test_user】申请访问【医疗信息】数据库【患者信息表】的【地址】字段。',
      //     time: '2023-06-12 21:50:30'
      //   },
      //   {
      //     title: '权限申请',
      //     content: '用户【test_user】申请访问【学生信息】数据库【学籍信息表】的【名字】字段。',
      //     time: '2023-06-12 22:53:04'
      //   }
      notifications: [
        {
          title: '系统公告',
          content: '用户【test_admin】上传了【志愿信息】数据库，敬请查看。',
          time: '2023-06-14 09:07:53'
        },
        {
          title: '消息通知',
          content: '您的申请：访问【医疗信息】数据库【患者信息表】的【地址】字段，尚未通过，请耐心等待。',
          time: '2023-06-12 21:50:30'
        },
        {
          title: '消息',
          content: '您的申请：访问【学生信息】数据库【学籍信息表】的【名字】字段，已通过，有效期至2023-06-19 22:53:04，请在规定时间内访问。',
          time: '2023-06-12 22:53:04'
        }
      ],
      // data
      axis1Opts: {
        dataKey: 'item',
        line: null,
        tickLine: null,
        grid: {
          lineStyle: {
            lineDash: null
          },
          hideFirstLine: false
        }
      },
      axis2Opts: {
        dataKey: 'score',
        line: null,
        tickLine: null,
        grid: {
          type: 'polygon',
          lineStyle: {
            lineDash: null
          }
        }
      },
      scale: [
        {
          dataKey: 'score',
          min: 0,
          max: 80
        }
      ],
      axisData: [
        { item: '引用', a: 70, b: 30, c: 40 },
        { item: '口碑', a: 60, b: 70, c: 40 },
        { item: '产量', a: 50, b: 60, c: 40 },
        { item: '贡献', a: 40, b: 50, c: 40 },
        { item: '热度', a: 60, b: 70, c: 40 },
        { item: '引用', a: 70, b: 50, c: 40 }
      ],
      radarData: []
    }
  },
  computed: {
    ...mapState({
      nickname: state => state.user.nickname,
      welcome: state => state.user.welcome
    }),
    currentUser() {
      return {
        // 这里用户name需要调用login_api获取用户名（后面再改）
        name: '管理员',
        avatar: 'https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png'
      }
    },
    userInfo() {
      return this.$store.getters.userInfo
    }
  },
  created() {
    this.user = this.$store.getters.userID
    this.avatar = this.$store.getters.avatar
    axios
      .get('http://43.139.91.125:8080/api/user/getIP', this.lastLoginIP)
      .then((resp) => {
        this.lastLoginIP = resp.data.lastLoginIP
      })
    axios
      .get('http://43.139.91.125:8080/api/user/getTime', this.lastLoginTime)
      .then((response) => {
        this.lastLoginTime = response.data.lastLoginTime
      })
    getRoleList().then(res => {
      // console.log('workplace -> call getRoleList()', res)
    })

    getServiceList().then(res => {
      // console.log('workplace -> call getServiceList()', res)
    })
  },
  mounted() {
    this.getProjects()
    this.getActivity()
    this.getTeams()
    this.initRadar()
  },
  methods: {
    getProjects() {
      this.$http.get('/list/search/projects').then(res => {
        this.projects = res.result && res.result.data
        this.loading = false
      })
    },
    getActivity() {
      this.$http.get('/workplace/activity').then(res => {
        this.activities = res.result
      })
    },
    getTeams() {
      this.$http.get('/workplace/teams').then(res => {
        this.teams = res.result
      })
    },
    initRadar() {
      this.radarLoading = true

      this.$http.get('/workplace/radar').then(res => {
        const dv = new DataSet.View().source(res.result)
        dv.transform({
          type: 'fold',
          fields: ['个人', '团队', '部门'],
          key: 'user',
          value: 'score'
        })

        this.radarData = dv.rows
        this.radarLoading = false
      })
    },
    PermissionManage() {
      router.push({
        name: 'PermissionManage'
        // params: { id: item.id }
      })
    },
    DataTrusteeship() {
      router.push({
        name: 'DataTrusteeship'
        // params: { id: item.id }
      })
    },
    DataView() {
      router.push({
        name: 'DataView'
        // params: { id: item.id }
      })
    }
  }
}
</script>

<style lang="less" scoped>
@import '~ant-design-vue/lib/style/themes/default.less';

.project-list {
  .card-title {
    font-size: 0;

    a {
      color: rgba(0, 0, 0, 0.85);
      margin-left: 12px;
      line-height: 24px;
      height: 24px;
      display: inline-block;
      vertical-align: top;
      font-size: 14px;

      &:hover {
        color: #1890ff;
      }
    }
  }

  .card-description {
    color: rgba(0, 0, 0, 0.45);
    height: 44px;
    line-height: 22px;
    overflow: hidden;
  }

  .project-item {
    display: flex;
    margin-top: 8px;
    overflow: hidden;
    font-size: 12px;
    height: 20px;
    line-height: 20px;

    a {
      color: rgba(0, 0, 0, 0.45);
      display: inline-block;
      flex: 1 1 0;

      &:hover {
        color: #1890ff;
      }
    }

    .datetime {
      color: rgba(0, 0, 0, 0.25);
      flex: 0 0 auto;
      float: right;
    }
  }

  .ant-card-meta-description {
    color: rgba(0, 0, 0, 0.45);
    height: 44px;
    line-height: 22px;
    overflow: hidden;
  }
}

.item-group {
  padding: 20px 0 8px 24px;
  font-size: 0;

  a {
    color: rgba(0, 0, 0, 0.65);
    display: inline-block;
    font-size: 14px;
    margin-bottom: 13px;
    width: 25%;
  }
}

.members {
  a {
    display: block;
    margin: 12px 0;
    line-height: 24px;
    height: 24px;

    .member {
      font-size: 14px;
      color: rgba(0, 0, 0, 0.65);
      line-height: 24px;
      max-width: 100px;
      vertical-align: top;
      margin-left: 12px;
      transition: all 0.3s;
      display: inline-block;
    }

    &:hover {
      span {
        color: #1890ff;
      }
    }
  }
}

.mobile {
  .project-list {
    .project-card-grid {
      width: 100%;
    }
  }

  .more-info {
    border: 0;
    padding-top: 16px;
    margin: 16px 0 16px;
  }

  .headerContent .title .welcome-text {
    display: none;
  }
}

.ant-carousel :deep(.slick-slide) {
  text-align: center;
  height: 160px;
  line-height: 160px;
  background: #364d79;
  overflow: hidden;
}

.ant-carousel :deep(.slick-slide h3) {
  color: #fff;
}

.notification-list {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;
}

.notification-list a-badge {
  cursor: pointer;
}

.notification-list a-badge:hover {
  background-color: #eee;
}

.no-data {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 200px;
  color: #999;
  font-size: 16px;
}

.notification-item {
  padding: 16px;
  border-bottom: 1px solid #eee;
}

.notification-header {
  font-weight: bold;
  font-size: 14px;
  margin-bottom: 8px;
}

.notification-content {
  font-size: 12px;
  color: #666;
  margin-bottom: 8px;
}

.notification-time {
  font-size: 12px;
  color: #999;
}
.important{
  font-weight: bold;
}
</style>
