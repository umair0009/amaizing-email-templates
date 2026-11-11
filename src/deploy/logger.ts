import { promises } from "node:fs";

export class Logger {
  name: string;
  private _logs: string[];

  constructor(name: string) {
    this.name = name;
    this._logs = [];
  }

  // biome-ignore lint/suspicious/noExplicitAny: any type of args are accepted
  log(type: "info" | "error" | "warning" | "debug", ...messages: any[]) {
    const message = `[${type.toUpperCase()}] ${this.name}: ${messages.map((i) => String(i)).join(" | ")}`;
    this._logs.push(message);
  }

  async flush(to?: string) {
    if (!to) {
      return this._logs.forEach((i) => {
        console.log(i);
      });
    }

    const logs = this._logs.join("\n");
    await promises.appendFile(to, logs, "utf-8");
  }

  get logs() {
    return this._logs;
  }
}
