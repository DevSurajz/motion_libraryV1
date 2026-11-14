export type LegalPage = { slug: string; title: string; eyebrow: string; intro: string; sections: [string, string][] };

const UPDATED = "Last updated: 1 January 2026";

export const LEGAL: LegalPage[] = [
  {
    slug: "about", title: "About Lumen", eyebrow: "Company",
    intro: "Lumen is a library of copy-paste prompts that help AI tools build cinematic websites that don’t look AI-made.",
    sections: [
      ["Why we exist", "Most AI-generated sites look the same. We collect the motion, depth and craft behind the best interfaces and turn them into prompts you can paste into the AI you already use."],
      ["What we make", "Templates, 3D scenes, gradients, sections and animated backgrounds, plus live tools to tune the details before you copy a prompt."],
      ["Get in touch", "Questions or ideas? Write to hello@lumen.studio and we reply within a day."],
    ],
  },
  {
    slug: "affiliate", title: "Affiliate programme", eyebrow: "Company",
    intro: "Share Lumen with your audience and earn a commission on every paid plan you refer.",
    sections: [
      ["How it works", "Apply, receive a personal link, and share it. When someone subscribes through your link, you earn a recurring commission for as long as they stay subscribed."],
      ["Who it is for", "Designers, developers, educators and creators who talk about AI-assisted web design."],
      ["Apply", "Send a short note about your audience to hello@lumen.studio. See the Affiliate Terms for the rules."],
    ],
  },
  {
    slug: "privacy", title: "Privacy Policy", eyebrow: "Legal",
    intro: UPDATED,
    sections: [
      ["What we collect", "Your email address if you subscribe or create an account, messages you send us, and basic usage data such as pages visited and device type."],
      ["How we use it", "To run the service, send the weekly digest you asked for, answer your messages, and understand which prompts are useful. We do not sell personal data."],
      ["Sharing", "We share data only with providers that help us operate Lumen (hosting, analytics, email), under agreements that protect it."],
      ["Your rights", "You can ask to access, correct or delete your data at any time by writing to hello@lumen.studio. You can unsubscribe from emails with one click."],
      ["Retention and security", "We keep data only as long as needed for the purposes above and protect it with industry-standard safeguards."],
    ],
  },
  {
    slug: "terms", title: "Terms of Use", eyebrow: "Legal",
    intro: UPDATED,
    sections: [
      ["Using Lumen", "By using the site you agree to these terms. Use it lawfully and do not attempt to disrupt or scrape the service."],
      ["Licence", "On any paid plan you receive a commercial licence to use prompts in client and personal projects, with no attribution and no cap on the number of sites. Free prompts are for trying the product."],
      ["Restrictions", "You may not resell, redistribute or publish the prompt library itself, or offer it as a competing product."],
      ["Payments and cancellation", "Paid plans renew until cancelled. You can cancel at any time and keep access until the end of the billing period."],
      ["Liability", "Lumen is provided as is. To the extent permitted by law, we are not liable for indirect or consequential losses."],
    ],
  },
  {
    slug: "cookies", title: "Cookie Policy", eyebrow: "Legal",
    intro: UPDATED,
    sections: [
      ["What cookies are", "Small files stored in your browser that help a site remember your choices and measure how it is used."],
      ["Cookies we use", "Essential cookies keep the site working. Analytics cookies, only with your consent, show us which pages and prompts are popular."],
      ["Managing cookies", "You can change your choice at any time from Cookie preferences, or block cookies in your browser settings."],
    ],
  },
  {
    slug: "affiliate-terms", title: "Affiliate Terms", eyebrow: "Legal",
    intro: UPDATED,
    sections: [
      ["Eligibility", "Affiliates must be at least 18 and promote Lumen honestly, with clear disclosure that links are affiliate links."],
      ["Commission", "Commission is paid on qualifying paid subscriptions started through your link. Refunded or cancelled payments are not eligible."],
      ["Prohibited methods", "No spam, paid search on the Lumen brand name, misleading claims, or self-referral."],
      ["Changes", "We may update these terms or end the programme with notice. Earned commission up to that date is still paid."],
    ],
  },
  {
    slug: "cookie-preferences", title: "Cookie preferences", eyebrow: "Legal",
    intro: "Choose which optional cookies Lumen may use.",
    sections: [
      ["Essential", "Always on. Needed for the site to work."],
      ["Analytics", "Off by default. If you opt in, we use anonymous statistics to improve the library. To opt in or out, write to hello@lumen.studio and we will update your choice, or clear cookies in your browser."],
    ],
  },
];

export const legalBySlug = (s: string) => LEGAL.find((p) => p.slug === s);
