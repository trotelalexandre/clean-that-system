export type Action = {
  description: string;
  execute: () => void;
  explanation?: string;
};

export type Actions = Action[];
