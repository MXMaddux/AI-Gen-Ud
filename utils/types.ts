export interface Template {
  name: string;
  slug: string;
  icon: string;
  desc: string;
  category: string;
  aiPrompt: string;
  form: Form[];
}

// Define the Form interface
export interface Form {
  label: string;
  field: string;
  name: string;
  required: boolean;
}
