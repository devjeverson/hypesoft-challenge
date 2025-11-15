import keycloak from "@/auth/keycloak";

export const api = {
  async request(path: string, options: RequestInit = {}) {
    const headers = new Headers(options.headers ?? {});

    if (keycloak.token) {
      headers.set("Authorization", `Bearer ${keycloak.token}`);
    }

    headers.set("Content-Type", "application/json");

    const res = await fetch(path, { ...options, headers });

    if (!res.ok) {
      const text = await res.text();
      throw new Error(text || "API error");
    }

    try {
      return await res.json();
    } catch {
      return null;
    }
  },

  get(path: string) {
    return this.request(path, { method: "GET" });
  },

  post(path: string, body: any) {
    return this.request(path, {
      method: "POST",
      body: JSON.stringify(body),
    });
  },

  put(path: string, body: any) {
    return this.request(path, {
      method: "PUT",
      body: JSON.stringify(body),
    });
  },

  delete(path: string) {
    return this.request(path, { method: "DELETE" });
  },
};

