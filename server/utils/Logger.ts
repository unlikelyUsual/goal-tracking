import { consoleColors } from "./enums";

export default class Logger {
  private nameSpace: string;

  constructor(nameSpace: string) {
    this.nameSpace = nameSpace;
  }

  public success(...optionalParams: any[]): void {
    console.log(
      consoleColors.fg.green,
      `${this.nameSpace}: `,
      ...optionalParams
    );
  }

  public log(...optionalParams: any[]): void {
    console.debug(
      consoleColors.fg.white,
      `${this.nameSpace}: `,
      ...optionalParams
    );
  }

  public info(...optionalParams: any[]): void {
    console.info(
      consoleColors.fg.blue,
      `${this.nameSpace}: `,
      ...optionalParams
    );
  }

  public warn(...optionalParams: any[]): void {
    console.warn(
      consoleColors.fg.yellow,
      `${this.nameSpace}: `,
      ...optionalParams
    );
  }

  public error(...optionalParams: any[]): void {
    console.error(
      consoleColors.fg.red,
      `${this.nameSpace}: `,
      ...optionalParams
    );
  }
}
