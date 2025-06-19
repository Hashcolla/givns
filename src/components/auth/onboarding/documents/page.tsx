"use client";

import TitleWithBio from "@/components/ui/HeaderWithBio";
import Bio from "@/components/ui/Bio";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { docTypeVlaues, onboardingSchema } from "@/schema/onboardingSchema";
import { Plus } from "lucide-react";
import React, { useEffect, useState } from "react";
import { z } from "zod";
import { OnboardingPageFormProps } from "../account-type/page";
import { zodResolver } from "@hookform/resolvers/zod";
import { Control, Controller, SubmitHandler, useForm } from "react-hook-form";
import { useOnboardingStore } from "@/stores/onboardingStore";
import { updateDocType } from "@/actions/onboardingActions";

const documentTypeSchema = onboardingSchema.pick({
  docType: true,
});

type DocumentTypeFormValues = z.infer<typeof documentTypeSchema>;

export default function DocumentPage({
  ref,
  onError,
  onSuccess,
  onChangeValue,
}: OnboardingPageFormProps) {
  //
  const { control, handleSubmit, watch } = useForm<DocumentTypeFormValues>({
    resolver: zodResolver(documentTypeSchema),
  });

  const { setLoading } = useOnboardingStore((state) => state);

  const valueTypes = "docType";

  const sub = watch(valueTypes);

  useEffect(() => {
    onChangeValue?.();
  }, [sub]);

  const onSubmit: SubmitHandler<DocumentTypeFormValues> = async (data) => {
    try {
      await updateDocType(data.docType);
      onSuccess?.();
    } catch (error: any) {
      console.log(error.message);
      onError?.(error.message);
    }
  };

  useEffect(() => {
    if (ref) {
      ref.current = () => {
        setLoading(true);
        handleSubmit(onSubmit, onError)();
      };
    }

    return () => {
      if (ref) ref.current = null;
    };
  }, [ref, onSubmit, onError, handleSubmit]);

  return (
    <div
      className={`min-w-[var(--register-form-width)] transition-all duration-300`}
    >
      <h1 className="text-foreground mt-20 text-2xl font-semibold">
        Documents
      </h1>
      <Bio>Upload organization certificate or proof of registration</Bio>
      <div className="mt-10"></div>
      <DocumentTypeSelect control={control} />
      <div className="mt-10" />
      <TitleWithBio
        title="Copy of document"
        bio="Add a copy of both side of your id"
      />
      <UploadDocument />
    </div>
  );
}

export const UploadDocument = () => {
  return (
    <div className="border-input mt-5 h-40 w-full rounded-lg border p-3">
      <div className="bg-secondary/10 flex size-20 items-center justify-center rounded-lg">
        <Plus className="text-secondary" />
      </div>
    </div>
  );
};

const DocumentTypeSelect = ({
  control,
}: {
  control: Control<DocumentTypeFormValues>;
}) => {
  return (
    <Controller
      control={control}
      name="docType"
      render={({ field }) => (
        <Select value={field.value} onValueChange={field.onChange}>
          <SelectTrigger className="h-[50px] w-full">
            <SelectValue placeholder="Select" />
          </SelectTrigger>
          <SelectContent className="bg-background">
            {docTypeVlaues.map(({ value, label }) => (
              <SelectItem key={value} value={value}>
                {label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      )}
    />
  );
};
