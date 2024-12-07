declare module "react-notifications" {
  export const NotificationContainer: React.ComponentType;
  export const NotificationManager: {
    info: (message: string) => void;
    success: (message: string) => void;
    warning: (message: string) => void;
    error: (message: string) => void;
  };
}
