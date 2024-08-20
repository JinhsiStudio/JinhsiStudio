import { warn, debug, trace, info, error } from "@tauri-apps/plugin-log";

function forwardConsole(
  fnName: "log" | "debug" | "info" | "warn" | "error",
  logger: (message: string) => Promise<void>,
) {
  const original = console[fnName];
  console[fnName] = (message?, ...optionalParams) => {
    original(message, optionalParams);
    let finalMessage: string = message ?? "";
    for (let param of optionalParams) {
      finalMessage += " ";
      finalMessage += JSON.stringify(param);
    }
    logger(finalMessage);
  };
}

export function forwardAllConsole() {
  forwardConsole("log", trace);
  forwardConsole("debug", debug);
  forwardConsole("info", info);
  forwardConsole("warn", warn);
  forwardConsole("error", error);
}
