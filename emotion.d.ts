import "@emotion/react";

declare module "@emotion/react" {
  export interface Theme {
    unit: number;
    colors: {
      primary: string;
    };
  }
}
