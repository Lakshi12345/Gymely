export const formatDisplayDate = (date: string) => {
    if (!date) return "-";

    const [year, month, day] = date.split("-");

    return `${day}/${month}/${year}`;
};
