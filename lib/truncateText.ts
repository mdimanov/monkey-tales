export const truncateText = (desc: string) => {
    const words = desc.split(" ");
    if (words.length > 15) {
      return words.slice(0, 15).join(" ") + " ...";
    }
    return desc;
  };