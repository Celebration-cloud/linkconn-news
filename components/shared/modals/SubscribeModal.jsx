/* eslint-disable react/prop-types */
/* eslint-disable react/react-in-jsx-scope */
"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useForm } from "react-hook-form";
import { showToast } from "@/utils/toast";
import { Check, X } from "lucide-react";

export const SubscribeModal = ({
  title = "Subscribe",
  className = "bg-neutral-900 text-white dark:bg-white dark:text-neutral-950 font-semibold px-4 py-1.5 rounded-full text-xs shadow-sm hover:opacity-90 active:scale-95 transition-all",
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    defaultValues: { email: "" },
  });

  const onSubmit = (data) => {
    const subject = encodeURIComponent("Linkcon Dispatch subscription request");
    const body = encodeURIComponent(`Please add ${data.email} to the Linkcon Dispatch mailing list.`);
    window.location.href = `mailto:contact@linkconnews.com?subject=${subject}&body=${body}`;
    setIsSuccess(true);
    showToast({
      title: "Email app opened",
      description: "Send the prepared email to request your subscription.",
      color: "success",
    });
    setTimeout(() => {
      setIsSuccess(false);
      setIsOpen(false);
      reset();
    }, 1800);
  };

  return (
    <>
      <button onClick={() => setIsOpen(true)} className={className}>
        {title}
      </button>

      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              transition={{ type: "spring", stiffness: 450, damping: 30 }}
              className="relative w-full max-w-md overflow-hidden rounded-2xl border border-neutral-200/80 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-6 shadow-2xl z-10"
            >
              {/* Close X */}
              <button
                onClick={() => setIsOpen(false)}
                className="absolute top-4 right-4 text-neutral-400 hover:text-neutral-900 dark:hover:text-white p-1 transition-colors"
                aria-label="Close"
              >
                <X className="size-5" />
              </button>

              {isSuccess ? (
                <div className="py-8 text-center space-y-3">
                  <div className="w-12 h-12 rounded-full bg-emerald-500/10 text-emerald-500 flex items-center justify-center mx-auto">
                    <Check className="size-6" />
                  </div>
                  <h3 className="font-serif text-lg font-bold text-neutral-900 dark:text-white">
                    Your email is ready
                  </h3>
                  <p className="text-xs text-neutral-500">
                    Send the prepared message from your email app to complete the request.
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="space-y-1">
                    <span className="text-xs font-bold uppercase tracking-widest text-neutral-400">
                      Linkcon Dispatch
                    </span>
                    <h3 className="text-xl font-serif font-bold text-neutral-900 dark:text-white">
                      Morning World Briefing
                    </h3>
                    <p className="text-xs text-neutral-500 dark:text-neutral-400 leading-relaxed">
                      Hand-curated global news, economic updates, and investigative stories delivered every morning at 06:00 GMT.
                    </p>
                  </div>

                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-3 pt-2">
                    <div>
                      <input
                        type="email"
                        placeholder="your.email@organization.com"
                        {...register("email", {
                          required: "Email is required",
                          pattern: {
                            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                            message: "Valid email address required",
                          },
                        })}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-950 text-sm text-neutral-900 dark:text-white placeholder:text-neutral-400 outline-none focus:border-neutral-900 dark:focus:border-white transition-colors"
                      />
                      {errors.email && (
                        <p className="mt-1 text-xs font-medium text-rose-600 dark:text-rose-300">
                          {errors.email.message}
                        </p>
                      )}
                    </div>

                    <div className="flex items-center justify-end gap-2 pt-2">
                      <button
                        type="button"
                        onClick={() => setIsOpen(false)}
                        className="px-4 py-2 rounded-xl text-xs font-semibold text-neutral-500 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="px-5 py-2 rounded-xl text-xs font-semibold bg-neutral-900 text-white dark:bg-white dark:text-neutral-950 hover:opacity-90 active:scale-95 disabled:opacity-50 transition-all flex items-center gap-2"
                      >
                        {isSubmitting && (
                          <span className="w-3 h-3 rounded-full border-2 border-current border-t-transparent animate-spin" />
                        )}
                        <span>Request subscription</span>
                      </button>
                    </div>
                  </form>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};
