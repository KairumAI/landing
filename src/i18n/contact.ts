import type { Locale } from "./locales";

export interface ContactMessages {
  submit: string;
  sending: string;
  success: string;
  error: string;
  spam: string;
  unavailable: string;
  checking: string;
  captchaError: string;
  notificationSubject: string;
}

export interface ContactCopy {
  homeAction: string;
  title: string;
  intro: string;
  name: string;
  email: string;
  company: string;
  message: string;
  placeholders: {
    name: string;
    email: string;
    company: string;
    message: string;
  };
  noScript: string;
  messages: ContactMessages;
}

export const contactCopy: Record<Locale, ContactCopy> = {
  es: {
    homeAction: "Quiero más información",
    title: "Escribinos",
    intro:
      "Dejanos tus datos. Te respondemos por email, sin agendar una reunión.",
    name: "Nombre (obligatorio)",
    email: "Email (obligatorio)",
    company: "Empresa o web (opcional)",
    message: "Mensaje (opcional)",
    placeholders: {
      name: "Tu nombre",
      email: "nombre@empresa.com",
      company: "Tu empresa o sitio web",
      message: "Contanos qué tenés en mente",
    },
    noScript:
      "Activá JavaScript para usar el formulario. También podés agendar una conversación con el enlace de esta página.",
    messages: {
      submit: "Enviar consulta",
      sending: "Enviando consulta…",
      success: "Recibimos tu consulta. Te vamos a escribir por email.",
      error:
        "No pudimos confirmar el envío. Conservamos tus datos para que puedas volver a intentarlo o agendar una conversación.",
      spam: "No pudimos confirmar el envío. Completá de nuevo la verificación y volvé a intentarlo. Tus datos se conservan.",
      unavailable:
        "El formulario no está disponible en este momento. Podés agendar una conversación con el enlace de esta página.",
      checking: "Preparando el formulario…",
      captchaError:
        "No pudimos completar la verificación. Volvé a intentarlo o agendá una conversación. Tus datos se conservan.",
      notificationSubject: "Nueva consulta desde KAIRUM",
    },
  },
  en: {
    homeAction: "I'd like more information",
    title: "Send us a message",
    intro:
      "Leave your details. We'll reply by email, without scheduling a meeting.",
    name: "Name (required)",
    email: "Email (required)",
    company: "Company or website (optional)",
    message: "Message (optional)",
    placeholders: {
      name: "Your name",
      email: "name@company.com",
      company: "Your company or website",
      message: "Tell us what you have in mind",
    },
    noScript:
      "Enable JavaScript to use the form. You can also schedule a conversation using the link on this page.",
    messages: {
      submit: "Send inquiry",
      sending: "Sending inquiry…",
      success: "We've received your inquiry. We'll get back to you by email.",
      error:
        "We couldn't confirm your submission. Your details are preserved so you can try again or schedule a conversation.",
      spam: "We couldn't confirm your submission. Complete the verification again and try once more. Your details are preserved.",
      unavailable:
        "The form is unavailable at the moment. You can schedule a conversation using the link on this page.",
      checking: "Preparing the form…",
      captchaError:
        "We couldn't complete the verification. Try again or schedule a conversation. Your details are preserved.",
      notificationSubject: "New inquiry from KAIRUM",
    },
  },
  "pt-br": {
    homeAction: "Quero mais informações",
    title: "Fale com a gente",
    intro:
      "Deixe seus dados. Responderemos por email, sem precisar agendar uma reunião.",
    name: "Nome (obrigatório)",
    email: "Email (obrigatório)",
    company: "Empresa ou site (opcional)",
    message: "Mensagem (opcional)",
    placeholders: {
      name: "Seu nome",
      email: "nome@empresa.com",
      company: "Sua empresa ou site",
      message: "Conte o que você tem em mente",
    },
    noScript:
      "Ative o JavaScript para usar o formulário. Você também pode agendar uma conversa pelo link nesta página.",
    messages: {
      submit: "Enviar consulta",
      sending: "Enviando consulta…",
      success: "Recebemos sua consulta. Vamos entrar em contato por email.",
      error:
        "Não foi possível confirmar o envio. Seus dados foram mantidos para você tentar novamente ou agendar uma conversa.",
      spam: "Não foi possível confirmar o envio. Faça a verificação novamente e tente mais uma vez. Seus dados foram mantidos.",
      unavailable:
        "O formulário está indisponível no momento. Você pode agendar uma conversa pelo link nesta página.",
      checking: "Preparando o formulário…",
      captchaError:
        "Não foi possível concluir a verificação. Tente novamente ou agende uma conversa. Seus dados foram mantidos.",
      notificationSubject: "Nova consulta pelo KAIRUM",
    },
  },
};
