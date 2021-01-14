import { register } from "register-service-worker";

if (process.env.NODE_ENV === "production")
  register(`${process.env.BASE_URL}service-worker.js`, {
    registered(registration) {
      setInterval(() => registration.update(), 1000 * 60 * 60);
    },
    updated(registration) {
      const event = new CustomEvent("swupdatefound", { detail: registration });
      document.dispatchEvent(event);
    },
  });
