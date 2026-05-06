import { Mail, MapPin } from "lucide-react";
import { useState } from "react";
import { FaLinkedin, FaXTwitter } from "react-icons/fa6";
import { SiInstagram, SiYoutube } from "react-icons/si";

// ── Types ───────────────────────────────────────────────────────────────────────

interface FormState {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface FieldError {
  name?: string;
  email?: string;
  message?: string;
}

// ── Social links data ──────────────────────────────────────────────────────────

const SOCIAL_LINKS = [
  {
    id: "linkedin",
    label: "LinkedIn",
    href: "https://linkedin.com/company/teamlycaura",
    icon: FaLinkedin,
  },
  {
    id: "instagram",
    label: "Instagram",
    href: "https://instagram.com/teamlycaura",
    icon: SiInstagram,
  },
  {
    id: "twitter",
    label: "X / Twitter",
    href: "https://x.com/teamlycaura",
    icon: FaXTwitter,
  },
  {
    id: "youtube",
    label: "YouTube",
    href: "https://youtube.com/@teamlycaura",
    icon: SiYoutube,
  },
];

// ── Email validation helper ────────────────────────────────────────────────────

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// ── Sub-components ─────────────────────────────────────────────────────────────

function FieldInput({
  id,
  label,
  type = "text",
  required,
  placeholder,
  value,
  error,
  onChange,
  ocid,
}: {
  id: string;
  label: string;
  type?: string;
  required?: boolean;
  placeholder: string;
  value: string;
  error?: string;
  onChange: (v: string) => void;
  ocid: string;
}) {
  return (
    <div className="space-y-1.5">
      <label
        htmlFor={id}
        className="block font-mono text-[10px] tracking-[0.3em] text-muted-foreground uppercase"
      >
        {label}
        {required && <span className="text-accent ml-1">*</span>}
      </label>
      <input
        id={id}
        type={type}
        required={required}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`w-full bg-background border rounded-sm px-4 py-3 font-body text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-1 transition-colors duration-200 ${
          error
            ? "border-destructive focus:border-destructive focus:ring-destructive/30"
            : "border-input focus:border-accent focus:ring-accent/30"
        }`}
        aria-invalid={!!error}
        aria-describedby={error ? `${id}-error` : undefined}
        data-ocid={ocid}
      />
      {error && (
        <p
          id={`${id}-error`}
          className="font-mono text-[10px] text-destructive tracking-wide"
          data-ocid={`${ocid.split(".")[0]}.field_error`}
        >
          {error}
        </p>
      )}
    </div>
  );
}

// ── Contact Form ───────────────────────────────────────────────────────────────

function ContactForm() {
  const [form, setForm] = useState<FormState>({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [errors, setErrors] = useState<FieldError>({});
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");

  const set = (field: keyof FormState) => (v: string) => {
    setForm((f) => ({ ...f, [field]: v }));
    if (errors[field as keyof FieldError]) {
      setErrors((e) => ({ ...e, [field]: undefined }));
    }
  };

  const validate = (): FieldError => {
    const e: FieldError = {};
    if (!form.name.trim()) e.name = "Full name is required.";
    if (!form.email.trim()) e.email = "Email address is required.";
    else if (!isValidEmail(form.email))
      e.email = "Please enter a valid email address.";
    if (!form.message.trim()) e.message = "Message is required.";
    return e;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    setStatus("sending");
    setTimeout(() => setStatus("sent"), 1600);
  };

  if (status === "sent") {
    return (
      <div
        className="flex flex-col items-center justify-center gap-5 h-full min-h-[360px] bg-card border border-accent/30 rounded-sm p-10 text-center"
        style={{ boxShadow: "0 0 30px oklch(0.68 0.30 200 / 0.08)" }}
        data-ocid="contact.success_state"
      >
        <div
          className="w-16 h-16 rounded-full border-2 border-accent flex items-center justify-center text-accent text-2xl"
          style={{ boxShadow: "0 0 20px oklch(0.68 0.30 200 / 0.4)" }}
          aria-hidden="true"
        >
          &#10003;
        </div>
        <h3 className="font-display font-bold text-xl text-foreground">
          Message sent!
        </h3>
        <p className="font-body text-sm text-muted-foreground max-w-xs">
          We&#39;ll get back to you soon.
        </p>
        <button
          type="button"
          onClick={() => {
            setStatus("idle");
            setForm({ name: "", email: "", subject: "", message: "" });
            setErrors({});
          }}
          className="font-mono text-xs tracking-widest text-accent uppercase hover:text-accent/70 transition-colors duration-200"
          data-ocid="contact.send_another_button"
        >
          Send another
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="bg-card border border-border rounded-sm p-8 space-y-5"
      data-ocid="contact.form"
    >
      <div className="grid sm:grid-cols-2 gap-5">
        <FieldInput
          id="contact-name"
          label="Full Name"
          required
          placeholder="Aria Kovacs"
          value={form.name}
          error={errors.name}
          onChange={set("name")}
          ocid="contact.name_input"
        />
        <FieldInput
          id="contact-email"
          label="Email"
          type="email"
          required
          placeholder="aria@example.com"
          value={form.email}
          error={errors.email}
          onChange={set("email")}
          ocid="contact.email_input"
        />
      </div>
      <FieldInput
        id="contact-subject"
        label="Subject"
        placeholder="Sponsorship enquiry, media, general..."
        value={form.subject}
        onChange={set("subject")}
        ocid="contact.subject_input"
      />
      <div className="space-y-1.5">
        <label
          htmlFor="contact-message"
          className="block font-mono text-[10px] tracking-[0.3em] text-muted-foreground uppercase"
        >
          Message <span className="text-accent">*</span>
        </label>
        <textarea
          id="contact-message"
          required
          rows={5}
          placeholder="Tell us about yourself, your organisation, or how you&#39;d like to collaborate..."
          value={form.message}
          onChange={(e) => set("message")(e.target.value)}
          className={`w-full bg-background border rounded-sm px-4 py-3 font-body text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-1 transition-colors duration-200 resize-none ${
            errors.message
              ? "border-destructive focus:border-destructive focus:ring-destructive/30"
              : "border-input focus:border-accent focus:ring-accent/30"
          }`}
          aria-invalid={!!errors.message}
          aria-describedby={
            errors.message ? "contact-message-error" : undefined
          }
          data-ocid="contact.message_textarea"
        />
        {errors.message && (
          <p
            id="contact-message-error"
            className="font-mono text-[10px] text-destructive tracking-wide"
            data-ocid="contact.message.field_error"
          >
            {errors.message}
          </p>
        )}
      </div>

      <button
        type="submit"
        disabled={status === "sending"}
        className="w-full py-3 bg-accent text-accent-foreground font-display font-bold text-sm tracking-widest uppercase rounded-sm hover:opacity-90 disabled:opacity-50 transition-all duration-200 glow-neon"
        data-ocid="contact.submit_button"
      >
        {status === "sending" ? "Sending\u2026" : "Send Message"}
      </button>
    </form>
  );
}

// ── Info block ─────────────────────────────────────────────────────────────────

function InfoBlock() {
  return (
    <div className="flex flex-col gap-8">
      <div>
        <p className="font-mono text-[10px] tracking-[0.4em] text-accent uppercase mb-3">
          GET IN TOUCH
        </p>
        <h2 className="font-display font-bold text-4xl md:text-5xl text-foreground mb-2">
          Get in{" "}
          <span
            className="text-accent text-glow-accent"
            style={{ borderBottom: "2px solid oklch(0.68 0.30 200 / 0.6)" }}
          >
            Touch
          </span>
        </h2>
        <p className="font-body text-sm text-muted-foreground leading-relaxed max-w-sm">
          Whether you want to partner with us, join the team, or just follow our
          journey &mdash; we&#39;d love to hear from you.
        </p>
      </div>

      <div className="space-y-5">
        <div className="flex items-start gap-4">
          <div
            className="w-10 h-10 rounded-sm bg-card border border-accent/20 flex items-center justify-center shrink-0"
            aria-hidden="true"
          >
            <Mail className="w-4 h-4 text-accent" />
          </div>
          <div>
            <p className="font-mono text-[10px] tracking-[0.3em] text-muted-foreground uppercase mb-1">
              Email
            </p>
            <a
              href="mailto:team@lycaura.racing"
              className="font-body text-sm text-foreground hover:text-accent transition-colors duration-200"
              data-ocid="contact.email_link"
            >
              team@lycaura.racing
            </a>
          </div>
        </div>

        <div className="flex items-start gap-4">
          <div
            className="w-10 h-10 rounded-sm bg-card border border-accent/20 flex items-center justify-center shrink-0"
            aria-hidden="true"
          >
            <MapPin className="w-4 h-4 text-accent" />
          </div>
          <div>
            <p className="font-mono text-[10px] tracking-[0.3em] text-muted-foreground uppercase mb-1">
              Location
            </p>
            <p className="font-body text-sm text-foreground">
              United Kingdom &mdash; F1 in Schools World Finals 2025
            </p>
          </div>
        </div>
      </div>

      {/* Social links */}
      <div>
        <p className="font-mono text-[10px] tracking-[0.3em] text-muted-foreground uppercase mb-4">
          Follow Us
        </p>
        <div className="flex gap-3">
          {SOCIAL_LINKS.map((link) => (
            <a
              key={link.id}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={link.label}
              className="w-10 h-10 rounded-sm bg-card border border-border flex items-center justify-center text-muted-foreground hover:text-accent hover:border-accent/40 hover:bg-accent/5 transition-all duration-200"
              style={{ fontSize: "1.1rem" }}
              data-ocid={`contact.social.${link.id}`}
            >
              <link.icon />
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── Section export ─────────────────────────────────────────────────────────────

export function ContactSection() {
  return (
    <section
      id="contact"
      className="py-24 bg-muted/20 relative overflow-hidden"
      data-ocid="contact.section"
    >
      {/* Subtle radial glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 50% 100%, oklch(0.65 0.28 270 / 0.07) 0%, transparent 70%)",
        }}
        aria-hidden="true"
      />

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid md:grid-cols-2 gap-12 lg:gap-20 max-w-5xl mx-auto">
          <InfoBlock />
          <div>
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  );
}
