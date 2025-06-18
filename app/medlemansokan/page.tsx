"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Typography } from "@/components/ui/typography";

export default function Medlemsansokan() {
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const [status, setStatus] = useState<null | "success" | "error">(null);
  const [loading, setLoading] = useState(false);
  const [lastSubmission, setLastSubmission] = useState<number>(0);

  const onSubmit = async (data: Record<string, any>) => {
    // Prevent submissions within 3 seconds of each other
    const now = Date.now();
    if (now - lastSubmission < 3000) {
      return;
    }
    
    setLoading(true);
    setStatus(null);
    setLastSubmission(now);
    
    try {
      const response = await fetch("/api/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (response.ok) {
        setStatus("success");
        reset();
      } else {
        setStatus("error");
      }
    } catch (error) {
      setStatus("error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Hero Section (copied/adapted from Bli Medlem) */}
      <section className="relative h-[40vh] min-h-[180px] flex items-center justify-center text-center overflow-hidden bg-gradient-to-b from-primary/5 to-background/50">
        <Image
          src="/sektionen/sektionenImage.jpeg"
          alt="Medlemsansökan hero"
          fill
          priority
          className="object-cover object-center"
        />        <div className="absolute inset-0 bg-white/10 dark:bg-black/70" />
        {/* Strong gradient overlay for smooth transition */}
        <div className="pointer-events-none absolute bottom-0 left-0 w-full h-24 sm:h-32 bg-gradient-to-b from-transparent via-white/70 to-white dark:from-transparent dark:to-muted/50 z-20" />
        {/* Additional very strong gradient for light theme */}
        <div className="pointer-events-none absolute bottom-0 left-0 w-full h-20 sm:h-24 bg-gradient-to-b from-transparent via-background/80 to-background dark:from-transparent dark:to-transparent z-21" />
        <div className="relative z-10 w-full flex flex-col items-center justify-center px-4">
          <h1 className="text-2xl md:text-5xl font-extrabold mb-2 text-primary-foreground drop-shadow-lg">Medlemsansökan</h1>
          <p className="text-sm md:text-xl text-primary-foreground/90 font-medium mb-2 max-w-2xl mx-auto drop-shadow">
            Bli medlem i Albyrådet och gör skillnad i Botkyrka! Fyll i formuläret nedan.
          </p>
        </div>
      </section>

      {/* Gradient transition from dark to gray */}
      <div className="h-2 md:h-8 w-full bg-gradient-to-b from-background via-alby-beige-soft to-alby-beige-subtle dark:from-background dark:via-alby-gray-darker dark:to-muted/50" />

      <main className="flex-1 flex flex-col items-center justify-center min-h-[calc(100vh-56px-40vh)] py-2 md:py-8 bg-muted/50">
        <Card className="w-11/12 max-w-md mx-auto px-2 sm:px-4 py-4 sm:py-8 rounded-2xl shadow-xl border border-alby-orange-muted/30 bg-card">
          <CardHeader className="pb-2">
            <CardTitle className="text-xl md:text-3xl font-bold text-primary text-center mb-1">Ansök om medlemskap</CardTitle>
            <CardDescription className="text-center text-muted-foreground text-xs md:text-base">
              Fyll i dina uppgifter nedan. Alla fält utom hälsning är obligatoriska.
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-2">
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3 sm:gap-4">
              <div>
                <Typography variant="small" className="mb-1 font-medium">För- och efternamn</Typography>
                <Input
                  {...register("name", { required: "För- och efternamn är obligatoriskt" })}
                  placeholder="Ditt namn"
                  aria-invalid={!!errors.name}
                  className="text-base md:text-lg"
                />
                {errors.name && <p className="text-destructive text-xs mt-1">{String(errors.name.message)}</p>}
              </div>
              <div>
                <Typography variant="small" className="mb-1 font-medium">Personnummer</Typography>
                <Input
                  {...register("personalNumber", { required: "Personnummer är obligatoriskt" })}
                  placeholder="ÅÅÅÅMMDD-XXXX"
                  aria-invalid={!!errors.personalNumber}
                  className="text-base md:text-lg"
                />
                {errors.personalNumber && <p className="text-destructive text-xs mt-1">{String(errors.personalNumber.message)}</p>}
              </div>
              <div>
                <Typography variant="small" className="mb-1 font-medium">Adress</Typography>
                <Input
                  {...register("address", { required: "Adress är obligatoriskt" })}
                  placeholder="Din adress"
                  aria-invalid={!!errors.address}
                  className="text-base md:text-lg"
                />
                {errors.address && <p className="text-destructive text-xs mt-1">{String(errors.address.message)}</p>}
              </div>
              <div>
                <Typography variant="small" className="mb-1 font-medium">Telefonnummer</Typography>
                <Input
                  {...register("phone", { required: "Telefonnummer är obligatoriskt" })}
                  placeholder="070-123 45 67"
                  aria-invalid={!!errors.phone}
                  className="text-base md:text-lg"
                />
                {errors.phone && <p className="text-destructive text-xs mt-1">{String(errors.phone.message)}</p>}
              </div>
              <div>
                <Typography variant="small" className="mb-1 font-medium">E-postadress</Typography>
                <Input
                  type="email"
                  {...register("email", {
                    required: "E-post är obligatoriskt",
                    pattern: { value: /^\S+@\S+\.\S+$/, message: "Ogiltig e-postadress" },
                  })}
                  placeholder="din@email.se"
                  aria-invalid={!!errors.email}
                  className="text-base md:text-lg"
                />
                {errors.email && <p className="text-destructive text-xs mt-1">{String(errors.email.message)}</p>}
              </div>
              <div>
                <Typography variant="small" className="mb-1 font-medium">Vad är din sysselsättning just nu?</Typography>
                <Input
                  {...register("occupation", { required: "Sysselsättning är obligatoriskt" })}
                  placeholder="Studerande, arbetande, etc."
                  aria-invalid={!!errors.occupation}
                  className="text-base md:text-lg"
                />
                {errors.occupation && <p className="text-destructive text-xs mt-1">{String(errors.occupation.message)}</p>}
              </div>
              <div>
                <Typography variant="small" className="mb-1 font-medium">Hur hittade du till oss?</Typography>
                <Input
                  {...register("howFound", { required: "Detta fält är obligatoriskt" })}
                  placeholder="Via vän, sociala medier, etc."
                  aria-invalid={!!errors.howFound}
                  className="text-base md:text-lg"
                />
                {errors.howFound && <p className="text-destructive text-xs mt-1">{String(errors.howFound.message)}</p>}
              </div>
              <div>
                <Typography variant="small" className="mb-1 font-medium">Hälsning (valfritt)</Typography>
                <Textarea
                  {...register("greeting")}
                  placeholder="Skriv en hälsning till oss (valfritt)"
                  rows={3}
                  className="text-base md:text-lg"
                />
              </div>              <Button type="submit" className="w-full mt-2 text-base md:text-lg py-3" disabled={loading}>
                {loading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Skickar ansökan...
                  </>
                ) : (
                  "Skicka ansökan"
                )}
              </Button>
              {status === "success" && (
                <div className="mt-2 text-green-600 text-center font-medium text-base">Tack för din ansökan! Vi kommer att kontakta dig snart.</div>
              )}
              {status === "error" && (
                <div className="mt-2 text-destructive text-center font-medium text-base">Något gick fel. Försök igen senare.</div>
              )}
            </form>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
