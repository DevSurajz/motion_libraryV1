import type { Metadata } from "next";
import { ContactForm } from "./contact-form";

export const metadata: Metadata = { title: "Contact", description: "Say hello to the Lumen team." };

export default function ContactPage() {
  return (
    <section className="wrap pg">
      <p className="eb">Contact</p>
      <h1 style={{ fontSize: "clamp(48px,8vw,100px)", margin: "12px 0 30px" }}>Say <em>hello</em></h1>
      <ContactForm />
    </section>
  );
}
