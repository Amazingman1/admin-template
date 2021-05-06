import defaultSettings from '@/settings'

const title = defaultSettings.title || '橙分期B端审批管理系统'

export default function getPageTitle(pageTitle) {
  if (pageTitle) {
    return `${pageTitle} - ${title}`
  }
  return `${title}`
}
