import lodash from "lodash";
import M24Notification from "./M24Notification";

export default class M24ErrorUtils {
    static showError(message: string){
        M24Notification.notifyError('Thất bại',
            message,
            '_notify-error'
        );
    }
}
