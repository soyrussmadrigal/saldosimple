"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { MessageCircleQuestion, X } from "lucide-react";
import { useState } from "react";

export default function FeedbackButton() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState("idle");

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("loading");

    try {
      const response = await fetch("https://formspree.io/f/xblodbnn", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setStatus("success");
        setFormData({ name: "", email: "", message: "" });
      } else {
        setStatus("error");
      }
    } catch (err) {
      console.error(err);
      setStatus("error");
    }
  };

  return (
    <div className="mt-10 flex justify-center">
      <Dialog.Root>
        <Dialog.Trigger asChild>
          <button className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-blue-700 transition">
            <MessageCircleQuestion size={18} />
            ¿Encontraste un error o tienes una sugerencia?
          </button>
        </Dialog.Trigger>

        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 bg-black/40 z-50" />
          <Dialog.Content className="fixed z-50 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-xl w-full max-w-md p-6 shadow-xl">
            <div className="flex justify-between items-center mb-4">
              <Dialog.Title className="text-lg font-semibold text-gray-800">
                Reportar un error o sugerencia
              </Dialog.Title>
              <Dialog.Close className="text-gray-500 hover:text-red-500 transition">
                <X size={18} />
              </Dialog.Close>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 text-sm">
              <div>
                <label htmlFor="name" className="block text-gray-700 mb-1">
                  Tu nombre (opcional)
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-400"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-gray-700 mb-1">
                  Correo electrónico (opcional)
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-400"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-gray-700 mb-1">
                  Comentario o reporte *
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={4}
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-400"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
                disabled={status === "loading"}
              >
                {status === "loading" ? "Enviando..." : "Enviar reporte"}
              </button>

              {status === "success" && (
                <p className="text-green-600 text-sm mt-2">
                  ¡Gracias por tu comentario!
                </p>
              )}
              {status === "error" && (
                <p className="text-red-600 text-sm mt-2">
                  Ocurrió un error al enviar. Intenta de nuevo.
                </p>
              )}
            </form>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </div>
  );
}
