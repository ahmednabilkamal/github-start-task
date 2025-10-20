export type AppState = {
  top: number;
  language: string;
  createdFrom: string;
  theme: 'light' | 'dark';
  setTop: (top: number) => void;
  setLanguage: (lang: string) => void;
  setCreatedFrom: (cForm: string) => void;
  toggleTheme: () => void;
};
