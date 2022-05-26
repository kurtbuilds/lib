export declare type AlertType = 'danger' | 'warning' | 'info' | 'success';
export interface Alert {
    message: string;
    type: AlertType;
    html?: string;
}
