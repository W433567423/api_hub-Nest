import { createHash } from 'crypto'
import { type ICosConfig } from './type'
import { COS_BUCKET_NAME, COS_BUCKET_REGION, COS_SECRET_ID, COS_SECRET_KEY } from '../../sercret'
// eslint-disable-next-line @typescript-eslint/no-var-requires
const COS = require('cos-nodejs-sdk-v5')

const cos = new COS({
  SecretId: COS_SECRET_ID, // 推荐使用环境变量获取；用户的 SecretId，建议使用子账号密钥，授权遵循最小权限指引，降低使用风险。子账号密钥获取可参考https://cloud.tencent.com/document/product/598/37140
  SecretKey: COS_SECRET_KEY // 推荐使用环境变量获取；用户的 SecretKey，建议使用子账号密钥，授权遵循最小权限指引，降低使用风险。子账号密钥获取可参考https://cloud.tencent.com/document/product/598/37140
})

const md5Password = (password: string) => {
  // 仅能对字符串进行加密
  return createHash('md5').update(password).digest('hex')
}

const uploadFile = async (config: ICosConfig) => {
  return await new Promise((resolve, reject) => {
    cos.uploadFile({
      Bucket: COS_BUCKET_NAME, /* 填入您自己的存储桶，必须字段 */
      Region: COS_BUCKET_REGION, /* 存储桶所在地域，例如 ap-beijing，必须字段 */
      ...config,
      SliceSize: 1024 * 1024 * 5 /* 触发分块上传的阈值，超过5MB使用分块上传，非必须 */
    }, (err: string, data: any) => {
      if (err) {
        reject(err)
      } else {
        resolve(data)
      }
    })
  })
}

export { md5Password, uploadFile }
