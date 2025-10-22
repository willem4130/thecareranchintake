"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { intakeFormSchema, type IntakeFormData } from "@/lib/form-schema";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { DatePicker } from "@/components/ui/date-picker";
import { motion } from "framer-motion";
import { useState } from "react";
import { Calendar, CheckCircle2, Loader2 } from "lucide-react";

export default function IntakeForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<IntakeFormData>({
    resolver: zodResolver(intakeFormSchema),
  });

  const dateOfBirth = watch("dateOfBirth");

  const onSubmit = async (data: IntakeFormData) => {
    setIsSubmitting(true);
    try {
      const response = await fetch("/api/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setIsSubmitted(true);
      } else {
        alert("Submission failed. Please try again.");
      }
    } catch (error) {
      console.error(error);
      alert("An error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center max-w-md"
        >
          <CheckCircle2 className="w-20 h-20 mx-auto text-primary mb-6" />
          <h1 className="font-serif text-4xl font-bold text-foreground mb-4">
            Thank You!
          </h1>
          <p className="text-muted-foreground text-lg">
            Your intake form has been submitted successfully. We look forward to
            welcoming you to The Care Ranch Leadership Retreat in Tubac, Arizona.
          </p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-50"
      >
        <div className="container mx-auto px-4 py-6">
          <h1 className="font-serif text-3xl md:text-5xl font-bold text-center text-foreground">
            The Care Ranch
          </h1>
          <p className="text-center text-muted-foreground mt-2 text-sm md:text-base">
            Leadership Retreat Intake Form
          </p>
        </div>
      </motion.header>

      {/* Main Form */}
      <main className="container mx-auto px-4 py-12 max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-card rounded-2xl shadow-xl p-6 md:p-12 mb-12"
        >
          <div className="prose prose-lg max-w-none mb-8">
            <p className="text-muted-foreground leading-relaxed">
              Thank you for your commitment to join us for a 5-day immersive
              journey in Tubac, Arizona. This intake form helps us understand how
              you think about yourself, how you approach challenges and
              opportunities, and which areas of your personal leadership you most
              want to strengthen.
            </p>
            <p className="text-sm text-muted-foreground italic mt-4">
              There are no right or wrong answers—only insights that guide us in
              co-creating a retreat program tailored to your personal needs. All
              responses are strictly confidential.
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-12">
            {/* I. Personal Details */}
            <FormSection title="I. Personal Details" number="01">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField label="Name" required error={errors.name?.message}>
                  <Input {...register("name")} placeholder="Your full name" />
                </FormField>

                <FormField
                  label="Date of Birth"
                  required
                  error={errors.dateOfBirth?.message}
                >
                  <DatePicker
                    value={dateOfBirth}
                    onChange={(date) => setValue("dateOfBirth", date as Date)}
                  />
                </FormField>

                <FormField
                  label="Address"
                  required
                  error={errors.address?.message}
                  className="md:col-span-2"
                >
                  <Input {...register("address")} placeholder="Street address" />
                </FormField>

                <FormField
                  label="Postal Code"
                  required
                  error={errors.postalCode?.message}
                >
                  <Input {...register("postalCode")} placeholder="ZIP/Postal code" />
                </FormField>

                <FormField label="City" required error={errors.city?.message}>
                  <Input {...register("city")} placeholder="City" />
                </FormField>

                <FormField label="Country" required error={errors.country?.message}>
                  <Input {...register("country")} placeholder="Country" />
                </FormField>

                <FormField
                  label="Phone Number"
                  required
                  error={errors.phoneNumber?.message}
                >
                  <Input
                    {...register("phoneNumber")}
                    type="tel"
                    placeholder="+1 (555) 000-0000"
                  />
                </FormField>

                <FormField
                  label="Email Address"
                  required
                  error={errors.email?.message}
                >
                  <Input
                    {...register("email")}
                    type="email"
                    placeholder="your.email@example.com"
                  />
                </FormField>

                <FormField
                  label="General Practitioner"
                  error={errors.generalPractitioner?.message}
                >
                  <Input
                    {...register("generalPractitioner")}
                    placeholder="Your doctor's name (optional)"
                  />
                </FormField>
              </div>
            </FormSection>

            {/* II. Training Goals & Self-Awareness */}
            <FormSection
              title="II. Training Goals & Self-Awareness"
              number="02"
            >
              <div className="space-y-6">
                <FormField
                  label="What prompted you to participate in this training?"
                  required
                  error={errors.participationReason?.message}
                  className="md:col-span-2"
                >
                  <Textarea
                    {...register("participationReason")}
                    placeholder="Share what brought you here..."
                    rows={4}
                  />
                </FormField>

                <FormField
                  label="What three words best describe your current mood/state?"
                  required
                  error={errors.currentMood?.message}
                  className="md:col-span-2"
                >
                  <Input
                    {...register("currentMood")}
                    placeholder="e.g., Curious, Hopeful, Ready"
                  />
                </FormField>

                <FormField
                  label="Name at least two positive qualities you believe you have"
                  required
                  error={errors.positiveQualities?.message}
                  className="md:col-span-2"
                >
                  <Textarea
                    {...register("positiveQualities")}
                    placeholder="Your strengths..."
                    rows={3}
                  />
                </FormField>

                <FormField
                  label="What would you most like to see happen in your life?"
                  required
                  error={errors.desiredChange?.message}
                  className="md:col-span-2"
                >
                  <Textarea
                    {...register("desiredChange")}
                    placeholder="Your vision..."
                    rows={4}
                  />
                </FormField>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField label="Which aspects of yourself do you like the least?">
                    <Textarea {...register("leastLikedAspects")} rows={3} />
                  </FormField>

                  <FormField label="Which aspects of yourself do you like the most?">
                    <Textarea {...register("mostLikedAspects")} rows={3} />
                  </FormField>

                  <FormField label="Which achievements are you proud of?">
                    <Textarea {...register("proudAchievements")} rows={3} />
                  </FormField>

                  <FormField label="What brings you intense joy?">
                    <Textarea {...register("intensiveJoy")} rows={3} />
                  </FormField>

                  <FormField label="What do you feel ashamed of?">
                    <Textarea {...register("ashamedOf")} rows={3} />
                  </FormField>

                  <FormField label="What is your greatest fear?">
                    <Textarea {...register("greatestFear")} rows={3} />
                  </FormField>
                </div>

                <FormField
                  label="Which losses or painful experiences have been significant for you?"
                  className="md:col-span-2"
                >
                  <Textarea {...register("significantLosses")} rows={4} />
                </FormField>

                <FormField
                  label="What values or principles guide your most important life decisions?"
                  className="md:col-span-2"
                >
                  <Textarea {...register("guidingValues")} rows={4} />
                </FormField>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField label="What do you believe others most misunderstand about you?">
                    <Textarea {...register("misunderstood")} rows={3} />
                  </FormField>

                  <FormField label="Do you suffer from any addictions? If yes, which ones?">
                    <Textarea {...register("addictions")} rows={3} />
                  </FormField>

                  <FormField label="Which important matters do you continuously postpone?">
                    <Textarea {...register("postponedMatters")} rows={3} />
                  </FormField>

                  <FormField label="What is your biggest concern right now?">
                    <Textarea {...register("biggestConcern")} rows={3} />
                  </FormField>
                </div>
              </div>
            </FormSection>

            {/* Continue with remaining sections... */}
            {/* For brevity, I'll create the rest in the next file */}

            {/* Submit Button */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="pt-8"
            >
              <Button
                type="submit"
                size="lg"
                disabled={isSubmitting}
                className="w-full md:w-auto min-w-[200px] text-lg"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  "Submit Intake Form"
                )}
              </Button>
            </motion.div>
          </form>
        </motion.div>
      </main>
    </div>
  );
}

// Helper Components
function FormSection({
  title,
  number,
  children,
}: {
  title: string;
  number: string;
  children: React.ReactNode;
}) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="border-t border-border pt-8"
    >
      <div className="flex items-center gap-4 mb-8">
        <span className="text-5xl font-serif font-bold text-primary/20">
          {number}
        </span>
        <h2 className="font-serif text-2xl md:text-3xl font-bold text-foreground">
          {title}
        </h2>
      </div>
      {children}
    </motion.section>
  );
}

function FormField({
  label,
  required,
  error,
  children,
  className,
}: {
  label: string;
  required?: boolean;
  error?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={className}>
      <Label className="text-base mb-2 block">
        {label}
        {required && <span className="text-destructive ml-1">*</span>}
      </Label>
      {children}
      {error && (
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-sm text-destructive mt-1.5 flex items-center gap-1"
        >
          {error}
        </motion.p>
      )}
    </div>
  );
}
