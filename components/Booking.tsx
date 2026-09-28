"use client";

import { useActionState, useEffect, useState } from "react";
import { track } from "@vercel/analytics";
import { Reveal } from "./Reveal";
import { GoldButton } from "./GoldButton";
import { submitBookingRequest, type BookingState } from "@/app/actions";

type Budget = "low" | "mid" | "high" | null;

const PROJECTS = [
  "AI automation build",
  "RAG system",
  "AI agent setup",
  "SAAS development",
  "Ecommerce / Shopify build",
  "CRO retainer",
  "UI/UX + web",
];

const initialState: BookingState = { status: "idle" };

export function Booking({
  index = "10",
  lead = false,
}: {
  index?: string;
  lead?: boolean;
}) {
  const [budget, setBudget] = useState<Budget>(null);
  const [state, formAction, pending] = useActionState(submitBookingRequest, initialState);

  const tierNote =
    budget === "mid"
      ? "Fits Ecommerce, CRO or UI/UX + web engagements."
      : "Fits AI automation, RAG, agent or SAAS engagements.";

  const sent = state.status === "success";

  useEffect(() => {
    if (sent && budget) track("booking_request_submitted", { budget });
  }, [sent, budget]);

  return (
    <div id="book" className="border-b-2 border-line px-6 py-16 md:px-15 md:py-24">
      <Reveal className="eyebrow mb-5 text-gold">
        {index} / BOOK A CALL
      </Reveal>
      <Reveal
        as={lead ? "h1" : "h2"}
        className="mb-9 max-w-[16ch] font-display text-[26px] font-semibold leading-[1.15] tracking-[-0.02em] text-hi md:mb-11 md:text-[44px] md:leading-[1.05]"
      >
        What&rsquo;s the budget for this?
      </Reveal>

      <div className="max-w-[640px]">
        <Reveal className="mb-8 flex flex-wrap gap-3 md:mb-10 md:gap-3.5">
          <BudgetButton active={budget === "low"} onClick={() => setBudget("low")}>
            &lt; $500
          </BudgetButton>
          <BudgetButton active={budget === "mid"} onClick={() => setBudget("mid")}>
            $500 – $2,500
          </BudgetButton>
          <BudgetButton active={budget === "high"} onClick={() => setBudget("high")}>
            $2,500+
          </BudgetButton>
        </Reveal>

        {budget === "low" && !sent && (
          <Reveal className="rounded-[2px] border border-line bg-raise p-5 md:p-6.5">
            <div className="mb-3 font-mono text-[10px] tracking-[0.12em] text-alert md:mb-3.5">
              BELOW OUR MINIMUM
            </div>
            <div className="text-[13px] leading-[1.6] text-mid md:text-[15px] md:leading-[1.7]">
              Our fixed-scope minimum is $2,500 / ₹1,50,000 — below that,
              discovery costs more than the build. We don&rsquo;t have a
              self-serve product yet. If the budget changes, come back.
            </div>
          </Reveal>
        )}

        {(budget === "mid" || budget === "high") && !sent && (
          <Reveal>
            <form action={formAction}>
              <input type="hidden" name="budget" value={budget} />
              {/* Honeypot: hidden from real users, catches bots */}
              <input
                type="text"
                name="company_website"
                tabIndex={-1}
                autoComplete="off"
                className="absolute -left-[9999px] h-0 w-0 opacity-0"
                aria-hidden="true"
              />

              <div className="mb-4.5 font-mono text-[11px] text-signal md:mb-5">
                → {tierNote}
              </div>

              <div className="mb-5 grid grid-cols-1 gap-5 md:mb-5.5 md:grid-cols-2 md:gap-x-5.5 md:gap-y-5">
                <Field label="NAME" name="name" placeholder="Sharva" />
                <Field label="WORK EMAIL" name="email" placeholder="you@company.com" type="email" />
                <label className="flex flex-col gap-1.75 md:col-span-2">
                  <span className="font-mono text-[10px] tracking-[0.14em] text-low">
                    PROJECT
                  </span>
                  <select
                    name="project"
                    defaultValue={PROJECTS[0]}
                    className="rounded-[2px] border border-line bg-inset px-3.5 py-3.25 font-display text-[15px] text-hi outline-none transition-colors duration-150 focus:border-gold"
                  >
                    {PROJECTS.map((p) => (
                      <option key={p} value={p}>
                        {p}
                      </option>
                    ))}
                  </select>
                </label>
                <label className="flex flex-col gap-1.75 md:col-span-2">
                  <span className="font-mono text-[10px] tracking-[0.14em] text-low">
                    MESSAGE
                  </span>
                  <textarea
                    name="message"
                    rows={3}
                    placeholder="What are you trying to automate?"
                    className="resize-y rounded-[2px] border border-line bg-inset px-3.5 py-3.25 font-display text-[15px] text-hi outline-none transition-colors duration-150 focus:border-gold"
                  />
                </label>
              </div>

              {state.status === "error" && (
                <div className="mb-4 font-mono text-[12px] text-alert">{state.message}</div>
              )}

              <GoldButton type="submit" size="lg" fullWidth={false} className="md:w-auto">
                {pending ? "SENDING…" : "REQUEST A CALL"}
              </GoldButton>
            </form>
          </Reveal>
        )}

        {sent && (
          <Reveal className="rounded-[2px] border border-gold-dim bg-inset p-5 md:p-6.5">
            <div className="mb-3 font-mono text-[10px] tracking-[0.12em] text-gold md:mb-3.5">
              REQUEST RECEIVED
            </div>
            <div className="text-[13px] leading-[1.6] text-mid md:text-[15px] md:leading-[1.7]">
              We&rsquo;ll follow up within one business day to schedule the
              call.
            </div>
          </Reveal>
        )}
      </div>
    </div>
  );
}

function BudgetButton({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="cursor-pointer rounded-[2px] border px-4 py-3 font-mono text-[11px] font-medium tracking-[0.06em] transition-all duration-150 md:px-5 md:py-3.5 md:text-[12px]"
      style={{
        background: active ? "var(--color-gold)" : "transparent",
        color: active ? "var(--color-void)" : "var(--color-mid)",
        borderColor: active ? "var(--color-gold)" : "var(--color-line)",
      }}
    >
      {children}
    </button>
  );
}

function Field({
  label,
  name,
  placeholder,
  type = "text",
}: {
  label: string;
  name: string;
  placeholder: string;
  type?: string;
}) {
  return (
    <label className="flex flex-col gap-1.75">
      <span className="font-mono text-[10px] tracking-[0.14em] text-low">{label}</span>
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        required
        className="rounded-[2px] border border-line bg-inset px-3.5 py-3.25 font-display text-[15px] text-hi outline-none transition-colors duration-150 focus:border-gold"
      />
    </label>
  );
}
