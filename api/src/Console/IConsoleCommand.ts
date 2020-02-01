interface IConsoleCommand {
  execute(): Promise<void>;
}

export { IConsoleCommand };
