// vnpay.service.ts
import { Injectable } from '@nestjs/common';
import * as crypto from 'crypto';
import * as qs from 'qs';
import moment from 'moment-timezone';
import { UserPayload } from 'src/base/models/user-payload.model';
import { appSettings } from 'src/configs/app-settings';

@Injectable()
export class VnpayService {
    createPaymentUrl(
        amount: number,
        currency: string,
        ipAddr: string,
        user: UserPayload,
    ): string {
        process.env.TZ = 'Asia/Ho_Chi_Minh';
        const vnp_TmnCode = appSettings.vnpay.tmnCode;
        const vnp_HashSecret = appSettings.vnpay.hashSecret;
        const vnp_Url = appSettings.vnpay.url;
        const vnp_ReturnUrl = appSettings.vnpay.returnUrl;

        const date = new Date();
        const createDate = moment(date).format('YYYYMMDDHHmmss');
        const orderId = moment(date).format('DDHHmmss');

        const vnp_Params: Record<string, string | number> = {
            vnp_Version: '2.1.0',
            vnp_Command: 'pay',
            vnp_TmnCode: vnp_TmnCode,
            vnp_Locale: 'en',
            vnp_CurrCode: currency,
            vnp_TxnRef: orderId,
            vnp_OrderInfo:
                'Thanh toan cho ma GD: ' + orderId + ' cho user: ' + user._id,
            vnp_OrderType: 'other',
            vnp_Amount: amount * 100,
            vnp_ReturnUrl: vnp_ReturnUrl,
            vnp_IpAddr: ipAddr,
            vnp_CreateDate: createDate,
        };

        // Sort params by key name before signing
        const sortedParams = this.sortObject(vnp_Params);

        // Create signature data string - must use unencoded values
        const signData = qs.stringify(sortedParams, { encode: false });

        // Create HMAC SHA512 signature
        const hmac = crypto.createHmac('sha512', vnp_HashSecret);
        const signed = hmac
            .update(Buffer.from(signData, 'utf-8'))
            .digest('hex');

        // Add signature to params
        sortedParams['vnp_SecureHash'] = signed;

        // Create final URL
        const paymentUrl =
            vnp_Url + '?' + qs.stringify(sortedParams, { encode: false });

        return paymentUrl;
    }

    private sortObject(obj: Record<string, any>): Record<string, string> {
        const sorted: Record<string, string> = {};
        const str: string[] = [];

        // First collect and sort the keys
        for (const key in obj) {
            if (obj.hasOwnProperty(key)) {
                str.push(encodeURIComponent(key));
            }
        }
        str.sort();

        // Then create new object with sorted keys and encoded values
        for (let i = 0; i < str.length; i++) {
            const k = str[i];
            // Decode the key to get original key name
            const decodedKey = decodeURIComponent(k);
            // Encode the value and replace spaces with +
            sorted[decodedKey] = encodeURIComponent(obj[decodedKey]).replace(
                /%20/g,
                '+',
            );
        }

        return sorted;
    }
}
