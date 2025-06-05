export interface FormData {
  name: string;
  email: string;
  message: string;
}

export interface FormEvent extends React.FormEvent<HTMLFormElement> {
  target: HTMLFormElement;
}
