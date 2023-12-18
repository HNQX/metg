import setupMock, { successResponseWrap } from '@/utils/setup-mock'
import Mock from 'mockjs'

setupMock({
  setup() {
    // submit
    Mock.mock(new RegExp('/api/channel-form/submit'), () => {
      return successResponseWrap('ok')
    })
  },
})
