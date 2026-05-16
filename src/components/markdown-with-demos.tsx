"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { getDemoComponent } from "@/components/demos/registry";

type Slot = {
  key: string;
  id: string;
  caption?: string;
  el: HTMLElement;
};

export function MarkdownWithDemos({ html }: { html: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [slots, setSlots] = useState<Slot[]>([]);

  useEffect(() => {
    if (!ref.current) return;
    const els = Array.from(
      ref.current.querySelectorAll<HTMLElement>("[data-demo]"),
    );
    els.forEach((el) => el.replaceChildren());
    setSlots(
      els.map((el, index) => {
        const id = el.dataset.demo ?? "";
        return {
          key: `${id}-${index}`,
          id,
          caption: el.dataset.caption || undefined,
          el,
        };
      }),
    );
  }, [html]);

  return (
    <>
      <div
        ref={ref}
        className="tiptap"
        dangerouslySetInnerHTML={{ __html: html }}
      />
      {slots.map((slot) => {
        const Component = getDemoComponent(slot.id);
        if (!Component) return null;
        return createPortal(
          <Component caption={slot.caption} />,
          slot.el,
          slot.key,
        );
      })}
    </>
  );
}
