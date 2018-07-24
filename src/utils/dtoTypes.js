// 用户基本信息 注册平台类型
export const AppTypes = {
  1: 'ios',
  2: 'android',
  3: 'wap',
  4: 'ipad',
  5: '微信小程序',
  6: '书链后台',
  7: '教师后台'
};
// 渠道
export const ChannelTypes = {
  yuntiguanwang: 'yuntiguanwang',
  yttest: 'yttest',
  yingyongbao: 'yingyongbao',
  xiaomi: 'xiaomi',
  nanjing: 'nanjing',
  c360: 'c360',
  baidu: 'baidu',
  web: 'web',
  spark: 'spark',
  wxMinApp: 'wxMinApp'
};

// 网络类型
export const NetTypes = {
  1: 'wifi',
  2: '移动网络'
};

// 登录平台类型
export const LoginAppTypes = {
  1: 'ios',
  2: 'android',
  3: 'web'
};
// 订单类型
export const OrderTypes = {
  1: '购买会员',
  2: '购买书籍',
  3: '购买试卷',
  4: '购买认证卡',
  5: '购买认证卡',
  6: '购买cr',
  8: '购买点读',
  9: '购买产品套餐',
  10: '购买产品规格',
  11: '购买课程',
  12: '购买加速批量下载服务',
  13: '购买纸书',
  14: '购买学习计划',
  15: '购买单词专题'
};

// 订单状态
export const OrderStatus = {
  0: '待支付',
  1: '购买成功',
  2: '购买失败',
  3: '订单作废'
};

// 学习卡状态
export const BookAuthStatus = {
  0: '无效',
  1: '有效',
  2: '已使用'
};

// 用户书籍状态
export const UserBookStatus = {
  0: '已移除',
  1: '已加入'
};

// 资源类型
export const ResourceTypes = {
  1: '视频',
  2: '音频',
  3: '图片',
  4: '链接',
  7: '压缩包',
  13: '答题卡',
  15: '试卷',
  19: 'PDF',
  24: '直播',
  27: '富文本',
  45: '点读书',
  46: '店铺',
  47: '课程',
  49: '试卷解析',
  53: '单词',
  54: '教师登录',
  55: '教师申请',
  56: '课堂'
};

// 书籍是否上线类型
export const BookOnlineTypes = {
  1: '否',
  2: '是'
};

// 书籍接入渠道
export const BookAccessToChannelTypes = {
  'official': '接入图书',
  'all': '全部',
  'third': '三方图书'
};

// 书籍封面处理
export const BookFixTypes = {
  'true': '已处理的',
  'false': '未处理的'
};
// 加入纸书
export const ContainsPaperBookTypes = {
  'true': '已加入',
  'false': '未加入'
};

// banner 上线情况
export const BannerEffectiveStatus = {
  0: '未生效',
  1: '生效中',
  2: '已下线'
};
// 优惠券状态
export const CouponStatus = {
  1: '未领取',
  2: '已领取',
  4: '已使用',
  5: '已冻结',
  6: '已过期'
};

// 优惠券使用范围
export const CouponScopeTypes = {
  1: '全场通用',
  2: '指定商家',
  3: '指定对象'
};

// 优惠券类型
export const CouponTypes = {
  1: '通用券',
  2: '读书券',
  8: '点读券',
  10: '应用券',
  11: '课程券',
  14: '学习计划券'
};
// 书城维护类型
export const BookstoreTypes = {
  1: '图书',
  2: '图文',
  3: '单个分类',
  4: '所有分类',
  5: '点读书',
  6: '大图',
  7: 'pad端大图',
  8: '课程',
  9: '正在直播',
  10: '每周推荐',
  11: '学习专题',
  12: '店铺推荐'
};

// 用户反馈 回复状态
export const UserFeedbackReplyStatus = {
  0: '未回复',
  1: '已回复',
  2: '无需回复',
  '': '全部'
};
// 博客类型
export const OfficialBlogTypes = {
  1: '更新日志',
  2: '数据分析',
  3: '行业洞见',
  4: '读者运营',
  5: '客户案例'
};

// 产品 业务类型
export const ProductBizTypes = {
  1: '内容应用',
  2: '营销应用',
  3: '大客户定制',
  4: '功能应用'
};
// 产品 使用类型
export const ProductUsageTypes = {
  1: '计量型',
  2: '周期型',
  3: '消耗型'
};
// 产品 显示类型
export const ProductShowTypes = {
  1: '独立应用(点击直接打开)',
  2: '非独立应用(点击查看简介)'
};

// 产品 销售状态
export const ProductSaleStatus = {
  0: '未销售',
  1: '在售'
};
// 产品 状态
export const ProductStatus = {
  0: '已创建',
  1: '已上架',
  2: '已下架',
  3: '核审中',
  4: '审核通过',
  5: '审核拒绝',
  6: '系统下架'
};
// 产品类型
export const ProductTypes = {
  1: '商家图书服务',
  2: '商家后台服务',
  3: '用户图书服务',
  4: '商家店铺服务'
};

// 审核申请状态
export const ApplyForReviewStatus = {
  0: '待审核',
  1: '审核通过',
  2: '审核拒绝'
};
// 审核申请类型
export const ApplyForReviewTypes = {
  1: '教师审核',
  3: '书籍审核'
};

// antx配置项目类型
export const AntxConfigProjectTypes = {
  'bookln': 'bookln',
  'deep': 'deep',
  'iwatch': 'iwatch',
  'ibee': 'ibee',
  'mp': 'mp',
  'thirdservice': 'thirdservice'
};

// 公告类型
export const NoticeContentTypes = {
  1: '版本更新',
  2: '功能发布',
  3: '支付结算',
  4: '重要通知',
  5: '课程预告',
  6: '合同审核',
  7: '官方培训',
  8: '问卷调查'
};

// 公告状态
export const NoticeStatus = {
  0: '未发布',
  1: '已发布'
};

// 上线状态
export const OnlineStatus = {
  0: '待上线',
  1: '已上线'
};
// 上架状态
export const PutawayStatus = {
  0: '未上架',
  1: '已上架'
};

export const PromotionStatus = {
  0: '未推广',
  1: '已推广'
};
export const RecommendStatus = {
  0: '未分发',
  1: '已分发'
};

export const EvaluationYears = {
  '2016': '2016',
  '2017': '2017',
  '2018': '2018',
  '2019': '2019'
};

export const EvaluationTargetTypes = {
  1: '个人',
  2: '团队'
};
// 考核部门
export const EvaluationDepartments = {
  1: '行政人事部',
  2: '战略部',
  3: '运营部',
  4: '市场部',
  5: '产品技术部',
  6: '财务部'
};

// 考核周期
export const EvaluationCycleType = {
  0: '月考核',
  1: '季度考核',
  2: '半年考核',
  3: '全年考核'
};

// 考核状态
export const EvaluationStatus = {
  1: '考核项填写中',
  2: '考核项审核中',
  3: '考核执行中',
  4: '考核评分中',
  5: '考核完成'
};

export const MenuLevels = {
  1: '一级',
  2: '二级',
  3: '三级'
};
// 客户类型
export const CustomerCrmTypes = {
  1: '图书公司',
  2: '个人作者',
  3: '出版社',
  4: '教育机构'
};

// 进度状态
export const CustomerProgressStatus = {
  1: '合作接书',
  2: '直接接书',
  3: '账号体验'
};

// 套餐版本
export const AccountProdDetailCode = {
  'CRM_PROD_PACKAGE_FREE_NEW': '免费版',
  'CRM_PROD_PACKAGE_FREE': '基础版',
  // 'CRM_PROD_PACKAGE_HIGH_FREE': '高级体验版',
  'CRM_PROD_PACKAGE_HIGH': '高级版',
  // 'CRM_PROD_PACKAGE_ENTERPRISE_FREE': '企业体验版',
  'CRM_PROD_PACKAGE_ENTERPRISE': '企业版'
};

// 需求类型
export const DemandProjectTypes = {
  1: 'app',
  2: '后台',
  3: 'wap',
  4: 'iwatch'
};
// 需求来源类型
export const DemandProjectSourceTypes = {
  1: '商务',
  2: '运营',
  3: '产品',
  4: '技术',
  5: '测试',
  6: 'CEO'
};
// 发货状态
export const PaperBookLogisticsStatus = {
  0: '待发货',
  1: '已发货',
  2: '取消发货',
  3: '交易成功'
};
