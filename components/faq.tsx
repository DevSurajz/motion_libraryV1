"use client";
import * as Accordion from "@radix-ui/react-accordion";
import { FAQ } from "@/lib/data";

export function Faq() {
  return (
    <div className="fq">
      <div className="fq-l">
        <span className="pill glass fq-p">FAQ</span>
        <h2>Frequently asked <span>questions</span></h2>
      </div>
      <Accordion.Root type="single" collapsible defaultValue={FAQ[0][0]} className="fq-box">
        {FAQ.map(([q, a]) => (
          <Accordion.Item key={q} value={q} className="fq-i">
            <Accordion.Header asChild><h4><Accordion.Trigger className="fq-t">{q}<i aria-hidden="true">⌄</i></Accordion.Trigger></h4></Accordion.Header>
            <Accordion.Content className="fq-c"><p>{a}</p></Accordion.Content>
          </Accordion.Item>
        ))}
      </Accordion.Root>
    </div>
  );
}
