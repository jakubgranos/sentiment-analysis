import { SentimentResult } from "@app/types/sentiment.types";

type SentimentInfoOptionsProps = SentimentResult["label"];

export const sentimentInfoOptions = (label: SentimentInfoOptionsProps) => {
    switch (label) {
        case "NEGATIVE":
            return {
                type: "Negatywny",
                icon: "😔",
                description: "Tekst wyraża negatywne emocje lub krytykę.",
                tip: "Aby zmienić sentyment, spróbuj użyć więcej pozytywnych wyrazów lub przedstawić problem w konstruktywny sposób.",
            };
        case "POSITIVE":
            return {
                type: "Pozytywny",
                icon: "😊",
                description:
                    "Tekst wyraża pozytywne emocje, aprobatę lub zadowolenie.",
                tip: "Twój tekst ma pozytywny wydźwięk, co może skutecznie wpływać na nastrój odbiorców.",
            };
        case "NEUTRAL":
            return {
                type: "Neutralny",
                icon: "😐",
                description: "Tekst jest neutralny, nie wyraża silnych emocji.",
                tip: "Aby nadać tekstowi większy charakter, możesz użyć bardziej wyrazistych słów i wyrażeń.",
            };
        default:
            return {
                type: "Neutralny",
                icon: "😐",
                description: "Tekst jest neutralny, nie wyraża silnych emocji.",
                tip: "Aby nadać tekstowi większy charakter, możesz użyć bardziej wyrazistych słów i wyrażeń.",
            };
    }
};
