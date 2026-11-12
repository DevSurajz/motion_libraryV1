"use client";
import { Button } from "@/components/ui/button";
import { useUi } from "@/components/providers";

export function ContactForm() {
  const { toast } = useUi();
  return (
    <form className="fm doc" onSubmit={(e) => { e.preventDefault(); e.currentTarget.reset(); toast("Message sent. We reply within a day."); }}>
      <input aria-label="Name" placeholder="Your name" required />
      <input aria-label="Email" type="email" placeholder="Email address" required />
      <textarea aria-label="Message" placeholder="How can we help?" />
      <br /><br />
      <Button variant="white" type="submit">Send message</Button>
    </form>
  );
}
