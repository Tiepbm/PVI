import {message, notification} from 'antd'

export default class M24Notification {
    /**
     *
     * @param messages
     * @param className
     * @param duration
     * @param onClose
     */
    static messageSuccess(messages:string, className?:string, duration = 3, onClose?:()=>void) {
        message.success(messages,duration, onClose);
    }

    /**
     *
     * @param messages
     * @param className
     * @param duration
     * @param onClose
     */
    static messageError(messages:string, className?:string, duration = 5, onClose?:()=>void) {
        message.error(messages, duration, onClose)
    }
    static notifyError(title:string, messages:string, className?:string, duration = 0, onClose?:()=>void) {
        notification['error']({
            message: title,
            description: messages,
            className:className,
            duration: duration,
            onClose: onClose
        });
    }
}


