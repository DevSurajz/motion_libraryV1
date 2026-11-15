import type { Metadata } from "next";
import { ContactForm } from "./contact-form";

export const metadata: Metadata = { title: "Contact", description: "Say hello to the Lumen team." };

export default function ContactPage() {
  return (
    <section className="wrap pg">
      <p className="eb">Contact</p>
      <h1 className="pg-h" style={{ marginBottom: 30 }}>Say <em>hello</em></h1>
      <ContactForm />
    </section>
  );
}
