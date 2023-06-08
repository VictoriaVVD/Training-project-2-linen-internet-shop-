import { notification } from "antd";

export const openNotification = (type = "success", message = "success", description = '') => {
    return notification[type] ({
        message: message,
        description: description,
    })
}