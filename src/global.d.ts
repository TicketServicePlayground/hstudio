export {};

declare global {
  interface Window {
    google: any;
    Telegram?: Telegram;
  }
}