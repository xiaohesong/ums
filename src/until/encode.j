const crypto = require('crypto')
const appKey = "cn.com.skio.soul";
const appSecret = "018PE0P080185D87GACD2038";


const md5 = (content) => {
	return crypto.createHash('md5')
		.update(content, 'utf8')
		.digest('base64');
}

const sign = (stringToSign, secret) => {
	return crypto.createHmac('sha256', secret)
		.update(stringToSign, 'utf8').digest('base64');
}


const contentMD5Tmp = md5(appKey);
const contentMD5Tmp1 = dateNow => md5(contentMD5Tmp + dateNow)

export const signResult = () => {
	const dateNow = Date.now()
	const result = sign(contentMD5Tmp1(dateNow) + dateNow, appSecret + dateNow)
	return {result, dateNow}
}
