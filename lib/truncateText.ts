export const truncateText = (text: string, wordsCount: number) => {
    const words = text.split(" ");
    if (words.length > wordsCount) {
      return words.slice(0, wordsCount).join(" ") + " ...";
    }
    return text;
  };