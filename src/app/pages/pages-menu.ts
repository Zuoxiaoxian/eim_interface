import { NbMenuItem } from '@nebular/theme';

export const MENU_ITEMS: NbMenuItem[] = [
  {
    title: '首页',
    icon: 'globe-2-outline',
    link: '/pages/home',
  },
  {
    title: '设备在线',
    icon: 'globe-2-outline',
    link: '/pages/deviceinline',
  },
  {
    title: '统计分析',
    icon: 'layout-outline',
    children: [

      {
        title: '设备管理',
        link: '/pages/tongji/deviceManage',
      },
      {
        title: '设备KPI报表',
        link: '/pages/tongji/deviceKpiReport',
      },
      {
        title: '工时KPI报表',
        link: '/pages/tongji/manHourKpiReport',
      },
      {
        title: '试验任务管理',
        link: '/pages/tongji/testManage',
      },
    ],
  },
  {
    title: '个人信息',
    icon: 'person-outline',
    children: [
      {
        title: '个人资料',
        link: '/pages/tongji',
      },
      {
        title: '个人收藏',
        link: '/pages/tongji/deviceManage',
      },
      {
        title: '个人消息',
        link: '/pages/tongji/deviceKpiReport',
      },

    ],
  },
  {
    title: '设备健康数据中心',
    icon: 'hard-drive-outline',
    children: [
      {
        title: '设备健康数据中心',
        link: '/pages/datacenter',
      },

    ],
  },
  {
    title: '运维管理',
    icon: 'monitor-outline',
    children:[
      {
        title: '边缘网关管理',
        link: '/pages/operation/border-gateway',
      },
      {
        title: '视频集成服务器管理',
        link: '/pages/operation/video-interation',
      },
      
    ]
  },
  {
    title: '移动资产管理',
    icon: 'options-2-outline',
    children:[
      {
        title: '定位监控',
        link: '/pages/mobile-gps/location-monitore',
      },
      {
        title: '统计报表',
        link: '/pages/mobile-gps/tongji-report',
      },
      {
        title: 'GPS模块管理',
        link: '/pages/mobile-gps/gpsmodule-manage',
      },
      
    ]
  },
  {
    title: '举升机监控',
    icon: 'eye-outline',
    children:[
      {
        title: '状态监控',
        link: '/pages/lift-machine/status',
      },
      {
        title: '设备KPI统计',
        link: '/pages/lift-machine/kpi',
      },

      
    ]
  },
  {
    title: '系统设置',
    icon: 'settings-outline',
    children:[

      {
        title: '权限',
        link: '/pages/system-set/auth',
      },
      {
        title: '菜单',
        link: '/pages/system-set/menu',
      },
      {
        title: '角色',
        link: '/pages/system-set/role',
      },
      {
        title: '操作日志',
        link: '/pages/lift-machine/status',
      },

      
    ]
  },

];
