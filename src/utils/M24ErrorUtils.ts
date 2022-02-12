import lodash from "lodash";
import M24Notification from "./M24Notification";

export default class M24ErrorUtils {
    static showError(t:any, error: any, values?: any){
        let title = lodash.get(error, 'response.data.title');
        M24Notification.notifyError(
            t('message.titleFailed'),
            t(`message.${title}`, values?values:{}),
            '_notify-error'
        );
    }
}
