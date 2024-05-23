import { Set } from "@/features/sets/types";

export type ObjectId = {
  id: string;
};

export type Message = {
  title: string;
  details?: string;
};

export type ProblemDetails = {
  title: string;
  status: number;
  detail?: string;
};

export type Paged<T> = {
  page: number;
  items: T[];
  hasNext: boolean;
  hasPrevious: boolean;
};

export interface QuizletSetModel {
  lastModified: number;
  wordLang: string;
  defLang: string;
  title: string;
  description: string;
  numTerms: number;
  webUrl: string;
  thumbnailUrl: string;
}

export interface DehydratedReduxStateKey {
  studyModesCommon: StudyModesCommon;
  setPage: SetPage;
}

export interface Media {
  type: number;
  plainText: string;
  languageCode: string;
  ttsUrl: string;
  ttsSlowUrl: string;
  richText: any;
  code: string;
  url: string;
  width?: number;
  height?: number;
  attribution: string;
}

export interface PageProps {
  dehydratedReduxStateKey?: string;
}

export interface Props {
  pageProps: PageProps;
}

export interface QuizletResponse {
  props: Props;
}

export interface SetPage {
  set: QuizletSetModel;
}

export interface StudiableData {
  studiableItems: StudiableItem[];
}

export interface StudiableItem {
  id: any;
  timestamp: number;
  cardSides: CardSide[];
}

export interface StudyModesCommon {
  studiableData: StudiableData;
}

export interface CardSide {
  sideId: any;
  label: string;
  media: Media[];
}

export interface SetModel {
  title: string;
  description: string;
  textLang: string;
  definitionLang: string;
  image?: string;
  terms?: Term[];
}

export interface Term {
  text: string;
  definition: string;
  image?: string;
  textTtsUrl?: string;
  definitionTtsUrl?: string;
  setId: string;
}
