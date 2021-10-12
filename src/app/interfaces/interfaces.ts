interface QuestionnaireI {
    question_type: string;
    identifier: string;
    headline: string;
    description: null;
    required: boolean;
    multiple?: boolean | undefined;
    choices?: ChoicesI[];
    jumps?: JumpI[];
    multiline?: boolean | undefined;
    dependency?: DependencyI;
}

interface ChoicesI {
    label?: string;
    value?: string;
    selected?: boolean;
}

interface JumpI {
    conditions?: { field?: string; value?: string }[];
    destination?: { id?: string };
}

interface DependencyI {
    key: string;
    value: string;
}

export { QuestionnaireI };
