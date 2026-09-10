/*
 * Site configuration — edit these values once and every page updates.
 *
 * phone:        Agency phone number as you want it displayed, e.g. "(586) 555-0100".
 *               Leave as "" until you have a number; phone links stay hidden and
 *               the site falls back to email everywhere.
 * email:        Public contact email shown on the site and used for form delivery.
 * formEndpoint: Where forms are sent. FormSubmit (https://formsubmit.co) delivers
 *               submissions to the email below with no account required. The first
 *               submission triggers a one-time activation email — click the link
 *               in it and every form on the site starts delivering.
 *               After activation, FormSubmit also gives you a random alias string;
 *               you can swap it in here so the raw address isn't in the page source.
 */
window.KOKA_CONFIG = {
  phone: "",
  email: "thekokagroup@gmail.com",
  hours: "Mon–Fri, 9am–6pm ET",
  location: "Metro Detroit, Michigan",
  formEndpoint: "https://formsubmit.co/ajax/thekokagroup@gmail.com",
  formFallback: "https://formsubmit.co/thekokagroup@gmail.com"
};
