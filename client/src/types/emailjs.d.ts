// Create this file as: src/types/emailjs.d.ts

declare global {
  interface Window {
    emailjs: {
      init: (publicKey: string) => void;
      send: (
        serviceId: string,
        templateId: string,
        templateParams: Record<string, any>,
        publicKey?: string
      ) => Promise<{ status: number; text: string }>;
      sendForm: (
        serviceId: string,
        templateId: string,
        form: HTMLFormElement,
        publicKey?: string
      ) => Promise<{ status: number; text: string }>;
    };
  }
}

export {};