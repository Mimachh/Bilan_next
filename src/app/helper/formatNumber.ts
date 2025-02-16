export const formatNumber = (value: number, type: "price" | "number") => {
    if (type === "price") {
      return (
        value
          .toFixed(2)
          .replace(/\B(?=(\d{3})+(?!\d))/g, " ")
          .replace(".", ",") + " €"
      );
    } else {
      return Math.ceil(value)
        .toString()
        .replace(/\B(?=(\d{3})+(?!\d))/g, " ");
    }
  };