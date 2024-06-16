import { Term } from "@/features/terms/types";
import { clearText } from "@/lib/utils";
import { useAudio } from "@/providers/AudioProvider";
import _ from "lodash";
import {
  FC,
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

export type QuestionType = "choose" | "write" | "listen";
export type TestState = "start" | "progress" | "finish";
export type QuestionState = "idle" | "correct" | "wrong";

type TestContextData = {
  state: TestState;
  question: QuestionData | null;
  index: number;
  total: number;
  correct: number;
  start: () => void;
  next: () => void;
  finish: () => void;
  check: (answer: string) => void;
  setQuestionType: (type: QuestionType) => void;
};

type QuestionData = {
  text: string;
  textTts?: string;
  answer: string;
  answerTts?: string;
  image?: string;
  type: QuestionType;
  state: QuestionState;
  givenAnswer?: string;
  options: { value: string; isCorrect: boolean }[] | null;
};

const TestContext = createContext<TestContextData | null>(null);

interface TestProviderProps {
  set: Term[];
}

const TestProvider: FC<PropsWithChildren<TestProviderProps>> = ({
  set,
  children,
}) => {
  const { play } = useAudio();

  const [state, setState] = useState<TestState>("start");
  const [questionType, setQuestionType] = useState<QuestionType>("choose");
  const [shuffled, setShuffled] = useState<Term[]>([]);

  const [index, setIndex] = useState<number>(-1);
  const [total, setTotal] = useState<number>(set.length);
  const [correct, setCorrect] = useState<number>(0);

  const [question, setQuestion] = useState<QuestionData | null>(null);

  useEffect(() => {
    if (index === -1) {
      return;
    }

    if (index > total - 1) {
      setState("finish");
      return;
    }

    const newQuestion = makeQuestion(index);

    setQuestion(newQuestion);
  }, [index]);

  const getOptions = (answer: string) => {
    return _.shuffle([
      ..._.shuffle(shuffled)
        .filter((t) => t.text !== answer)
        .slice(0, 3)
        .map((t) => ({ value: t.text, isCorrect: false })),
      { value: answer, isCorrect: true },
    ]);
  };

  const makeQuestion = (index: number): QuestionData => {
    const { text, definition, textTtsUrl, definitionTtsUrl, image } =
      shuffled[index];

    return {
      text: definition,
      answer: text,
      type: questionType,
      textTts: definitionTtsUrl,
      answerTts: textTtsUrl,
      options: questionType === "choose" ? getOptions(text) : null,
      state: "idle",
    };
  };

  const start = () => {
    setShuffled(_.shuffle(set));
    setCorrect(0);
    setIndex(-1);
    setState("progress");
    next();
  };

  const next = () => {
    setIndex((prev) => prev + 1);
  };

  const finish = () => {
    setState("start");
  };

  const check = (answer: string) => {
    if (!question) {
      return;
    }

    const givenAnswer = clearText(answer).trim().toLowerCase();

    const isCorrect =
      clearText(question?.answer).trim().toLowerCase() === givenAnswer;

    setQuestion({
      ...question,
      state: isCorrect ? "correct" : "wrong",
      givenAnswer: givenAnswer,
    });

    if (isCorrect) {
      setCorrect((prev) => prev + 1);
    }

    if (question.answerTts) {
      play([`https://quizlet.com/${question.answerTts}`], crypto.randomUUID());
    }
  };

  return (
    <TestContext.Provider
      value={{
        state: state,
        question: question,
        index: index,
        total: total,
        correct: correct,
        next: next,
        start: start,
        check: check,
        finish: finish,
        setQuestionType: setQuestionType,
      }}
    >
      {children}
    </TestContext.Provider>
  );
};

export default TestProvider;

export const useTest = () => {
  const context = useContext<TestContextData | null>(TestContext);

  if (!context) {
    throw new Error("useTest should be used within <TestContext>");
  }

  return context;
};
